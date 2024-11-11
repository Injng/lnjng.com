export type Categories = 'sveltekit' | 'svelte';

export type Post = {
  title: string
  slug: string
  date: string
  categories: Categories[]
  published: boolean
};

export type Subject = {
  title: string
  slug: string
};

export type Category = {
  title: string
  slug: string
  subject: string
};

export type Note = {
  title: string
  slug: string
  category: string
  subject: string
};

