<script lang="ts">
	import { FeaturesSection, HeroSection, Footer } from '$lib/components'; // Added Footer
	import heroImage from '$lib/media/Web Banner.jpg';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';

	const pageHeroTitle = 'Arcane Desk';
	const pageHeroSubtitle = 'Unleash the full potential of your tabletop role-playing games';
	const ctaText = 'Sign up for free';

	const pageFeatures = [
		{
			title: 'Dynamic Table Organizer',
			description: 'Effortlessly manage all your crucial game information.'
		},
		{ title: 'Integrated Dice Roller', description: 'Leave your physical dice at home!' },
		{ title: 'Customizable Character Sheets', description: 'Tailor your character to your liking.' }
	]; // Renamed to avoid conflict if FeaturesSection used 'features' internally for something else

	let pageIsExiting = false;

	function handleSignUpClick() {
		if (pageIsExiting) return; // Prevent multiple triggers
		pageIsExiting = true;
	}

	function onPageContentOutroEnd() {
		// Navigate after the fade-out animation completes
		if (pageIsExiting) {
			goto('/register');
		}
	}
</script>

<main class="container mx-auto p-4">
	{#if !pageIsExiting}
		<!-- This conditional block wraps the main content that will fade -->
		<div
			in:fade={{ duration: 500, delay: 100 }}
			out:fade={{ duration: 300 }}
			on:outroend={onPageContentOutroEnd}
		>
			<HeroSection
				titleText={pageHeroTitle}
				subtitleText={pageHeroSubtitle}
				ctaButtonText={ctaText}
				backgroundImageUrl={heroImage}
				on:ctaClick={handleSignUpClick}
				wispCount={16}
			/>

			<FeaturesSection features={pageFeatures} />
			<Footer />
		</div>
	{/if}
</main>

<style>
</style>
