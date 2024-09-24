<script lang="ts">
    import '../../../app.css';
    import { onMount } from 'svelte';
    export let data;

    let commandHistory: {type: string, text: string}[] = [];
    let currentCommand = '';

	$: ({ supabase } = data);
	$: logout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error);
		}
	};

    let showForm = false;
    let visibleText = '';

    const fullText = `
Welcome to
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

    function handleSubmit() {
        let command = currentCommand.trim();
        if (command) {
            switch (command) {
                case 'flag':
                    commandHistory = [...commandHistory, { type: 'command', text: currentCommand }];
                    commandHistory = [...commandHistory, { type: 'response', text: data.flag }];
                    break;
                case 'exit':
                    commandHistory = [...commandHistory, { type: 'command', text: currentCommand }];
                    commandHistory = [...commandHistory, { type: 'response', text: 'Exiting terminal...' }];
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 1000);
                    break;
                case 'clear':
                    commandHistory = [];
                    break;
                case 'logout':
                    commandHistory = [...commandHistory, { type: 'command', text: currentCommand }];
                    commandHistory = [...commandHistory, { type: 'response', text: 'Logging out of ATLAS...' }];
                    logout();
                    setTimeout(() => {
                        window.location.href = '/escape/auth';
                    }, 1000);
                    break;
                case 'help':
                    commandHistory = [...commandHistory, { type: 'command', text: currentCommand }];
                    commandHistory = [...commandHistory, { type: 'response', text: 'Available commands:' }];
                    commandHistory = [...commandHistory, { type: 'response', text: 'exit - Exit terminal' }];
                    commandHistory = [...commandHistory, { type: 'response', text: 'clear - Clear terminal' }];
                    commandHistory = [...commandHistory, { type: 'response', text: 'vim - Go back to vim' }];
                    commandHistory = [...commandHistory, { type: 'response', text: 'logout - Logout of ATLAS' }];
                    commandHistory = [...commandHistory, { type: 'response', text: 'help - Show available commands' }];
                    break;
                case 'vim':
                    commandHistory = [...commandHistory, { type: 'command', text: currentCommand }];
                    commandHistory = [...commandHistory, { type: 'response', text: 'Exiting terminal...' }];
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 1000);
                    break;
                default:
                    commandHistory = [...commandHistory, { type: 'command', text: currentCommand }];
                    commandHistory = [...commandHistory, { type: 'response', text: `Command not found: ${currentCommand}` }];
                    break;
            }
            currentCommand = '';
        }
    }
</script>

<div class="bg-black text-green-400 p-4 font-mono h-screen flex flex-col">
    <pre class="text-center mb-8 overflow-hidden whitespace-pre">{visibleText}</pre>
    {#if showForm}
        <div class="flex-grow overflow-auto">
            {#each commandHistory as entry}
                <div class="{entry.type === 'command' ? 'text-white' : 'text-green-400'}">
                    {#if entry.type === 'command'}
                        <span class="text-green-400">$</span>
                    {/if}
                    {entry.text}
                </div>
            {/each}
        </div>
        <div class="flex items-center mt-2">
            <span class="text-green-400 mr-2">$</span>
            <input
                bind:value={currentCommand}
                on:keydown={(e) => e.key === 'Enter' && handleSubmit()}
                class="bg-transparent text-white flex-grow focus:outline-none"
                type="text"
                placeholder="Enter command..."
                autofocus
            />
        </div>
    {/if}
</div>
