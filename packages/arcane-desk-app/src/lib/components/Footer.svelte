<script lang="ts">
	// No props needed for this basic footer, but you could add them later
	// e.g., for a list of social links if they become dynamic.
</script>

<footer class="bg-stone-300 py-4 dark:bg-stone-600">
	<div class="container mx-auto flex flex-col items-center p-4 sm:flex-row sm:justify-between">
		<p class="text-sm text-stone-700 dark:text-stone-300">
			© {new Date().getFullYear()} Arcane Desk. All rights reserved.
		</p>
		<ul class="mt-4 flex space-x-4 sm:mt-0">
			<li>
				<a
					href="https://twitter.com/arcanedesk"
					class="text-stone-700 hover:text-amber-700 dark:text-stone-300 dark:hover:text-amber-500"
					target="_blank"
					rel="noopener noreferrer">Twitter</a
				>
			</li>
			<li>
				<a
					href="https://www.facebook.com/arcanedesk"
					class="text-stone-700 hover:text-amber-700 dark:text-stone-300 dark:hover:text-amber-500"
					target="_blank"
					rel="noopener noreferrer">Facebook</a
				>
			</li>
			<!-- Other social media links go here -->
		</ul>
	</div>
</footer>
