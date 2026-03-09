import { useState, useEffect, useCallback } from 'react';
import { vpnService } from '../services/vpn';
import type { Device, Server, PlanStatus, DeviceSecurity } from '../types/vpn';
import { toast } from 'sonner';

export const useDevices = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDevices = useCallback(async () => {
    try {
      setLoading(true);
      const res = await vpnService.getDevices();
      setDevices(Array.isArray(res) ? res : res?.data || []);
      setError(null);
    } catch (err: any) {
      setError(err);
      toast.error('Error al cargar dispositivos: ' + (err.response?.data?.error?.message || err.message));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDevices();
  }, [fetchDevices]);

  return { devices, loading, error, refetch: fetchDevices };
};

export const useServers = () => {
  const [servers, setServers] = useState<Server[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchServers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await vpnService.getServers();
      setServers(Array.isArray(res) ? res : res?.data || []);
      setError(null);
    } catch (err: any) {
      setError(err);
      toast.error('Error al cargar servidores: ' + (err.response?.data?.error?.message || err.message));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServers();
  }, [fetchServers]);

  return { servers, loading, error, refetch: fetchServers };
};

export const usePlanStatus = () => {
  const [planStatus, setPlanStatus] = useState<PlanStatus | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPlan = useCallback(async () => {
    try {
      setLoading(true);
      const data = await vpnService.getPlanStatus();
      setPlanStatus(data);
    } catch (error) {
      toast.error('Error al obtener estado del plan');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlan();
  }, [fetchPlan]);

  return { planStatus, loading, refetch: fetchPlan };
};

export const useDeviceSettings = (deviceId: string) => {
  const [security, setSecurity] = useState<DeviceSecurity | null>(null);
  const [stealth, setStealth] = useState<{ enabled: boolean; config?: any } | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!deviceId) return;
    try {
      setLoading(true);
      const [secData, stealthData] = await Promise.all([
        vpnService.getDeviceSecurity(deviceId),
        vpnService.getDeviceStealth(deviceId)
      ]);
      setSecurity(secData || { enable_adblock: false, enable_malware_filter: false, enable_killswitch: false, enable_ip_rotation: false });
      setStealth({ 
        enabled: stealthData?.enabled || false, 
        config: stealthData?.stealth_config || null 
      });
    } catch (error) {
      console.error('Error loading device settings:', error);
    } finally {
      setLoading(false);
    }
  }, [deviceId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateSecurity = async (data: Partial<DeviceSecurity>) => {
    try {
      await vpnService.updateDeviceSecurity(deviceId, data);
      setSecurity(prev => prev ? { ...prev, ...data } : null);
      toast.success('Seguridad actualizada');
    } catch (error) {
      toast.error('Error al actualizar seguridad');
    }
  };

  const toggleStealth = async (enabled: boolean) => {
    try {
      if (enabled) {
        await vpnService.enableDeviceStealth(deviceId);
      } else {
        await vpnService.disableDeviceStealth(deviceId);
      }
      setStealth(prev => prev ? { ...prev, enabled } : { enabled });
      toast.success(enabled ? 'Modo Stealth activado' : 'Modo Stealth desactivado');
    } catch (error) {
      toast.error('Error al cambiar modo Stealth');
    }
  };

  return { security, stealth, loading, updateSecurity, toggleStealth, refetch: fetchData };
};
