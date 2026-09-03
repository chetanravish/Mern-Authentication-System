import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth_context";
import { logOut, getDocument, getFamilyMembers } from "../api/devvault.api";

import Sidebar from "../components/Dashboard/Sidebar.jsx";
import Topbar from "../components/Dashboard/Topbar.jsx";
import WelcomeCard from "../components/Dashboard/WelcomeCard.jsx";
import StatsCards from "../components/Dashboard/StatsCard.jsx";
import RecentDocuments from "../components/Dashboard/RecentDocument.jsx";
import DocumentModel from "../components/Dashboard/DocumentModel.jsx";
import UploadDocModel from "../components/Dashboard/UploadDocModel.jsx";
import DocumentViewer from "../components/Dashboard/DocumentViewer";
import Family from "../components/Dashboard/Family.jsx"
import AddMemberModel from "../components/Dashboard/AddMember.jsx";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, setUser, setAccessToken } = useContext(AuthContext);

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("documents");
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [members, setMembers] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);


  useEffect(() => {
    const fetchMembers = async () => {
      const data = await getFamilyMembers();
      console.log(data)
      setMembers(data.members);
    };

    fetchMembers();
  }, []);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const data = await getDocument();
        setDocuments(data.documents);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDocuments();
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
      setAccessToken(null);
      setUser(null);
      navigate("/", { replace: true });
    } catch (err) {
      alert(err.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0B0F19] text-white">
      <Sidebar
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />

      <main className="flex-1 p-8">
        <Topbar
          search={search}
          setSearch={setSearch}
          user={user}
        />

        {activeTab === "documents" && (
          <div className="space-y-6">
            <WelcomeCard user={user}
              onUpload={() => setIsUploadOpen(true)}
            />
            <StatsCards
              totalDocs={documents.length}
              familyMembers={0}
              secureNotes={0}
            />
            <DocumentModel
              document={selectedDocument}
              onClose={() => setSelectedDocument(null)}
            />
            <UploadDocModel
              isOpen={isUploadOpen}
              onClose={() => setIsUploadOpen(false)}
              onSuccess={(newDoc) => {
                setDocuments((prev) => [newDoc, ...prev]);
              }}
            />
            <RecentDocuments
              documents={documents}
              search={search}
              onView={setSelectedDocument}
            />
            <DocumentViewer
              document={selectedDocument}
              onClose={() => setSelectedDocument(null)}
              onDelete={(id) => {
                setDocuments((prev) => prev.filter((doc) => doc._id !== id));
                setSelectedDocument(null);
              }}
              onUpdate={(updated) => {
                setDocuments((prev) =>
                  prev.map((d) => (d._id === updated._id ? updated : d))
                );
                setSelectedDocument(updated);
              }}
            />
          </div>
        )}

        {activeTab === "notes" && (
          <h1 className="text-3xl font-bold">Secure Notes</h1>
        )}

        {activeTab === "tools" && (
          <h1 className="text-3xl font-bold">PDF Tools</h1>
        )}

        {activeTab === "settings" && (
          <h1 className="text-3xl font-bold">Working On It </h1>
        )}

        {activeTab === "family" && (
          <>
            <Family
              members={members}
              onAddClick={() => setIsAddOpen(true)}
              onDelete={(id) => {
                setMembers((prev) =>
                  prev.filter((m) => m._id !== id)
                );
              }}
            />

            <AddMemberModel
              isOpen={isAddOpen}
              onClose={() => setIsAddOpen(false)}
              memberCount={members.length}
              onSuccess={(newMember) => {
                setMembers((prev) => [...prev, newMember]);
              }}
            />
          </>
        )}

      </main>
    </div>
  );
}