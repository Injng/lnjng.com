<script lang="ts">
    import { writable } from 'svelte/store';
    import { onMount, afterUpdate } from 'svelte';
    import { goto } from '$app/navigation';
    import '../app.css';

    const input = writable('');
    let mode = 'NORMAL';
    let page: string = 'Home';
    let mainElement: HTMLElement;

    // number of times to repeat command, and whether or not a number is being inputted
    let repeat = 1;
    let inputNumber = false;

    // cursor state
    let lines: {char: string, rect: DOMRect, href: string}[][] = [];
    let cursorRow = 0;
    let cursorCol = 0;

    // the column to move to when moving up or down
    let movementCol = 0;

    // whether or not the cursor was at the last column when moving up or down
    let movementLast = false;

    // whether or not to show the cursor and where to show the cursor
    $: showCursor = false;
    $: cursorStyle = 'display: none;';

    onMount(() => {
        updateCharacters();
    });

    afterUpdate(() => {
        updateCharacters();
    });

    /**
     * Update the characters array with the current characters and their bounding rects
     */
    function updateCharacters() {
        // guard the mainElement
        if (!mainElement) return;

        // create a tree walker to walk through all text nodes in the main element
        const walker = document.createTreeWalker(mainElement, NodeFilter.SHOW_TEXT, null);
        const newCharacters: {char: string, rect: DOMRect, href: string}[] = [];

        // iterate through all text nodes and their characters
        let node;
        while (node = walker.nextNode()) {
            if (node.textContent?.trim()) {
                // Check if the node is within a link
                const parentAnchor = node.parentElement?.closest('a');
                const href = parentAnchor?.getAttribute('href') || '';

                // iterate through each character
                const range = document.createRange();
                for (let i = 0; i < node.textContent.length; i++) {
                    range.setStart(node, i);
                    range.setEnd(node, i + 1);
                    const rect = range.getBoundingClientRect();
                    rect.x -= 24;
                    if (rect.width > 0 && rect.height > 0) {
                        newCharacters.push({ char: node.textContent[i], rect, href });
                    }
                }
            }
        }

        // sort newCharacters based on rect.y
        newCharacters.sort((a, b) => a.rect.y - b.rect.y);

        // group characters into lines
        const newLines: {char: string, rect: DOMRect, href: string}[][] = [];
        for (const char of newCharacters) {
            if (newLines.length === 0) {
                newLines.push([char]);
            } else {
                const currY = newLines[newLines.length - 1][0].rect.y;
                if (Math.abs(char.rect.y - currY) > 2) {
                    newLines.push([char]);
                } else {
                    newLines[newLines.length - 1].push(char);
                }
            }
        }
        lines = newLines;
    }

    function handleKeydown(event: KeyboardEvent) {
        if (mode === 'NORMAL') {
            if (event.key === 'Escape') {
                showCursor = false;
                inputNumber = false;
            } else if (event.key === ':') {
                mode = 'COMMAND';
                input.set(':');
                inputNumber = false;
            } else if (['h', 'j', 'k', 'l', '$'].includes(event.key)) {
                inputNumber = false;
                for (let i = 0; i < repeat; i++) {
                    moveCursor(event.key);
                }
                repeat = 1;
            } else if (/\d/.test(event.key)) {
                if (inputNumber) {
                    repeat = repeat * 10 + parseInt(event.key);
                } else {
                    if (parseInt(event.key) === 0) {
                        moveCursor(event.key);
                        return;
                    }
                    repeat = parseInt(event.key);
                    inputNumber = true;
                }
            } else if (event.key === 'Enter') {
                inputNumber = false;
                if (lines[cursorRow][cursorCol].href !== '') {
                    // check for external links
                    if (lines[cursorRow][cursorCol].href.startsWith('http')) {
                        window.open(lines[cursorRow][cursorCol].href, '_blank');
                    } else {
                        goto(lines[cursorRow][cursorCol].href, { replaceState: false });
                    }
                } else {
                    moveCursor('j');
                }
                repeat = 1;
            }
        } else if (mode === 'COMMAND') {
            inputNumber = false;
            if (event.key === 'Enter') {
                handleCommand($input);
                input.set('');
                mode = 'NORMAL';
            } else if (event.key === 'Backspace') {
                input.update(value => value.slice(0, -1));
            } else if (event.key.length === 1 && /^[^\s]$/.test(event.key)) {
                input.update(value => value + event.key);
            } else if (event.key === 'Escape') {
                input.set('');
                mode = 'NORMAL';
            }
        }
        event.preventDefault();
    }

    function moveCursor(key: string) {
        if (lines.length === 0) return;

        showCursor = true;
        switch (key) {
            case 'h':
                cursorCol = Math.max(0, cursorCol - 1);
                movementCol = cursorCol;
                movementLast = cursorCol === lines[cursorRow].length - 1;
                break;
            case 'l':
                cursorCol = Math.min(lines[cursorRow].length - 1, cursorCol + 1);
                movementCol = cursorCol;
                movementLast = cursorCol === lines[cursorRow].length - 1;
                break;
            case 'k':
                cursorRow = Math.max(0, cursorRow - 1);
                cursorCol = movementLast ? lines[cursorRow].length - 1 : Math.min(movementCol, lines[cursorRow].length - 1);
                break;
            case 'j':
                cursorRow = Math.min(lines.length - 1, cursorRow + 1);
                cursorCol = movementLast ? lines[cursorRow].length - 1 : Math.min(movementCol, lines[cursorRow].length - 1);
                break;
            case '0':
                cursorCol = 0;
                movementCol = cursorCol;
                movementLast = false;
                break;
            case '$':
                cursorCol = lines[cursorRow].length - 1;
                movementCol = cursorCol;
                movementLast = true;
                break;
        }

        cursorStyle = lines[cursorRow][cursorCol] ? 
            `left: ${lines[cursorRow][cursorCol].rect.left}px; 
            top: ${lines[cursorRow][cursorCol].rect.top}px; 
            width: ${lines[cursorRow][cursorCol].rect.width}px; 
            height: ${lines[cursorRow][cursorCol].rect.height}px;` : '';
    }

    function handleCommand(cmd: string) {
        if (cmd === ':home') {
            page = 'Home';
            goto('/', { replaceState: false });
        } else if (cmd === ':blog') {
            page = 'Blog';
            goto('/blog', { replaceState: false });
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
        <main bind:this={mainElement} class="flex-1 overflow-y-auto p-4 relative">
            <slot></slot>
            <div 
                class="absolute bg-nvim-cursor opacity-50"
                style={showCursor ? cursorStyle : 'display: none;'}
            ></div>
        </main>
    </div>
    <div id="status-bar" class="bg-nvim-statusline text-nvim-fg h-6 px-2 flex items-center justify-between text-sm">
        <div id="mode" class="w-20">{mode}</div>
        <div id="command-line" class="flex-1 ml-2">{$input}</div>
        <div id="file-info">{page}</div>
        <div id="position" class="ml-2">{cursorRow + 1}:{cursorCol + 1}</div>
    </div>
</body>
