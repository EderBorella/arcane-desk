<script lang="ts">
	/**
	 * Table component with medieval fantasy styling
	 */
	export let columns: string[] = [];
	export let values: (string | number | null)[][] = [];

	// Consider adding a prop for caption if needed in the future
	// export let caption: string | null = null;
</script>

<div
	class="my-6 overflow-x-auto rounded-md border border-stone-400 bg-stone-50 shadow-lg dark:border-stone-700 dark:bg-stone-800/30"
>
	<table class="min-w-full divide-y divide-stone-300 dark:divide-stone-600">
		{#if columns.length > 0}
			<thead class="bg-stone-100 dark:bg-stone-700/40">
				<tr>
					{#each columns as column}
						<th
							scope="col"
							class="px-6 py-3 text-left font-serif text-sm font-bold tracking-wider text-amber-900 uppercase dark:text-amber-400"
						>
							{column}
						</th>
					{/each}
				</tr>
			</thead>
		{/if}
		<tbody class="divide-y divide-stone-200 dark:divide-stone-700">
			{#each values as row, rowIndex}
				<tr
					class="{rowIndex % 2 === 0
						? 'bg-stone-50 dark:bg-stone-800/60'
						: 'bg-stone-100 dark:bg-stone-900/40'} transition-colors duration-150 ease-in-out hover:bg-amber-100/70 dark:hover:bg-amber-800/20"
				>
					{#each row as cell}
						<td class="px-6 py-4 text-sm whitespace-nowrap text-stone-700 dark:text-stone-300">
							{cell === null || cell === undefined ? '—' : cell}
						</td>
					{/each}
				</tr>
			{:else}
				<tr>
					<td
						colspan={columns.length || 1}
						class="px-6 py-4 text-center text-stone-500 dark:text-stone-400 italic"
					>
						No arcane scrolls found (no data).
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
