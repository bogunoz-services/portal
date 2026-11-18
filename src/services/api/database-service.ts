import type {MeasurementFilter} from "@/models/measurement/measurement-filter.ts";
import type { MeasurementsPage } from "@/models/measurement/measurements-page.ts";
import type {MeasurementWire} from "@/models/measurement/measurement-wire.ts";
import type {WSClient} from "@/services/web-socket/base-ws-client.ts";
import {wsClient} from "@/services/web-socket/ws-client.ts";
import type {Device} from "@/models/device/device.ts";
import {dataPlatformApiClient} from "@/services/api/data-platform-api-client.ts";
import {BaseResponseType} from "@/services/api/base-api-client.ts";


export interface DatabaseServiceInterface {
    getDevice: (deviceHash: string) => Promise<Device>;
    getAllDevices: () => Promise<Device[]>;
    addNewDevice: (device: Omit<Device, "hash">) => Promise<string>;
    updateDevice: (device: Device) => Promise<string>;
    deleteDevice: (deviceHash: string) => Promise<void>;
    listMeasurements: (
        filters: MeasurementFilter[],
        pageIndex: number,
        pageSize: number,
    ) => Promise<MeasurementsPage>;
}

class DatabaseService implements DatabaseServiceInterface {
    private readonly client = dataPlatformApiClient;

    private readonly devicesUrl = "/api/v1/devices";
    private readonly measurementsUrl = "/api/v1/measurements";

    getDevice = async (deviceHash: string): Promise<Device> => {
        return await this.client<Device>(
            `${this.devicesUrl}/${encodeURIComponent(deviceHash)}`,
            {
                method: "GET",
                responseType: BaseResponseType.Json,
            }
        );
    };

    getAllDevices = async (): Promise<Device[]> => {
        return await this.client<Device[]>(
            `${this.devicesUrl}/get-all`,
            { method: "GET", responseType: BaseResponseType.Json }
        );
    };

    addNewDevice = async (device: Omit<Device, "hash">): Promise<string> => {
        const result = await this.client<{ hash: string }>(
            `${this.devicesUrl}/create`,
            {
                method: "POST",
                body: JSON.stringify(device),
                responseType: BaseResponseType.Json,
            }
        );
        return result.hash;
    };

    updateDevice = async (device: Device): Promise<string> => {
        const result = await this.client<{ hash: string }>(
            `${this.devicesUrl}/update`,
            {
                method: "PUT",
                body: JSON.stringify(device),
                responseType: BaseResponseType.Json,
            }
        );
        return result.hash;
    };

    deleteDevice = async (deviceHash: string): Promise<void> => {
        await this.client<void>(
            `${this.devicesUrl}/delete/${encodeURIComponent(deviceHash)}`,
            { method: "DELETE", responseType: BaseResponseType.Text }
        );
    };

    listMeasurements = async (
        filters: MeasurementFilter[],
        pageIndex: number,
        pageSize: number,
    ): Promise<MeasurementsPage> => {

        const page = await this.client<{
            items: MeasurementWire[];
            total: number;
            page_index: number;
            page_size: number;
        }>(
            `${this.measurementsUrl}/list-measurements`,
            {
                method: "POST",
                body: JSON.stringify({
                    filters,
                    page_index: pageIndex,
                    page_size: pageSize,
                }),
                responseType: BaseResponseType.Json,
            }
        );

        return {
            total: page.total,
            items: page.items.map(item => ({
                ...item,
                time: new Date(item.time),
            })),
        };
    };
}

export const databaseService = new DatabaseService();