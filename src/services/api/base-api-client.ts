
export enum BaseResponseType {
    Json = "json",
    Text = "text",
    ArrayBuffer = "arrayBuffer",
    Blob = "blob",
}

export interface RequestOptions extends RequestInit {
    responseType?: BaseResponseType;
}

export const createServiceClient = (baseUrl: string) => {
    return async function sendRequest<T>(
        endpoint: string,
        options: RequestOptions = {}
    ): Promise<T> {
        const { responseType = BaseResponseType.Json, ...requestOptions } = options;
        const isFormData = requestOptions.body instanceof FormData;

        const normalizedBase = baseUrl.replace(/\/+$/, "");
        const normalizedEndpoint = endpoint.replace(/^\/+/, "");

        const rawUrl = `${normalizedBase}/${normalizedEndpoint}`;

        let requestUrl: URL;

        try {
            requestUrl = new URL(rawUrl, window.location.origin);
        } catch (error) {
            console.error("Invalid API URL:", {
                baseUrl,
                endpoint,
                rawUrl,
                error,
            });
            throw error;
        }

        const config: RequestInit = {
            ...requestOptions,
            headers: {
                ...(!isFormData ? { "Content-Type": "application/json" } : {}),
                ...(requestOptions.headers || {}),
            },
        };

        console.log("API REQUEST:", {
            url: requestUrl.href,
            method: config.method ?? "GET",
        });

        try {
            const response = await fetch(requestUrl.href, config);

            if (!response.ok) {
                throw new Error(
                    `API error: ${response.status} ${response.statusText}`
                );
            }

            switch (responseType) {
                case BaseResponseType.ArrayBuffer:
                    return (await response.arrayBuffer()) as T;
                case BaseResponseType.Blob:
                    return (await response.blob()) as T;
                case BaseResponseType.Text:
                    return (await response.text()) as T;
                case BaseResponseType.Json:
                default:
                    return (await response.json()) as T;
            }
        } catch (error) {
            console.error("API fetch error:", error);
            throw error;
        }
    };
};
