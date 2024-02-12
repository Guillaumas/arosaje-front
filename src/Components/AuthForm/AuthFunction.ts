
export const login = async (username: string, password: string) => {
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        if (response.status === 200) {
            const data = await response.json();
            localStorage.setItem('oauthToken', data.token);
            return data;
        } else {
            throw new Error('Login failed');
        }
    } catch (error) {
        throw error;
    }
};

export const isTokenExpired = async () => {
    const token = localStorage.getItem('oauthToken');

    if (!token) {
        return true;
    }

    try {
        const response = await fetch('/api/auth/checkToken', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.status !== 200;
    } catch (error) {
        return true;
    }
};