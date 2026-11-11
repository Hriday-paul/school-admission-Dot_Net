using Microsoft.AspNetCore.SignalR;
using schoolAdmission.src.Infrastructure.Repositories;

namespace schoolAdmission.src.Modules.Classes
{
    public class ClassHub : Hub
    {
        private readonly IClassRepository _classRepository;

        public ClassHub(IClassRepository classRepository)
        {
            _classRepository = classRepository;
        }

        public override async Task OnConnectedAsync()
        {
            // Send current class seat availability immediately to the connected client
            var classes = await _classRepository.GetClassesAsync();
            await Clients.Caller.SendAsync("ReceiveClassSeats", classes);
            await base.OnConnectedAsync();
        }

        // Optional: allow client to subscribe to a specific class group
        public async Task JoinClassGroup(string classId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, $"class_{classId}");
        }

        public async Task LeaveClassGroup(string classId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"class_{classId}");
        }
    }
}
