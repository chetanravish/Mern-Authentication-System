import DocumentCard from "./DocumentCard";

export default function RecentDocuments({ documents, search, onView }) {
  const filtered = documents.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">
            Recent Documents
          </h2>
          <p className="text-sm text-gray-400">
            {filtered.length} document{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-[#131826] border border-dashed border-white/10 rounded-2xl py-14 text-center">
          <p className="text-gray-400">No matching document found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((doc) => (
            <DocumentCard
              key={doc._id}
              document={doc}
              onView={() => onView(doc)}
            />
          ))}
        </div>
      )}
    </section>
  );
}