import { create } from "zustand";

type Chat = {
  id: string;
  text: string;
  role: "ai" | "user";
};

interface GlobalState {
  hideSideBar: boolean;
  setHideSideBar: (v: boolean) => void;

  prompt: string;
  setPrompt: (v: string) => void;

  chats: Chat[];
  addChat: (v: Chat) => void;
  clearChats: () => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  hideSideBar: false,
  setHideSideBar: (v) => set(() => ({ hideSideBar: v })),

  prompt: "",
  setPrompt: (v) => set((state) => ({ prompt: v })),

  chats: [],
  addChat: (v) => set((state) => ({ chats: [...state.chats, v] })),
  clearChats: () => set(() => ({ chats: [] })),
}));
