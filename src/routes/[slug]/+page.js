import { error } from '@sveltejs/kit';
import { structures } from '$lib/data/structures.js';

export const prerender = true;

export function entries() {
	return structures
		.filter((structure) => structure.slug !== 'biathlon')
		.map((structure) => ({ slug: structure.slug }));
}

export function load({ params }) {
	const structure = structures.find((item) => item.slug === params.slug);

	if (!structure || structure.slug === 'biathlon') {
		error(404, 'Pagina non trovata');
	}

	return {
		structure
	};
}
