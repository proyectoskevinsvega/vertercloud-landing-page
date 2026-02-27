import { useTranslation } from 'react-i18next';

export const VpnDashboard = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        {t('dashboard.vpn.title', 'VerterVPN Dashboard')}
      </h2>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <p className="text-slate-600">Gestión de túneles y usuarios VPN próximamente...</p>
      </div>
    </div>
  );
};
