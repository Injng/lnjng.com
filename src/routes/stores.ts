import { writable, type Writable } from 'svelte/store';
import { getStorage } from './storageAdapter';

type TermState = 0 | 1;

const createPersistentStore = <T>(key: string, startValue: T): Writable<T> => {
    const storage = getStorage();

    const initialValue: T = storage.getItem(key) !== null
        ? JSON.parse(storage.getItem(key) as string)
        : startValue;

        const store = writable<T>(initialValue);

        store.subscribe(value => {
            storage.setItem(key, JSON.stringify(value));
        });

        return store;
};

export const isTerm: Writable<TermState> = createPersistentStore<TermState>('isTerm', 0);

