<script lang="ts">
	import type { HTMLFormAttributes } from 'svelte/elements';

	/**
	 * Form component with medieval fantasy styling
	 */
	export let method: HTMLFormAttributes['method'] = 'post';
	export let action = '';
	export let noValidate = false;
	export let useEnhance = true;
</script>

<form
	{method}
	{action}
	novalidate={noValidate}
	class="relative mx-auto w-full max-w-md overflow-hidden rounded-lg border-2
	border-amber-800/20 bg-stone-50 p-6 shadow-lg
	backdrop-blur-sm before:pointer-events-none
	before:absolute before:inset-0 before:bg-gradient-to-b before:from-amber-700/5 before:to-transparent before:content-[''] dark:bg-stone-800"
>
	<div class="relative z-10 space-y-4">
		<slot />
	</div>

	<!-- Decorative corner elements for medieval style -->
	<div class="absolute top-0 left-0 h-6 w-6 border-t-2 border-l-2 border-amber-700"></div>
	<div class="absolute top-0 right-0 h-6 w-6 border-t-2 border-r-2 border-amber-700"></div>
	<div class="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-amber-700"></div>
	<div class="absolute right-0 bottom-0 h-6 w-6 border-r-2 border-b-2 border-amber-700"></div>
</form>
