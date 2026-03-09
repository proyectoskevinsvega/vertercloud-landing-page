import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, WifiOff } from 'lucide-react';
import { useDevices, usePlanStatus, useServers } from '../../../hooks/useVpn';
import type { Device } from '../../../types/vpn';
import { PlanOverview } from './components/PlanOverview';
import { DeviceCard } from './components/DeviceCard';
import { CreateDeviceModal } from './components/CreateDeviceModal';

export const VpnDashboard = () => {
  const { t } = useTranslation();
  
  // Data hooks
  const { planStatus, loading: planLoading, refetch: refetchPlan } = usePlanStatus();
  const { devices, loading: devicesLoading, refetch: refetchDevices } = useDevices();
  const { servers } = useServers();

  // State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Handlers
  const handleUpdate = () => {
    refetchDevices();
    refetchPlan(); // Re-fetch plan since bandwidth or connection limits might change
  };

  const isLimitReached = planStatus ? !planStatus.can_add_device : false;

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">
            {t('dashboard.vpn.title', 'Mi Red VPN Privada')}
          </h2>
          <p className="text-slate-500 mt-1">Gestiona de forma segura tus dispositivos y túneles.</p>
        </div>
        
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          disabled={isLimitReached || planLoading}
          className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus size={18} className="mr-2" />
          {t('dashboard.vpn.add_device_btn', 'Nuevo Dispositivo')}
        </button>
      </div>

      {isLimitReached && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-sm font-medium">
          {t('dashboard.vpn.limit_reached', 'Has alcanzado el límite de dispositivos para tu plan actual. Considera mejorar tu suscripción para conectar más dispositivos.')}
        </div>
      )}

      {/* Plan & Usage Summary */}
      <PlanOverview planStatus={planStatus} loading={planLoading} />

      {/* Devices Grid */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-slate-800 mb-4">{t('dashboard.vpn.my_devices', 'Mis Dispositivos Asociados')}</h3>
        
        {devicesLoading && !devices.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-64 bg-slate-50 animate-pulse rounded-xl border border-slate-100"></div>
            ))}
          </div>
        ) : devices.length === 0 ? (
          <div className="bg-white border border-slate-200 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <WifiOff className="text-slate-400" size={32} />
            </div>
            <h4 className="text-lg font-semibold text-slate-800 mb-2">No tienes dispositivos configurados</h4>
            <p className="text-slate-500 max-w-sm mx-auto mb-6">
              Agrega tu celular, PC o enrutador para generar su perfil VPN de WireGuard y navegar de forma segura.
            </p>
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
            >
              Añadir mi primer dispositivo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {devices.map((device: Device) => (
              <DeviceCard 
                key={device.id} 
                device={device} 
                servers={servers} 
                onUpdate={handleUpdate} 
              />
            ))}
          </div>
        )}
      </div>

      <CreateDeviceModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onCreated={handleUpdate} 
      />
    </div>
  );
};
