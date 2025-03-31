import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

let route: string = 'http://localhost';
let port: number = 8001;
let endpoint: string = `${route}:${port}/user/login`;

export const actions: Actions = {
	login: async ({ request }) => {
		try {
			const data = await request.formData();
			const username = data.get('username')?.toString();
			const password = data.get('password')?.toString();

			// ✅ Preverimo, če so vsa polja izpolnjena
			if (!username || !password) {
				return fail(400, { fieldMissing: true });
			}

			const response = await fetch(endpoint, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password })
			});

			const responseText = await response.text();
			const responseData = JSON.parse(responseText);

			// Logiraj odgovor za debugging
			console.log('Server Response:', responseData);

			// Če je prišlo do napake pri registraciji
			if (!response.ok) {
				return fail(400, { error: `Failed to register: ${response.statusText}` });
			}
		} catch (error) {
			console.error('Fetch error:', error);
			return fail(500, { error: 'Something went wrong' });
		}

		// ✅ Preusmeritev na /login po uspešni registraciji
		throw redirect(303, '/game');
	}
};
