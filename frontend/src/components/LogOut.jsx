import { useNavigate } from "react-router-dom";

function LogOut({ setShowLogoutForm, showlogoutform }) {
  const navigate = useNavigate();

  if (!showlogoutform) return null;

  async function CnfLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");

    setShowLogoutForm(false);

    navigate("/", { replace: true });
  }

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-sm">
        {/* Top accent bar */}
        <div className="h-1 w-full " />

        {/* Content */}
        <div className="px-6 py-6">
          {/* Icon */}
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
            <svg
              xmlns=""
              className="w-6 h-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 15l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
          </div>

          {/* Text */}
          <h2 className="text-lg font-medium text-gray-900 mb-1">Sign out</h2>
          <p className="text-sm text-gray-500 mb-6">
            Are you sure you want to sign out? You'll need to log in again to
            access your account.
          </p>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => setShowLogoutForm(false)}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={CnfLogout}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogOut;
