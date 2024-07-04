import { atom } from 'recoil';
import { Line } from '@/types/Line';
export const scrollState = atom({
    key: 'scrollState',
    default: 0,
});

export const readyState = atom({
    key: 'readyState',
    default: false,
});


export const lineState = atom<Partial<Line>>({
    key: 'lineState',
    default: {},
});

export const decorationContextState = atom({
    key: 'decorationContextState',
    default: {},
});