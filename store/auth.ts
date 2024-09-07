import { defineStore } from 'pinia';
import { WebApplication1Api, UsersApi, Configuration } from '~/api-client';

const apiClient = new WebApplication1Api();

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: useCookie('authToken').value,
    userId: useCookie('userId').value,
  }),
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
  },
  actions: {
    setToken(token: string) {
      this.token = `Bearer ${token}`;
      useCookie('authToken').value = this.token;
    },
    setUserId(userId: string) {
      this.userId = userId;
      useCookie('userId').value = this.userId;
    },
    async login(email: string, password: string) {
      try {
        const response = await apiClient.loginPost({
          loginRequest: { email, password },
        });
        console.log('Login response', response);
        if (response.accessToken) {
          this.setToken(response.accessToken);
          await this.fetchCurrentUserId();
        }
      } catch (error) {
        console.error('Failed to login:', error);
      }
    },
    async register(email: string, password: string) {
      try {
        await apiClient.registerPost({
          registerRequest: { email, password },
        });
        await this.login(email, password); // auto logIn after signUp
      } catch (error) {
        console.error('Failed to register:', error);
      }
    },
    async fetchCurrentUserId() {
      try {
        const apiClient = new UsersApi(
          new Configuration({
            apiKey: this.token as string,
          })
        );
        const userId = await apiClient.apiUsersCurrentUserIdGet();
        this.setUserId(userId);
      } catch (error) {
        console.error('Failed to fetch current user ID:', error);
      }
    },
    logout() {
      this.token = null;
      this.userId = null;
      useCookie('authToken').value = null;
      useCookie('userId').value = null;
    },
  },
});
