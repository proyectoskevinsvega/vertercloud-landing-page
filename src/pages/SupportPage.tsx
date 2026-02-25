import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, Globe, Languages, MessageSquare, Wrench, CreditCard, ShieldCheck, Search, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';

export default function SupportPage() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(nextLang);
  };

  const categories = [
    { key: 'technical', icon: Wrench, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { key: 'billing', icon: CreditCard, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { key: 'security', icon: ShieldCheck, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  ];

  return (
    <div className="min-h-screen bg-brand-background text-slate-200 selection:bg-brand-primary/30">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
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

      <main className="max-w-7xl mx-auto pt-32 pb-24 px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 rounded-full glass border border-white/10 text-brand-primary text-xs font-bold tracking-widest uppercase mb-6"
          >
            {t('footer.contactTitle')}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight"
          >
            {t('footer.support.mainTitle')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-xl max-w-2xl mx-auto"
          >
            {t('footer.support.subtitle')}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto mt-10 relative"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search for answers..."
              className="w-full glass py-4 pl-12 pr-6 rounded-2xl border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-primary/50 transition-colors"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="glass-card p-8 group cursor-pointer hover:border-brand-primary/30 transition-all"
            >
              <div className={`${cat.bg} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <cat.icon className={`${cat.color} w-7 h-7`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t(`footer.support.categories.${cat.key}.title`)}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {t(`footer.support.categories.${cat.key}.desc`)}
              </p>
              <div className="flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-widest group-hover:gap-3 transition-all">
                Browse Category <ArrowRight size={14} />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-8">{t('footer.support.faq.title')}</h2>
            <div className="space-y-4">
              {(t('footer.support.faq.items', { returnObjects: true }) as any[]).map((item, i) => (
                <div key={i} className="glass p-6 rounded-2xl border border-white/5 hover:bg-white/[0.02] transition-colors cursor-pointer group">
                  <div className="flex justify-between items-center gap-4">
                    <h4 className="text-white font-medium">{item.q}</h4>
                    <span className="text-slate-600 group-hover:text-brand-primary transition-colors">+</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card p-10 border-brand-primary/20 bg-brand-primary/5 text-center"
          >
            <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-brand-primary/20">
              <MessageSquare className="text-white w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">{t('footer.support.contact.title')}</h2>
            <p className="text-slate-400 mb-10 leading-relaxed">
              {t('footer.support.contact.desc')}
            </p>
            <button className="w-full bg-white text-black py-4 rounded-xl font-bold hover:bg-slate-200 transition-colors shadow-xl">
              {t('footer.support.contact.button')}
            </button>
            <div className="mt-8 pt-8 border-t border-white/5 flex flex-wrap justify-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Chat: Available
              </div>
              <div>Average reply time: 10m</div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
