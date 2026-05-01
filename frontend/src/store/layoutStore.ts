import { create } from 'zustand';

export type MenuItem = 'home' | 'settings' | 'inquiry';

type LayoutStore = {
    currentMenu: MenuItem;
    setMenu: (menu: MenuItem) => void;
};

export const useLayoutStore = create<LayoutStore>((set) => ({
    currentMenu: 'home',
    setMenu: (menu: MenuItem) => set({ currentMenu: menu }),
}));
