import { defineStore, storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
import type { Modals } from "~/types/ModalsTypes";

export const useModalStore = defineStore("modal", {
  state: (): { modals: Modals; modalData: string } => ({
    modals: {
      sale: false,
      trade: false,
      happy: false,
      credit: false,
    },
    modalData: "",
  }),
  actions: {
    openModal(modalName: keyof Modals, data?: string) {
      this.modals[modalName] = true;
      if (data) {
        this.modalData = data; 
      }
    },
    closeModal(modalName: keyof Modals) {
      const router = useRouter();
      const route = useRoute();

      this.modals[modalName] = false;
      this.modalData = ""; 
    },
    closeAllModals() {

      Object.keys(this.modals).forEach((modalName) => {
        this.modals[modalName as keyof Modals] = false;
      });
      this.modalData = ""; 
    },
  },
});

export const useModalStoreRefs = () => storeToRefs(useModalStore());
