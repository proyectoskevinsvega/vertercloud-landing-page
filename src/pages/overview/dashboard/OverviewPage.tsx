import { useTranslation } from 'react-i18next';

export const OverviewPage = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        {t('dashboard.overview.title', 'Visión General')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-700 mb-2">Servicios Activos</h3>
          <p className="text-3xl font-bold text-brand-primary">4</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-700 mb-2">Alertas</h3>
          <p className="text-3xl font-bold text-emerald-500">Todo OK</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-700 mb-2">Facturación Estimada</h3>
          <p className="text-3xl font-bold text-slate-800">$45.00</p>
        </div>
      </div>
    </div>
  );
};
