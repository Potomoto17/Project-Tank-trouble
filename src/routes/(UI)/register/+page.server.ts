import type { Actions, PageServerLoad } from './$types';

let route: string = 'http://localhost';
let port: number = 8000;
let endpoint: string = `${route}:${port}`;

export const load: PageServerLoad = async ({ fetch }) => {
	const response = await fetch(endpoint);

	if (!response.ok) {
		throw new Error('Failed to fetch data from the server');
	}
	const data = await response.json();

	console.log(data);

	return {};
};

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

			const response = await fetch(endpoint, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password })
			});

			if (!response.ok) {
				return { success: false, error: 'Failed to register' };
			}

			return { success: true };
		} catch (error) {
			return { success: false, error: 'Something went wrong' };
		}
	}
};
