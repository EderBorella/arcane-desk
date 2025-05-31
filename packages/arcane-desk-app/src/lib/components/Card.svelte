<script lang="ts">
	/**
	 * Card component with medieval fantasy styling
	 */
	export let variant = 'default'; // default, parchment, stone
	export let padding = 'default'; // none, small, default, large
	export let shadow = true;
	export let border = true;
	/** If provided, the entire card becomes a link to this URL. */
	export let href: string | undefined = undefined;
	/** The target attribute for the link, e.g., '_blank'. Only used if href is provided. */
	export let target: string | undefined = undefined;
	/**
	 * Enables hover effects (scale, shadow enhancement).
	 * Defaults to true if `href` is provided, false otherwise. Can be explicitly set.
	 */
	export let enableHoverEffect: boolean | undefined = undefined;
	export let className: string | null = null;

	// Compute classes based on props
	$: variantClasses = {
		default: 'bg-stone-50 dark:bg-stone-800',
		parchment: 'bg-amber-50 dark:bg-amber-900/30',
		stone: 'bg-stone-200 dark:bg-stone-900'
	}[variant];

	$: paddingClasses = {
		none: 'p-0',
		small: 'p-3',
		default: 'p-6',
		large: 'p-8'
	}[padding];

	$: shadowClass = shadow ? 'shadow-lg' : '';
	$: borderClass = border ? 'border-2 border-amber-800/20' : '';

	$: applyHover = enableHoverEffect === undefined ? !!href : enableHoverEffect;

	$: cardClasses = [
		className,
		variantClasses,
		paddingClasses,
		shadowClass,
		borderClass,
		'relative',
		'overflow-hidden',
		'rounded-lg', // This ensures the div itself is rounded
		"before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-b before:from-amber-700/5 before:to-transparent before:content-['']",
		applyHover ? 'group' : '', // Add group for child hover effects
		applyHover ? 'transition-all duration-300 ease-in-out' : '', // Adjusted duration and easing
		applyHover ? 'hover:scale-[1.03]' : '', // Slightly increased scale
		applyHover ? 'hover:-translate-y-1' : '', // Added upward lift
		applyHover && shadow ? 'hover:shadow-2xl' : '' // Enhanced shadow further
	]
		.filter(Boolean)
		.join(' ');
</script>

{#if href}
	<a
		{href}
		{target}
		class="block rounded-lg focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:outline-none dark:focus:ring-offset-stone-900"
		aria-label={$$slots.default ? undefined : 'Card link'}
	>
		<div class={cardClasses}>
			<!-- Decorative corner elements for medieval style -->
			{#if border}
				<div
					class="absolute top-0 left-0 h-6 w-6 border-t-2 border-l-2 {applyHover
						? 'border-amber-700 transition-colors duration-300 group-hover:border-amber-500'
						: 'border-amber-700'}"
				></div>
				<div
					class="absolute top-0 right-0 h-6 w-6 border-t-2 border-r-2 {applyHover
						? 'border-amber-700 transition-colors duration-300 group-hover:border-amber-500'
						: 'border-amber-700'}"
				></div>
				<div
					class="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 {applyHover
						? 'border-amber-700 transition-colors duration-300 group-hover:border-amber-500'
						: 'border-amber-700'}"
				></div>
				<div
					class="absolute right-0 bottom-0 h-6 w-6 border-r-2 border-b-2 {applyHover
						? 'border-amber-700 transition-colors duration-300 group-hover:border-amber-500'
						: 'border-amber-700'}"
				></div>
			{/if}

			<div class="relative z-10">
				<slot />
			</div>
		</div>
	</a>
{:else}
	<div class={cardClasses}>
		<!-- Decorative corner elements for medieval style -->
		{#if border}
			<div
				class="absolute top-0 left-0 h-6 w-6 border-t-2 border-l-2 {applyHover
					? 'border-amber-700 transition-colors duration-300 group-hover:border-amber-500'
					: 'border-amber-700'}"
			></div>
			<div
				class="absolute top-0 right-0 h-6 w-6 border-t-2 border-r-2 {applyHover
					? 'border-amber-700 transition-colors duration-300 group-hover:border-amber-500'
					: 'border-amber-700'}"
			></div>
			<div
				class="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 {applyHover
					? 'border-amber-700 transition-colors duration-300 group-hover:border-amber-500'
					: 'border-amber-700'}"
			></div>
			<div
				class="absolute right-0 bottom-0 h-6 w-6 border-r-2 border-b-2 {applyHover
					? 'border-amber-700 transition-colors duration-300 group-hover:border-amber-500'
					: 'border-amber-700'}"
			></div>
		{/if}

		<div class="relative z-10">
			<slot />
		</div>
	</div>
{/if}
