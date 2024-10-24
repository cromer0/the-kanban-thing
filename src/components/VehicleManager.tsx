import { useState } from 'react';
import { Plus, Truck } from 'lucide-react';
import { Vehicle } from '../types';

interface VehicleManagerProps {
  onVehicleAdded: (vehicle: Vehicle) => void;
}

export function VehicleManager({ onVehicleAdded }: VehicleManagerProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newVehicle, setNewVehicle] = useState({ id: '', name: '', driver: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newVehicle.name && newVehicle.driver) {
      onVehicleAdded({
        ...newVehicle,
        id: `vehicle-${Date.now()}`,
      });
      setNewVehicle({ id: '', name: '', driver: '' });
      setIsAdding(false);
    }
  };

  if (!isAdding) {
    return (
      <button
        onClick={() => setIsAdding(true)}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        <Plus size={20} />
        Add Vehicle
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 text-gray-700 font-medium">
        <Truck size={20} />
        <span>New Vehicle</span>
      </div>
      
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Vehicle Identifier"
          value={newVehicle.name}
          onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        
        <input
          type="text"
          placeholder="Driver Name"
          value={newVehicle.driver}
          onChange={(e) => setNewVehicle({ ...newVehicle, driver: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
      
      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Add
        </button>
        <button
          type="button"
          onClick={() => setIsAdding(false)}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}