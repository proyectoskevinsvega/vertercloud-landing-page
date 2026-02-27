import { useTranslation } from 'react-i18next';

export const GatewayDashboard = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        {t('dashboard.gateway.title', 'API Gateway Dashboard')}
      </h2>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <p className="text-slate-600">Gestión de rutas y rate limiting próximamente...</p>
      </div>
    </div>
  );
};
