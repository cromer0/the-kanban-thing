import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Clock, MapPin, Truck, Users } from 'lucide-react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: service.id,
    data: service,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 space-y-3 cursor-grab active:cursor-grabbing"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-blue-600">{service.client}</span>
        <div className="flex items-center gap-1 text-gray-500">
          <Clock size={14} />
          <span className="text-xs">{new Date(service.timestamp || '').toLocaleTimeString()}</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <MapPin size={16} className="text-gray-400 mt-1 flex-shrink-0" />
          <div className="text-sm">
            <div className="font-medium">{service.containerNumber}</div>
            <div className="text-gray-500">{service.originDestination}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Truck size={16} className="text-gray-400" />
          <span className="text-sm text-gray-600">{service.equipment}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Users size={16} className="text-gray-400" />
          <span className="text-sm text-gray-600">{service.stops} stops</span>
        </div>
      </div>
    </div>
  );
}