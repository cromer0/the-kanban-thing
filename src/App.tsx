import { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  closestCorners,
} from '@dnd-kit/core';
import { FileUpload } from './components/FileUpload';
import { KanbanColumn } from './components/KanbanColumn';
import { VehicleManager } from './components/VehicleManager';
import { Service, Vehicle, Column } from './types';
import { ServiceCard } from './components/ServiceCard';

function App() {
  const [columns, setColumns] = useState<Column[]>([
    { id: 'unassigned', title: 'Sin asignar', services: [] },
  ]);
  const [activeService, setActiveService] = useState<Service | null>(null);

  const handleServicesUploaded = (services: Service[]) => {
    setColumns(cols => cols.map(col => 
      col.id === 'unassigned' 
        ? { ...col, services: [...col.services, ...services] }
        : col
    ));
  };

  const handleVehicleAdded = (vehicle: Vehicle) => {
    setColumns(cols => [
      ...cols,
      { id: vehicle.id, title: vehicle.name, services: [] }
    ]);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const activeColumn = columns.find(col => 
      col.services.some(service => service.id === event.active.id)
    );
    const activeService = activeColumn?.services.find(
      service => service.id === event.active.id
    );
    if (activeService) {
      setActiveService(activeService);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || !active) {
      setActiveService(null);
      return;
    }

    const activeColIndex = columns.findIndex(col => 
      col.services.some(service => service.id === active.id)
    );
    const overColIndex = columns.findIndex(col => col.id === over.id);

    if (activeColIndex !== -1 && overColIndex !== -1 && activeColIndex !== overColIndex) {
      setColumns(cols => {
        const newCols = [...cols];
        const [movedService] = newCols[activeColIndex].services.splice(
          newCols[activeColIndex].services.findIndex(s => s.id === active.id),
          1
        );
        newCols[overColIndex].services.push(movedService);
        return newCols;
      });
    }

    setActiveService(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <FileUpload onServicesUploaded={handleServicesUploaded} />
          <VehicleManager onVehicleAdded={handleVehicleAdded} />
        </div>

        <DndContext
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-6 overflow-x-auto pb-4">
            {columns.map((column) => (
              <KanbanColumn
                key={column.id}
                id={column.id}
                title={column.title}
                services={column.services}
              />
            ))}
          </div>

          <DragOverlay>
            {activeService ? (
              <div className="transform-none">
                <ServiceCard service={activeService} />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}

export default App;