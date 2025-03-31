<script lang="ts">
	type props = {
		href?: string;
		text: string;
		addClass?: string;
		type?: string;
	};

	let { href, text, addClass, type }: props = $props();
</script>

{#if type === 'submit' && type !== null}
	<button
		type="submit"
		class="bg-blueKeppel border-blueNyanza cursor-pointer rounded-2xl border-2 p-2 text-center text-lg font-bold text-black uppercase transition-all duration-150 ease-in-out hover:opacity-80 {addClass}"
		>{text}</button
	>
{:else}
	<a
		{href}
		class="bg-blueKeppel border-blueNyanza cursor-pointer rounded-2xl border-2 p-2 text-center text-lg font-bold text-black uppercase transition-all duration-150 ease-in-out hover:opacity-80 {addClass}"
		>{text}</a
	>
{/if}
