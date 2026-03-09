import { useTranslation } from 'react-i18next';
import { X, Shield, Zap, Lock, RefreshCw, Info } from 'lucide-react';
import { useDeviceSettings } from '../../../../hooks/useVpn';

interface DeviceSettingsModalProps {
  deviceId: string;
  deviceName: string;
  isOpen: boolean;
  onClose: () => void;
}

export const DeviceSettingsModal = ({ deviceId, deviceName, isOpen, onClose }: DeviceSettingsModalProps) => {
  const { t } = useTranslation();
  const { security, stealth, loading, updateSecurity, toggleStealth } = useDeviceSettings(deviceId);

  if (!isOpen) return null;

  const FeatureToggle = ({ 
    icon: Icon, 
    title, 
    description, 
    enabled, 
    onChange, 
    disabled = false 
  }: { 
    icon: any, 
    title: string, 
    description: string, 
    enabled: boolean, 
    onChange: (val: boolean) => void,
    disabled?: boolean
  }) => (
    <div className="flex items-start justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
      <div className="flex items-start space-x-3">
        <div className={`p-2 rounded-lg ${enabled ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
          <Icon size={20} />
        </div>
        <div>
          <h4 className="font-semibold text-slate-800 text-sm">{title}</h4>
          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{description}</p>
        </div>
      </div>
      <button
        onClick={() => onChange(!enabled)}
        disabled={disabled}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${enabled ? 'bg-blue-600' : 'bg-slate-200'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled ? 'translate-x-5' : 'translate-x-0'}`}
        />
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div>
            <h3 className="text-xl font-bold text-slate-800">{t('dashboard.vpn.settings_title', 'Ajustes Avanzados')}</h3>
            <p className="text-sm text-slate-500">{deviceName}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {loading ? (
            <div className="space-y-4 py-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-20 bg-slate-50 animate-pulse rounded-xl" />
              ))}
            </div>
          ) : (
            <>
              {/* Security Section */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Seguridad & Privacidad</h4>
                
                <FeatureToggle 
                  icon={Lock}
                  title="Kill Switch"
                  description="Corta internet si se pierde la conexión VPN para evitar fugas de IP real."
                  enabled={security?.enable_killswitch || false}
                  onChange={(val) => updateSecurity({ enable_killswitch: val })}
                />

                <FeatureToggle 
                  icon={Shield}
                  title="Bloqueador (AdBlock)"
                  description="Filtra dominios de publicidad y rastreadores a nivel de DNS."
                  enabled={security?.enable_adblock || false}
                  onChange={(val) => updateSecurity({ enable_adblock: val })}
                />

                <FeatureToggle 
                  icon={RefreshCw}
                  title="Rotación de IP"
                  description="Cambia tu dirección IP asignada periódicamente para mayor anonimato."
                  enabled={security?.enable_ip_rotation || false}
                  onChange={(val) => updateSecurity({ enable_ip_rotation: val })}
                />
              </div>

              {/* Advanced Section */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Conectividad Avanzada</h4>
                
                <FeatureToggle 
                  icon={Zap}
                  title="Modo Stealth"
                  description="Ofusca el tráfico de WireGuard usando capas adicionales para evadir DPI y redes restrictivas."
                  enabled={stealth?.enabled || false}
                  onChange={toggleStealth}
                />

                {stealth?.enabled && (
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start space-x-3">
                    <Info size={18} className="text-blue-500 mt-0.5 shrink-0" />
                    <div className="text-xs text-blue-700 leading-relaxed">
                      <p className="font-bold mb-1">Nota importante:</p>
                      El modo Stealth requiere un cliente compatible. Al activarlo, tu configuración estándar de WireGuard dejará de funcionar hasta que uses el script de conexión Stealth.
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium transition-colors shadow-sm"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
