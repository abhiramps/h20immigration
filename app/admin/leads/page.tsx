"use client";

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { HiTrash, HiCheck, HiPhone, HiMail, HiDownload } from 'react-icons/hi';
import { cn } from '@/lib/utils';
import * as XLSX from 'xlsx';

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  serviceInterest: string;
  status: string;
  createdAt: string;
}

const STATUS_OPTIONS = ['NEW', 'CONTACTED', 'FOLLOW_UP', 'CLOSED'];

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/admin/leads');
      const data = await res.json();
      setLeads(data);
    } catch (error) {
      console.error('Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      fetchLeads();
    } catch (error) {
      console.error('Failed to update status');
    }
  };

  const deleteLead = async (id: number) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    try {
      await fetch(`/api/admin/leads?id=${id}`, { method: 'DELETE' });
      fetchLeads();
    } catch (error) {
      console.error('Failed to delete lead');
    }
  };

  const exportData = (format: 'csv' | 'xlsx') => {
    const dataToExport = leads.map(lead => ({
      Date: new Date(lead.createdAt).toLocaleDateString(),
      Name: lead.name,
      Email: lead.email,
      Phone: lead.phone,
      Service: lead.serviceInterest,
      Status: lead.status
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");

    if (format === 'csv') {
      XLSX.writeFile(workbook, `H20_Leads_${new Date().toISOString().split('T')[0]}.csv`, { bookType: 'csv' });
    } else {
      XLSX.writeFile(workbook, `H20_Leads_${new Date().toISOString().split('T')[0]}.xlsx`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-heading">Lead Management</h1>
          <p className="text-gray-500">View and manage all incoming enquiries.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100 mr-2">
             <span className="text-sm font-medium px-3 text-gray-600">Total: {leads.length}</span>
          </div>
          <button 
            onClick={() => exportData('csv')}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <HiDownload className="text-gray-400" />
            Export CSV
          </button>
          <button 
            onClick={() => exportData('xlsx')}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
          >
            <HiDownload className="text-white/80" />
            Export Excel
          </button>
        </div>
      </div>

      <Card className="overflow-hidden border-none shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Interest</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400">Loading leads...</td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400">No leads found.</td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900">{lead.name}</span>
                        <div className="flex items-center space-x-3 mt-1 text-xs text-gray-500">
                           <a href={`mailto:${lead.email}`} className="flex items-center hover:text-primary">
                             <HiMail className="mr-1" /> {lead.email}
                           </a>
                           <a href={`tel:${lead.phone}`} className="flex items-center hover:text-primary">
                             <HiPhone className="mr-1" /> {lead.phone}
                           </a>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full">
                        {lead.serviceInterest}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={lead.status}
                        onChange={(e) => updateStatus(lead.id, e.target.value)}
                        className={cn(
                          "text-xs font-bold rounded-lg px-2 py-1 outline-none border-none",
                          lead.status === 'NEW' ? "bg-orange-100 text-orange-700" :
                          lead.status === 'CLOSED' ? "bg-green-100 text-green-700" :
                          "bg-blue-100 text-blue-700"
                        )}
                      >
                        {STATUS_OPTIONS.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                       <button 
                        onClick={() => deleteLead(lead.id)}
                        className="text-red-400 hover:text-red-600 transition-colors"
                        title="Delete Lead"
                       >
                         <HiTrash size={18} />
                       </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
