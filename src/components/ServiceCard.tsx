import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description: string;
  action: string;
  url: string;
  icon: LucideIcon;
  color: string;
  index: number;
}

const MotionLink = motion(Link);

export const ServiceCard = ({ title, description, action, url, icon: Icon, color, index }: ServiceCardProps) => {
  return (
    <MotionLink
      to={url}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group relative p-8 rounded-4xl glass overflow-hidden cursor-pointer"
    >
      {/* Hover Background Glow */}
      <div 
        className={cn(
          "absolute -inset-10 opacity-0 group-hover:opacity-20 blur-[50px] transition-opacity duration-500 rounded-full",
          color
        )} 
      />
      
      <div className="relative z-10">
        <div className={cn(
          "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500",
          "bg-white/5 border border-white/10"
        )}>
          <Icon className="w-8 h-8 text-white transition-colors group-hover:text-brand-primary" />
        </div>
        
        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-brand-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-slate-400 leading-relaxed mb-6">
          {description}
        </p>
        
        <div className="flex items-center gap-2 text-sm font-bold text-slate-500 group-hover:text-white transition-colors">
          {action}
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            →
          </motion.span>
        </div>
      </div>
      
      {/* Animated Border */}
      <div className="absolute inset-0 border border-white/5 group-hover:border-brand-primary/30 rounded-4xl transition-colors duration-500" />
    </MotionLink>
  );
};
