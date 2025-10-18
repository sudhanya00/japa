/**
 * Web Storage Wrapper
 * Provides AsyncStorage-like API using localStorage for web
 */

class WebStorage {
  /**
   * Get item from localStorage
   */
  async getItem(key: string): Promise<string | null> {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error('WebStorage getItem error:', error);
      return null;
    }
  }

  /**
   * Set item in localStorage
   */
  async setItem(key: string, value: string): Promise<void> {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error('WebStorage setItem error:', error);
    }
  }

  /**
   * Remove item from localStorage
   */
  async removeItem(key: string): Promise<void> {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('WebStorage removeItem error:', error);
    }
  }

  /**
   * Clear all items from localStorage
   */
  async clear(): Promise<void> {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('WebStorage clear error:', error);
    }
  }

  /**
   * Get all keys from localStorage
   */
  async getAllKeys(): Promise<string[]> {
    try {
      return Object.keys(localStorage);
    } catch (error) {
      console.error('WebStorage getAllKeys error:', error);
      return [];
    }
  }
}

export default new WebStorage();
