import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, Shield, Globe, Lock, Scale, AlertCircle, Languages, CreditCard, ShieldCheck, History } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';

export default function TermsPage() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(nextLang);
  };

  return (
    <div className="min-h-screen bg-brand-background text-slate-200 selection:bg-brand-primary/30">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-secondary/10 rounded-full blur-[120px]" />
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">{t('nav.getStarted')}</span>
          </Link>
          <div className="flex items-center gap-6">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors glass px-3 py-1.5 rounded-lg"
            >
              <Languages className="w-4 h-4" />
              <span className="uppercase">{i18n.language.split('-')[0]}</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
                <Globe className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-white tracking-tight">VerterCloud</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto pt-32 pb-24 px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            {t('footer.terms.mainTitle')}
          </h1>
          <p className="text-slate-400 text-lg">
            {t('footer.terms.subtitle')}
          </p>
          <div className="flex items-center gap-4 mt-6 text-sm text-slate-500">
            <span className="px-3 py-1 rounded-full glass border border-white/5">
              {t('footer.terms.lastUpdated')}
            </span>
          </div>
        </motion.div>

        {/* Operator Info Card */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
           className="glass-card mb-16 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 rounded-full -mr-16 -mt-16 blur-3xl" />
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Shield className="text-brand-primary w-5 h-5" />
            {t('footer.terms.operator.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">{t('footer.terms.operator.labels.commercial')}</p>
                <p className="text-white font-medium">{t('footer.terms.operator.commercial')}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">{t('footer.terms.operator.labels.owner')}</p>
                <p className="text-white font-medium">{t('footer.terms.operator.owner')}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">{t('footer.terms.operator.labels.identification')}</p>
                <p className="text-white font-medium">{t('footer.info.nit')}</p>
                <p className="text-xs text-brand-primary/70 mt-1 font-medium italic">{t('footer.terms.operator.dian')}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">{t('footer.terms.operator.labels.jurisdiction')}</p>
                <p className="text-white font-medium">{t('footer.terms.operator.jurisdiction')}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">{t('footer.terms.operator.labels.address')}</p>
                <p className="text-white font-medium">{t('footer.terms.operator.address')}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Legal Content */}
        <div className="space-y-16">
          <section className="space-y-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center">
                <Lock className="text-brand-primary w-4 h-4" />
              </div>
              {t('footer.terms.sections.definitions.title')}
            </h3>
            <ul className="space-y-4">
              {(t('footer.terms.sections.definitions.items', { returnObjects: true }) as string[]).map((item, i) => (
                <li key={i} className="flex gap-4 text-slate-400 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                  <span className="text-brand-primary font-bold">»</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center">
                <Scale className="text-brand-primary w-4 h-4" />
              </div>
              {t('footer.terms.sections.nature.title')}
            </h3>
            <p className="text-slate-400 leading-relaxed text-lg italic">
              {t('footer.terms.sections.nature.content')}
            </p>
          </section>

          <section className="space-y-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center">
                <AlertCircle className="text-brand-primary w-4 h-4" />
              </div>
              {t('footer.terms.sections.warranties.title')}
            </h3>
            <p className="text-slate-400 leading-relaxed">
              {t('footer.terms.sections.warranties.content')}
            </p>
          </section>

          {/* Render remaining sections dynamically */}
          {[
            { key: 'compliance', icon: Shield },
          ].map(({ key, icon: Icon }) => (
            <section key={key} className="space-y-6 p-8 rounded-2xl border border-white/5 hover:bg-white/[0.02] transition-colors">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center">
                  <Icon className="text-brand-primary w-4 h-4" />
                </div>
                {t(`footer.terms.sections.${key}.title`)}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {t(`footer.terms.sections.${key}.content`)}
              </p>
            </section>
          ))}
          
          {/* Special Section: Shared Responsibility (Unnumbered) */}
          <section className="space-y-6 bg-brand-primary/5 p-8 rounded-3xl border border-brand-primary/10">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center">
                <Shield className="text-white w-4 h-4" />
              </div>
              {t('footer.terms.sections.security.title')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              <div className="space-y-2">
                <h4 className="font-bold text-brand-primary uppercase text-xs tracking-widest">{t('footer.terms.sections.security.labels.provider')}</h4>
                <p className="text-slate-300 text-sm leading-relaxed">{t('footer.terms.sections.security.provider')}</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-cyan-400 uppercase text-xs tracking-widest">{t('footer.terms.sections.security.labels.client')}</h4>
                <p className="text-slate-300 text-sm leading-relaxed">{t('footer.terms.sections.security.client')}</p>
              </div>
            </div>
          </section>

          {/* Render remaining sections dynamically after security */}
          {[
            { key: 'usage', icon: Shield },
            { key: 'vpn', icon: ShieldCheck },
            { key: 'payment', icon: CreditCard },
            { key: 'indemnity', icon: Scale },
            { key: 'liability', icon: AlertCircle },
            { key: 'forceMajeure', icon: Globe },
            { key: 'termination', icon: AlertCircle },
            { key: 'jurisdiction', icon: Scale },
            { key: 'modifications', icon: History },
          ].map(({ key, icon: Icon }) => (
            <section key={key} className="space-y-6 p-8 rounded-2xl border border-white/5 hover:bg-white/[0.02] transition-colors">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center">
                  <Icon className="text-brand-primary w-4 h-4" />
                </div>
                {t(`footer.terms.sections.${key}.title`)}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {t(`footer.terms.sections.${key}.content`)}
              </p>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
