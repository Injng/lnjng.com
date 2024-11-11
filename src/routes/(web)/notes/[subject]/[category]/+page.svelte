<script lang="ts">
  export let data;
</script>

<svelte:head>
  <title>{data.subject}: {data.category}</title>
  <meta property="og:title" content="lnjng's Notes" />
</svelte:head>

<div class="flex flex-col h-full pl-6 pt-4">
    <h2 class="text-nvim-blue font-bold mb-2">{data.subject}: {data.category} Notes</h2>
    <ul class="list-none p-0 m-0">
        {#each data.notes as note}
            <li class="mb-2">
                <a href="/notes/{data.subject}/{data.category}/{note.slug}" class="hover:underline hover:text-blue">
                    <span class="font-bold">{note.title}</span>
            </li>
        {/each}
    </ul>
    <p class="mt-4 text-nvim-gray">
      Type <span class="text-nvim-blue">:home&lt;Enter&gt;</span> to return to the home page
      <br>
      Type <span class="text-nvim-blue">:index&lt;Enter&gt;</span> to return to parent index
    </p>
</div>

