import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [formData, setFormData] = useState({
    email: localStorage.getItem("email"),
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (!formData.newPassword || !formData.confirmPassword) {
        setError("Empty fields!");
        return;
      }

      const res = await fetch(`${apiUrl}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        console.log("ERROR:", data);
      } else {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-slate-100">
      <div className="w-full max-w-sm px-6 py-8 rounded-xl shadow-xl hover:shadow-2xl">
        <div className="mb-8">
          <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-2">
            Account
          </p>
          <h1 className="text-2xl font-medium text-gray-900 mb-1">
            Reset password
          </h1>
          <p className="text-sm text-gray-500">Set Password</p>
        </div>

        <div className="flex flex-col gap-3 mb-6">
          <form onSubmit={handleSubmit}>
            <label className="block text-xs text-gray-500 mb-1.5">
              Password
            </label>
            <input
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter Password"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400 transition-colors"
            />
            <label className="block text-xs mt-2 text-gray-500 mb-1.5">
              Confirm Password
            </label>
            <input
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400 transition-colors"
            />

            <p className="flex justify-center text-xs text-red-500 transition mt-2">
              {error}
            </p>

            <button
              type="submit"
              className="w-full border mt-4 border-gray-200 rounded-lg py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
            >
              Confirm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
