import { useState } from "react";
import { Users, Plus } from "lucide-react";

const colors = [
  "bg-pink-500",
  "bg-green-500",
  "bg-violet-500",
  "bg-yellow-500",
  "bg-cyan-500",
  "bg-red-500",
];

export default function FamilyFilter({
  members,
  documents,
  selectedMember,
  onSelect,
  onAddClick,
}) {
  const [showMore, setShowMore] = useState(false);

  const countDocs = (id) =>
    documents.filter((doc) => doc.member?._id === id).length;

  const visibleMembers = members.slice(0, 8);
  const hiddenMembers = members.slice(8);

  return (
    <div className="flex items-start gap-6 overflow-x-auto py-2 scrollbar-hide">

      {/* ALL */}
      <button
        onClick={() => {
          onSelect(null);
          setShowMore(false);
        }}
        className="flex flex-col items-center min-w-18"
      >
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center border-2 transition ${
            selectedMember === null
              ? "border-blue-500 shadow-[0_0_20px_rgba(59,130,246,.45)]"
              : "border-white/10"
          } bg-blue-600`}
        >
          <Users className="w-7 h-7 text-white" />
        </div>

        <p className="mt-2 text-white text-sm font-medium">All</p>

        <span className="mt-1 px-2 py-0.5 rounded-full bg-white/10 text-xs text-gray-300">
          {documents.length}
        </span>
      </button>

      {/* VISIBLE MEMBERS */}
      {visibleMembers.map((member, index) => (
        <button
          key={member._id}
          onClick={() => {
            onSelect(
              selectedMember?._id === member._id ? null : member
            );
            setShowMore(false);
          }}
          className="flex flex-col items-center min-w-18"
        >
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold border-2 transition ${
              selectedMember?._id === member._id
                ? "border-blue-500 shadow-[0_0_20px_rgba(59,130,246,.45)]"
                : "border-white/10"
            } ${colors[index % colors.length]}`}
          >
            {member.name.charAt(0).toUpperCase()}
          </div>

          <p className="mt-2 text-white text-sm font-medium truncate w-full text-center">
            {member.name}
          </p>

          <p className="text-gray-400 text-xs">
            {member.relation}
          </p>

          <span className="mt-1 px-2 py-0.5 rounded-full bg-white/10 text-xs text-gray-300">
            {countDocs(member._id)}
          </span>
        </button>
      ))}

      {/* MORE MEMBERS */}
      {hiddenMembers.length > 0 ? (
        <div className="relative">
          <button
            onClick={() => setShowMore(!showMore)}
            className="flex flex-col items-center min-w-18"
          >
            <div className="w-20 h-20 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center hover:border-blue-500 transition">
              <span className="text-2xl text-white">•••</span>
            </div>

            <p className="mt-2 text-white text-sm font-medium">
              +{hiddenMembers.length}
            </p>
          </button>

          {showMore && (
            <div className="absolute top-24 right-0 w-72 bg-[#131826] border border-white/10 rounded-2xl p-3 grid grid-cols-2 gap-3 shadow-2xl z-50">

              {hiddenMembers.map((member, index) => (
                <button
                  key={member._id}
                  onClick={() => {
                    onSelect(member);
                    setShowMore(false);
                  }}
                  className="flex items-center gap-2 p-2 rounded-xl hover:bg-white/5"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                      colors[(index + 4) % colors.length]
                    }`}
                  >
                    {member.name.charAt(0)}
                  </div>

                  <div className="text-left">
                    <p className="text-white text-sm truncate">
                      {member.name}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {member.relation}
                    </p>
                  </div>
                </button>
              ))}

              {members.length < 10 && (
                <button
                  onClick={() => {
                    setShowMore(false);
                    onAddClick();
                  }}
                  className="col-span-2 mt-1 p-2 rounded-xl border border-dashed border-white/10 hover:border-blue-500 text-blue-400 font-medium"
                >
                  + Add Member
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={onAddClick}
          disabled={members.length >= 10}
          className="flex flex-col items-center min-w-18 disabled:opacity-50"
        >
          <div className="w-20 h-20 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center hover:border-blue-500 transition">
            <Plus className="w-7 h-7 text-gray-400" />
          </div>

          <p className="mt-2 text-white text-sm font-medium text-center">
            Add Member
          </p>
        </button>
      )}
    </div>
  );
}