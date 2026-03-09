export type DeviceType = 'mobile' | 'desktop' | 'router' | 'other';
export type OSType = 'android' | 'ios' | 'windows' | 'linux' | 'macos' | 'other';

export interface Device {
  id: string;
  name: string;
  device_type: DeviceType;
  os_type: OSType;
  description?: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
  client?: any; // The VPN connection details if connected
  is_online?: boolean; // Real-time connection status
}

export interface Server {
  id: string;
  name: string;
  hostname: string;
  region: string;
  country_code: string;
  status: 'active' | 'maintenance' | 'offline';
  current_load?: number;
  features: {
    supports_stealth: boolean;
    supports_streaming: boolean;
    supports_p2p: boolean;
  };
}

export interface PlanStatus {
  devices_used: number;
  devices_limit: number;
  bandwidth_used_bytes: number;
  bandwidth_limit_bytes: number;
}

export interface DeviceSecurity {
  enable_adblock: boolean;
  enable_malware_filter: boolean;
  enable_killswitch: boolean;
  enable_ip_rotation: boolean;
}

export interface DeviceStats {
  tx_bytes: number;
  rx_bytes: number;
  last_seen?: string;
}

export interface RealtimeStats {
  tx_rate_kbps: number;
  rx_rate_kbps: number;
}
