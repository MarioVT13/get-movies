import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface HelloMessageSeenState {
  isHelloMessageSeen: boolean;
  setHelloMessageSeen: (seen: boolean) => void;
}

export const useHelloMessageSeen = create<HelloMessageSeenState>()(
  persist(
    (set) => ({
      isHelloMessageSeen: false,
      setHelloMessageSeen: (seen) => set({ isHelloMessageSeen: seen }),
    }),
    {
      name: "hello-message-seen-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
