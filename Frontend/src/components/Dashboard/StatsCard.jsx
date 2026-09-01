import { FileText, Users, NotebookPen } from "lucide-react";

export default function StatsCards({
  totalDocs,
  familyMembers,
  secureNotes,
}) {
  const cards = [
    {
      title: "Documents",
      value: totalDocs,
      icon: FileText,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "Family",
      value: familyMembers,
      icon: Users,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Secure Notes",
      value: secureNotes,
      icon: NotebookPen,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="bg-[#131826] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition"
          >
            <div
              className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center`}
            >
              <Icon className={`w-6 h-6 ${card.color}`} />
            </div>

            <h3 className="mt-4 text-3xl font-bold text-white">
              {card.value}
            </h3>

            <p className="mt-1 text-sm text-gray-400">{card.title}</p>
          </div>
        );
      })}
    </div>
  );
}