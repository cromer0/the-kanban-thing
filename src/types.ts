export interface Service {
  id: string;
  client: string;
  containerNumber: string;
  originDestination: string;
  equipment: string;
  stops: number;
  timestamp?: string;
}

export interface Vehicle {
  id: string;
  name: string;
  driver: string;
}

export interface Column {
  id: string;
  title: string;
  services: Service[];
}