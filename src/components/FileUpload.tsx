import React, { useCallback } from 'react';
import { Upload, FileDown } from 'lucide-react';
import * as XLSX from 'xlsx';
import { Service } from '../types';

interface FileUploadProps {
  onServicesUploaded: (services: Service[]) => void;
}

export function FileUpload({ onServicesUploaded }: FileUploadProps) {
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const services: Service[] = jsonData.map((row: any, index) => ({
        id: row.ID || `service-${index}`,
        client: row.Cliente || '',
        containerNumber: row['Nº de Contenedor / Plancha / Pallet'] || '',
        originDestination: row['Origen - Destino'] || '',
        equipment: row.Equipo || '',
        stops: parseInt(row['Nº Paradas']) || 0,
        timestamp: new Date().toISOString(),
      }));

      onServicesUploaded(services);
    };
    reader.readAsBinaryString(file);
  }, [onServicesUploaded]);

  const downloadSample = () => {
    const sampleData = [
      {
        'ID': 'SRV001',
        'Cliente': 'Logistics Corp',
        'Nº de Contenedor / Plancha / Pallet': 'CONT123456',
        'Origen - Destino': 'Puerto A - Almacén Central',
        'Equipo': '40ft Container',
        'Nº Paradas': 2
      },
      {
        'ID': 'SRV002',
        'Cliente': 'Global Shipping',
        'Nº de Contenedor / Plancha / Pallet': 'CONT789012',
        'Origen - Destino': 'Terminal B - Centro Distribución',
        'Equipo': '20ft Container',
        'Nº Paradas': 3
      },
      {
        'ID': 'SRV003',
        'Cliente': 'Fast Freight',
        'Nº de Contenedor / Plancha / Pallet': 'PLT345678',
        'Origen - Destino': 'Almacén Sur - Puerto Principal',
        'Equipo': 'Flatbed',
        'Nº Paradas': 1
      }
    ];

    const ws = XLSX.utils.json_to_sheet(sampleData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Services');
    XLSX.writeFile(wb, 'sample-services.xlsx');
  };

  return (
    <div className="p-4 space-y-2">
      <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer w-fit">
        <Upload size={20} />
        <span>Upload XLSX</span>
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileUpload}
          className="hidden"
        />
      </label>
      
      <button
        onClick={downloadSample}
        className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 w-fit"
      >
        <FileDown size={20} />
        <span>Download Sample</span>
      </button>
    </div>
  );
}