interface Storage {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
}

class MemoryStorage implements Storage {
    private store: { [key: string]: string } = {};

    getItem(key: string): string | null {
        return this.store[key] || null;
    }

    setItem(key: string, value: string): void {
        this.store[key] = value;
    }
}

export const getStorage = (): Storage => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        return localStorage;
    }
    return new MemoryStorage();
};
