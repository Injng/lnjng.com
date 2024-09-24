<script lang="ts">
    import { onMount } from 'svelte';

    let showForm = false;

    let fullText = `
    _  _____ _        _    ____  
   / \\|_   _| |      / \\  / ___| 
  / _ \\ | | | |     / _ \\ \\___ \\ 
 / ___ \\| | | |___ / ___ \\ ___) |
/_/   \\_\\_| |_____/_/   \\_\\____/ 

Advanced Terminal Link and Access System
    `;

    onMount(() => {
        setTimeout(() => {
            showForm = true;
        }, 1000);
    });
</script>

<div class="bg-black text-green-400 p-4 font-mono h-screen flex flex-col">
    <pre class="text-center mb-8 overflow-hidden whitespace-pre">{fullText}</pre>
    {#if showForm}
        <div class="flex-grow">
            <div class="mb-4">
                <p>Login error.</p>
            </div>
            <div class="mb-2">
                <button 
                class="bg-green-400 text-black px-4 py-2 hover:bg-green-500 focus:outline-none"
                on:click={() => { window.location.href = '/escape/auth'; }}
                >
                Back to Login
                </button>
            </div>
        </div>
    {/if}
</div>
