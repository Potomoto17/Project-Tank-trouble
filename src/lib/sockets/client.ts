import { writable } from 'svelte/store';

export const socket = writable<WebSocket | null>(null);
export const messages = writable<string[]>([]);

export function initWebSocket(url: string) {
	const ws = new WebSocket(url);

	ws.addEventListener('open', () => {
		console.log('WebSocket connected');
	});

	ws.addEventListener('message', (event) => {
		messages.update((msgs) => [...msgs, event.data]);
	});

	socket.set(ws);

	return () => {
		ws.close();
		socket.set(null);
	};
}
