<script lang="ts">
    import '../../../app.css';
    let commandHistory: {type: string, text: string}[] = [];
    let currentCommand = '';

    function handleSubmit() {
        if (currentCommand.trim()) {
            commandHistory = [...commandHistory, { type: 'command', text: currentCommand }];
            // Simulate a response - in a real app, you'd process the command here
            commandHistory = [...commandHistory, { type: 'response', text: `Executed: ${currentCommand}` }];
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
        />
    </div>
</div>
