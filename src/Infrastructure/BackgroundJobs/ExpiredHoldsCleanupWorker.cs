using Microsoft.EntityFrameworkCore;
using schoolAdmission.src.Infrastructure.Data;
using schoolAdmission.src.Modules.Holds;
using schoolAdmission.src.Shared.Services;

namespace schoolAdmission.src.Infrastructure.BackgroundJobs
{
    public class ExpiredHoldsCleanupWorker : BackgroundService
    {
        private readonly IServiceScopeFactory _scopeFactory;
        private readonly IClassSeatsNotifier _notifier;
        private readonly ILogger<ExpiredHoldsCleanupWorker> _logger;
        // Interval to check for expired holds (e.g., every 30 seconds)
        private static readonly TimeSpan CheckInterval = TimeSpan.FromSeconds(30);

        public ExpiredHoldsCleanupWorker(
            IServiceScopeFactory scopeFactory,
            IClassSeatsNotifier notifier,
            ILogger<ExpiredHoldsCleanupWorker> logger)
        {
            _scopeFactory = scopeFactory;
            _notifier = notifier;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("ExpiredHoldsCleanupWorker started.");

            using var timer = new PeriodicTimer(CheckInterval);

            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    await ExpireHoldsAsync(stoppingToken);
                }
                catch (Exception ex) when (ex is not OperationCanceledException)
                {
                    _logger.LogError(ex, "Error occurred while expiring holds.");
                }

                try
                {
                    if (!await timer.WaitForNextTickAsync(stoppingToken))
                    {
                        break;
                    }
                }
                catch (OperationCanceledException)
                {
                    break;
                }
            }

            _logger.LogInformation("ExpiredHoldsCleanupWorker stopped.");
        }

        private async Task ExpireHoldsAsync(CancellationToken cancellationToken)
        {
            using var scope = _scopeFactory.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

            var now = DateTime.UtcNow;

            // Execute an efficient bulk update on holds that are currently HELD and past their expiration date
            var updatedCount = await dbContext.Holds
                .Where(h => h.Status == HoldStatus.HELD && h.ExpiresAt <= now)
                .ExecuteUpdateAsync(setter => setter
                    .SetProperty(h => h.Status, HoldStatus.EXPIRED)
                    .SetProperty(h => h.UpdatedAt, now),
                    cancellationToken);

            if (updatedCount > 0)
            {
                _logger.LogInformation("Expired {Count} holds at {Timestamp}.", updatedCount, now);
                await _notifier.NotifyClassSeatsChangedAsync();
            }
        }
    }
}
