<script module lang="ts">
	export interface FeatureItem {
		title: string;
		description: string;
		href?: string; // Optional: URL for the feature card to link to
		enableCardHoverEffect?: boolean; // Optional: Controls hover effect for this specific card
		target?: string; // Optional: Target attribute for the link eg. '_blank'
	}
</script>

<script lang="ts">
	import { Card } from '$lib/components'; // Assuming Card is in $lib/components

	/**
	 * An array of feature objects to display.
	 * Each object should have a `title` and `description`.
	 */
	export let features: FeatureItem[] = [];

	/**
	 * The main title for the features section.
	 */
	export let sectionTitle: string = 'Features';

	/**
	 * Maximum length for the feature title.
	 * If exceeded, text will be truncated with an ellipsis.
	 * Set to 0 or negative for no limit.
	 */
	export let maxTitleLength: number = 30;

	/**
	 * Maximum length for the feature description.
	 * If exceeded, text will be truncated with an ellipsis.
	 * Set to 0 or negative for no limit.
	 */
	export let maxDescriptionLength: number = 100;

	function truncateText(text: string, maxLength: number): string {
		if (maxLength > 0 && text.length > maxLength) {
			return text.substring(0, maxLength - 3) + '...';
		}
		return text;
	}
</script>

<section class="features bg-stone-100 py-12 dark:bg-stone-900">
	<div class="container mx-auto p-4">
		<h2 class="text-center text-3xl font-bold text-stone-900 sm:text-4xl dark:text-stone-100">
			{sectionTitle}
		</h2>
		{#if features.length > 0}
			<ul class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
				{#each features as feature (feature.title)}
					<li>
						<Card
							className="h-[10rem]"
							variant="default"
							padding="default"
							enableHoverEffect={feature.enableCardHoverEffect}
							href={feature.href}
						>
							<h3
								class="text-xl font-bold text-stone-900 dark:text-stone-100"
								title={feature.title}
							>
								{truncateText(feature.title, maxTitleLength)}
							</h3>
							<p
								class="mt-2 text-sm text-stone-600 sm:text-base dark:text-stone-400"
								title={feature.description}
							>
								{truncateText(feature.description, maxDescriptionLength)}
							</p>
						</Card>
					</li>
				{/each}
			</ul>
		{:else}
			<p class="mt-6 text-center text-stone-600 dark:text-stone-400">
				No features to display at the moment.
			</p>
		{/if}
	</div>
</section>
