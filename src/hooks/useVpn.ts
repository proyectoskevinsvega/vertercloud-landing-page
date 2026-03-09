import { useState, useEffect, useCallback } from 'react';
import { vpnService } from '../services/vpn';
import type { Device, Server, PlanStatus } from '../types/vpn';
import { toast } from 'sonner';

export const useDevices = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDevices = useCallback(async () => {
    try {
      setLoading(true);
      const res = await vpnService.getDevices();
      setDevices(res.data);
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
      setServers(res.data);
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
  const [error, setError] = useState<Error | null>(null);

  const fetchPlanStatus = useCallback(async () => {
    try {
      setLoading(true);
      const res = await vpnService.getPlanStatus();
      setPlanStatus(res);
      setError(null);
    } catch (err: any) {
      setError(err);
      toast.error('Error al cargar estado del plan: ' + (err.response?.data?.error?.message || err.message));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlanStatus();
  }, [fetchPlanStatus]);

  return { planStatus, loading, error, refetch: fetchPlanStatus };
};
