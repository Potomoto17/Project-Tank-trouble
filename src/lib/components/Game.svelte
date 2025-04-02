<script lang="ts">
	import { initWebSocket } from '$lib/sockets/client';
	import { config } from '$lib/game/config';
	import Phaser from 'phaser';

	let game: Phaser.Game;
	let endpoint = 'ws://localhost:8000';

	$effect(() => {
		game = new Phaser.Game(config);
		const cleanup = initWebSocket(endpoint);

		return () => {
			cleanup();
			game?.destroy(true);
		};
	});
</script>

<div id="game-container"></div>
