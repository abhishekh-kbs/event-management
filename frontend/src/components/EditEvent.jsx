import { useState, useEffect } from "react";

function EditEvent({ event, handleEventEdit, showEditForm, setShowEditForm }) {
  const [editformdata, setEditFormData] = useState({
    venue: event?.venueName || "",
    date: event?.eventDate?.slice(0, 10) || "",
    description: event?.fullDescription || "",
    city: event?.city || "",
  });

  const [editerrors, setEditErrors] = useState({});
  const [editformerror, setEditFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown === 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  if (!showEditForm) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    setEditFormError("");

    const newErrors = {};
    Object.entries(editformdata).forEach(([key, value]) => {
      if (!value) {
        newErrors[key] = true;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setEditErrors(newErrors);
      setEditFormError("Please fill all fields!");
      return;
    }

    setLoading(true);
    setCooldown(5);
    handleEventEdit(editformdata);
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="bg-slate-50 border-b p-6">
          <h2 className="text-2xl font-bold text-slate-800">Edit Event</h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 overflow-y-auto max-h-[80vh]"
        >
          <div className="space-y-8">
            <section>
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">
                Edit Event Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Venue
                  </label>
                  <input
                    name="venue"
                    type="text"
                    placeholder="Venue"
                    onChange={handleChange}
                    value={editformdata.venue}
                    className={`w-full border rounded-lg p-2.5 outline-none focus:ring-2
                    focus:ring-gray-500 focus:border-transparent transition ${editerrors.venue ? "border-red-500 scale-103" : "border-slate-300"}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    City
                  </label>
                  <input
                    name="city"
                    type="text"
                    placeholder="city"
                    onChange={handleChange}
                    value={editformdata.city}
                    className={`w-full border rounded-lg p-2.5 outline-none focus:ring-2
                       focus:ring-gray-500 focus:border-transparent transition ${editerrors.city ? "border-red-500 scale-103" : "border-slate-300"}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Date
                  </label>
                  <input
                    name="date"
                    type="date"
                    placeholder="Date"
                    onChange={handleChange}
                    value={editformdata.date}
                    className={`w-full border rounded-lg p-2.5 outline-none focus:ring-2
                       focus:ring-gray-500 focus:border-transparent transition ${editerrors.date ? "border-red-500 scale-103" : "border-slate-300"}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    type="date"
                    placeholder="Date"
                    onChange={handleChange}
                    value={editformdata.description}
                    className={`w-full border rounded-lg p-2.5 outline-none focus:ring-2
                       focus:ring-gray-500 focus:border-transparent transition ${editerrors.date ? "border-red-500 scale-103" : "border-slate-300"}`}
                  />
                </div>
              </div>
            </section>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-100">
            {editformerror && (
              <p className="text-sm text-red-500 mb-4 text-center font-medium ">
                {editformerror}
              </p>
            )}
            <div className="flex flex-col-reverse md:flex-row gap-3">
              <button
                type="button"
                onClick={() => setShowEditForm(false)}
                className="flex-1 px-4 py-2.5 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition active:scale-95"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading && (
                  <svg
                    className="w-4 h-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                    />
                  </svg>
                )}
                {loading ? "Editing..." : "Edit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEvent;
