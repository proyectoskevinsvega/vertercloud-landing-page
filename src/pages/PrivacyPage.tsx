import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, Shield, Globe, Lock, Eye, Languages, Scale, AlertCircle, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Footer } from '../components/Footer';

export default function PrivacyPage() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(nextLang);
  };

  return (
    <div className="min-h-screen bg-brand-background text-slate-200 selection:bg-brand-primary/30">
      <Helmet>
        <title>{t('seo.privacy.title')}</title>
        <meta name="description" content={t('seo.privacy.desc')} />
      </Helmet>
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
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase">
            {t('footer.privacy.mainTitle')}
          </h1>
          <p className="text-slate-400 text-lg">
            {t('footer.privacy.subtitle')}
          </p>
          <div className="flex items-center gap-4 mt-6 text-sm text-slate-500">
            <span className="px-3 py-1 rounded-full glass border border-white/5">
              {t('footer.privacy.lastUpdated')}
            </span>
          </div>
        </motion.div>

        <div className="space-y-12">
          {/* Operator Info Card (Responsible for Treatment) */}
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="glass-card mb-16 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 rounded-full -mr-16 -mt-16 blur-3xl" />
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Shield className="text-brand-primary w-5 h-5" />
              {t('footer.privacy.sections.responsible.title')}
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
            
            {/* Data Processing Role */}
            <div className="mt-8 pt-6 border-t border-white/5">
              <p className="text-sm text-slate-400 bg-brand-primary/5 p-4 rounded-xl border border-brand-primary/10 italic">
                {t('footer.privacy.sections.responsible.role')}
              </p>
            </div>
          </motion.div>

          {[
            { key: 'collection', icon: Eye },
            { key: 'purpose', icon: Lock },
            { key: 'base', icon: Scale },
            { key: 'retention', icon: AlertCircle },
            { key: 'transfers', icon: Globe },
            { key: 'rights', icon: Scale },
            { key: 'minors', icon: Shield },
            { key: 'security', icon: Shield },
            { key: 'incidents', icon: Bell },
          ].map(({ key, icon: Icon }) => (
            <section key={key} className="space-y-6 p-8 rounded-2xl border border-white/5 hover:bg-white/2 transition-colors">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center">
                  <Icon className="text-brand-primary w-4 h-4" />
                </div>
                {t(`footer.privacy.sections.${key}.title`)}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {t(`footer.privacy.sections.${key}.content`)}
              </p>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
