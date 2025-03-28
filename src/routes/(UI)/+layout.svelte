<script lang="ts">
	import MainBtn from '$lib/components/MainBtn.svelte';

	let { children } = $props();
</script>

<header
	class="bg-dabBrown font-workSans text-blueNyanza absolute top-0 left-0 z-10 flex w-full items-center justify-between px-[5vw] py-4"
>
	<a href="/" class="text-2xl font-bold italic duration-150 ease-in-out hover:opacity-80"
		>TankTrouble</a
	>
	<nav class="flex items-center gap-4 text-lg">
		<a href="/" class="transition-all duration-150 ease-in-out hover:opacity-80">Leaderboard</a>
		<a href="/profile" class="transition-all duration-150 ease-in-out hover:opacity-80">Profile</a>
	</nav>
</header>
<main class="font-workSans">
	{@render children()}
</main>
