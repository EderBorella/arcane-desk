<script lang="ts">
	/**
	 * Card component with medieval fantasy styling
	 */
	export let variant = 'default'; // default, parchment, stone
	export let padding = 'default'; // none, small, default, large
	export let shadow = true;
	export let border = true;
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
</script>

<div
	class="{className} {variantClasses} {paddingClasses} {shadowClass} {borderClass} relative
	overflow-hidden rounded-lg
	before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-b before:from-amber-700/5 before:to-transparent before:content-['']"
>
	<!-- Decorative corner elements for medieval style -->
	{#if border}
		<div class="absolute top-0 left-0 h-6 w-6 border-t-2 border-l-2 border-amber-700"></div>
		<div class="absolute top-0 right-0 h-6 w-6 border-t-2 border-r-2 border-amber-700"></div>
		<div class="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-amber-700"></div>
		<div class="absolute right-0 bottom-0 h-6 w-6 border-r-2 border-b-2 border-amber-700"></div>
	{/if}

	<div class="relative z-10">
		<slot />
	</div>
</div>
