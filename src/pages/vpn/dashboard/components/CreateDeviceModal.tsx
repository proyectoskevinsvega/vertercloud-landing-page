import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Smartphone, Monitor, Router as RouterIcon } from 'lucide-react';
import { vpnService } from '../../../../services/vpn';
import type { DeviceType, OSType } from '../../../../types/vpn';
import { toast } from 'sonner';

interface CreateDeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export const CreateDeviceModal = ({ isOpen, onClose, onCreated }: CreateDeviceModalProps) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    device_type: 'mobile' as DeviceType,
    os_type: 'android' as OSType,
    description: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    try {
      setLoading(true);
      await vpnService.createDevice(formData);
      toast.success(t('dashboard.vpn.device_created_success', 'Dispositivo creado correctamente'));
      onCreated();
      onClose();
    } catch (error: any) {
      toast.error(t('dashboard.vpn.error_create', 'Error al crear el dispositivo: ') + (error.response?.data?.error?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-semibold text-xl text-slate-800">
            {t('dashboard.vpn.add_device', 'Añadir Dispositivo')}
          </h3>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {t('dashboard.vpn.device_name', 'Nombre del Dispositivo')}
              </label>
              <input
                type="text"
                required
                placeholder="Ej. Mi iPhone 15"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                {t('dashboard.vpn.select_type', 'Tipo de Dispositivo')}
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, device_type: 'mobile', os_type: 'android' })}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center space-y-2 transition-all ${
                    formData.device_type === 'mobile' 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Smartphone size={24} />
                  <span className="text-xs font-medium">Móvil</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, device_type: 'desktop', os_type: 'windows' })}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center space-y-2 transition-all ${
                    formData.device_type === 'desktop' 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Monitor size={24} />
                  <span className="text-xs font-medium">PC</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, device_type: 'router', os_type: 'linux' })}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center space-y-2 transition-all ${
                    formData.device_type === 'router' 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <RouterIcon size={24} />
                  <span className="text-xs font-medium">Router</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1 mt-4">
                {t('dashboard.vpn.os_type', 'Sistema Operativo')}
              </label>
              <select
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                value={formData.os_type}
                onChange={(e) => setFormData({ ...formData, os_type: e.target.value as OSType })}
              >
                {formData.device_type === 'mobile' && (
                  <>
                    <option value="android">Android</option>
                    <option value="ios">iOS / iPadOS</option>
                  </>
                )}
                {formData.device_type === 'desktop' && (
                  <>
                    <option value="windows">Windows</option>
                    <option value="macos">macOS</option>
                    <option value="linux">Linux</option>
                  </>
                )}
                {formData.device_type === 'router' && (
                  <option value="linux">Linux / OpenWRT</option>
                )}
                <option value="other">Otro</option>
              </select>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-8 flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !formData.name}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                t('dashboard.vpn.create_button', 'Crear Perfil VPN')
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
