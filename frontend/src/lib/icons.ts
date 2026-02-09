import { 
   Layout, 
   Smartphone, 
   Search, 
   Monitor, 
   Code2, 
   Database, 
   Shield, 
   Globe, 
   ShoppingCart, 
   CalendarRange, 
   Building2,
   Zap,
   Star,
   Palette,
   CreditCard,
   Truck,
   Package,
   User,
   Calendar,
   Bell,
   ShieldCheck,
   MessageSquare,
   RefreshCw,
   Activity,
   Eye,
   MousePointer,
   Layers,
   Award,
   Feather
} from 'lucide-react';

const ICON_MAP: Record<string, any> = {
   'layout': Layout,
   'building-2': Building2,
   'shopping-cart': ShoppingCart,
   'smartphone': Smartphone,
   'calendar-range': CalendarRange,
   'search': Search,
   'database': Database,
   'shield': Shield,
   'globe': Globe,
   'monitor': Monitor,
   'code-2': Code2,
   'zap': Zap,
   'star': Star,
   'palette': Palette,
   'credit-card': CreditCard,
   'truck': Truck,
   'package': Package,
   'user': User,
   'calendar': Calendar,
   'bell': Bell,
   'shield-check': ShieldCheck,
   'message-square': MessageSquare,
   'refresh-cw': RefreshCw,
   'activity': Activity,
   'eye': Eye,
   'mouse-pointer': MousePointer,
   'layers': Layers,
   'award': Award,
   'feather': Feather,
};

export const getIconByName = (name: string) => {
   return ICON_MAP[name] || null;
};

export const getServiceIcon = (name: string, iconName?: string) => {
   if (iconName && ICON_MAP[iconName]) return ICON_MAP[iconName];
   
   const low = (name || '').toLowerCase();
   
   if (low.includes('web profil') || low.includes('company profile')) return Building2;
   if (low.includes('toko online') || low.includes('e-commerce') || low.includes('shop')) return ShoppingCart;
   if (low.includes('booking') || low.includes('reservasi')) return CalendarRange;
   if (low.includes('mobile') || low.includes('app') || low.includes('android') || low.includes('ios')) return Smartphone;
   if (low.includes('web')) return Layout;
   if (low.includes('design') || low.includes('ui')) return Monitor;
   if (low.includes('marketing') || low.includes('seo')) return Search;
   if (low.includes('system') || low.includes('informasi')) return Database;
   if (low.includes('security') || low.includes('keamanan')) return Shield;
   if (low.includes('cloud') || low.includes('hosting')) return Globe;
   
   return Code2;
};
