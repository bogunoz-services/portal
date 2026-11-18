import {wsClient} from "@/services/web-socket/ws-client.ts";
import {dataStore} from "@/stores/data-store.ts";

export const startRealtime = (): (() => void) => {
    wsClient.connect({
        onOpen: () => {
            void dataStore.getExperimentHistory().catch(() => {});
        },
    });

    const stopListening = dataStore.startListeningExperimentStatus();

    return () => {
        stopListening();
        wsClient.disconnect();
    };
};