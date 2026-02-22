"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  HiChartBar, 
  HiUsers, 
  HiCog, 
  HiLogout, 
  HiHome 
} from "react-icons/hi";

const menuItems = [
  { name: "Overview", href: "/admin", icon: HiChartBar },
  { name: "Leads", href: "/admin/leads", icon: HiUsers },
  { name: "Settings", href: "/admin/settings", icon: HiCog },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-primary text-white flex flex-col h-screen fixed left-0 top-0">
      <div className="p-6 border-b border-white/10">
        <Link href="/admin" className="text-2xl font-bold font-heading text-white block">
          H2O<span className="text-accent">Admin</span>
        </Link>
      </div>

      <nav className="flex-grow p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 p-3 rounded-lg transition-colors font-medium",
                isActive 
                  ? "bg-accent text-white" 
                  : "hover:bg-white/10 text-white/80"
              )}
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-2">
        <Link 
          href="/" 
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 text-white/80 transition-colors"
        >
          <HiHome size={20} />
          <span>Public Site</span>
        </Link>
        <button 
          className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-red-500/20 text-red-200 transition-colors"
          onClick={async () => {
             // Basic logout by deleting cookie client-side or calling an API
             document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
             window.location.href = "/admin/login";
          }}
        >
          <HiLogout size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
