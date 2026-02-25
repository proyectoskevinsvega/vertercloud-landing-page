import { Network, Zap, Cpu, Server, Globe, ShieldCheck, Box } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServiceCard } from './components/ServiceCard';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Footer } from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import SupportPage from './pages/SupportPage';

function LandingPage() {
  const { t } = useTranslation();

  const services = [
    {
      title: t('services.items.vpn.title'),
      description: t('services.items.vpn.desc'),
      action: t('services.items.vpn.action'),
      url: t('services.items.vpn.url'),
      icon: Globe,
      color: 'bg-blue-500',
    },
    {
      title: t('services.items.auth.title'),
      description: t('services.items.auth.desc'),
      action: t('services.items.auth.action'),
      url: t('services.items.auth.url'),
      icon: ShieldCheck,
      color: 'bg-purple-500',
    },
    {
      title: t('services.items.vps.title'),
      description: t('services.items.vps.desc'),
      action: t('services.items.vps.action'),
      url: t('services.items.vps.url'),
      icon: Server,
      color: 'bg-emerald-500',
    },
    {
      title: t('services.items.gateway.title'),
      description: t('services.items.gateway.desc'),
      action: t('services.items.gateway.action'),
      url: t('services.items.gateway.url'),
      icon: Zap,
      color: 'bg-indigo-500',
    },
    {
      title: t('services.items.balancer.title'),
      description: t('services.items.balancer.desc'),
      action: t('services.items.balancer.action'),
      url: t('services.items.balancer.url'),
      icon: Network,
      color: 'bg-cyan-500',
    },
  ];

  return (
    <>
      <Navbar />
      <Hero />
      
      {/* Platform Section */}
      <section id="services" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 text-center md:text-left">
          <div className="max-w-3xl">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black mb-6 text-white"
            >
              {t('platform.title')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-400 font-medium"
            >
              {t('platform.subtitle')}
            </motion.p>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-end gap-3">
            <div className="flex items-center gap-2 glass px-4 py-2 rounded-xl text-sm font-bold text-slate-400">
              <Server className="w-4 h-4 text-brand-primary" />
              {t('platform.metrics.uptime')}
            </div>
            <div className="flex items-center gap-2 glass px-4 py-2 rounded-xl text-sm font-bold text-slate-400">
              <Cpu className="w-4 h-4 text-brand-primary" />
              {t('platform.metrics.performance')}
            </div>
            <div className="flex items-center gap-2 glass px-4 py-2 rounded-xl text-sm font-bold text-slate-400">
              <Box className="w-4 h-4 text-brand-primary" />
              {t('platform.metrics.modular')}
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-8 border-l-4 border-brand-primary pl-4">
            {t('services.title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                {...service}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/10 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 blur-[80px] rounded-full -mr-20 -mt-20 group-hover:bg-brand-primary/10 transition-colors duration-700" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
            <div className="w-20 h-20 bg-brand-primary/10 rounded-2xl flex items-center justify-center shrink-0 border border-brand-primary/20">
              <ShieldCheck className="w-10 h-10 text-brand-primary" />
            </div>
            
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
                {t('compliance.title')}
              </h3>
              <p className="text-lg text-slate-400 leading-relaxed max-w-4xl font-medium">
                {t('compliance.desc')}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <main className="min-h-screen selection:bg-brand-primary/30">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/support" element={<SupportPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
