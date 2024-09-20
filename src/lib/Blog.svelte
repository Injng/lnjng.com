<script lang="ts">
  // Mock data for blog posts
  const posts = [
    { id: 1, title: "Getting Started with Svelte", date: "2023-06-15" },
    { id: 2, title: "Building a Vim-like Interface in Svelte", date: "2023-06-20" },
    { id: 3, title: "Advanced Svelte Techniques", date: "2023-06-25" },
    { id: 4, title: "Creating Custom Svelte Stores", date: "2023-06-30" },
    { id: 5, title: "Optimizing Svelte Applications", date: "2023-07-05" },
  ];
</script>

<div class="flex flex-col h-full pl-6 pt-4">
  <h2 class="text-nvim-blue font-bold mb-2">Blog Posts</h2>
  <ul class="list-none p-0 m-0">
    {#each posts as post (post.id)}
      <li class="mb-2">
        <span class="font-bold">{post.title}</span>
        <span class="text-nvim-gray ml-4">{post.date}</span>
      </li>
    {/each}
  </ul>
  <p class="mt-4 text-nvim-gray">
    Type <span class="text-nvim-blue">:home&lt;Enter&gt;</span> to return to the home page
  </p>
</div>

<style>
  :global(body) {
    font-family: monospace;
    font-size: 14px;
    line-height: 1.5;
  }
</style>
