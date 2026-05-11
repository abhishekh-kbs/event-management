import { useState, useEffect } from "react";
import LoadingLogo from "../assets/LoadingLogo.png";

function ApplicationForm({
  HandleEventApplication,
  showApplyForm,
  setShowApplyForm,
}) {
  const [cooldown, setCooldown] = useState(0);
  const [applyFormData, setApplyFormData] = useState({
    notes: "",
    numberOfGuests: "",
  });

  const [applyerrors, setApplyErrors] = useState({});
  const [applyformerror, setApplyFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApplyFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!showApplyForm) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const newErrors = {};
    Object.entries(applyFormData).forEach(([key, value]) => {
      if (!value) {
        newErrors[key] = true;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setApplyErrors(newErrors);
      setApplyFormError("Please fill all fields!");
      setLoading(false);
      return;
    }

    await HandleEventApplication(applyFormData);
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="bg-slate-50 border-b p-6">
          <h2 className="text-2xl font-bold text-slate-800">Apply</h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 overflow-y-auto max-h-[80vh]"
        >
          <div className="space-y-8">
            <section>
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">
                Apply
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Note:
                  </label>
                  <textarea
                    name="notes"
                    type="text"
                    placeholder="Note"
                    onChange={handleChange}
                    value={applyFormData.notes}
                    className={`w-full border rounded-lg p-2.5 outline-none focus:ring-2
                       focus:ring-gray-500 focus:border-transparent transition ${applyerrors.notes ? "border-red-500 scale-103" : "border-slate-300"}`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Guests
                  </label>
                  <input
                    name="numberOfGuests"
                    type="number"
                    placeholder="Guests"
                    onChange={handleChange}
                    value={applyFormData.numberOfGuests}
                    className={`w-full border rounded-lg p-2.5 outline-none focus:ring-2
                       focus:ring-gray-500 focus:border-transparent transition ${applyerrors.numberOfGuests ? "border-red-500 scale-103" : "border-slate-300"}`}
                  />
                </div>
              </div>
            </section>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-100">
            {applyformerror && (
              <p className="text-sm text-red-500 mb-4 text-center font-medium ">
                {applyformerror}
              </p>
            )}
            <div className="flex flex-col-reverse md:flex-row gap-3">
              <button
                type="button"
                onClick={() => setShowApplyForm(false)}
                className="flex-1 px-4 py-2.5 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition active:scale-95"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-200 transition active:scale-95 disabled:opacity-70"
              >
                {loading ? (
                  <div className="flex justify-center items-center">
                    <img
                      src={LoadingLogo}
                      className="w-5 h-5 animate-spin [animation-duration:2s]"
                    />
                  </div>
                ) : (
                  "Apply"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplicationForm;
