using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CAPS.Notifications.Web
{
    public interface INotificationHandler
    {
        Task<IEnumerable<Notification>> GetForUserAsync(string username, int offset, int max);
        Task<Notification> GetAsync(string id);
        Task MarkAsReadAsync(string id);
    }
}
