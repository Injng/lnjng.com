<script>
  import { onMount } from 'svelte';

  let visibleText = '';
  let showForm = false;

  const fullText = `
    _  _____ _        _    ____  
   / \\|_   _| |      / \\  / ___| 
  / _ \\ | | | |     / _ \\ \\___ \\ 
 / ___ \\| | | |___ / ___ \\ ___) |
/_/   \\_\\_| |_____/_/   \\_\\____/ 

Advanced Terminal Link and Access System
  `;

  onMount(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        visibleText = fullText.slice(0, currentIndex);
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          showForm = true;
        }, 100); // Delay before showing the form
      }
    }, 10);

    return () => clearInterval(interval);
  });

  function handleLogin() {
    console.log('Login attempt');
  }
</script>

<div class="bg-black text-green-400 p-4 font-mono h-screen flex flex-col">
  <pre class="text-center mb-8 overflow-hidden whitespace-pre">{visibleText}</pre>
  {#if showForm}
    <div class="flex-grow">
      <div class="mb-4">
        <span class="text-yellow-400">$</span> login
      </div>
      <form method="POST" action="?/login">
          <div class="mb-2">
            <label for="email" class="block">Username:</label>
            <input
              type="email"
              id="email"
              class="bg-black border border-green-400 text-white px-2 py-1 w-full focus:outline-none focus:border-yellow-400"
              autofocus
            />
          </div>
          <div class="mb-4">
            <label for="password" class="block">Password:</label>
            <input
              type="password"
              id="password"
              class="bg-black border border-green-400 text-white px-2 py-1 w-full focus:outline-none focus:border-yellow-400"
            />
          </div>
          <button 
            class="bg-green-400 text-black px-4 py-2 hover:bg-green-500 focus:outline-none"
            on:click={handleLogin}
          >
            Login
          </button>
          <a
            href="/escape"
            class="bg-green-400 text-black px-4 py-2 hover:bg-green-500 focus:outline-none"
          >
            Cancel
          </a>
        </form>
    </div>
  {/if}
</div>

