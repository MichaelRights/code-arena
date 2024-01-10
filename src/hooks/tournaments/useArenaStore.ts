import { create } from "zustand";

interface ArenaStore {
  name: string;
  changeName: () => void;
}

export const useArenaStore = create<ArenaStore>((set) => ({
  name: "Name 1",
  changeName: () => {
    set({ name: "other" });
  },
}));
