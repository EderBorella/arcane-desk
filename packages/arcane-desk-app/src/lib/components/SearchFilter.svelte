<script module lang="ts">
	// Interface for the dispatched event detail, also usable by parent components
	export interface SearchCriteria {
		searchTerm: string;
		searchByName: boolean;
		searchByTag: boolean;
		searchByBook: boolean;
		searchBySystem: boolean;
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';

	/**
	 * SearchFilter component for GameTable entities.
	 * Calls the `onSearchChange` callback with SearchCriteria.
	 */

	// Props for initial state - can be bound from parent
	export let initialSearchTerm: string = '';
	export let initialSearchByName: boolean = true; // Default to searching by name
	export let initialSearchByTag: boolean = false;
	export let initialSearchByBook: boolean = false;
	export let initialSearchBySystem: boolean = false;

	// Callback prop for when search criteria change
	export let onSearchChange: (criteria: SearchCriteria) => void = () => {};

	let searchTerm: string = initialSearchTerm;
	let searchByName: boolean = initialSearchByName;
	let searchByTag: boolean = initialSearchByTag;
	let searchByBook: boolean = initialSearchByBook;
	let searchBySystem: boolean = initialSearchBySystem;

	let effectiveSearchTerm = searchTerm; // This will be the debounced value
	let debounceTimeout: ReturnType<typeof setTimeout>;

	// Debounce searchTerm changes to avoid excessive event dispatches while typing
	$: {
		clearTimeout(debounceTimeout);
		debounceTimeout = setTimeout(() => {
			effectiveSearchTerm = searchTerm;
		}, 300); // 300ms delay
	}

	// Call onSearchChange whenever effectiveSearchTerm or any checkbox changes
	$: {
		// This reactive block will run when effectiveSearchTerm changes (after debounce),
		// or when any of the searchBy... booleans change directly.
		const criteria: SearchCriteria = {
			searchTerm: effectiveSearchTerm,
			searchByName,
			searchByTag,
			searchByBook,
			searchBySystem
		};
		onSearchChange(criteria);
	}

	// Ensure initial dispatch if needed, though the reactive block handles it
	onMount(() => {
		// The reactive block `$: { ... }` will trigger on mount due to initialization
		// so an explicit dispatch here might be redundant unless specific timing is needed.
		// For now, relying on the reactive nature of Svelte.
	});
</script>

<div
	class="my-4 rounded-lg border border-stone-300 bg-stone-100 p-4 shadow-lg dark:border-stone-700 dark:bg-stone-800/60"
>
	<div class="mb-4">
		<label
			for="arcane-search-term"
			class="mb-1 block font-serif text-sm font-medium tracking-wide text-amber-800 dark:text-amber-400"
		>
			Seek Arcane Knowledge
		</label>
		<input
			type="text"
			id="arcane-search-term"
			bind:value={searchTerm}
			placeholder="Enter keywords, names, tags..."
			class="w-full rounded-md border border-stone-400 bg-white px-4 py-2 text-stone-900 placeholder-stone-500 shadow-sm transition-colors focus:border-amber-500 focus:ring-2 focus:ring-amber-500 focus:outline-none dark:border-stone-600 dark:bg-stone-700 dark:text-stone-100 dark:placeholder-stone-400"
		/>
	</div>

	<div class="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4">
		{#each [{ label: 'By Name', bindValue: searchByName, update: (val: boolean) => (searchByName = val) }, { label: 'By Tag', bindValue: searchByTag, update: (val: boolean) => (searchByTag = val) }, { label: 'By Book', bindValue: searchByBook, update: (val: boolean) => (searchByBook = val) }, { label: 'By System', bindValue: searchBySystem, update: (val: boolean) => (searchBySystem = val) }] as item}
			<div>
				<label
					class="flex cursor-pointer items-center space-x-2 text-sm text-stone-700 transition-colors hover:text-amber-700 dark:text-stone-300 dark:hover:text-amber-400"
				>
					<input
						type="checkbox"
						checked={item.bindValue}
						on:change={(e) => item.update(e.currentTarget.checked)}
						class="form-checkbox h-4 w-4 rounded border-stone-400 bg-stone-200 text-amber-600 transition-colors focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-stone-100 dark:border-stone-500 dark:bg-stone-600 dark:text-amber-500 dark:focus:ring-amber-600 dark:focus:ring-offset-stone-800"
					/>
					<span>{item.label}</span>
				</label>
			</div>
		{/each}
	</div>
</div>
