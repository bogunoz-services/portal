import { LogoMap } from "@/models/device/logo-map.ts";

export type LogoKey = keyof typeof LogoMap;

export interface Device {
    hash: string;
    name: string;
    logo: string;
    resource_address: string;
    voltage_slot: string;
    voltage_channel: string;
    port: string;
}

export type StoredDevice = Device;