<script lang="ts">
	/**
	 * Badge component with medieval fantasy styling
	 */
	export let variant = 'default'; // default, success, warning, danger, info
	export let size = 'md'; // sm, md, lg
	export let rounded = true;
	export let outline = false;
	
	// Compute classes based on props
	$: variantClasses = {
		default: outline 
			? 'bg-transparent text-amber-700 border-amber-700' 
			: 'bg-amber-700 text-amber-50',
		success: outline 
			? 'bg-transparent text-emerald-700 border-emerald-700' 
			: 'bg-emerald-700 text-emerald-50',
		warning: outline 
			? 'bg-transparent text-amber-500 border-amber-500' 
			: 'bg-amber-500 text-amber-950',
		danger: outline 
			? 'bg-transparent text-red-700 border-red-700' 
			: 'bg-red-700 text-red-50',
		info: outline 
			? 'bg-transparent text-blue-700 border-blue-700' 
			: 'bg-blue-700 text-blue-50'
	}[variant];
	
	$: sizeClasses = {
		sm: 'text-xs py-0.5 px-2',
		md: 'text-sm py-1 px-2.5',
		lg: 'text-base py-1.5 px-3'
	}[size];
	
	$: roundedClass = rounded ? 'rounded-full' : 'rounded';
	$: borderClass = outline ? 'border' : 'border-0';
</script>

<span 
	class="{variantClasses} {sizeClasses} {roundedClass} {borderClass} 
	inline-flex items-center justify-center font-medium
	shadow-sm uppercase tracking-wide"
>
	<slot />
</span>
