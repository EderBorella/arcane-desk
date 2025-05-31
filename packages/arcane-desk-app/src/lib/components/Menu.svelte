<script lang="ts">
	/**
	 * Sticky navigation menu with medieval fantasy styling.
	 */
	import { page } from '$app/stores'; // To determine active link

	export let menuItems: { href: string; label: string }[] = [
		{ href: '/', label: 'Home' },
		{ href: '/tables', label: 'Table Finder' }, // Assuming this will be the route
		{ href: '/login', label: 'Login' } // Assuming this will be the route
	];

	// Reactive declaration to get the current path
	$: currentPath = $page.url.pathname;
</script>

<nav
	class="fixed top-0 right-0 left-0 z-50 border-b border-stone-700 bg-stone-800/90 shadow-lg backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80"
>
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<div class="flex items-center">
				<a
					href="/"
					class="font-serif text-2xl font-bold text-amber-500 transition-colors hover:text-amber-400 dark:text-amber-400 dark:hover:text-amber-300"
				>
					Arcane Desk
				</a>
			</div>
			<div class="hidden sm:ml-6 sm:flex sm:space-x-6">
				{#each menuItems as item}
					<a
						href={item.href}
						class="rounded-md px-3 py-2 text-sm font-medium transition-all duration-150 ease-in-out
                               {currentPath === item.href
							? 'bg-amber-600/20 text-amber-400 ring-1 ring-amber-500/50 dark:text-amber-300'
							: 'text-stone-300 hover:bg-stone-700/50 hover:text-amber-400 dark:text-stone-400 dark:hover:bg-gray-800/60 dark:hover:text-amber-300'}"
						aria-current={currentPath === item.href ? 'page' : undefined}
					>
						{item.label}
					</a>
				{/each}
			</div>
			<!-- Mobile menu button (placeholder for future enhancement) -->
			<div class="-mr-2 flex sm:hidden">
				<!-- Mobile menu button -->
				<button
					type="button"
					class="inline-flex items-center justify-center rounded-md p-2 text-stone-400 hover:bg-stone-700 hover:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none focus:ring-inset"
					aria-controls="mobile-menu"
					aria-expanded="false"
					on:click={() => console.log('Mobile menu clicked - implement me!')}
				>
					<span class="sr-only">Open main menu</span>
					<!-- Icon when menu is closed. Heroicon name: menu -->
					<svg
						class="block h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile menu, show/hide based on menu state (placeholder for future enhancement) -->
	<!-- <div class="sm:hidden" id="mobile-menu">
        <div class="px-2 pt-2 pb-3 space-y-1">
            {#each menuItems as item}
                <a href={item.href} class="block px-3 py-2 rounded-md text-base font-medium {currentPath === item.href ? 'bg-amber-600/20 text-amber-300' : 'text-stone-300 hover:bg-stone-700 hover:text-white'}">{item.label}</a>
            {/each}
        </div>
    </div> -->
</nav>
