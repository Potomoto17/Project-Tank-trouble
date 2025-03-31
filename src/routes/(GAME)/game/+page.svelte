<script lang="ts">
	import Game from '$lib/components/Game.svelte';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	let isAsideOpen = $state(true);

	function toggleAside() {
		isAsideOpen = !isAsideOpen;
	}
</script>

<section class="gameBg bg-blueNyanza flex h-screen min-h-screen">
	<aside
		class="bg-dabBrown2 text-blueNyanza h-full overflow-hidden py-8 font-bold transition-all duration-150 ease-in-out"
		class:w-[0vw]={!isAsideOpen}
		class:w-[25vw]={isAsideOpen}
		class:opacity-0={!isAsideOpen}
		class:opacity-100={isAsideOpen}
		class:p-8={isAsideOpen}
		class:py-0={!isAsideOpen}
	>
		<div class="flex justify-between text-2xl">
			<h1>Side Menu</h1>
			<button onclick={toggleAside} class="cursor-pointer">&RightArrowLeftArrow;</button>
		</div>
	</aside>

	<button
		onclick={toggleAside}
		class:opacity-0={isAsideOpen}
		class:hidden={isAsideOpen}
		class="bg-hunterGreen hover:bg-opacity-90 absolute top-5 left-0 z-10 cursor-pointer rounded-r-2xl p-4 text-2xl text-white transition-all duration-150"
	>
		&RightArrowLeftArrow;
	</button>

	<div
		class="border-hunterGreen relative h-full border-4 transition-all duration-150"
		class:w-[100vw]={!isAsideOpen}
		class:w-[75vw]={isAsideOpen}
	>
		<header class="absolute top-0 right-0 left-0 p-4" class:pl-16={!isAsideOpen}>
			<div class="flex gap-4 text-xl font-bold text-white">
				<div class="bg-hunterGreen flex flex-1 items-center justify-between gap-2 rounded-2xl p-4">
					<p>PLAYER 1</p>
					<p>2 : 3</p>
					<p>PLAYER 2</p>
				</div>
				<div class="bg-hunterGreen flex w-max items-center gap-2 rounded-2xl p-4">
					<a class="transition-all duration-150 ease-in-out hover:opacity-80" href="/profile"
						><img class="h-6 w-6" src="/src/lib/assets/ui/icons/ic_profile.png" alt="Profile" /></a
					>
					<a class="transition-all duration-150 ease-in-out hover:opacity-80" href="/pause"
						><img class="h-8 w-8" src="/src/lib/assets/ui/icons/ic_pause.png" alt="Pause" /></a
					>
				</div>
			</div>
		</header>
		<Game />
	</div>
</section>

<style>
	.gameBg {
		background-image: url('/src/lib/assets/game/backgrounds/Mathematics.png');
		background-size: cover;
		background-position: center;
	}
</style>
