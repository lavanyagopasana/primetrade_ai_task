import React, { useEffect, useState } from "react";
import NavbarDashboard from "../components/NavbarDashboard";
import UserProfile from "../components/UserProfile";
import EntityTable from "../components/EntityTable";
import SearchBar from "../components/SearchBar";
import axios from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [entities, setEntities] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // ✅ Fetch user once
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("/user/profile", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setUser(res.data))
      .catch(() => {
        alert("Session expired, please login again");
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  // ✅ Fetch entities once
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("/entities", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setEntities(res.data))
      .catch((err) => console.error("Error fetching entities:", err));
  }, []);

  // ✅ Filter entities by search
  const visibleEntities = entities.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // ✅ Add Entity
  const handleAdd = async (name) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "/entities",
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEntities((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Error adding entity:", err);
    }
  };

  // ✅ Delete Entity
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`/entities/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEntities((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Error deleting entity:", err);
    }
  };

  // ✅ Edit Entity
  const handleEdit = async (id, newname) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(
        `/entities/${id}`,
        { name: newname },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setEntities((prev) =>
        prev.map((e) => (e.id === id ? res.data : e))
      );
    } catch (err) {
      console.error("Error updating entity:", err);
    }
  };

  if (!user)
    return <div className="text-center mt-10 text-gray-700">Loading Dashboard...</div>;

  return (
  <div className="flex flex-col min-h-screen w-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-sky-100 overflow-x-hidden">
    {/* Navbar */}
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f172a] text-white shadow-md">
      <NavbarDashboard onLogout={handleLogout} />
    </header>

    {/* Main content */}
    <main className="flex-1 w-full pt-24 px-6 md:px-12 lg:px-16 pb-10 overflow-y-auto">
      <h1 className="text-4xl font-extrabold text-indigo-700 mb-6 tracking-tight">
        Welcome back, <span className="text-gray-800">{user?.username || "User"} 👋</span>
      </h1>
      <p className="text-gray-600 text-lg mb-8">
        Here’s an overview of your latest activity and data.
      </p>


      {/* Profile Section */}
      <section className=" p-6 md:p-8 rounded-2xl shadow-md mb-5">
        <UserProfile user={user} />
      </section>

      {/* Entities Section */}
      <section className=" p-6 md:p-8 rounded-2xl shadow-md mb-10 ">
        <div className="mb-[20px]">
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <EntityTable
          entities={visibleEntities}
          setEntities={setEntities}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </section>
    </main>
  </div>
);
}