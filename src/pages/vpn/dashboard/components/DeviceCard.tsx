import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Device, Server } from '../../../../types/vpn';
import { vpnService } from '../../../../services/vpn';
import { Smartphone, Monitor, Router as RouterIcon, Download, QrCode, Trash2, Power, Settings } from 'lucide-react';
import { toast } from 'sonner';
import { DeviceSettingsModal } from './DeviceSettingsModal';

interface DeviceCardProps {
  device: Device;
  servers: Server[];
  onUpdate: () => void;
}

export const DeviceCard = ({ device, servers, onUpdate }: DeviceCardProps) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [qrBase64, setQrBase64] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const connected = device.status === 'active' && !!device.client;
  const currentServerId = device.client?.server_id;
  const currentServer = servers.find(s => s.id === currentServerId);

  const getIcon = () => {
    switch (device.device_type) {
      case 'mobile': return <Smartphone className="text-slate-500" size={24} />;
      case 'desktop': return <Monitor className="text-slate-500" size={24} />;
      case 'router': return <RouterIcon className="text-slate-500" size={24} />;
      default: return <Monitor className="text-slate-500" size={24} />;
    }
  };

  const handleDownloadConfig = async () => {
    try {
      setLoading(true);
      const blob = await vpnService.downloadDeviceConfig(device.id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${device.name.replace(/\s+/g, '_')}_wg.conf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error(t('dashboard.vpn.error_download', 'Error al descargar la configuración'));
    } finally {
      setLoading(false);
    }
  };

  const handleShowQR = async () => {
    if (qrBase64) {
      setQrBase64(null); // toggle off
      return;
    }
    try {
      setLoading(true);
      const data = await vpnService.getDeviceQR(device.id);
      setQrBase64(data.qr_base64);
    } catch (error) {
      toast.error(t('dashboard.vpn.error_qr', 'Error al obtener el código QR'));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(t('dashboard.vpn.confirm_delete', '¿Estás seguro de que quieres eliminar este dispositivo?'))) return;
    try {
      setLoading(true);
      await vpnService.deleteDevice(device.id);
      toast.success(t('dashboard.vpn.device_deleted', 'Dispositivo eliminado'));
      onUpdate();
    } catch (error) {
      toast.error(t('dashboard.vpn.error_delete', 'Error al eliminar el dispositivo'));
      setLoading(false);
    }
  };

  const handleConnect = async (serverId: string) => {
    try {
      setLoading(true);
      await vpnService.connectDevice(device.id, serverId);
      toast.success(t('dashboard.vpn.device_connected', 'Dispositivo conectado al servidor'));
      onUpdate();
    } catch (error) {
      toast.error(t('dashboard.vpn.error_connect', 'Error al conectar el dispositivo'));
      setLoading(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      setLoading(true);
      await vpnService.disconnectDevice(device.id);
      toast.success(t('dashboard.vpn.device_disconnected', 'Dispositivo desconectado'));
      onUpdate();
    } catch (error) {
      toast.error(t('dashboard.vpn.error_disconnect', 'Error al desconectar el dispositivo'));
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col transition-all hover:shadow-md">
      {/* Header */}
      <div className="p-5 border-b border-slate-100 flex justify-between items-start">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
            {getIcon()}
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-lg">{device.name}</h3>
            <p className="text-sm text-slate-500 capitalize">{device.os_type} • {device.device_type}</p>
          </div>
        </div>
        <div className={`px-2.5 py-1 rounded-full text-xs font-medium border ${connected ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>
          {connected ? t('dashboard.vpn.status_connected', 'Conectado') : t('dashboard.vpn.status_disconnected', 'Desconectado')}
        </div>
      </div>

      {/* Body */}
      <div className="p-5 grow">
        {connected && currentServer ? (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-100 rounded-lg text-sm">
            <div className="flex justify-between mb-1">
              <span className="text-blue-700 font-medium">{t('dashboard.vpn.connected_to', 'Conectado a:')}</span>
              <span className="text-blue-900">{currentServer.name} ({currentServer.country_code})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700 font-medium">{t('dashboard.vpn.local_ip', 'IP Local:')}</span>
              <span className="text-blue-900">{device.client?.allocated_ips?.[0] || 'N/A'}</span>
            </div>
          </div>
        ) : (
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">{t('dashboard.vpn.select_server', 'Conectar a Servidor')}</label>
            <div className="flex space-x-2">
              <select 
                title="Select Server"
                className="grow rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                id={`server-select-${device.id}`}
              >
                <option value="">{t('dashboard.vpn.choose_server', '-- Seleccionar Servidor --')}</option>
                {servers.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.country_code}) • {s.status}</option>
                ))}
              </select>
              <button 
                onClick={() => {
                  const select = document.getElementById(`server-select-${device.id}`) as HTMLSelectElement;
                  if (select.value) handleConnect(select.value);
                }}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors flex items-center justify-center disabled:opacity-50"
              >
                <Power size={18} />
              </button>
            </div>
          </div>
        )}

        {/* QR Code Display */}
        {qrBase64 && (
          <div className="mb-4 flex flex-col items-center p-4 border border-slate-200 rounded-lg bg-slate-50">
            <p className="text-sm text-slate-600 mb-2 text-center">{t('dashboard.vpn.scan_qr', 'Escanea con la app WireGuard')}</p>
            <img src={`data:image/png;base64,${qrBase64}`} alt="WireGuard QR" className="w-48 h-48 rounded" />
            <a 
              href={`data:image/png;base64,${qrBase64}`} 
              download={`${device.name.replace(/\s+/g, '_')}_qr.png`}
              className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              <Download size={14} className="mr-1" /> {t('dashboard.vpn.download_qr', 'Guardar Imagen')}
            </a>
          </div>
        )}

      </div>

      {/* Footer Actions */}
      <div className="bg-slate-50 p-4 border-t border-slate-200 grid grid-cols-4 gap-2">
        <button 
          onClick={handleDownloadConfig} 
          disabled={loading}
          className="flex flex-col items-center justify-center text-slate-600 hover:text-blue-600 transition-colors disabled:opacity-50"
          title={t('dashboard.vpn.download_config', 'Descargar .conf')}
        >
          <div className="p-2 rounded-full hover:bg-blue-50">
            <Download size={18} />
          </div>
          <span className="text-xs mt-1">Config</span>
        </button>
        
        <button 
          onClick={handleShowQR} 
          disabled={loading}
          className={`flex flex-col items-center justify-center transition-colors disabled:opacity-50 ${qrBase64 ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}
          title={t('dashboard.vpn.show_qr', 'Mostrar QR')}
        >
          <div className={`p-2 rounded-full ${qrBase64 ? 'bg-blue-50' : 'hover:bg-blue-50'}`}>
            <QrCode size={18} />
          </div>
          <span className="text-xs mt-1">QR</span>
        </button>

        {connected ? (
          <button 
            onClick={handleDisconnect} 
            disabled={loading}
            className="flex flex-col items-center justify-center text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
            title={t('dashboard.vpn.disconnect', 'Desconectar')}
          >
            <div className="p-2 rounded-full hover:bg-red-50">
              <Power size={18} />
            </div>
            <span className="text-xs mt-1">Desconectar</span>
          </button>
        ) : (
          <button 
            onClick={handleDelete} 
            disabled={loading}
            className="flex flex-col items-center justify-center text-slate-600 hover:text-red-600 transition-colors disabled:opacity-50"
            title={t('dashboard.vpn.delete', 'Eliminar')}
          >
            <div className="p-2 rounded-full hover:bg-red-50">
              <Trash2 size={18} />
            </div>
            <span className="text-xs mt-1">Eliminar</span>
          </button>
        )}

        <button 
          onClick={() => setIsSettingsOpen(true)} 
          disabled={loading}
          className="flex flex-col items-center justify-center text-slate-600 hover:text-slate-900 transition-colors disabled:opacity-50"
          title={t('dashboard.vpn.settings', 'Opciones')}
        >
          <div className="p-2 rounded-full hover:bg-slate-200">
            <Settings size={18} />
          </div>
          <span className="text-xs mt-1">Ajustes</span>
        </button>
      </div>

      <DeviceSettingsModal 
        deviceId={device.id} 
        deviceName={device.name} 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </div>
  );
};
