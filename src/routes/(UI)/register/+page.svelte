<script lang="ts">
	import { enhance } from '$app/forms';
	import Input from '$lib/components/Input.svelte';
	import MainBtn from '$lib/components/MainBtn.svelte';
	import type { PageProps } from './$types';
	import { goto } from '$app/navigation';

	let { form }: PageProps = $props();
</script>

<section class="bgImg bg-dabBrown grid h-screen min-h-max place-items-center bg-cover p-[5vw]">
	<form
		action="?/register"
		method="POST"
		class="bg-dabBrown border-blueNyanza flex w-full flex-col gap-4 rounded-2xl border-2 p-8 md:w-max"
	>
		<h1 class="text-blueNyanza text-center text-4xl font-bold">REGISTER</h1>
		<div class="flex flex-col gap-2">
			<Input inputId="username" inputName="Username" inputType="username" />
			<Input inputId="password" inputName="Password" inputType="password" inputPlaceholder=" " />
			<Input
				inputId="repeatpassword"
				inputName="repeatpassword"
				inputType="password"
				inputPlaceholder=""
			/>
		</div>
		<MainBtn type="submit" text="Register" addClass={'mt-4'} />
		<MainBtn href="/login" text="Login" addClass={'mt-4'} />
		{#if form?.fieldMissing}<p>izpolnite vsa polja</p>{/if}
	</form>
</section>

<style>
	.bgImg {
		background-image: url('/src/lib/assets/ui/register_login_bg1.jpg');
	}
</style>
