import fetchFromAPI from './ApiService';

export const AuthService = {
    async login(email: string, password: string): Promise<any> {
        return fetchFromAPI('auth/signin', 'POST', JSON.stringify({email, password}), {
            'Content-Type': 'application/json'
        });
    },
    async register(userData: any): Promise<any> {
        return fetchFromAPI('auth/signup', 'POST', JSON.stringify(userData), {
            'Content-Type': 'application/json'
        });
    },
    async logout(): Promise<void> {
        return fetchFromAPI('logout');
    }
};