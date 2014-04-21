ko.bindingHandlers.dropdownShow = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var value = valueAccessor();
        var valueUnwrapped = ko.unwrap(value);
        $(element).on('shown.bs.dropdown', valueUnwrapped);
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) { }
};
// uses jQuery, knockout, knockout-mapping, signalR, jquery.gritter, and array.extend
function NotificationViewModel(model, parent) {
    var self = this;
    ko.mapping.fromJS(model, { observe: ['read'] }, self);
    self.parent = parent;
    self.shortText = ko.computed(function () {
        var smallText = self.text;
        var length = 150;
        if (smallText.length > length) smallText = smallText.substr(0, (length - 3)) + "...";
        return smallText;
    });
    self.go = function () {
        if (!self.read()) self.parent.markAsRead(self);
        window.location = self.url;
    }
    self.ageDateString = (function (date) {
        var nowMs = new Date().getTime();
        var thenMs = 0;
        if (typeof (date) === 'Date') thenMs = date.getTime();
        else thenMs = new Date(date).getTime();
        var diffMs = nowMs - thenMs;
        var diffS = diffMs / 1000;
        if (diffS < 60) {
            return Math.round(diffS) + " seconds ago";
        } else {
            var diffm = diffS / 60;
            if (diffm < 60) {
                return Math.round(diffm) + " minutes ago";
            } else {
                var diffH = diffm / 60;
                if (diffH < 24) {
                    return Math.round(diffH) + " hours ago";
                } else {
                    var diffD = diffH / 24;
                    return Math.round(diffD) + " days ago";
                }
            }
        }
    })(self.dateTime);
}
function NotificationsViewModel(options) {
    var self = this;
    options = options || {};
    self.url = options.url || '/api/notifications/'; // you may have to use a different url if your route attributes are different
    self.username = options.username || '';
    self.readType = options.readType || 'view';
    if ($.connection && $.connection.notificationMessageHub) { //if signalR is enabled
        self.signalRClient = $.connection.notificationMessageHub.client;
        self.signalRServer = $.connection.notificationMessageHub.server;
    }
    self.loading = ko.observable(false);
    self.notifications = new ko.observableArray([]);
    self.unreadNotifications = ko.computed(function () {
        return self.notifications().where(function (n) { return !n.read(); });
    });
    self.hasMoreNotifications = ko.observable(true);
    self.loadMoreNotifications = function () {
        self.loading(true);
        var max = 10;
        var offset = self.notifications().length;
        var fullUrl = self.url + "?username=" + self.username + "&offset=" + offset + "&max=" + max;
        $.ajax({ type: "GET", url: fullUrl, cache: false, success: self.loadMoreNotificationsCallback, dataType: 'json' });
    };
    self.loadMoreNotificationsCallback = function (data) {
        if (data.length > 0) {
            var newNotifications = data.select(function (value) { return new NotificationViewModel(value, self); });
            if (self.notifications().length == 0) {
                self.notifications(newNotifications);
            } else {
                newNotifications.forEach(function (n) {
                    self.notifications.push(n);
                    if(self.readType == 'view' && !n.read())
                        self.markAsRead(n);
                });
            }
        } else {
            self.hasMoreNotifications(false);
        }
        self.loading(false);
    };
    self.markAsRead = function (notification) {
        $.post(self.url + notification.id + '/read', {});
        notification.read(true);
    };
    self.markAsReadById = function (id) {
        var notification = self.notifications().first(function (n) { return n.id == id; });
        if (notification != null) self.markAsRead(notification);
    };
    self.markAllAsRead = function () {
        self.notifications().where(function (n) { return !n.read(); }).forEach(function (n) { self.markAsRead(n); });
    }
    self.addNotification = function (id, title, text, image, url, gritterTime) {
        gritterTime = gritterTime || (1000 * 5); // default is two seconds
        self.notifications.unshift(new NotificationViewModel({ id: id, title: title, text: text, image: image, url: url, read: false, dateTime: new Date().toString('MM/dd/yyyy hh:mm tt') }), self);
        if ($.gritter)
            $.gritter.add({ title: '<a href="' + url + '">' + title + '</a>', text: text, image: image, sticky: false, time: gritterTime });
    };
    if (self.signalRClient) {
        self.signalRClient.addNotification = self.addNotification;
        self.signalRClient.markNotificationAsRead = self.markAsReadById;
    }
    self.init = function () {
        self.loadMoreNotifications();
        if (self.signalRServer)
            self.signalRServer.joinGroup('User-' + self.username);
    };
}