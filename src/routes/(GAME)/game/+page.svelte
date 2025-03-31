<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<section class="gameBg bg-blueNyanza flex h-screen min-h-screen">
	<aside class="bg-dabBrown2 h-full w-[25vw]">aside</aside>
	<div class="border-hunterGreen relative h-full w-[75vw] border-4">
		<header class="absolute m-4 flex w-full gap-4 text-xl font-bold text-white">
			<div class="bg-hunterGreen flex w-full items-center justify-between rounded-2xl p-4">
				<p>PLAYER 1</p>
				<p>2 : 3</p>
				<p>PLAYER 2</p>
			</div>
			<div class="bg-hunterGreen w-max rounded-2xl p-4">pausemenu</div>
		</header>
		<div class="mainUiasdasdasdasdasd"></div>
	</div>
</section>

<style>
	.gameBg {
		background-image: url('/src/lib/assets/game/backgrounds/Mathematics.png');
		background-size: cover;
		background-position: center;
	}
</style>
