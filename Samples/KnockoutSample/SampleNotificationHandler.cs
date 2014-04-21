using CAPS.Notifications.Web;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace KnockoutSample.Sample
{
    /// <summary>
    /// Sample handler for the notification system. 
    /// </summary>
    [Export(typeof(INotificationHandler))]
    public class SampleNotificationHandler : INotificationHandler
    {
        private List<Notification> samples = new List<Notification>();

        public SampleNotificationHandler()
        {
            for (var i = 0; i < 100; ++i)
            {
                samples.Add(new Notification { Id = i.ToString(), Title = "Sample Notification " + i.ToString(), Text = "This is a sample notification", Image = "/Content/notifications/sign_warning.png", Url = "#", DateTime = DateTime.Now });
            }
        }

        public Task<IEnumerable<Notification>> GetForUserAsync(string username, int offset, int max)
        {
            return Task.FromResult(samples.Skip(offset).Take(max));
        }

        public Task<Notification> GetAsync(string id)
        {
            return Task.FromResult(samples.FirstOrDefault(n => n.Id == id));
        }

        public Task MarkAsReadAsync(string id)
        {
            var sample = samples.FirstOrDefault(n => n.Id == id);
            if (sample == null)
                throw new HttpResponseException(HttpStatusCode.NotFound);
            sample.Read = true;
            return Task.Run(() => { });
        }
    }
}