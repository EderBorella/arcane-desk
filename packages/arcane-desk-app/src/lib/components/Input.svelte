<script lang="ts">
	/**
	 * Input component with medieval fantasy styling
	 */
	export let type = 'text';
	export let name = '';
	export let value = '';
	export let placeholder = '';
	export let required = false;
	export let disabled = false;
	export let label = '';
	export let error = '';
	export let fullWidth = true;
</script>

<div class="mb-4 {fullWidth ? 'w-full' : ''}">
	{#if label}
		<label for={name} class="block mb-2 text-sm font-medium text-stone-800 dark:text-stone-200">
			{label}
			{#if required}
				<span class="text-red-600">*</span>
			{/if}
		</label>
	{/if}
	
	<input
		{type}
		{name}
		{placeholder}
		{required}
		{disabled}
		bind:value
		id={name}
		class="w-full px-4 py-2 bg-stone-100 border-2 border-stone-300 rounded-md 
		focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500
		disabled:bg-stone-200 disabled:text-stone-500 disabled:cursor-not-allowed
		placeholder:text-stone-400 placeholder:italic
		{error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}"
	/>
	
	{#if error}
		<p class="mt-1 text-sm text-red-600">{error}</p>
	{/if}
</div>
