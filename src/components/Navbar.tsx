import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Cloud, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.services'), href: '/#services' },
    { name: t('nav.solutions'), href: '#' },
    { name: t('nav.architecture'), href: '#' },
    { name: t('nav.support'), href: '/support' },
    { name: t('nav.docs'), href: '#' },
  ];

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(nextLang);
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        scrolled ? 'glass py-3 mt-0' : 'bg-transparent mt-4'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
            <Cloud className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Verter<span className="text-brand-primary">Cloud</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6 border-r border-white/10 pr-6">
            {navLinks.map((link) => (
              link.href.startsWith('/') ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm font-medium text-slate-400 hover:text-white transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all group-hover:w-full" />
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-slate-400 hover:text-white transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all group-hover:w-full" />
                </a>
              )
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
              {t('nav.login')}
            </button>
            <button className="bg-brand-primary text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-brand-primary/90 transition-colors shadow-lg shadow-brand-primary/20">
              {t('nav.getStarted')}
            </button>
          </div>

          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-white transition-colors bg-white/5 px-2 py-1 rounded-md border border-white/5"
          >
            <span className={cn(i18n.language.startsWith('es') ? 'text-brand-primary' : '')}>ES</span>
            <span className="opacity-20">|</span>
            <span className={cn(i18n.language.startsWith('en') ? 'text-brand-primary' : '')}>EN</span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button onClick={toggleLanguage} className="text-white opacity-70">
            <Languages size={20} />
          </button>
          <button
            className="text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass mt-2 mx-6 rounded-2xl p-6 md:hidden flex flex-col gap-4 border-t-0"
          >
            {navLinks.map((link) => (
              link.href.startsWith('/') ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-lg font-medium text-slate-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-slate-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              )
            ))}
            <button className="bg-brand-primary text-white w-full py-3 rounded-xl font-semibold">
              {t('nav.getStarted')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
