import React, { useState } from "react";
import axios from "../api/api";

export default function EntityTable({ entities, setEntities }) {
  const [editing, setEditing] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [createTitle, setCreateTitle] = useState("");

  // ➕ Create
  const handleCreate = async () => {
    if (!createTitle.trim()) return;
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "/entities",
        { title: createTitle, description: "" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEntities((prev) => [...prev, res.data]);
      setCreateTitle("");
    } catch (err) {
      console.error("Error creating entity:", err);
    }
  };

  // ✏️ Edit
  const handleEdit = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `/entities/${id}`,
        { title: newTitle, description: "" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEntities((prev) => prev.map((e) => (e.id === id ? res.data : e)));
      setEditing(null);
    } catch (err) {
      console.error("Error updating entity:", err);
    }
  };

  // 🗑 Delete
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/entities/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEntities((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Error deleting entity:", err);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-5 sm:p-8 max-w-6xl mx-auto border border-gray-100 transition-all duration-300">
      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800 text-center sm:text-left">
        Manage Entities
      </h2>

      {/* Input + Add Button */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          value={createTitle}
          onChange={(e) => setCreateTitle(e.target.value)}
          placeholder="Enter new entity name"
          className="border border-gray-300 rounded-xl px-4 py-3 w-full text-gray-700 
                     text-base sm:text-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 
                     outline-none shadow-sm transition"
        />
        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white font-medium px-6 py-3 rounded-xl 
                     hover:bg-blue-600 active:scale-95 transition-all shadow-md 
                     sm:w-auto w-full text-base sm:text-lg"
        >
          Add
        </button>
      </div>

      {/* 📱 Mobile Card View */}
      <div className="sm:hidden space-y-4">
        {entities.length === 0 ? (
          <p className="text-center text-gray-500 italic text-base">
            No entities found.
          </p>
        ) : (
          entities.map((entity, index) => (
            <div
              key={entity.id}
              className="border border-gray-200 rounded-xl p-4 shadow-md bg-white text-[17px] transition-transform hover:scale-[1.01] pl-[32px] pb-[32px]"
            >
              <div className="flex justify-between items-center mb-2">
                {/* Index number */}
                <h3 className="font-semibold text-gray-800 text-lg leading-none mt-[px]">
                  {index + 1}
                </h3>

                {/* Buttons */}
                <div className="flex flex-row items-center gap-2">
                  {editing === entity.id ? (
                    <button
                      onClick={() => handleEdit(entity.id)}
                      className="bg-green-500 text-white font-medium  py-2 rounded-lg 
                                hover:bg-green-600 active:scale-95 transition-all shadow-sm text-sm mt-[7px] mr-[2px] p-[20px] mb-[10px]"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditing(entity.id);
                        setNewTitle(entity.title || entity.name);
                      }}
                      className="bg-blue-500 text-white font-medium p-[25px] py-2 rounded-lg 
                                hover:bg-blue-600 active:scale-95 transition-all shadow-sm text-sm mt-[7px] mr-[2px] mb-[10px]"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(entity.id)}
                    className="bg-red-500 text-white font-medium px-4 py-2 rounded-lg 
                              hover:bg-red-600 active:scale-95 transition-all shadow-sm text-sm mt-[7px] mr-[2px] mb-[10px]"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Editable input or title */}
              {editing === entity.id ? (
                <input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="border border-gray-300 rounded-lg p-3 w-full text-base 
                             focus:ring-2 focus:ring-blue-300 outline-none text-gray-700"
                />
              ) : (
                <p className="text-gray-800 break-words text-[18px] font-medium leading-snug mt-[2px]">
                 Entity Name :  <span className="font-semibold text-gray-900 text-xl">{entity.name}</span>
                </p>
              )}
            </div>
          ))
        )}
      </div>

      {/* 💻 Desktop Table View */}
<div className="hidden sm:block overflow-x-auto">
  {entities.length === 0 ? (
    <p className="text-center text-gray-500 italic text-base">
      No entities found.
    </p>
  ) : (
    <table className="w-full border border-gray-200 rounded-xl overflow-hidden shadow-md text-gray-800 mb-0">
      <thead className="bg-gray-100 text-left text-gray-700">
        <tr>
          <th className="py-3 px-4 font-semibold">S.no</th>
          <th className="py-3 px-4 font-semibold">Title</th>
          <th className="py-3 px-4 font-semibold text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {entities.map((entity, index) => (
          <tr
            key={entity.id}
            className="border-t hover:bg-gray-50 transition-all"
          >
            <td className="py-3 px-4 font-medium">{index + 1}</td>
            <td className="py-3 px-4 text-base sm:text-lg font-medium text-gray-800">
              {editing === entity.id ? (
                <input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 w-full text-sm sm:text-base 
                             focus:ring-2 focus:ring-blue-300 outline-none"
                />
              ) : (
                <span className="break-words">{entity.title || entity.name}</span>
              )}
            </td>
            <td className="py-3 px-4 flex justify-center gap-3">
              {editing === entity.id ? (
                <button
                  onClick={() => handleEdit(entity.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 active:scale-95 transition"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditing(entity.id);
                    setNewTitle(entity.title || entity.name);
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 active:scale-95 transition"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => handleDelete(entity.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 active:scale-95 transition"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>
</div>
  );
}
