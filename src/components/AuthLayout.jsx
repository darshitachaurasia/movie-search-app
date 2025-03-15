import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status); // true (logged in) | false (logged out) | undefined (initial state)

  useEffect(() => {
    // If authStatus is still undefined (initial load), wait before redirecting
    if (authStatus === undefined) return;

    if (authentication && !authStatus) {
      navigate("/login"); // Redirect guests to login if authentication is required
    } else if (!authentication && authStatus) {
      navigate("/"); // Redirect authenticated users away from login/signup pages
    }

    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <h1 className="text-2xl">Loading...</h1>
    </div>
  ) : (
    <>{children}</>
  );
}
