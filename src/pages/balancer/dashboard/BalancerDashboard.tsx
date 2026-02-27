import { useTranslation } from 'react-i18next';

export const BalancerDashboard = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        {t('dashboard.balancer.title', 'Load Balancer Dashboard')}
      </h2>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <p className="text-slate-600">Gestión de reglas de balanceo próximamente...</p>
      </div>
    </div>
  );
};
