import { defineStore } from "pinia";
import axios from "../lib/axios";
export const useAuthStore = defineStore({
  id: "auth",

  state: () => ({
    user: null,
  }),
  actions: {
    async getLoggedInUser() {
      let response = await axios.get("api/loggedin-user");
      if (response.data?.user !== null) {
        this.user = response?.data?.user;
      }
    },

    async login(email, password, rememberLogin) {
      const data = {
        email,
        password,
        rememberLogin,
      };
      const endpoint = "api/login";

      try {
        await axios.get("sanctum/csrf-cookie");
        const response = await axios.post(endpoint, data);
        this.user = response.data?.data?.user;
        this.router.push("/");
        return response;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async logout() {
      this.user = null;
      const logout = await axios.post("/api/logout", []);
      this.router.push("/login");
      return logout;
    },
  },
});
