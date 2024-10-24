import { useDroppable } from '@dnd-kit/core';
import { Service } from '../types';
import { ServiceCard } from './ServiceCard';

interface KanbanColumnProps {
  id: string;
  title: string;
  services: Service[];
}

export function KanbanColumn({ id, title, services }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col bg-gray-100 rounded-lg p-4 w-80 min-h-[500px] ${
        isOver ? 'ring-2 ring-blue-400 ring-inset' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-700">{title}</h3>
        <span className="bg-gray-200 text-gray-600 rounded-full px-2 py-1 text-sm">
          {services.length}
        </span>
      </div>
      
      <div className="flex-1 space-y-4">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}