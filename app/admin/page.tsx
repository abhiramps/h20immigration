import prisma from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { QuickActions } from "@/components/admin/QuickActions";
import { 
  HiUsers, 
  HiChartPie, 
  HiCalendar, 
  HiArrowUp 
} from "react-icons/hi";

export const dynamic = 'force-dynamic';

async function getStats() {
  const totalLeads = await prisma.lead.count();
  const newLeads = await prisma.lead.count({ where: { status: 'NEW' } });
  
  // Group by service (simplified)
  const leads = await prisma.lead.findMany();
  const servicesMap = leads.reduce((acc: any, lead) => {
    const service = lead.serviceInterest || 'Other';
    acc[service] = (acc[service] || 0) + 1;
    return acc;
  }, {});
  
  const topService = Object.entries(servicesMap).sort((a: any, b: any) => b[1] - a[1])[0]?.[0] || 'N/A';

  return { totalLeads, newLeads, topService };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const statCards = [
    { name: 'Total Leads', value: stats.totalLeads, icon: HiUsers, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Pending Leads', value: stats.newLeads, icon: HiChartPie, color: 'text-orange-600', bg: 'bg-orange-50' },
    { name: 'Top Service', value: stats.topService, icon: HiArrowUp, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 font-heading">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome back, Administrator.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.name} className="p-6 border-none shadow-sm flex items-center space-x-4">
            <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Lead Status Breakdown</h3>
          <div className="space-y-4">
             {/* Placeholder for real charts later */}
             <p className="text-gray-400 italic">Chart visualization coming soon...</p>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
          <QuickActions />
        </Card>
      </div>
    </div>
  );
}
