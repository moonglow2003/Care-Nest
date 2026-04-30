"use client";

import { motion } from "framer-motion";
import { User, Bell, Shield, CircleHelp, LogOut } from "lucide-react";
import { ActionCard } from "@/components/ui/ActionCard";
import { useSession, signOut } from "next-auth/react";

export default function SettingsPage() {
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  const initials = session?.user?.name ? session.user.name.substring(0, 2).toUpperCase() : "U";

  return (
    <div
      className="flex flex-col flex-1 pb-24 pt-6 px-4 min-h-screen
      bg-[var(--color-background)] text-[var(--color-on-background)]"
    >
      <h1 className="text-2xl font-bold text-[var(--color-on-surface)] mb-6">
        Settings
      </h1>

      {/* Profile Card */}
      <div
        className="p-6 rounded-2xl flex items-center gap-4 mb-8 shadow-md
        bg-[var(--color-primary)] text-white"
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center
          bg-white text-[var(--color-primary)] font-bold text-2xl shadow-inner"
        >
          {initials}
        </div>

        <div>
          <h2 className="text-xl font-bold">{session?.user?.name || "User"}</h2>
          <p className="text-white/80 text-sm">
            {session?.user?.email || ""}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3">

        {/* Account */}
        <h3 className="text-sm font-bold uppercase tracking-wider mb-1 px-2
        text-[var(--color-outline)]">
          Account
        </h3>

        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <ActionCard
            icon={<User className="text-[var(--color-primary)]" />}
            title="Personal Information"
            variant="neutral"
          />
        </motion.div>

        {/* Preferences */}
        <h3 className="text-sm font-bold uppercase tracking-wider mb-1 mt-4 px-2
        text-[var(--color-outline)]">
          Preferences
        </h3>

        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <ActionCard
            icon={<Bell className="text-[var(--color-secondary)]" />}
            title="Notifications"
            variant="neutral"
          />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <ActionCard
            icon={<Shield className="text-[var(--color-primary)]" />}
            title="Privacy & Security"
            variant="neutral"
          />
        </motion.div>

        {/* Support */}
        <h3 className="text-sm font-bold uppercase tracking-wider mb-1 mt-4 px-2
        text-[var(--color-outline)]">
          Support
        </h3>

        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <ActionCard
            icon={<CircleHelp className="text-[var(--color-on-surface-variant)]" />}
            title="Help Center"
            variant="neutral"
          />
        </motion.div>

        {/* Logout */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 p-4 font-bold rounded-2xl border-2 transition-colors
            text-[var(--color-error)] border-[var(--color-error)]/20 hover:bg-[var(--color-error)]/10"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </motion.div>

      </div>
    </div>
  );
}