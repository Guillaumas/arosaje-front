import fetchFromAPI from './ApiService';

export const AuthService = {
    async login(email: string, password: string): Promise<any> {
        return fetchFromAPI('login', 'POST', { email, password });
    },
    async register(userData: any): Promise<any> {
        return fetchFromAPI('register', 'POST', userData);
    },
    async logout(): Promise<void> {
        return fetchFromAPI('logout');
    }
};
