<script lang="ts">
    import '../../../app.css';
    let commandHistory: {type: string, text: string}[] = [];
    let currentCommand = '';

    function handleSubmit() {
        let command = currentCommand.trim();
        if (command) {
            switch (command) {
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
                case 'help':
                    commandHistory = [...commandHistory, { type: 'command', text: currentCommand }];
                    commandHistory = [...commandHistory, { type: 'response', text: 'Available commands:' }];
                    commandHistory = [...commandHistory, { type: 'response', text: 'exit - Exit terminal' }];
                    commandHistory = [...commandHistory, { type: 'response', text: 'clear - Clear terminal' }];
                    commandHistory = [...commandHistory, { type: 'response', text: 'vim - Go back to vim' }];
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
</div>
