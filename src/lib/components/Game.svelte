<!-- src/lib/Game.svelte -->
<script lang="ts">
	import { initWebSocket } from '$lib/sockets/client';
	import { config } from '$lib/game/config';
	import Phaser from 'phaser';

	let game: Phaser.Game;

	$effect(() => {
		game = new Phaser.Game(config);
		const cleanup = initWebSocket('ws://localhost:8000');

		return () => {
			cleanup();
			game?.destroy(true);
		};
	});
</script>

<div id="game-container"></div>
