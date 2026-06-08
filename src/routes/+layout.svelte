<script>
	import favicon from '$lib/assets/favicon.svg';

	import "$lib/styles/reset.css";
	import "$lib/styles/tokens.css";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />

	<!-- Satoshi Font -->
	<link rel="preconnect" href="https://api.fontshare.com/" />
	<link rel="preconnect" href="https://api.fontshare.com/" crossorigin>
	<link href="https://api.fontshare.com/v2/css?f[]=satoshi@1,2&display=swap" rel="stylesheet">

</svelte:head>

{@render children()}
