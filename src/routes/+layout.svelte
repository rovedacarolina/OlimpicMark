<script>
	import favicon from '$lib/assets/favicon.svg';

	import '$lib/styles/reset.css';
	import '$lib/styles/tokens.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />

	<link rel="preconnect" href="https://api.fontshare.com" />
	<link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@1,2,3,4,5,6,7,8,9&display=swap" />
</svelte:head>

{@render children()}


