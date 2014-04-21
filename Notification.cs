using Newtonsoft.Json;
using System;

namespace CAPS.Notifications.Web
{
    public class Notification
    {
        /// <summary>
        /// Notification Ids should be unique across all users
        /// </summary>
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        /// <summary>
        /// Required. A short description of the notification
        /// </summary>
        [JsonProperty(PropertyName = "title")]
        public string Title { get; set; }

        /// <summary>
        /// Required. The verbose description of the notification
        /// </summary>
        [JsonProperty(PropertyName = "text")]
        public string Text { get; set; }

        /// <summary>
        /// Optional. An image to display alongside the notification text and title
        /// </summary>
        [JsonProperty(PropertyName = "image")]
        public string Image { get; set; }

        /// <summary>
        /// Optional. The URL that should be used when the user clicks the notification link
        /// </summary>
        [JsonProperty(PropertyName = "url")]
        public string Url { get; set; }

        /// <summary>
        /// Indicates whether or not the user has previously read this notification
        /// </summary>
        [JsonProperty(PropertyName = "read")]
        public bool Read { get; set; }

        /// <summary>
        /// The date and time at which the notification was created
        /// </summary>
        [JsonProperty(PropertyName = "dateTime")]
        public DateTime DateTime { get; set; }
    }
}
