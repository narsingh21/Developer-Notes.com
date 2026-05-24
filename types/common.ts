import { LucideIcon } from 'lucide-react';

export interface Tab {
  name: string;
  icon: LucideIcon;
  description: string;
  disable:boolean
  component?:React.ComponentType;
}
