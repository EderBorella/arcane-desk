<script lang="ts">
	import { Button, Wisps } from '$lib/components'; // Assuming Button and Wisps are in $lib/components
	import { createEventDispatcher } from 'svelte';

	/** The main title text for the hero section. */
	export let titleText: string = 'Default Title';
	/** The subtitle text displayed below the main title. */
	export let subtitleText: string = 'Default subtitle text to engage users.';
	/** The text for the call-to-action button. */
	export let ctaButtonText: string = 'Get Started';
	/** The URL for the background image of the hero section. */
	export let backgroundImageUrl: string; // This prop is required
	/** Number of wisps to display in the hero section. */
	export let wispCount: number | undefined = undefined; // Undefined will use Wisps component's default

	const dispatch = createEventDispatcher();

	function handleCtaButtonClick() {
		dispatch('ctaClick');
	}
</script>

<section class="hero h-screen/2 relative overflow-hidden bg-stone-800 dark:bg-stone-900">
	<!-- Background Image Layer -->
	<div
		class="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 dark:opacity-30"
		style="background-image: url('{backgroundImageUrl}');"
		aria-hidden="true"
	></div>
	<!-- Darkening Overlay for mood and text contrast -->
	<div
		class="absolute inset-0 bg-gradient-to-br from-black/60 via-stone-900/40 to-black/70"
		aria-hidden="true"
	></div>

	<!-- Animated Wisps Container -->
	<Wisps count={wispCount} />

	<!-- Content -->
	<div
		class="relative z-[2] container mx-auto flex h-full flex-col items-center justify-center p-4 text-center"
	>
		<h1
			class="text-5xl font-bold text-amber-50 sm:text-6xl md:text-7xl"
			style="text-shadow: 2px 2px 5px rgba(0,0,0,0.7);"
		>
			{titleText}
		</h1>
		<p
			class="mt-4 max-w-xl text-lg text-amber-100 sm:text-xl md:text-2xl"
			style="text-shadow: 1px 1px 4px rgba(0,0,0,0.6);"
		>
			{subtitleText}
		</p>
		<div class="mt-8">
			<Button
				variant="primary"
				size="lg"
				className="text-stone-100 shadow-xl hover:shadow-amber-600/50 dark:hover:shadow-amber-500/50"
				on:click={handleCtaButtonClick}
			>
				{ctaButtonText}
			</Button>
		</div>
	</div>
</section>
