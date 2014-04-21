using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Threading.Tasks;
using System.Web.Http;

namespace CAPS.Notifications.Web
{
    [RoutePrefix("api/notifications")]
    public class NotificationsController : ApiController
    {
        [Import]
        private INotificationHandler notificationHandler;

        public NotificationsController()
        {
            NotificationsConfig.Container.SatisfyImportsOnce(this);
        }

        [HttpGet]
        [Route("")]
        public async Task<IEnumerable<Notification>> GetForUserAsync(string username, int? offset = null, int? max = null)
        {
            return await notificationHandler.GetForUserAsync(username, offset.GetValueOrDefault(), max.GetValueOrDefault());
        }

        [HttpPost]
        [Route("{id}/read")]
        public async Task MarkAsReadAsync([FromUri]string id)
        {
            await notificationHandler.MarkAsReadAsync(id);
        }
    }
}
