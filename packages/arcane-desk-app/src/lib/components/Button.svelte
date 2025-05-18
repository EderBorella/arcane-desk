<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	/**
	 * Button component with medieval fantasy styling
	 */
	export let type: HTMLButtonAttributes['type'] = 'button';
	export let variant = 'primary'; // primary, secondary, danger
	export let size = 'md'; // sm, md, lg
	export let disabled = false;
	export let fullWidth = false;
	export let className: string | null = null;

	// Compute classes based on props
	$: variantClasses = {
		primary: 'bg-amber-700 hover:bg-amber-800 text-amber-50 border-amber-900',
		secondary: 'bg-stone-700 hover:bg-stone-800 text-stone-50 border-stone-900',
		danger: 'bg-red-700 hover:bg-red-800 text-red-50 border-red-900'
	}[variant];

	$: sizeClasses = {
		sm: 'text-sm py-1 px-3',
		md: 'text-base py-2 px-4',
		lg: 'text-lg py-3 px-6'
	}[size];

	$: widthClass = fullWidth ? 'w-full' : '';
</script>

<button
	{type}
	{disabled}
	class="{className} {variantClasses} {sizeClasses} {widthClass} focus:ring-opacity-50 transform rounded border-2
	font-medium tracking-wider uppercase shadow-md transition-all
	duration-200 hover:scale-[1.02] focus:ring-2
	focus:ring-amber-500 focus:outline-none active:scale-[0.98] disabled:cursor-not-allowed
	disabled:opacity-50 disabled:hover:scale-100"
	on:click
>
	<slot />
</button>
