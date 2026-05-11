import { useState } from "react";

function EditProfileModal({
  handleEditProfile,
  showEditForm,
  setShowEditForm,
}) {
  const [editProfileFormData, setEditProfileFormData] = useState({
    phone_number: "",
    country: "",
  });
  const [formError, setFormError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProfileFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!showEditForm) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editProfileFormData.phone_number.length !== 10) {
      setFormError("Phone number can only be 10 digits");
      return;
    }
    setLoading(true);

    await handleEditProfile(editProfileFormData);
    setLoading(false);
  };

  const fields = [
    { name: "phone_number", placeholder: "Phone number", type: "number" },
    { name: "country", placeholder: "Country", type: "text" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) setShowEditForm(false);
      }}
    >
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Edit profile
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Update your personal information
            </p>
          </div>
          <button
            onClick={() => setShowEditForm(false)}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-3">
          {fields.map(({ name, placeholder, type }) => (
            <div key={name}>
              <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">
                {placeholder}
              </label>
              <input
                type={type}
                name={name}
                placeholder={`Enter your ${placeholder.toLowerCase()}`}
                onChange={handleChange}
                value={editProfileFormData[name]}
                className="w-full text-sm text-slate-800 placeholder-slate-300 border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all"
              />
            </div>
          ))}
          <p className="flex justify-center text-xs text-red-400">
            {formError}
          </p>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowEditForm(false)}
              className="flex-1 py-2.5 text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 rounded-xl transition-all active:scale-95"
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
              {loading ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
