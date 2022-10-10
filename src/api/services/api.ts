import { nanoid } from "nanoid";

const APIService = {
  async createAPIKey() {
    const key = nanoid(32);

    return key;
  },
  async verifyAPIKey(key: string) {
    try {
      return key === "example-api-key";
    } catch (error) {
      return false;
    }
  },
};

export default APIService;
