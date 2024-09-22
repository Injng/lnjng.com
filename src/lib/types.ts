export type Categories = 'sveltekit' | 'svelte'

export type Post = {
	title: string
	slug: string
	date: string
	categories: Categories[]
	published: boolean
}

