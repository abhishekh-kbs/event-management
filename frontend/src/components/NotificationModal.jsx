import { useState } from "react";

const tagStyles = {
  System: "bg-emerald-100 text-emerald-800",
  Event: "bg-violet-100 text-violet-800",
  Alert: "bg-amber-100 text-amber-800",
};

const avatarColors = [
  { bg: "bg-violet-100", text: "text-violet-800" },
  { bg: "bg-teal-100", text: "text-teal-800" },
  { bg: "bg-rose-100", text: "text-rose-800" },
  { bg: "bg-sky-100", text: "text-sky-800" },
];
function NotificationModal({
  setShowNotification,
  showNotification,
  notifications = [],
  setNotifications,
  setUnreadCount,
  handleNotificationClick,
  unreadCount,
  handleMarkAllAsRead,
}) {
  if (!showNotification) return null;

  return (
    <div
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={() => setShowNotification(false)}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-sm shadow-xl border  border-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"></div>
            <div>
              <p className="text-[15px] font-medium text-slate-900">
                Notifications
              </p>

              <p className="text-[12px] text-slate-400 mt-0.5">
                {unreadCount > 0
                  ? `${unreadCount} notifications`
                  : "All caught up"}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowNotification(false)}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        <div className="h-px bg-slate-100" />

        <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
          {notifications.length === 0 && (
            <p className="text-center text-slate-400 py-6">
              No notifications yet
            </p>
          )}

          {notifications.map((notif, index) => {
            return (
              <div
                key={notif.id}
                onClick={() => handleNotificationClick(notif.id)}
                className={`flex items-start gap-3 px-5 py-4 hover:bg-slate-50 cursor-pointer ${
                  !notif.isRead ? "bg-slate-100 font-medium" : ""
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium"></div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between mb-1">
                    <p className="text-[13px] font-medium text-slate-900">
                      {notif.data.eventTitle || "User"}
                    </p>
                    <span className="text-[11px] text-slate-400">
                      {notif.time}
                    </span>
                  </div>

                  <p className="text-[13px] text-slate-500">{notif.message}</p>

                  {/* Type badge */}
                  <span className="inline-block mt-2 text-[11px] px-2 py-0.5 rounded-md font-medium bg-slate-100 text-slate-600">
                    {notif.type}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <button
          onClick={handleMarkAllAsRead}
          className="text-xs flex justify-center m-auto p-2 text-blue-600 hover:underline"
        >
          Mark all as read
        </button>
      </div>
    </div>
  );
}

export default NotificationModal;
