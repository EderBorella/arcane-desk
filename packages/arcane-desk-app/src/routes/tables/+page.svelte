<script lang="ts">
	import Menu from '$lib/components/Menu.svelte';
	import SearchFilter from '$lib/components/SearchFilter.svelte';
	import type { SearchCriteria } from '$lib/components/SearchFilter.svelte';
	import Card from '$lib/components/Card.svelte';
	import Table from '$lib/components/Table.svelte';
	import type { PageData } from './$types'; // Provides `data.tables` typed as `TableViewData[]`
	import type { TableViewData } from './+page.server'; // Import the specific type for clarity
	import { fade } from 'svelte/transition';

	export let data: PageData;

	let searchResults: TableViewData[] = data.tables; // Initialize with server-loaded data
	let isLoading: boolean = false;
	let searchError: string | null = null;
	let isInitialClientSearchCycle = true; // Flag to manage the first search call from SearchFilter

	async function handleSearchChange(criteria: SearchCriteria) {
		if (isInitialClientSearchCycle) {
			isInitialClientSearchCycle = false;
			// The SearchFilter component calls this on mount.
			// If its initial criteria (e.g., empty searchTerm) would result in fetching all tables,
			// and our API endpoint for search also returns all tables for an empty search term,
			// then we've already loaded this data via +page.server.ts.
			// Thus, we can skip this very first client-side fetch.
			if (criteria.searchTerm.trim() === '') {
				// console.log('Skipping redundant initial client-side fetch for all tables.');
				// Ensure searchResults are from the initial server load.
				searchResults = data.tables; // Re-affirm if necessary, though it should be set.
				return;
			}
		}
		isLoading = true;
		searchError = null;
		try {
			const response = await fetch('/api/tables/search', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(criteria)
			});

			if (!response.ok) {
				let errorMessage = `Error ${response.status}: ${response.statusText}`;
				try {
					const errorData = await response.json();
					if (errorData && errorData.message) {
						errorMessage = errorData.message;
					}
				} catch (e) {
					// If error response is not JSON, use the default message
				}
				throw new Error(errorMessage);
			}

			const results: TableViewData[] = await response.json();
			searchResults = results;
		} catch (err: any) {
			console.error('Search failed:', err);
			searchError = err.message || 'An unknown error occurred while searching the ancient texts.';
			searchResults = []; // Clear results on error
		} finally {
			isLoading = false;
		}
	}

	// Initial criteria for SearchFilter.
	// The SearchFilter component will call onSearchChange on mount with these.
	const initialCriteriaForFilter = {
		searchTerm: '',
		searchByName: true,
		searchByTag: true,
		searchByBook: false,
		searchBySystem: false
	};

	// The SearchFilter component calls `onSearchChange` on mount due to its reactive nature.
	// This means an initial client-side search will occur. If `initialCriteriaForFilter`
	// (e.g., empty search term) results in fetching all tables, it might re-fetch what
	// `+page.server.ts` already loaded. This is generally acceptable.
</script>

<Menu />

<main class="container mx-auto min-h-screen px-4 py-8 pt-24 text-stone-800 dark:text-stone-200">
	<header class="mb-10 text-center">
		<h1 class="font-serif text-4xl font-bold text-amber-600 md:text-5xl dark:text-amber-400">
			Seek Arcane Tables
		</h1>
		<p class="mt-3 text-lg text-stone-600 dark:text-stone-400">
			Uncover forgotten lore from the depths of the archives.
		</p>
	</header>

	<SearchFilter
		onSearchChange={handleSearchChange}
		initialSearchTerm={initialCriteriaForFilter.searchTerm}
		initialSearchByName={initialCriteriaForFilter.searchByName}
		initialSearchByTag={initialCriteriaForFilter.searchByTag}
		initialSearchByBook={initialCriteriaForFilter.searchByBook}
		initialSearchBySystem={initialCriteriaForFilter.searchBySystem}
	/>

	{#if isLoading}
		<div
			transition:fade={{ duration: 150 }}
			class="my-8 p-6 text-center font-serif text-lg text-amber-700 dark:text-amber-500"
		>
			<svg
				class="mx-auto mb-3 h-12 w-12 animate-spin text-amber-500 dark:text-amber-400"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
			>
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
				></circle>
				<path
					class="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				></path>
			</svg>
			Consulting the ancient oracles...
		</div>
	{/if}

	{#if searchError && !isLoading}
		<div
			transition:fade={{ duration: 150 }}
			class="my-8 rounded-lg border border-red-500/50 bg-red-50 p-6 text-center text-red-700 shadow-md dark:border-red-700/60 dark:bg-red-900/30 dark:text-red-300"
		>
			<h3 class="mb-2 font-serif text-xl font-semibold">A Shadow Falls!</h3>
			<p>{searchError}</p>
		</div>
	{/if}

	{#if !isLoading && !searchError}
		<div transition:fade={{ duration: 300 }}>
			{#if searchResults && searchResults.length > 0}
				<div class="grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-1">
					{#each searchResults as result (result._id)}
						<Card variant="parchment" border={true} shadow={true} className="flex flex-col">
							<div class="p-5">
								<h2
									class="mb-2 font-serif text-2xl font-semibold text-amber-700 dark:text-amber-400"
								>
									{result.name}
								</h2>
								<p class="mb-1 text-sm text-stone-600 dark:text-stone-400">
									<strong>System:</strong>
									{result.rpgSystem}
								</p>
								<p class="mb-1 text-sm text-stone-600 dark:text-stone-400">
									<strong>Source:</strong>
									{result.sourceBook}
									{#if result.sourceReference}({result.sourceReference}){/if}
								</p>
								{#if result.description}
									<p class="mt-3 mb-3 text-sm text-stone-700 dark:text-stone-300">
										{result.description}
									</p>
								{/if}
								<Table columns={result.table.columns} values={result.table.values} />
							</div>
						</Card>
					{/each}
				</div>
			{:else}
				<div class="my-8 p-6 text-center text-stone-500 italic dark:text-stone-400">
					The archives yield no tables matching your query. Perhaps try a different incantation?
				</div>
			{/if}
		</div>
	{/if}
</main>
