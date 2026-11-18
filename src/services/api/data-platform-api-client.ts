import {createServiceClient} from "@/services/api/base-api-client.ts";

const getAPIUrl = () => {
    if (import.meta.env.VITE_DP_API_URL) {
        return import.meta.env.VITE_DP_API_URL;
    }
    return "";
};

export const dataPlatformApiClient = createServiceClient(getAPIUrl())