"use client";

import { Users, BookOpen, Clock, CheckCircle, ListChecks } from "lucide-react";
import { useEffect, useState } from "react";

interface DashboardData {
  totalUsers: number;
  activeReservations: number;
  completedReservations: number;
  availableBooks: number;
  recentActivities: {
    type: "reserve" | "create" | "update";
    message: string;
  }[];
}

interface ReservationData {
  id: number;
  user: { id: number; name: string; username: string };
  product: { id: number; title: string };
  reserved_at: string;
  reserved_until: string;
  status: string;
  created_by: number;
  created_at: string;
  updated_at: string;
}

const EMPTY_DASHBOARD: DashboardData = {
  totalUsers: 0,
  activeReservations: 0,
  completedReservations: 0,
  availableBooks: 0,
  recentActivities: [],
};

export default function DashboardPanel() {
  const [data, setData] = useState<DashboardData>(EMPTY_DASHBOARD);
  const [loading, setLoading] = useState(true);

  const [reservations, setReservations] = useState<ReservationData[]>([]);
  const [showReservations, setShowReservations] = useState(false);

  // ---------------------- Fetch Dashboard ----------------------
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/dashboard`, {
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to fetch dashboard");

        const json = await res.json();

        setData({
          totalUsers: json.totalUsers ?? 0,
          activeReservations: json.activeReservations ?? 0,
          completedReservations: json.completedReservations ?? 0,
          availableBooks: json.availableBooks ?? 0,
          recentActivities: Array.isArray(json.recentActivities)
            ? json.recentActivities
            : [],
        });
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

 
  const fetchReservations = async () => {
    try {
      const res = await fetch("http://localhost:3001/admin/reservations", {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to fetch reservations");

      const json = await res.json();
      setReservations(json);
      setShowReservations(true);
    } catch (err) {
      console.error("Failed to fetch reservations", err);
    }
  };

  if (loading) {
    return <p className="p-6">Loading dashboard...</p>;
  }

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Dashboard Overview
      </h1>

      {/* ---- Stats Cards ---- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard
          icon={<Users size={38} className="text-indigo-600" />}
          label="Total Users"
          value={data.totalUsers}
          border="border-indigo-500"
        />
        <StatCard
          icon={<Clock size={38} className="text-blue-600" />}
          label="Active Reservations"
          value={data.activeReservations}
          border="border-blue-500"
        />
        <StatCard
          icon={<CheckCircle size={38} className="text-purple-600" />}
          label="Completed"
          value={data.completedReservations}
          border="border-purple-500"
        />
        <StatCard
          icon={<BookOpen size={38} className="text-pink-600" />}
          label="Books Available"
          value={data.availableBooks}
          border="border-pink-500"
        />
      </div>

      {/* ---- Bottom Section ---- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activities */}
        <div className="bg-white shadow-md rounded-2xl p-6 lg:col-span-2">
          <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
          <div className="h-72 overflow-y-auto pr-3 space-y-4">
            {data.recentActivities.length === 0 ? (
              <p className="text-gray-500 text-sm">No recent activity</p>
            ) : (
              data.recentActivities.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-xl transition"
                >
                  <span className="w-3 h-3 bg-indigo-500 rounded-full mt-2"></span>
                  <p className="text-gray-700">{item.message}</p>
                </div>
              ))
            )}
          </div>
        </div>


        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>

          <button
            className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition"
            onClick={fetchReservations}
          >
            <ListChecks size={20} />
            View Reservations
          </button>

          {showReservations && (
            <div className="mt-6 max-h-96 overflow-y-auto space-y-3">
              {reservations.length === 0 ? (
                <p className="text-gray-500 text-sm">No reservations found</p>
              ) : (
                reservations.map((r) => (
                  <div
                    key={r.id}
                    className="p-3 border rounded-lg hover:bg-gray-50 transition"
                  >
                    <p>
                      <b>{r.user.name}</b> reserved <b>{r.product.title}</b>
                    </p>
                    <p>Status: {r.status}</p>
                    <p>
                      From: {new Date(r.reserved_at).toLocaleString()} To:{" "}
                      {new Date(r.reserved_until).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


function StatCard({
  icon,
  label,
  value,
  border,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  border: string;
}) {
  return (
    <div
      className={`bg-white shadow-md rounded-2xl p-6 border-l-4 ${border} flex items-center gap-4`}
    >
      {icon}
      <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <h2 className="text-3xl font-bold">{value}</h2>
      </div>
    </div>
  );
}
