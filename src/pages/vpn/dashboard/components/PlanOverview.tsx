import { useTranslation } from 'react-i18next';
import type { PlanStatus } from '../../../../types/vpn';
import { HardDrive, Activity } from 'lucide-react';

interface PlanOverviewProps {
  planStatus: PlanStatus | null;
  loading: boolean;
}

const formatBytes = (bytes: number) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const PlanOverview = ({ planStatus, loading }: PlanOverviewProps) => {
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="h-24 bg-slate-100 animate-pulse rounded-xl"></div>
        <div className="h-24 bg-slate-100 animate-pulse rounded-xl"></div>
      </div>
    );
  }

  if (!planStatus) return null;

  const bandwidthPercentage = planStatus.bandwidth_limit_bytes > 0 
    ? (planStatus.bandwidth_used_bytes / planStatus.bandwidth_limit_bytes) * 100 
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Devices Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
          <HardDrive size={24} />
        </div>
        <div>
          <p className="text-sm text-slate-500 font-medium">{t('dashboard.vpn.devices_used', 'Dispositivos Activos')}</p>
          <p className="text-2xl font-bold text-slate-800">
            {planStatus.devices_used} <span className="text-slate-400 text-lg font-normal">/ {planStatus.devices_limit}</span>
          </p>
        </div>
      </div>

      {/* Bandwidth Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2 text-slate-500 font-medium text-sm">
            <Activity size={16} />
            <span>{t('dashboard.vpn.bandwidth', 'Ancho de Banda (Mensual)')}</span>
          </div>
          <span className="text-sm font-medium text-slate-700">
            {formatBytes(planStatus.bandwidth_used_bytes)} / {formatBytes(planStatus.bandwidth_limit_bytes)}
          </span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2.5 mt-2">
          <div 
            className={`h-2.5 rounded-full transition-all duration-500 ${bandwidthPercentage > 90 ? 'bg-red-500' : bandwidthPercentage > 75 ? 'bg-amber-500' : 'bg-green-500'}`}
            style={{ width: `${Math.min(bandwidthPercentage, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
