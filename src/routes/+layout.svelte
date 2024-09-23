<script lang="ts">
    import { writable } from 'svelte/store';
    import { onMount, afterUpdate } from 'svelte';
    import '../app.css';

    const input = writable('');
    let mode = 'NORMAL';
    let page = '';
    let mainElement: HTMLElement;

    // number of times to repeat command, and whether or not a number is being inputted
    let repeat = 1;
    let inputNumber = false;

    // cursor state
    let lines: {char: string, index: number, rect: DOMRect, href: string}[][] = [];
    let cursorRow = 0;
    let cursorCol = 0;

    // the total character count
    let totalCharCount = 0;

    // the column to move to when moving up or down
    let movementCol = 0;

    // whether or not the cursor was at the last column when moving up or down
    let movementLast = true;

    // whether or not to show the cursor and where to show the cursor
    $: showCursor = false;
    $: cursorStyle = 'display: none;';

    // monitor the cursor's position within the viewport
    let viewTop = 0;
    let viewBottom = 0;
    let cursorY = 0;

    onMount(() => {
        updateCharacters();
        viewBottom = window.innerHeight;
        window.addEventListener('resize', () => {
            viewBottom = window.innerHeight;
        });
        updatePage();
    });

    afterUpdate(() => {
        updatePage();
    });

    function updatePage() {
        const newPage = window.location.pathname === '/' ? 'Home' : window.location.pathname.slice(1).charAt(0).toUpperCase() + window.location.pathname.slice(2);
        if (newPage !== page) {
            page = newPage;
        }
    }

    /**
     * Update the characters array with the current characters and their bounding rects
     */
    function updateCharacters(): {char: string, index: number, rect: DOMRect, href: string}[][] {
        // guard the mainElement
        if (!mainElement) return [];

        // create a tree walker to walk through all text nodes in the main element
        const walker = document.createTreeWalker(mainElement, NodeFilter.SHOW_TEXT, null);
        const newCharacters: {char: string, index: number, rect: DOMRect, href: string}[] = [];

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
                        newCharacters.push({ char: node.textContent[i], index: 0, rect, href });
                    }
                }
            }
        }

        // sort newCharacters based on rect.y
        newCharacters.sort((a, b) => a.rect.y - b.rect.y);

        // group characters into lines
        const newLines: {char: string, index: number, rect: DOMRect, href: string}[][] = [];
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

        // add an index to each row whose y is greater than 0
        let charIndex = 0;
        for (const line of newLines) {
            for (const char of line) {
                if (char.rect.y > 0) {
                    char.index = charIndex;
                }
            }
            if (line[0].rect.y > 0) {
                charIndex++;
            }
        }
        totalCharCount = charIndex;

        lines = newLines;
        return newLines;
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
                        window.location.href = lines[cursorRow][cursorCol].href;
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

    async function moveCursor(key: string) {
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

        // ensure the cursor is visible by scrolling with a padding of 100
        const cursorRect = lines[cursorRow][cursorCol].rect;
        cursorY = cursorRect.y;
        if (cursorY - viewTop < 200 && key === 'k' && cursorY > viewTop) {
            mainElement.scrollBy(0, -2 * cursorRect.height);
            viewTop -= 2 * cursorRect.height;
            viewBottom -= 2 * cursorRect.height;
        } else if (viewBottom - cursorY < 200 && key === 'j' && cursorY < viewBottom) {
            mainElement.scrollBy(0, 2 * cursorRect.height);
            viewTop += 2 * cursorRect.height;
            viewBottom += 2 * cursorRect.height;
        } else if (cursorY < viewTop) {
            mainElement.scrollTo(0, cursorY - 100);
            viewTop = cursorY - 100;
            viewBottom = cursorY + window.innerHeight - 100;
        } else if (cursorY > viewBottom) {
            mainElement.scrollTo(0, cursorY - window.innerHeight + 100);
            viewTop = cursorY - window.innerHeight + 100;
            viewBottom = cursorY + 100;
        }

        // update the position of the cursor
        updateCursorStyle();
    }

    function handleCommand(cmd: string) {
        if (cmd === ':home') {
            window.location.href = '/';
        } else if (cmd === ':blog') {
            window.location.href = '/blog';
        } else if (cmd === ':about') {
            window.location.href = '/about';
        } else if (cmd === ':help' || cmd === ':h') {
            window.location.href = '/help';
        }
    }

    // handle link clicks in status bar
    function goToPage(href: string) {
        window.location.href = href;
    }

    // handle scroll events
    function handleScroll() {
        viewTop = mainElement.scrollTop;
        viewBottom = mainElement.scrollTop + mainElement.clientHeight;
    }

    // update cursor style by changing the location of the cursor
    function updateCursorStyle() {
        cursorStyle = lines[cursorRow][cursorCol] ? 
            `left: ${lines[cursorRow][cursorCol].rect.left}px; 
            top: ${lines[cursorRow][cursorCol].rect.y}px; 
            width: ${lines[cursorRow][cursorCol].rect.width}px; 
            height: ${lines[cursorRow][cursorCol].rect.height}px;` : '';
    }

    // get style for status bar footer links
    function getLinkStyle(href: string): string[] {
        if (href === "Home") {
            return ['', 'text-nvim-gray underline', 'text-nvim-gray underline'];
        } else if (href === "Blog") {
            return ['text-nvim-gray underline', '', 'text-nvim-gray underline'];
        } else if (href === "About") {
            return ['text-nvim-gray underline', 'text-nvim-gray underline', ''];
        } else {
            return ['text-nvim-gray underline', 'text-nvim-gray underline', 'text-nvim-gray underline'];
        }
    }

    $: linkStyles = getLinkStyle(page);
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
        <main bind:this={mainElement} class="flex-1 overflow-y-auto p-4 relative" on:scroll={handleScroll}>
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
        <div id="file-info">
            <a href="/" on:click|preventDefault={() => {goToPage("/")}} class={linkStyles[0]}>Home</a>
            <a href="/blog" on:click|preventDefault={() => {goToPage("/blog")}} class={linkStyles[1]}>Blog</a>
            <a href="/about" on:click|preventDefault={() => {goToPage("/about")}} class={linkStyles[2]}>About</a>
        </div>
        <div id="position" class="ml-2">{cursorRow + 1}:{cursorCol + 1}</div>
    </div>
</body>
