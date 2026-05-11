import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const Navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

  const [cnfmpassword, setCnfmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [register, setRegister] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const HandleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (
      !formData.email ||
      !formData.password ||
      !cnfmpassword ||
      !formData.username ||
      !formData.role
    ) {
      setError("Please fill all fields");
      setLoading(false);
      return;
    }

    if (formData.password != cnfmpassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setError("Password must have 8 chars, 1 capital, 1 number, 1 symbol");
      setLoading(false);
      return;
    }

    setError("");

    try {
      const res = await fetch(`${apiUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        return;
      }

      if (res.ok) {
        setRegister(data.message + ", Redirecting to login...");
        setTimeout(() => {
          Navigate("/");
        }, 1000);
      }

      if (data.success) {
        setError("Registered");
        Navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

    setFormData("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-100">
      <div className="flex rounded-xl shadow-xl hover:shadow-2xl overflow-hidden">
        {/* Left Banner */}
        <div className="w-20 hover:bg-blue-600 transition-colors bg-blue-500 flex items-center justify-center flex-shrink-0">
          <span
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            className="text-white text-2xl font-medium tracking-widest whitespace-nowrap select-none"
          >
            CLUB MANAGEMENT
          </span>
        </div>

        {/* Original Card */}
        <div className="w-80 px-6 py-8 bg-white">
          {/* Header */}
          <div className="mb-8">
            <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-2">
              Account
            </p>
            <h1 className="text-2xl font-medium text-gray-900 mb-1">
              Create account
            </h1>
            <p className="text-sm text-gray-500">
              Fill in the details to get started
            </p>
          </div>

          {/* Form */}
          <form onSubmit={HandleSubmit} className="flex flex-col gap-4 mb-6">
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter Username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1.5">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1.5">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1.5">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                value={cnfmpassword}
                onChange={(e) => setCnfmPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400 transition-colors"
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-xs text-gray-500 mb-2">
                Register as
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    checked={formData.role === "user"}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className="accent-gray-600"
                  />
                  User
                </label>
                <label className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="creator"
                    checked={formData.role === "creator"}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className="accent-gray-600"
                  />
                  Event Manager
                </label>
              </div>
            </div>

            {/* Error / Success */}
            {error && (
              <p className="text-xs text-center text-red-500">{error}</p>
            )}
            {register && (
              <p className="text-xs text-center text-green-600">{register}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full border border-gray-200 rounded-lg py-2.5 text-sm text-white font-medium hover:bg-blue-700 bg-blue-600 transition-colors disabled:opacity-50"
            >
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-xs text-gray-400">
            Already have an account?{" "}
            <button
              onClick={() => Navigate("/")}
              className="text-gray-700 font-medium hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
