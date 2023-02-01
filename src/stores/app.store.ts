import { defineStore } from 'pinia';

export const useAppStore = defineStore('appStore', {
    state: () => ({
        isInPrivateMessage: false,
        pending: false,
        layoutPending: false
    }),
    actions: {
        setPending(pending: boolean) {
            this.pending = pending;
        },
        setLayoutPending(layoutPending: boolean) {
            this.layoutPending = layoutPending;
        }
    }
});
