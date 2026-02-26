import { Shield, Globe, Zap, Server } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="py-20 px-6 border-t border-white/5 mt-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center">
              <Globe className="text-white w-6 h-6" />
            </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold">{t('footer.info.commercial')}</span>
            <span className="text-xs text-slate-500 font-medium">
              {t('footer.info.brandConnection')} ( {import.meta.env.VITE_SITE_URL || 'bravexcolombia.com'} )
            </span>
          </div>
          </div>
          <p className="text-slate-500 max-w-sm mb-8 leading-relaxed">
            {t('footer.desc')}
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-slate-400">
              <div className="w-8 h-8 rounded-lg glass flex items-center justify-center text-brand-primary">
                <Shield size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{t('footer.info.nit')}</span>
                <span className="text-[11px] text-slate-500 font-medium">
                  {t('footer.info.dianReg')}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <div className="w-8 h-8 rounded-lg glass flex items-center justify-center text-brand-primary">
                <Globe size={16} />
              </div>
              <span className="text-sm font-medium">{t('footer.info.city')}</span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-xs">{t('footer.resources')}</h4>
          <ul className="space-y-4 text-slate-400">
            <li><a href="#" className="hover:text-brand-primary transition-colors text-sm">{t('footer.links.docs')}</a></li>
            <li><a href="#" className="hover:text-brand-primary transition-colors text-sm">{t('footer.links.api')}</a></li>
            <li><a href="#" className="hover:text-brand-primary transition-colors text-sm">{t('footer.links.status')}</a></li>
          </ul>
          
          <h4 className="font-bold mb-6 mt-10 text-white uppercase tracking-widest text-xs">{t('footer.legalTitle')}</h4>
          <ul className="space-y-4 text-slate-400">
            <li><Link to="/privacy" className="hover:text-brand-primary transition-colors text-sm">{t('footer.links.privacy')}</Link></li>
            <li><Link to="/terms" className="hover:text-brand-primary transition-colors text-sm">{t('footer.links.terms')}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-xs">{t('footer.contactTitle')}</h4>
          <div className="space-y-4">
            <a 
              href={`mailto:${t('footer.info.email')}`}
              className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl glass flex items-center justify-center group-hover:bg-brand-primary/10 transition-colors">
                <Server size={18} className="text-brand-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 uppercase font-black">{t('footer.info.emailLabel')}</span>
                <span className="text-sm font-medium">{t('footer.info.email')}</span>
              </div>
            </a>
            
            <a 
              href={`tel:${t('footer.info.telValue')}`}
              className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl glass flex items-center justify-center group-hover:bg-brand-primary/10 transition-colors">
                <Zap size={18} className="text-brand-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 uppercase font-black">{t('footer.info.telLabel')}</span>
                <span className="text-sm font-medium">{t('footer.info.telValue')}</span>
              </div>
            </a>

            <a 
              href={`https://wa.me/${t('footer.info.telValue')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl glass flex items-center justify-center group-hover:bg-brand-primary/10 transition-colors">
                <Zap size={18} className="text-brand-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 uppercase font-black">{t('footer.info.whatsappLabel')}</span>
                <span className="text-sm font-medium">{t('footer.info.whatsappValue')}</span>
              </div>
            </a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-600 relative z-10">
        <p>{t('footer.rights')}</p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">GitHub</a>
          <a href="#" className="hover:text-white transition-colors">Discord</a>
        </div>
      </div>
    </footer>
  );
}
