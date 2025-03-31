import type { Actions } from '@sveltejs/kit';

let route: string = 'http://localhost';
let port: number = 8001;
let endpoint: string = `${route}:${port}/user/login`;

export const actions: Actions = {
	login: async ({ request }) => {
		try {
			const data = await request.formData();
			const username = data.get('username');
			const password = data.get('password');

			if (!username || !password) {
				return { success: false, error: 'All fields are required' };
			}

			console.log('Sending request to:', endpoint);

			const response = await fetch(endpoint, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password })
			});

			const responseText = await response.text();

			console.log('Server response status:', response.status);
			console.log('Server response body:', responseText);

			if (!response.ok) {
				return { success: false, error: `Failed to login: ${response.statusText}` };
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
