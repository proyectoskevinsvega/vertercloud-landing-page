import { useState } from 'react';
import { Github, FileText, ChevronLeft, ChevronRight, MoreHorizontal, Sparkles } from 'lucide-react';
import { cn } from '../../../lib/utils';

export const VpsDashboard = () => {
  const [activeTab, setActiveTab] = useState('inicio');

  const tabs = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'dns', label: 'DNS secundario' },
    { id: 'backup', label: 'Backup automatizado' },
    { id: 'discos', label: 'Discos' },
    { id: 'snapshot', label: 'Snapshot' },
  ];

  return (
    <div className="max-w-7xl mx-auto pb-12">
      {/* Header text similar to OVH */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="text-sm text-brand-primary mb-1">
            <span className="cursor-pointer hover:underline">Servidores privados virtuales (VPS)</span> 
            <span className="text-slate-400 mx-1">/</span> 
            <span className="text-slate-500">vps-vx987.vertercloud.net</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-4">
            vps verter cloud
          </h2>
          <p className="text-sm text-slate-500 mt-1 font-mono">vps-vx987.vertercloud.net</p>
        </div>
        
        <div className="flex items-center gap-4 text-sm font-semibold text-brand-primary">
          <button className="flex items-center gap-2 hover:underline">
            <Github className="w-4 h-4" />
            Roadmap & Changelog
          </button>
          <button className="flex items-center gap-2 hover:underline">
            <FileText className="w-4 h-4" />
            Guías
          </button>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="flex items-center border-b border-slate-200 mb-6 overflow-x-auto overflow-y-hidden hide-scrollbar">
        <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 shrink-0 mr-2">
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <div className="flex gap-1 shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 py-2 text-sm font-semibold transition-colors relative whitespace-nowrap",
                activeTab === tab.id 
                  ? "text-brand-primary" 
                  : "text-slate-600 hover:text-brand-primary"
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary" />
              )}
            </button>
          ))}
        </div>

        <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 shrink-0 ml-2">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content Area */}
      {activeTab === 'inicio' && (
        <div className="relative">
          {/* Card: Su VPS */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm max-w-4xl relative overflow-hidden">
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-brand-primary to-emerald-400" />
            
            {/* Absolute sparkle button just like OVH reference */}
            <div className="absolute -right-2 top-8 w-12 h-12 bg-linear-to-b from-green-200 to-emerald-100 rounded-l-xl border border-green-300 border-r-0 flex items-center justify-center cursor-pointer hover:w-14 transition-all">
              <Sparkles className="w-5 h-5 text-emerald-600" />
            </div>

            <div className="p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-6">Su VPS</h3>
              
              <div className="space-y-6">
                {/* Row 1: Estado */}
                <div className="flex flex-col md:flex-row md:items-center justify-between py-2">
                  <div className="w-full md:w-1/3">
                    <span className="text-sm font-bold text-slate-800">Estado</span>
                  </div>
                  <div className="w-full md:w-2/3 flex items-center justify-between">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800">
                      Activo
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <hr className="border-slate-100" />

                {/* Row 2: Nombre */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-2 group">
                  <div className="w-full md:w-1/3">
                    <span className="text-sm font-bold text-slate-800">Nombre</span>
                    <p className="text-sm text-slate-500 mt-1">vps verter cloud</p>
                  </div>
                  <div className="w-full md:w-2/3 flex items-end justify-end md:items-center">
                    <button className="p-2 text-brand-primary hover:bg-brand-primary/10 rounded-full border border-brand-primary/30 transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Divider */}
                <hr className="border-slate-100" />

                {/* Row 3: Boot */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-2 group">
                  <div className="w-full md:w-1/3">
                    <span className="text-sm font-bold text-slate-800">Boot</span>
                    <p className="text-sm text-slate-500 mt-1">LOCAL</p>
                  </div>
                  <div className="w-full md:w-2/3 flex items-end justify-end md:items-center">
                    <button className="p-2 text-brand-primary hover:bg-brand-primary/10 rounded-full border border-brand-primary/30 transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Divider */}
                <hr className="border-slate-100" />

                {/* Row 4: SO / Distribución */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-2 group">
                  <div className="w-full md:w-1/3">
                    <span className="text-sm font-bold text-slate-800">SO/Distribución</span>
                    <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                       <img src="https://assets.ubuntu.com/v1/29985a98-ubuntu-logo14.png" alt="Ubuntu" className="w-4 h-4 object-contain" />
                       Ubuntu 25.04
                    </p>
                  </div>
                  <div className="w-full md:w-2/3 flex items-end justify-end md:items-center">
                    <button className="p-2 text-brand-primary hover:bg-brand-primary/10 rounded-full border border-brand-primary/30 transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab !== 'inicio' && (
        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center">
          <p className="text-slate-500 font-medium">Contenido de la pestaña "{tabs.find(t => t.id === activeTab)?.label}" en construcción.</p>
        </div>
      )}
    </div>
  );
};
