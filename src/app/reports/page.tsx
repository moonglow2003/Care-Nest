"use client";

import { motion } from "framer-motion";
import { FileText, Download, Filter, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";

export default function ReportsPage() {
  const { status } = useSession();
  const router = useRouter();
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchReports();
    }
  }, [status]);

  const fetchReports = async () => {
    try {
      const res = await fetch("/api/reports");
      if (res.ok) {
        const data = await res.json();
        setReports(data);
      }
    } catch (error) {
      console.error("Failed to fetch reports", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddReport = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.get("title"),
          date: formData.get("date"),
          doctor: formData.get("doctor"),
        }),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchReports();
      }
    } catch (error) {
      console.error("Failed to add report", error);
    }
  };

  if (status === "loading" || loading) {
    return <div className="flex-1 flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col flex-1 pb-24 pt-6 px-4 bg-surface min-h-screen relative">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-on-surface">Medical Reports</h1>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Filter className="w-6 h-6 text-on-surface-variant" />
          </Button>
          <Button variant="primary" size="icon" className="rounded-full w-10 h-10" onClick={() => setIsModalOpen(true)}>
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {reports.length === 0 ? (
           <p className="text-on-surface-variant text-center mt-10">No reports found.</p>
        ) : (
          reports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-surface-container p-5 rounded-2xl border border-outline-variant flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg text-on-surface">{report.title}</h3>
                    {report.status === "New" && (
                      <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-on-surface-variant">{report.date} {report.doctor && `• ${report.doctor}`}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10 rounded-full h-10 w-10">
                <Download className="w-5 h-5" />
              </Button>
            </motion.div>
          ))
        )}
      </div>

      {/* Add Report Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface w-full max-w-sm p-6 rounded-3xl shadow-xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-on-surface">Upload Report</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5 text-on-surface-variant" />
              </Button>
            </div>

            <form onSubmit={handleAddReport} className="flex flex-col gap-4">
              <Input name="title" label="Report Title" placeholder="e.g. Blood Test" required />
              <Input name="date" type="date" label="Date" required />
              <Input name="doctor" label="Doctor Name" placeholder="e.g. Dr. Smith" />
              
              <Button type="submit" className="w-full mt-2">
                Save Report Info
              </Button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
