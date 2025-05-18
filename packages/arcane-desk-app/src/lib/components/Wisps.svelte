<script lang="ts">
	import { onMount } from 'svelte';

	interface WispStyle {
		id: number;
		size: number;
		left: string;
		top: string;
		animationDuration: string;
		animationDelay: string;
		travelY: string;
	}

	// --- Props for Customization ---
	/** Number of wisps to generate */
	export let count: number = 7;
	/** Base color for the wisp body (CSS color value) */
	export let baseColor: string = 'rgba(250, 204, 21, 0.15)'; // Default: amber-300 with low opacity
	/** First shadow layer color (CSS color value) */
	export let shadowColor1: string = 'rgba(251, 191, 36, 0.2)'; // Default: amber-400
	/** Second shadow layer color (CSS color value) */
	export let shadowColor2: string = 'rgba(245, 158, 11, 0.15)'; // Default: amber-500
	/** Third shadow layer color (CSS color value) */
	export let shadowColor3: string = 'rgba(217, 119, 6, 0.1)'; // Default: amber-600
	/** CSS blur amount (e.g., '4px') */
	export let blurAmount: string = '4px';
	/** Minimum size of a wisp in pixels */
	export let minSize: number = 8;
	/** Maximum size of a wisp in pixels */
	export let maxSize: number = 28;
	/** Minimum animation duration in seconds */
	export let minDuration: number = 15;
	/** Maximum animation duration in seconds */
	export let maxDuration: number = 25;
	/** Minimum vertical travel distance (CSS unit, e.g., '10vh') */
	export let minTravelY: number = 10;
	/** Maximum vertical travel distance (CSS unit, e.g., '25vh') */
	export let maxTravelY: number = 25;
	// --- End of Props ---

	let wisps: WispStyle[] = [];

	onMount(() => {
		const newWisps: WispStyle[] = [];
		for (let i = 0; i < count; i++) {
			const sizeRange = maxSize - minSize;
			const durationRange = maxDuration - minDuration;
			const travelYRange = maxTravelY - minTravelY;

			newWisps.push({
				id: i,
				size: Math.random() * sizeRange + minSize,
				left: Math.random() * 90 + 5 + '%', // 5% to 95% to avoid edges
				top: Math.random() * 80 + 10 + '%', // 10% to 90% from top of container
				animationDuration: Math.random() * durationRange + minDuration + 's',
				animationDelay: Math.random() * -(maxDuration / 1.25) + 's', // Stagger start times more effectively
				travelY: Math.random() * travelYRange + minTravelY + 'vh'
			});
		}
		wisps = newWisps;
	});
</script>

<div class="pointer-events-none absolute inset-0 z-[1]" aria-hidden="true">
	{#each wisps as wisp (wisp.id)}
		<div
			class="wisp-particle"
			style="
                width: {wisp.size}px;
                height: {wisp.size}px;
                left: {wisp.left};
                top: {wisp.top};
                animation-duration: {wisp.animationDuration};
                animation-delay: {wisp.animationDelay};
                --travel-y-distance: {wisp.travelY};
                --wisp-base-color: {baseColor};
                --wisp-shadow-color-1: {shadowColor1};
                --wisp-shadow-color-2: {shadowColor2};
                --wisp-shadow-color-3: {shadowColor3};
                --wisp-blur-amount: {blurAmount};
            "
		></div>
	{/each}
</div>

<style>
	.wisp-particle {
		position: absolute;
		background-color: var(--wisp-base-color);
		border-radius: 50%;
		filter: blur(var(--wisp-blur-amount));
		box-shadow:
			0 0 10px 2px var(--wisp-shadow-color-1),
			0 0 20px 5px var(--wisp-shadow-color-2),
			0 0 30px 10px var(--wisp-shadow-color-3);
		animation-name: float-wisp;
		animation-timing-function: ease-in-out;
		animation-iteration-count: infinite;
		opacity: 0; /* Start transparent, fade in via animation */
	}

	@keyframes float-wisp {
		0% {
			transform: translateY(0) scale(0.8);
			opacity: 0;
		}
		25%,
		75% {
			opacity: 0.6; /* Max opacity during float */
		}
		50% {
			transform: translateY(calc(-1 * var(--travel-y-distance))) scale(1.1); /* Move upwards */
		}
		100% {
			transform: translateY(0) scale(0.8);
			opacity: 0;
		}
	}
</style>
