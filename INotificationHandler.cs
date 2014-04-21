using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CAPS.Notifications.Web
{
    /// <summary>
    /// Defines the methods used by the notification message hub
    /// </summary>
    public interface INotificationHandler
    {
        /// <summary>
        /// Returns all the notifications for the given user
        /// </summary>
        /// <param name="username"></param>
        /// <param name="offset"></param>
        /// <param name="max"></param>
        /// <returns></returns>
        Task<IEnumerable<Notification>> GetForUserAsync(string username, int offset, int max);
        /// <summary>
        /// Returns the single specified notification. Notification Ids should be unique across all users for this to work
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<Notification> GetAsync(string id);
        /// <summary>
        /// Marks the specified notification as read. Notification Ids should be unique across all users for this to work
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task MarkAsReadAsync(string id);
    }
}
