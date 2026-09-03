import { useState } from "react";
import { X } from "lucide-react";
import { addFamilyMember } from "../../api/devvault.api";

const RELATIONS = [
  "Father",
  "Mother",
  "Brother",
  "Sister",
  "Spouse",
  "Son",
  "Daughter",
  "Other",
];

export default function AddMemberModal({
  isOpen,
  onClose,
  onSuccess,
  memberCount,
}) {
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("Father");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const data = await addFamilyMember(name, relation);

      onSuccess(data.member);

      setName("");
      setRelation("Father");
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#131826] rounded-2xl border border-white/10 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">
            Add Family Member
          </h2>

          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <p className="text-sm text-gray-400 mb-4">
          {memberCount}/10 members added
        </p>

        {error && (
          <p className="text-red-400 text-sm mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Member name"
            className="w-full bg-[#0B0F19] border border-white/10 rounded-xl px-4 py-3 text-white"
          />

          <select
            value={relation}
            onChange={(e) => setRelation(e.target.value)}
            className="w-full bg-[#0B0F19] border border-white/10 rounded-xl px-4 py-3 text-white"
          >
            {RELATIONS.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>

          <button
            disabled={loading || memberCount >= 10}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-xl py-3 font-medium"
          >
            {loading ? "Adding..." : "Add Member"}
          </button>
        </form>
      </div>
    </div>
  );
}