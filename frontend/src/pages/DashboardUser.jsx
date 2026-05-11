import { useEffect, useState } from "react";
import ApplicationForm from "../components/ApplicationForm";
import NotificationModal from "../components/NotificationModal";


function DashboardUser() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [totalEvents, setTotalEvents] = useState(0);
  const [eventsList, setEventsList] = useState([]);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [applicants, setApplicants] = useState({});
  const [activity, setActivity] = useState([]);
  const [appliedEvents, setAppliedEvents] = useState([]);
  const [registrations, setRegistrations] = useState("");

  const token = localStorage.getItem("token");

  const role = localStorage.getItem("role");
  const isUser = role === "user";
  if (!isUser) return null;

  function formatDateTime(datetime) {
    if (!datetime) return "—";
    const d = new Date(datetime);
    if (isNaN(d.getTime())) return "Invalid Date";
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });
  }

  useEffect(() => {
    async function checkApplications() {
      try {
        const res = await fetch(`${apiUrl}/api/registrations/my-applications`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        console.log("APP", data);

        const now = new Date();

        const filteredEvents = (data?.data || []).filter((event) => {
          const eventDate = new Date(event.Event?.eventDate);
          return !isNaN(eventDate) && eventDate > now;
        });
        setRegistrations(filteredEvents.length);
        console.log("filteredevents", filteredEvents);
        setActivity(filteredEvents);
        const appliedIds = filteredEvents.map((item) => item.id);
        setAppliedEvents(appliedIds);
        if (!res.ok) {
          console.log("error");
        }
      } catch (err) {
        console.log(err);
      }
    }
    checkApplications();
  }, []);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch(`${apiUrl}/api/events/view-events`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        const now = new Date();
        const filteredEvents = data.data.filter(
          (event) => new Date(event.eventDate) > now,
        );
        setTotalEvents(data.data.length);
        setEventsList(data.data);
        console.log("EVENT", data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchEvents();
  }, []);

  async function handleEventApplication(applyFormData) {
    try {
      const res = await fetch(
        `${apiUrl}/api/registrations/apply/${selectedEventId}`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(applyFormData),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        console.log("Application failed", data);
        return;
      }
      const userId = Number(localStorage.getItem("userId"));
      setApplicants((prev) => {
        const existing = prev[selectedEventId] || [];
        if (existing.some((a) => a.userId === userId)) return prev;
        return { ...prev, [selectedEventId]: [...existing, { userId }] };
      });
      setShowApplyForm(false);
    } catch (err) {
      console.error(err);
    }
  }

  const userId = Number(localStorage.getItem("userId"));

  const stats = [
    { label: "Active events", value: totalEvents },
    { label: "Your applications", value: registrations || 0 },
    { label: "Spots available", value: 0 },
    { label: "Registrations", value: registrations || 0 },
  ];

  function statusClass(status) {
    switch (status) {
      case "approved":
        return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";
      case "rejected":
        return "bg-red-50 text-red-600 ring-1 ring-red-200";
      case "pending":
        return "bg-amber-50 text-amber-700 ring-1 ring-amber-200";
      default:
        return "bg-slate-100 text-slate-600 ring-1 ring-slate-200";
    }
  }

  return (
    <div className="bg-slate-100">
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Dashboard
            </h1>
            <p className="text-sm text-slate-400 mt-0.5">
              Track your activity and manage your events
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        <div className="grid grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className={`rounded-xl p-5 ${
                s.accent
                  ? "bg-blue-600 text-white"
                  : "bg-slate-50 border border-slate-100"
              }`}
            >
              <p
                className={`text-xs font-medium mb-2 ${s.accent ? "text-blue-100" : "text-slate-400"}`}
              >
                {s.label}
              </p>
              <p
                className={`text-3xl font-semibold tracking-tight ${s.accent ? "text-white" : "text-slate-800"}`}
              >
                {s.value}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 max-[900px]:grid-cols-1">
          <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <span className="text-sm font-semibold text-slate-800">
                Upcoming events
              </span>
              <span className="text-xs font-medium bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full">
                {totalEvents} active
              </span>
            </div>
            <div className="divide-y divide-slate-50 max-h-72 overflow-y-auto">
              {eventsList.length === 0 && (
                <p className="text-sm text-slate-400 text-center py-10">
                  No upcoming events
                </p>
              )}
              {eventsList.map((item) => {
                const isApplied = appliedEvents.includes(item.id);
                const isDeadlinePassed = item.deadlinePassed;
                const hasApplied = (applicants[item.id] || []).some(
                  (a) => a.userId === userId,
                );
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {item.city} · {item.spotsLeft} spots left
                      </p>
                      <p className="text-xs text-slate-400">
                        {item?.eventDate}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        if (isApplied || isDeadlinePassed) return;
                        setSelectedEventId(item.id);
                        setShowApplyForm(true);
                      }}
                      disabled={isApplied || isDeadlinePassed}
                      className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all flex-shrink-0 ${
                        isApplied
                          ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 cursor-not-allowed"
                          : isDeadlinePassed
                            ? "bg-red-50 text-red-500 ring-1 ring-red-200 cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
                      }`}
                    >
                      {isApplied
                        ? "✓ Applied"
                        : isDeadlinePassed
                          ? "Deadline passed"
                          : "Apply"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <span className="text-sm font-semibold text-slate-800">
                Your activity
              </span>
              <span className="text-xs font-medium bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full">
                Recent
              </span>
            </div>
            <div className="max-h-72 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Event
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {activity.length === 0 && (
                    <tr>
                      <td
                        colSpan={3}
                        className="text-center py-10 text-sm text-slate-400"
                      >
                        No activity yet
                      </td>
                    </tr>
                  )}
                  {activity.map((reg) => (
                    <tr
                      key={reg.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-5 py-3 font-medium text-slate-700">
                        {reg.Event?.title}
                      </td>
                      <td className="px-4 py-3 text-slate-400 text-xs">
                        {formatDateTime(reg.createdAt)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full capitalize ${statusClass(reg.status)}`}
                        >
                          {reg.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <ApplicationForm
        showApplyForm={showApplyForm}
        setShowApplyForm={setShowApplyForm}
        HandleEventApplication={handleEventApplication}
      />
    </div>
  );
}

export default DashboardUser;
