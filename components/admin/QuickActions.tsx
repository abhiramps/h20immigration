"use client";

import { HiDownload } from "react-icons/hi";
import * as XLSX from 'xlsx';

export const QuickActions = () => {
  const exportData = async (format: 'csv' | 'xlsx') => {
    try {
      const res = await fetch('/api/admin/leads');
      const leads = await res.json();
      
      const dataToExport = leads.map((lead: any) => ({
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
        XLSX.writeFile(workbook, `H2O_Leads_${new Date().toISOString().split('T')[0]}.csv`, { bookType: 'csv' });
      } else {
        XLSX.writeFile(workbook, `H2O_Leads_${new Date().toISOString().split('T')[0]}.xlsx`);
      }
    } catch (error) {
      console.error('Failed to export leads', error);
      alert('Failed to export leads. Please try again.');
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <button 
        onClick={() => exportData('csv')}
        className="p-4 bg-gray-50 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex flex-col items-center justify-center gap-2"
      >
        <HiDownload className="text-gray-400" />
        Export CSV
      </button>
      <button 
        onClick={() => exportData('xlsx')}
        className="p-4 bg-gray-50 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex flex-col items-center justify-center gap-2"
      >
        <HiDownload className="text-gray-400" />
        Export Excel
      </button>
    </div>
  );
};
