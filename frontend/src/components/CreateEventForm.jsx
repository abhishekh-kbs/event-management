import { useState, useEffect } from "react";
import LoadingLogo from "../assets/LoadingLogo.png";

function CreateEventForm({ HandleEventCreation, showForm, setShowForm }) {
  const [formData, setFormData] = useState({
    organizer: "",
    hostEmail: "",
    hostPhone: "",
    title: "",
    eventDate: "",
    eventTimeStart: "",
    eventTimeEnd: "",
    venueName: "",
    city: "",
    capacityTotal: "",
    fileUpload: "",
    fullDescription: "",
    priceAmount: "",
    registrationDeadline: "",
    bookingOpenDate: "",
    visibleFrom: "",
  });

  const [errors, setErrors] = useState({});
  const [formerror, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  useEffect(() => {
    if (cooldown === 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  if (!showForm) return null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (cooldown > 0) return;
    setFormError("");

    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        newErrors[key] = true;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setFormError("Please fill all fields!");
      return;
    }

    const selectedDate = new Date(formData.eventDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setFormError("Date cannot be in the past");
      return;
    }

    if (formData.hostPhone.length !== 10) {
      setFormError("Phone number can only be 10 digits");
      return;
    }
    setCooldown(5);

    setLoading(true);
    HandleEventCreation(formData);
    setLoading(false);
  }
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="bg-slate-50 border-b p-6">
          <h2 className="text-2xl font-bold text-slate-800">
            Create New Event
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 overflow-y-auto max-h-[80vh]"
        >
          <div className="space-y-8">
            <section>
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">
                Host Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Organizer
                  </label>
                  <input
                    name="organizer"
                    type="text"
                    placeholder="Organizer"
                    onChange={handleChange}
                    value={formData.organizer}
                    className={`w-full border rounded-lg p-2.5 outline-none focus:ring-2
                    focus:ring-gray-500 focus:border-transparent transition ${errors.organizer ? "border-red-500 scale-103" : "border-slate-300"}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    name="hostEmail"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={formData.hostEmail}
                    className={`w-full border rounded-lg p-2.5 outline-none focus:ring-2
                       focus:ring-gray-500 focus:border-transparent transition ${errors.hostEmail ? "border-red-500 scale-103" : "border-slate-300"}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    name="hostPhone"
                    type="text"
                    inputMode="numeric"
                    placeholder="Phone Number"
                    onChange={handleChange}
                    value={formData.hostPhone}
                    className={`w-full border rounded-lg p-2.5 outline-none focus:ring-2
                       focus:ring-gray-500 focus:border-transparent transition ${errors.hostPhone ? "border-red-500 scale-103" : "border-slate-300"}`}
                  />
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">
                Event Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Event Title
                  </label>
                  <input
                    name="title"
                    type="text"
                    placeholder="Event Title"
                    onChange={handleChange}
                    value={formData.title}
                    className={`w-full border rounded-lg p-2.5 outline-none focus:ring-2
                       focus:ring-gray-500 transition ${errors.title ? "border-red-500 scale-103" : "border-slate-300"}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    placeholder="Category"
                    onChange={handleChange}
                    value={formData.category}
                    className={`w-full border rounded-lg p-2.5 outline-none focus:ring-2
                       focus:ring-gray-500 focus:border-transparent transition ${errors.category ? "border-red-500 scale-103" : "border-slate-300"}`}
                  >
                    <option value="Social">Social</option>
                    <option value="Networking">Networking</option>
                    <option value="Tech">Tech</option>
                    <option value="Meet">Meet</option>
                    <option value="Research">Research</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Finance">Finance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Image
                  </label>
                  <input
                    name="fileUpload"
                    type="file"
                    accept="image/*"
                    placeholder="image"
                    onChange={handleChange}
                    className={`w-full border rounded-lg p-2.5 transition  ${errors.fileUpload ? "border-red-500 scale-103" : "border-slate-300"}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Date
                  </label>
                  <input
                    name="eventDate"
                    type="date"
                    onChange={handleChange}
                    value={formData.eventDate}
                    className={`w-full border rounded-lg p-2.5 outline-none focus:ring-2
                     focus:ring-gray-500 focus:border-transparent transition ${errors.eventDate ? "border-red-500 scale-103" : "border-slate-300"}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Start Time
                  </label>
                  <input
                    name="eventTimeStart"
                    type="time"
                    onChange={handleChange}
                    value={formData.eventTimeStart}
                    className={`w-full border rounded-lg p-2.5 outline-none focus:ring-2
                     focus:ring-gray-500 focus:border-transparent transition ${errors.eventTimeStart ? "border-red-500 scale-103" : "border-slate-300"}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    End Time
                  </label>
                  <input
                    name="eventTimeEnd"
                    type="time"
                    onChange={handleChange}
                    value={formData.eventTimeEnd}
                    className={`w-full border rounded-lg p-2.5 outline-none focus:ring-2
                       focus:ring-gray-500 focus:border-transparent transition ${errors.eventTimeEnd ? "border-red-500 scale-103" : "border-slate-300"}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Price
                  </label>
                  <input
                    name="priceAmount"
                    type="number"
                    onChange={handleChange}
                    value={formData.priceAmount}
                    className={`w-full border rounded-lg p-2.5 outline-none focus:ring-2
                       focus:ring-gray-500 focus:border-transparent transition ${errors.eventTimeEnd ? "border-red-500 scale-103" : "border-slate-300"}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Deadline
                  </label>
                  <input
                    name="registrationDeadline"
                    type="datetime-local"
                    onChange={handleChange}
                    value={formData.registrationDeadline}
                    className={`w-full border rounded-lg p-2.5 outline-none focus:ring-2
                       focus:ring-gray-500 focus:border-transparent transition ${errors.registrationDeadline ? "border-red-500 scale-103" : "border-slate-300"}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Booking Open
                  </label>
                  <input
                    name="bookingOpenDate"
                    type="date"
                    onChange={handleChange}
                    value={formData.bookingOpenDate}
                    className={`w-full border rounded-lg p-2.5 outline-none focus:ring-2
                       focus:ring-gray-500 focus:border-transparent transition ${errors.bookingOpenDate ? "border-red-500 scale-103" : "border-slate-300"}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Event Listing Date
                  </label>
                  <input
                    name="visibleFrom"
                    type="date"
                    onChange={handleChange}
                    value={formData.visibleFrom}
                    className={`w-full border rounded-lg p-2.5 outline-none focus:ring-2
                       focus:ring-gray-500 focus:border-transparent transition ${errors.visibleFrom ? "border-red-500 scale-103" : "border-slate-300"}`}
                  />
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">
                Venue
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="venueName"
                  placeholder="Venue"
                  onChange={handleChange}
                  value={formData.venueName}
                  className={`border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-gray-500 transition
                    ${errors.venueName ? "border-red-500 scale-103" : "border-slate-300"}`}
                />
                <input
                  name="city"
                  placeholder="City"
                  onChange={handleChange}
                  value={formData.city}
                  className={`border rounded-lg p-2.5 outline-none focus:ring-2
                     focus:ring-gray-500 transition ${errors.city ? "border-red-500 scale-103" : "border-slate-300"}`}
                />
                <input
                  name="capacityTotal"
                  type="number"
                  placeholder="Total Capacity"
                  onChange={handleChange}
                  value={formData.capacityTotal}
                  className={`border rounded-lg p-2.5 outline-none focus:ring-2
                     focus:ring-gray-500 transition ${errors.capacityTotal ? "border-red-500 scale-103" : "border-slate-300"}`}
                />

                <div className="md:col-span-2">
                  <textarea
                    name="fullDescription"
                    rows="3"
                    placeholder="Description"
                    onChange={handleChange}
                    value={formData.fullDescription}
                    className={`w-full border rounded-lg outline-none p-2.5 focus:ring-2
                       focus:ring-gray-500 transition ${errors.fullDescription ? "border-red-500 scale-103v" : "border-slate-300"}`}
                  />
                </div>
              </div>
            </section>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-100">
            {formerror && (
              <p className="text-sm text-red-500 mb-4 text-center font-medium ">
                {formerror}
              </p>
            )}
            <div className="flex flex-col-reverse md:flex-row gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
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
                {loading ? (
                  <div className="flex justify-center items-center">
                    <img
                      src={LoadingLogo}
                      className="w-5 h-5 animate-spin [animation-duration:2s]"
                    />
                  </div>
                ) : (
                  "Create"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateEventForm;
