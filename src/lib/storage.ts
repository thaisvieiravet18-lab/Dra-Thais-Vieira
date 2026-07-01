// Safe wrapper for localStorage and sessionStorage to prevent SecurityError in Safari inside cross-site iFrames.

export const safeLocalStorage = {
  getItem(key: string): string | null {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      console.warn("Storage access denied or failed in this browser environment:", e);
      return null;
    }
  },
  setItem(key: string, value: string): void {
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      console.warn("Storage write denied or failed in this browser environment:", e);
    }
  },
  removeItem(key: string): void {
    try {
      window.localStorage.removeItem(key);
    } catch (e) {
      console.warn("Storage remove denied or failed in this browser environment:", e);
    }
  }
};

export const safeSessionStorage = {
  getItem(key: string): string | null {
    try {
      return window.sessionStorage.getItem(key);
    } catch (e) {
      console.warn("Session storage access denied or failed in this browser environment:", e);
      return null;
    }
  },
  setItem(key: string, value: string): void {
    try {
      window.sessionStorage.setItem(key, value);
    } catch (e) {
      console.warn("Session storage write denied or failed in this browser environment:", e);
    }
  },
  removeItem(key: string): void {
    try {
      window.sessionStorage.removeItem(key);
    } catch (e) {
      console.warn("Session storage remove denied or failed in this browser environment:", e);
    }
  }
};
