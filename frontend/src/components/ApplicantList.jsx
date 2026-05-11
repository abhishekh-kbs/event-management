function ApplicantsList({
  applicants,
  showApplicants,
  setShowApplicants,
  handleStatus,
}) {
  if (!showApplicants) return null;

  const handleClose = () => setShowApplicants(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
            Applicants
          </span>
          <span className="text-xs text-gray-300">
            {applicants.length} total
          </span>
        </div>

        <ul className="divide-y divide-gray-50 max-h-80 overflow-y-auto">
          {applicants.map((apps) => (
            <li key={apps.id} className="flex items-center gap-3 px-6 py-3">
              <span className="flex-1 text-sm font-medium text-gray-800">
                {apps.User.username}
              </span>
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize tracking-wide
                  ${
                    apps.status === "approved"
                      ? "bg-green-50 text-green-700"
                      : apps.status === "rejected"
                        ? "bg-red-50 text-red-700"
                        : "bg-gray-100 text-gray-500"
                  }`}
              >
                {apps.status}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => handleStatus(apps.id, "approved")}
                  className="text-xs font-medium px-3 py-1.5 rounded-lg border border-green-200 text-green-700 hover:bg-green-50 transition-colors"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleStatus(apps.id, "rejected")}
                  className="text-xs font-medium px-3 py-1.5 rounded-lg border border-red-200 text-red-700 hover:bg-red-50 transition-colors"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex justify-end px-6 py-4 border-t border-gray-100">
          <button
            onClick={handleClose}
            className="text-sm font-medium px-5 py-2 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApplicantsList;
