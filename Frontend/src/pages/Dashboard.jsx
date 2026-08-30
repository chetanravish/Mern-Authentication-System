import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth_context.js";
import { getCurrentUser } from "../api/devvault.api";

export default function Dashboard() {
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getCurrentUser();
      setUser(data.user);
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-3xl font-bold">
        Welcome {user?.username}
      </h1>

      <p className="text-slate-400 mt-2">
        {user?.email}
      </p>
    </div>
  );
}