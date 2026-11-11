using Microsoft.AspNetCore.SignalR;
using schoolAdmission.src.Infrastructure.Repositories;

namespace schoolAdmission.src.Shared.Services
{
    public interface IClassSeatsNotifier
    {
        Task NotifyClassSeatsChangedAsync(Guid? classId = null);
    }

    public class ClassSeatsNotifier : IClassSeatsNotifier
    {
        private readonly IHubContext<Modules.Classes.ClassHub> _hubContext;
        private readonly IServiceScopeFactory _scopeFactory;
        private readonly ILogger<ClassSeatsNotifier> _logger;

        public ClassSeatsNotifier(
            IHubContext<Modules.Classes.ClassHub> hubContext,
            IServiceScopeFactory scopeFactory,
            ILogger<ClassSeatsNotifier> logger)
        {
            _hubContext = hubContext;
            _scopeFactory = scopeFactory;
            _logger = logger;
        }

        public async Task NotifyClassSeatsChangedAsync(Guid? classId = null)
        {
            try
            {
                using var scope = _scopeFactory.CreateScope();
                var classRepository = scope.ServiceProvider.GetRequiredService<IClassRepository>();

                // Broadcast updated all-classes list to all connected clients
                var classes = await classRepository.GetClassesAsync();
                await _hubContext.Clients.All.SendAsync("ReceiveClassSeats", classes);

                // If specific classId provided, also broadcast to its group and individual event
                if (classId.HasValue)
                {
                    var specificClass = await classRepository.GetClassByIdAsync(classId.Value);
                    if (specificClass != null)
                    {
                        await _hubContext.Clients.Group($"class_{classId.Value}")
                            .SendAsync("ReceiveSingleClassSeats", specificClass);
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while notifying clients of class seat updates via SignalR.");
            }
        }
    }
}
