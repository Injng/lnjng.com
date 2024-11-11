<script lang="ts">
  export let data;
</script>

<svelte:head>
  <title>lnjng's Notes</title>
  <meta property="og:title" content="lnjng's Notes" />
</svelte:head>

<div class="flex flex-col h-full pl-6 pt-4">
    <h2 class="text-nvim-blue font-bold mb-2">Note Subject Index</h2>
    <ul class="list-none p-0 m-0">
        {#each data.subjects as subject}
            <li class="mb-2">
                <a href="/notes/{subject.slug}" class="hover:underline hover:text-blue">
                    <span class="font-bold">{subject.title}</span>
            </li>
        {/each}
    </ul>
    <p class="mt-4 text-nvim-gray">
        Type <span class="text-nvim-blue">:home&lt;Enter&gt;</span> to return to the home page
    </p>
</div>

