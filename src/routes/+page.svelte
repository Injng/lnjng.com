<script lang="ts">
  import { writable } from 'svelte/store';
  import Home from '$lib/Home.svelte';
  import Blog from '$lib/Blog.svelte';

  const input = writable('');
  let mode = 'NORMAL';
  let commandLine = '';

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      mode = 'NORMAL';
      input.set('');
    } else if (event.key === ':' && mode === 'NORMAL') {
      mode = 'COMMAND';
      input.set(':');
    } else if (event.key === 'Enter' && mode === 'COMMAND') {
      handleCommand($input);
      input.set('');
      mode = 'NORMAL';
    } else if (mode === 'COMMAND') {
      if (event.key === 'Backspace') {
        input.update(value => value.slice(0, -1));
      } else if (event.key.length === 1 && /^[^\s]$/.test(event.key)) {
        input.update(value => value + event.key);
      }
    }
    event.preventDefault();
  }

  let page: string = 'home';

  function handleCommand(cmd: string) {
      if (cmd === ':home') {
          page = 'home';
      } else if (cmd === ':blog') {
          page = 'blog';
      }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<body class="bg-nvim-bg text-nvim-fg font-mono flex flex-col h-screen">
    <div class="flex flex-1 overflow-hidden">
        <div class="bg-nvim-bg text-nvim-gray w-6 flex-shrink-0 text-right pr-2">
            <div class="h-full">
                {#each Array(95) as _}
                    <div>~</div>
                {/each}
            </div>
        </div>
        <main class="flex-1 overflow-y-auto p-4">
            {#if page === 'home'}
                <Home />
            {:else if page === 'blog'}
                <Blog />
            {/if}
        </main>
    </div>
    <div id="status-bar" class="bg-nvim-statusline text-nvim-fg h-6 px-2 flex items-center justify-between text-sm">
        <div id="mode" class="w-20">{mode}</div>
        <div id="command-line" class="flex-1 ml-2">{$input}</div>
        <div id="file-info">Landing Page</div>
        <div id="position" class="ml-2">1:1</div>
    </div>
</body>
