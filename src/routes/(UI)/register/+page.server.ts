import type { Actions } from './$types';

let route: string = 'http://localhost';
let port: number = 8001;
let endpoint: string = `${route}:${port}/user/register`;

export const actions: Actions = {
	register: async ({ request }) => {
		try {
			const data = await request.formData();
			const username = data.get('username');
			const password = data.get('password');
			const newpass = data.get('newpass');

			if (!username || !password || !newpass) {
				return { success: false, error: 'All fields are required' };
			}

			if (password !== newpass) {
				return { success: false, error: 'Passwords do not match' };
			}

			console.log('Sending request to:', endpoint);

			const response = await fetch(endpoint, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password })
			});

			const responseText = await response.text();

			if (!response.ok) {
				return { success: false, error: `Failed to register: ${response.statusText}` };
			}

			try {
				const responseData = JSON.parse(responseText);
				return { success: true, data: responseData };
			} catch (jsonError) {
				return { success: false, error: 'Invalid JSON response from server' };
			}
		} catch (error) {
			console.error('Fetch error:', error);
			return { success: false, error: 'Something went wrong' };
		}
	}
};
