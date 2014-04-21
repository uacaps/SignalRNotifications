using Microsoft.Owin;
using Owin;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition.Hosting;
using System.IO;

[assembly: OwinStartup(typeof(CAPS.Notifications.Web.NotificationsConfig))]
namespace CAPS.Notifications.Web
{
    public class NotificationsConfig
    {
        public static CompositionContainer Container { get; set; }

        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
            var catalog = new AggregateCatalog();
            catalog.Catalogs.Add(new DirectoryCatalog(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "bin")));
            var pluginDirectory = Path.Combine(System.Web.HttpRuntime.BinDirectory, "plugins");
            if (Directory.Exists(pluginDirectory))
            {
                catalog.Catalogs.Add(new DirectoryCatalog(pluginDirectory));
            }
            Container = new CompositionContainer(catalog);
        }
    }
}
