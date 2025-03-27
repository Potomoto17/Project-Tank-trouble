<section class="bgImg bg-dabBrown grid h-screen min-h-max place-items-center bg-cover p-[5vw]">
	<form
		action=""
		class="bg-dabBrown border-blueNyanza flex w-full flex-col rounded-2xl border-2 p-8 md:w-max"
	>
		<div class="flex flex-col items-start justify-center gap-1">
			<label for="username" class="text-blueNyanza font-bold">Username</label>
			<input
				class="bg-blueNyanza w-full rounded-2xl border-2 border-black p-2 text-black md:w-72"
				type="text"
				id="username"
				name="username"
				placeholder="Username"
			/>
		</div>
	</form>
</section>

<style>
	.bgImg {
		background-image: url('/src/lib/assets/ui/register_login_bg1.jpg');
	}
</style>
