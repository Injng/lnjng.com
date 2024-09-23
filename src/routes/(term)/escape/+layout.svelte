<script lang="ts">
    import { isTerm } from '../../stores';
    import { onMount, onDestroy } from 'svelte';
    import '../../../app.css';

    let showTerm: boolean;

    onMount(() => {
        showTerm = $isTerm === 1;
    });

    const unsubscribe = isTerm.subscribe((value) => {
		showTerm = value === 1;
	});

    onDestroy(unsubscribe);
</script>

{#if showTerm}
    <slot></slot>
{:else if !showTerm}
    <div class="bg-black text-green-400 p-4 font-mono h-screen flex flex-col">
        Have you exited vim?
    </div>
{:else}
    <div class="bg-black text-green-400 p-4 font-mono h-screen flex flex-col">
    </div>
{/if}
