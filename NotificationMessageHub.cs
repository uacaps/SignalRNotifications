using Microsoft.AspNet.SignalR;
using System;

namespace CAPS.Notifications.Web
{
    public class NotificationMessageHub : Hub
    {
        public void JoinGroup(string groupName) // to always send just to this user, use the user name as the group name. 
        {
            Groups.Add(Context.ConnectionId, groupName);
        }

        public void AddNotification(string id, string username, string title, string text, string image, string url)
        {
            Clients.Group("User-" + username).addNotification(id, title, text, image, url);
        }
    }
}
