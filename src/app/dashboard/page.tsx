"use client";

import { motion } from "framer-motion";
import { Activity, Calendar, FileText, Pill, Bell, Plus, X } from "lucide-react";
import { ActionCard } from "@/components/ui/ActionCard";
import { Button } from "@/components/ui/Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [vitals, setVitals] = useState<any>(null);
  const [loadingVitals, setLoadingVitals] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchVitals();
    }
  }, [status]);

  const fetchVitals = async () => {
    try {
      const res = await fetch("/api/vitals");
      if (res.ok) {
        const data = await res.json();
        setVitals(data);
      }
    } catch (error) {
      console.error("Failed to fetch vitals", error);
    } finally {
      setLoadingVitals(false);
    }
  };

  const handleAddVitals = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const res = await fetch("/api/vitals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bloodPressure: formData.get("bloodPressure"),
          heartRate: formData.get("heartRate"),
          weight: formData.get("weight"),
        }),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchVitals(); // Refresh vitals
      }
    } catch (error) {
      console.error("Failed to add vitals", error);
    }
  };

  if (status === "loading") {
    return <div className="flex-1 flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!session) return null;

  const initials = session.user?.name ? session.user.name.substring(0, 2).toUpperCase() : "U";

  return (
    <div className="flex flex-col flex-1 pb-24 pt-6 px-4 bg-surface min-h-screen relative">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-2xl font-bold text-on-surface">Good Morning,</h1>
          <p className="text-xl text-primary font-semibold">{session.user?.name}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" size="icon" className="rounded-full bg-surface-container">
            <Bell className="w-6 h-6 text-on-surface" />
          </Button>
          <div className="w-14 h-14 rounded-full bg-primary-container flex items-center justify-center text-white font-bold text-xl">
            {initials}
          </div>
        </div>
      </motion.div>

      {/* Vitals Summary */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-primary text-white p-6 rounded-2xl mb-8 shadow-md relative overflow-hidden"
      >
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex items-center gap-3">
            <Activity className="w-6 h-6" />
            <h2 className="text-lg font-semibold">Recent Vitals</h2>
          </div>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full h-8 w-8" onClick={() => setIsModalOpen(true)}>
            <Plus className="w-5 h-5" />
          </Button>
        </div>
        
        {loadingVitals ? (
           <p className="text-white/80 text-sm">Loading your vitals...</p>
        ) : vitals ? (
          <>
            <div className="flex justify-between items-end relative z-10">
              <div>
                <p className="text-white/80 text-sm mb-1">Blood Pressure</p>
                <p className="text-3xl font-bold">{vitals.bloodPressure || "--/--"} <span className="text-base font-normal opacity-80">mmHg</span></p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/20 flex justify-between relative z-10">
              <div>
                <p className="text-white/80 text-xs">Heart Rate</p>
                <p className="font-semibold">{vitals.heartRate ? `${vitals.heartRate} bpm` : "-- bpm"}</p>
              </div>
              <div>
                <p className="text-white/80 text-xs">Weight</p>
                <p className="font-semibold">{vitals.weight ? `${vitals.weight} lbs` : "-- lbs"}</p>
              </div>
            </div>
          </>
        ) : (
          <div className="relative z-10">
             <p className="text-white/80 text-sm mb-4">No health data recorded yet.</p>
             <Button variant="outline" className="bg-white/20 text-white border-transparent hover:bg-white/30" onClick={() => setIsModalOpen(true)}>
               Add Your Vitals
             </Button>
          </div>
        )}
      </motion.div>

      {/* Quick Actions */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-on-surface mb-4">Quick Actions</h2>
        <div className="flex flex-col gap-3">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <ActionCard
              icon={<Pill className="text-secondary" />}
              title="My Medication"
              subtitle="Manage your daily prescriptions"
              variant="neutral"
              href="/medicines"
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <ActionCard
              icon={<Calendar className="text-primary" />}
              title="Appointments"
              subtitle="Schedule and view appointments"
              variant="neutral"
              href="/calendar"
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <ActionCard
              icon={<FileText className="text-on-surface-variant" />}
              title="Health Reports"
              subtitle="Upload and view your medical reports"
              variant="neutral"
              href="/reports"
            />
          </motion.div>
        </div>
      </div>

      {/* Add Vitals Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface w-full max-w-sm p-6 rounded-3xl shadow-xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-on-surface">Record Vitals</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5 text-on-surface-variant" />
              </Button>
            </div>

            <form onSubmit={handleAddVitals} className="flex flex-col gap-4">
              <Input name="bloodPressure" label="Blood Pressure (e.g. 120/80)" placeholder="120/80" />
              <Input name="heartRate" type="number" label="Heart Rate (bpm)" placeholder="72" />
              <Input name="weight" type="number" step="0.1" label="Weight (lbs)" placeholder="145" />
              
              <Button type="submit" className="w-full mt-2">
                Save Vitals
              </Button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
