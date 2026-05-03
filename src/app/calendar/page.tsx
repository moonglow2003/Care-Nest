"use client";

import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Clock, MapPin, Video, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";

export default function CalendarPage() {
  const { status } = useSession();
  const router = useRouter();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchAppointments();
    }
  }, [status]);

  const fetchAppointments = async () => {
    try {
      const res = await fetch("/api/appointments");
      if (res.ok) {
        const data = await res.json();
        setAppointments(data);
      }
    } catch (error) {
      console.error("Failed to fetch appointments", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorName: formData.get("doctorName"),
          date: formData.get("date"),
          time: formData.get("time"),
        }),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchAppointments();
      }
    } catch (error) {
      console.error("Failed to book appointment", error);
    }
  };

  if (status === "loading" || loading) {
    return <div className="flex-1 flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col flex-1 pb-24 pt-6 px-4 bg-surface min-h-screen relative">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-on-surface">Appointments</h1>
        <Button variant="outline" size="sm" className="rounded-full" onClick={() => setIsModalOpen(true)}>
          Book New
        </Button>
      </div>

      {/* Simple Custom Calendar View Mockup */}
      <div className="bg-surface-container rounded-2xl p-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">October 2023</h2>
          <div className="flex gap-2">
            <span className="w-8 h-8 rounded-full flex items-center justify-center bg-white text-primary text-sm font-bold shadow-sm">&lt;</span>
            <span className="w-8 h-8 rounded-full flex items-center justify-center bg-white text-primary text-sm font-bold shadow-sm">&gt;</span>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-on-surface-variant mb-2">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <div key={i}>{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-sm">
          {Array.from({ length: 31 }).map((_, i) => {
            const day = i + 1;
            const isToday = day === 12;
            const hasAppt = day === 13 || day === 24;
            return (
              <div
                key={day}
                className={`w-10 h-10 mx-auto rounded-full flex flex-col items-center justify-center relative ${
                  isToday ? "bg-primary text-white font-bold" : "text-on-surface"
                }`}
              >
                {day}
                {hasAppt && !isToday && <div className="w-1.5 h-1.5 bg-secondary rounded-full absolute bottom-1" />}
              </div>
            );
          })}
        </div>
      </div>

      <h2 className="text-lg font-semibold text-on-surface mb-4">Upcoming</h2>
      
      <div className="flex flex-col gap-4">
        {appointments.length === 0 ? (
           <p className="text-on-surface-variant text-center mt-4">No upcoming appointments.</p>
        ) : (
          appointments.map((appt, index) => (
            <motion.div
              key={appt.email}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-surface border-2 border-primary/20 rounded-2xl p-5 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg text-on-surface">{appt.doctorName}</h3>
                  <p className="text-on-surface-variant text-sm">Appointment</p>
                </div>
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
                  {appt.date}
                </div>
              </div>
              
              <div className="flex flex-col gap-2 mb-4 text-sm text-on-surface-variant">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{appt.time}</span>
                </div>
              </div>
  
              <div className="flex gap-2">
                <Button variant="primary" className="flex-1 h-12 text-base rounded-xl">
                  View Details
                </Button>
                <Button variant="outline" className="flex-1 h-12 text-base rounded-xl">
                  Reschedule
                </Button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Book Appointment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface w-full max-w-sm p-6 rounded-3xl shadow-xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-on-surface">Book Appointment</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5 text-on-surface-variant" />
              </Button>
            </div>

            <form onSubmit={handleBookAppointment} className="flex flex-col gap-4">
              <Input name="doctorName" label="Doctor Name" placeholder="e.g. Dr. Sarah Smith" required />
              <Input name="date" type="date" label="Date" required />
              <Input name="time" type="time" label="Time" required />
              
              <Button type="submit" className="w-full mt-2">
                Book
              </Button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
