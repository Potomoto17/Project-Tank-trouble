import type { Actions, PageServerLoad } from './$types';

let route: string = 'http://localhost';
let port: number = 8001;
let endpoint: string = `${route}:${port}/user/register`;

export const actions: Actions = {
	register: async ({ request }) => {
		try {
			const data = await request.formData();
			const email = data.get('email');
			const password = data.get('password');
			const repPassword = data.get('repeatPassword');

			if (!email || !password || !repPassword) {
				return { success: false, error: 'All fields are required' };
			}

			if (password !== repPassword) {
				return { success: false, error: 'Passwords do not match' };
			}

			console.log('Sending request to:', endpoint);

			const response = await fetch(endpoint, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password })
			});

			const responseText = await response.text(); // Read response as text

			console.log('Server response status:', response.status);
			console.log('Server response body:', responseText);

			if (!response.ok) {
				return { success: false, error: `Failed to register: ${response.statusText}` };
			}

			// Try parsing JSON (in case response is not valid JSON, catch the error)
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
