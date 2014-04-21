using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Threading.Tasks;

namespace CAPS.Notifications.Web
{
    public class NotificationMessageHub : Hub
    {
        [Import]
        private INotificationHandler notificationHandler;

        public NotificationMessageHub()
            : base()
        {
            NotificationsConfig.Container.SatisfyImportsOnce(this);
        }


        public void JoinGroup(string groupName) // to always send just to this user, use the user name as the group name. 
        {
            Groups.Add(Context.ConnectionId, groupName);
        }

        public async Task<IEnumerable<Notification>> GetForUser(string username, int? offset = null, int? max = null)
        {
            return await notificationHandler.GetForUserAsync(username, offset.GetValueOrDefault(), max.GetValueOrDefault());
        }

        public async Task MarkAsRead(string id)
        {
            await notificationHandler.MarkAsReadAsync(id);
        }


        public void AddNotification(string id, string username, string title, string text, string image, string url)
        {
            Clients.Group("User-" + username).addNotification(id, title, text, image, url);
        }
    }
}
