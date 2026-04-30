"use client";

import { motion } from "framer-motion";
import { Pill, Plus, CheckCircle2, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";

export default function MedicinesPage() {
  const { status } = useSession();
  const router = useRouter();
  const [medicines, setMedicines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchMedicines();
    }
  }, [status]);

  const fetchMedicines = async () => {
    try {
      const res = await fetch("/api/medicines");
      if (res.ok) {
        const data = await res.json();
        setMedicines(data);
      }
    } catch (error) {
      console.error("Failed to fetch medicines", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMedicine = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const res = await fetch("/api/medicines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          dosage: formData.get("dosage"),
          time: formData.get("time"),
        }),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchMedicines();
      }
    } catch (error) {
      console.error("Failed to add medicine", error);
    }
  };

  const handleTakeMedicine = async (id: string) => {
    try {
      const res = await fetch("/api/medicines", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, taken: true }),
      });

      if (res.ok) {
        fetchMedicines();
      }
    } catch (error) {
      console.error("Failed to update medicine", error);
    }
  };

  if (status === "loading" || loading) {
    return <div className="flex-1 flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col flex-1 pb-24 pt-6 px-4 bg-surface min-h-screen relative">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-on-surface">Medicines</h1>
        <Button variant="primary" size="icon" className="rounded-full w-12 h-12" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-6 h-6" />
        </Button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
        {["Today", "Tomorrow", "Next Week"].map((day, i) => (
          <div
            key={day}
            className={`flex-shrink-0 px-6 py-3 rounded-xl border font-semibold text-center whitespace-nowrap cursor-pointer transition-colors ${
              i === 0
                ? "bg-primary text-white border-primary"
                : "bg-surface-container border-outline-variant text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 mt-2">
        {medicines.length === 0 ? (
          <p className="text-on-surface-variant text-center mt-10">No medicines added yet.</p>
        ) : (
          medicines.map((med, index) => (
            <motion.div
              key={med.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-5 rounded-2xl border flex items-center justify-between transition-colors ${
                med.taken
                  ? "bg-secondary/10 border-secondary-container"
                  : "bg-surface-container border-outline-variant"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    med.taken ? "bg-secondary text-white" : "bg-primary/10 text-primary"
                  }`}
                >
                  {med.taken ? <CheckCircle2 className="w-6 h-6" /> : <Pill className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className={`font-semibold text-lg ${med.taken ? "text-secondary line-through opacity-70" : "text-on-surface"}`}>
                    {med.name}
                  </h3>
                  <p className="text-sm text-on-surface-variant flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {med.time} • {med.dosage}
                  </p>
                </div>
              </div>
              
              {!med.taken && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full px-4 h-10 border-primary text-primary"
                  onClick={() => handleTakeMedicine(med.id)}
                >
                  Take
                </Button>
              )}
            </motion.div>
          ))
        )}
      </div>

      {/* Add Medicine Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface w-full max-w-sm p-6 rounded-3xl shadow-xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-on-surface">Add Medicine</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5 text-on-surface-variant" />
              </Button>
            </div>

            <form onSubmit={handleAddMedicine} className="flex flex-col gap-4">
              <Input name="name" label="Medicine Name" placeholder="e.g. Lisinopril" required />
              <Input name="dosage" label="Dosage" placeholder="e.g. 10mg" required />
              <Input name="time" type="time" label="Time" required />
              
              <Button type="submit" className="w-full mt-2">
                Save Medicine
              </Button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
