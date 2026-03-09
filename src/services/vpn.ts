import { api } from '../lib/axios';
import type { Device, Server, PlanStatus, DeviceSecurity, DeviceStats, RealtimeStats, DeviceType, OSType } from '../types/vpn';

export const vpnService = {
  // Devices
  async getDevices(): Promise<{ data: Device[]; meta: { total: number } }> {
    const res = await api.get('/vpn/me/devices');
    return res.data;
  },

  async createDevice(data: { name: string; device_type: DeviceType; os_type: OSType; description?: string }): Promise<Device> {
    const res = await api.post('/vpn/me/devices', data);
    return res.data.data;
  },

  async updateDevice(id: string, data: Partial<{ name: string; device_type: DeviceType; os_type: OSType; description: string }>): Promise<Device> {
    const res = await api.patch(`/vpn/me/devices/${id}`, data);
    return res.data.data;
  },

  async deleteDevice(id: string): Promise<void> {
    await api.delete(`/vpn/me/devices/${id}`);
  },

  // Connections
  async connectDevice(id: string, serverId: string): Promise<any> {
    const res = await api.post(`/vpn/me/devices/${id}/connect`, { server_id: serverId });
    return res.data;
  },

  async disconnectDevice(id: string): Promise<void> {
    await api.delete(`/vpn/me/devices/${id}/disconnect`);
  },

  // Config & QR
  async getDeviceQR(id: string): Promise<{ qr_base64: string }> {
    const res = await api.get(`/vpn/me/devices/${id}/qr`);
    return res.data.data;
  },

  async downloadDeviceQR(id: string): Promise<Blob> {
    const res = await api.get(`/vpn/me/devices/${id}/qr/download`, { responseType: 'blob' });
    return res.data;
  },

  async downloadDeviceConfig(id: string): Promise<Blob> {
    const res = await api.get(`/vpn/me/devices/${id}/download`, { responseType: 'blob' });
    return res.data;
  },

  // Plan & Servers
  async getServers(): Promise<{ data: Server[] }> {
    const res = await api.get('/vpn/me/servers');
    return res.data;
  },

  async getPlanStatus(): Promise<PlanStatus> {
    const res = await api.get('/vpn/me/plan/status');
    return res.data.data;
  },

  // Security
  async getDeviceSecurity(id: string): Promise<DeviceSecurity> {
    const res = await api.get(`/vpn/me/devices/${id}/security`);
    return res.data.data;
  },

  async updateDeviceSecurity(id: string, data: Partial<DeviceSecurity>): Promise<void> {
    await api.put(`/vpn/me/devices/${id}/security`, data);
  },

  // Status & Stats
  async getDeviceStats(id: string): Promise<DeviceStats> {
    const res = await api.get(`/vpn/me/devices/${id}/stats`);
    return res.data.data;
  },

  async getDeviceRealtimeStats(id: string): Promise<RealtimeStats> {
    const res = await api.get(`/vpn/me/devices/${id}/stats/realtime`);
    return res.data.data;
  },
  
  // Stealth
  async getDeviceStealth(id: string): Promise<{ enabled: boolean; stealth_config?: any }> {
    const res = await api.get(`/vpn/me/devices/${id}/stealth`);
    return res.data.data;
  },

  async enableDeviceStealth(id: string, configId?: string): Promise<void> {
    await api.post(`/vpn/me/devices/${id}/stealth`, { stealth_config_id: configId });
  },

  async disableDeviceStealth(id: string): Promise<void> {
    await api.delete(`/vpn/me/devices/${id}/stealth`);
  }
};
