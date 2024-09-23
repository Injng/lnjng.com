<script lang="ts">
    import '../../../../prism.css';

	export let data;
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article class="max-w-3xl mx-auto px-4 py-8">
	<hgroup class="mb-6">
		<h1 class="text-4xl font-bold text-nvim-fg mb-2">{data.meta.title}</h1>
	</hgroup>

	<div class="tags mb-6">
		{#each data.meta.categories as category}
			<span class="inline-block bg-nvim-statusline text-nvim-fg px-2 py-1 rounded mr-2 text-sm">&num;{category}</span>
		{/each}
	</div>

	<div class="prose prose-invert max-w-none">
		<svelte:component this={data.content} />
	</div>
</article>

<style lang="postcss">
	:global(.prose) {
		@apply text-nvim-fg;
	}
	:global(.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6) {
		@apply text-nvim-fg font-bold mt-8 mb-4;
	}
	:global(.prose h1) {
		@apply text-3xl;
	}
	:global(.prose h2) {
		@apply text-2xl;
	}
	:global(.prose h3) {
		@apply text-xl;
	}
	:global(.prose p) {
		@apply mb-4;
	}
	:global(.prose a) {
		@apply text-nvim-blue underline;
	}
	:global(.prose ul, .prose ol) {
		@apply ml-6 mb-4;
	}
	:global(.prose li) {
		@apply mb-2;
	}
	:global(.prose blockquote) {
		@apply border-l-4 border-nvim-gray pl-4 italic my-4;
	}
	:global(.prose code) {
		@apply bg-nvim-statusline text-nvim-fg px-1 py-0.5 rounded;
	}
	:global(.prose pre) {
		@apply bg-nvim-statusline p-4 rounded-md overflow-x-auto my-4;
	}
	:global(.prose img) {
		@apply max-w-full h-auto rounded-md my-4;
	}
</style>
