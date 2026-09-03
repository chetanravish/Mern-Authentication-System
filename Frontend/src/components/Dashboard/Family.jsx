import { Users, Trash2 } from "lucide-react";
import { deleteFamilyMember } from "../../api/devvault.api";
import DeleteConfirmModel from "./DeleteConfirmModel";
import { useState } from "react";


export default function Family({ members, onAddClick, onDelete }) {

    const [selectedMember, setSelectedMember] = useState(null);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Family Members</h1>
                    <p className="text-sm text-gray-400">
                        {members.length} of 10 members
                    </p>
                </div>

                <button
                    onClick={onAddClick}
                    disabled={members.length >= 10}
                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-xl text-white font-medium"
                >
                    + Add Member
                </button>
            </div>

            {members.length === 0 ? (
                <div className="bg-[#131826] border border-dashed border-white/10 rounded-2xl py-16 text-center">
                    <Users className="w-10 h-10 mx-auto text-gray-500 mb-3" />
                    <h2 className="text-white font-semibold">No family members yet</h2>
                    <p className="text-sm text-gray-400 mt-1">
                        Add your first family member to get started.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {members.map((member) => (
                        <div
                            key={member._id}
                            className="relative bg-[#131826] border border-white/10 rounded-2xl p-5 hover:border-blue-500/30 transition"
                        >
                            {/* Delete Button */}
                            <button
                                onClick={() => setSelectedMember(member)}
                                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>

                            {/* Avatar */}
                            <div className="w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center text-xl font-bold text-blue-400">
                                {member.name.charAt(0).toUpperCase()}
                            </div>

                            {/* Info */}
                            <h3 className="mt-4 text-lg font-semibold text-white">
                                {member.name}
                            </h3>

                            <p className="text-gray-400">{member.relation}</p>
                        </div>
                    ))}
                </div>
            )}
            <DeleteConfirmModel
                isOpen={!!selectedMember}
                name={selectedMember?.name}
                onCancel={() => setSelectedMember(null)}
                onConfirm={async () => {
                    await deleteFamilyMember(selectedMember._id);
                    onDelete(selectedMember._id);
                    setSelectedMember(null);
                }}
            />
        </div>

    );


}