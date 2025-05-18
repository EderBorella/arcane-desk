<script lang="ts">
	/**
	 * Title component with medieval fantasy styling
	 */
	export let level = 1; // h1, h2, h3, h4, h5, h6
	export let align = 'left'; // left, center, right
	export let variant = 'primary'; // primary, secondary
	
	// Compute classes based on props
	$: alignClass = {
		left: 'text-left',
		center: 'text-center',
		right: 'text-right'
	}[align];
	
	$: variantClass = {
		primary: 'text-amber-900 dark:text-amber-400',
		secondary: 'text-stone-800 dark:text-stone-200'
	}[variant];
	
	$: sizeClass = {
		1: 'text-4xl md:text-5xl mb-6',
		2: 'text-3xl md:text-4xl mb-5',
		3: 'text-2xl md:text-3xl mb-4',
		4: 'text-xl md:text-2xl mb-3',
		5: 'text-lg md:text-xl mb-2',
		6: 'text-base md:text-lg mb-2'
	}[level];
</script>

{#if level === 1}
	<h1 class="{alignClass} {variantClass} {sizeClass} font-bold font-serif tracking-wide uppercase relative">
		<span class="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-amber-700 after:rounded">
			<slot />
		</span>
	</h1>
{:else if level === 2}
	<h2 class="{alignClass} {variantClass} {sizeClass} font-bold font-serif tracking-wide uppercase relative">
		<span class="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-amber-700 after:rounded">
			<slot />
		</span>
	</h2>
{:else if level === 3}
	<h3 class="{alignClass} {variantClass} {sizeClass} font-bold font-serif tracking-wide uppercase">
		<slot />
	</h3>
{:else if level === 4}
	<h4 class="{alignClass} {variantClass} {sizeClass} font-bold font-serif tracking-wide">
		<slot />
	</h4>
{:else if level === 5}
	<h5 class="{alignClass} {variantClass} {sizeClass} font-bold font-serif">
		<slot />
	</h5>
{:else}
	<h6 class="{alignClass} {variantClass} {sizeClass} font-bold">
		<slot />
	</h6>
{/if}
