using Newtonsoft.Json;
using System;

namespace CAPS.Notifications.Web
{
    public class Notification
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }
        [JsonProperty(PropertyName = "title")]
        public string Title { get; set; }
        [JsonProperty(PropertyName = "text")]
        public string Text { get; set; }
        [JsonProperty(PropertyName = "image")]
        public string Image { get; set; }
        [JsonProperty(PropertyName = "url")]
        public string Url { get; set; }
        [JsonProperty(PropertyName = "read")]
        public bool Read { get; set; }
        [JsonProperty(PropertyName = "dateTime")]
        public DateTime DateTime { get; set; }
    }
}
