import {
  Leaf,
  Truck,
  ShieldCheck,
  Users,
  Star,
  Clock,
  FileText,
  HardHat,
  CalendarDays,
  Heart,
  Medal,
  Factory,
  Landmark,
  Sparkles,
  CreditCard,
  ChevronRight,
  ArrowRight,
  Plus,
  Minus,
  Menu,
  X,
  Phone,
  MessageCircle,
  Check,
  Mail,
  ChevronLeft,
  ChevronDown,
  MapPin,
  type LucideIcon,
} from "lucide-react";

const REGISTRY: Record<string, LucideIcon> = {
  leaf: Leaf,
  truck: Truck,
  "shield-check": ShieldCheck,
  users: Users,
  star: Star,
  clock: Clock,
  "file-text": FileText,
  "hard-hat": HardHat,
  "calendar-days": CalendarDays,
  heart: Heart,
  medal: Medal,
  factory: Factory,
  landmark: Landmark,
  sparkles: Sparkles,
  "credit-card": CreditCard,
  "chevron-right": ChevronRight,
  "arrow-right": ArrowRight,
  plus: Plus,
  minus: Minus,
  menu: Menu,
  x: X,
  phone: Phone,
  "message-circle": MessageCircle,
  check: Check,
  mail: Mail,
  "chevron-left": ChevronLeft,
  "chevron-down": ChevronDown,
  "map-pin": MapPin,
};

export function Icon({
  name,
  size = 20,
  strokeWidth = 1.9,
  className,
}: {
  name: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  const Cmp = REGISTRY[name] ?? FileText;
  return <Cmp size={size} strokeWidth={strokeWidth} className={className} aria-hidden="true" />;
}
