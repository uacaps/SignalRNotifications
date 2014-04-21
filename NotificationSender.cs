using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAPS.Notifications.Web
{
    /// <summary>
    /// Used for sending a new notification to the user. This only adds the notification to the user client. Other code is required if the notification should be kept for longer. 
    /// </summary>
    public static class NotificationSender
    {
        public static void AddNotification(string id, string username, string title, string text, string image, string url)
        {
            var context = GlobalHost.ConnectionManager.GetHubContext<NotificationMessageHub>();
            context.Clients.Group("User-" + username).addNotification(id, title, text, image, url);
        }
    }
}
