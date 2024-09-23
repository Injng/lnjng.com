<div class="max-w-3xl mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-nvim-blue mb-2">Help</h1>
    <div class="prose prose-invert max-w-none">
    <p></p>
    <p>
        Welcome to my Vim-inspired user interface! This page will guide you through the available commands and navigation options.
        Note that if you are unfamiliar with the navigation system, the standard clicking on links and scrolling will still work.
        In particular, though, keep in mind:
    </p>
    <p class="mt-4 text-nvim-gray">
        Type <span class="text-nvim-blue">:home&lt;Enter&gt;</span> to return to the home page
    </p>
    <p>
        And vice versa for the other pages (see the Command Mode section below for more details).
    </p>
    <p class="mt-4 text-nvim-blue">
        Note for those on mobile: use the links in the status bar to navigate across the main pages.
    </p>
    <h2>Modes</h2>
        <p>The UI operates in two modes:</p>
        <ul>
            <li>NORMAL mode: For navigation and command input.</li> 
            <li>COMMAND mode: For executing specific commands.</li>
        </ul>
    <h2>Navigation (NORMAL mode)</h2>
        <p>Use the following keys to navigate:</p>
        <ul>
            <li>
                <code>h</code>
                : Move cursor left</li>
            <li>
                <code>j</code>
                : Move cursor down</li>
            <li>
                <code>k</code>
                : Move cursor up</li>
            <li>
                <code>l</code>
                : Move cursor right</li>
            <li>
                <code>0</code>
                : Move to the beginning of the line</li>
            <li>
                <code>$</code>
                : Move to the end of the line</li>
        </ul>
        <p>You can prefix these commands with a number to repeat the action. For example, 5j will move the cursor down 5 lines.</p>
    <h3>Special Actions</h3>
        <ul>
            <li>
                <code>Enter</code>
                : Follow a link if the cursor is on one, or move to the next line</li>
            <li>
                <code>Esc</code>
                : Hide the cursor and cancel number input</li>
        </ul>
    <h2>Command Mode</h2>
        <p>To enter Command mode:</p>
        <ol>
            <li>Press : in NORMAL mode</li>
            <li>Type your command</li>
            <li>Press Enter to execute the command</li>
        </ol>
        <p>Available commands:</p>
        <ul>
            <li>
                <code>:home</code>
                : Go to the home page</li>
            <li>
                <code>:blog</code>
                : Go to the blog page</li>
            <li>
                <code>:about</code>
                : Go to the about page</li>
            <li>
                <code>:h</code>
                : Go to the help page</li>
        </ul>
        <p>To exit Command mode without executing a command, press Esc.</p>
    <h2>Status Bar</h2>
        <p>
        The status bar at the bottom of the screen displays:</p>
        <ul>
            <li>Current mode (NORMAL or COMMAND)</li>
            <li>Command being typed (in Command mode)</li>
            <li>Current page name</li>
            <li>Cursor position (row:column)</li>
        </ul>
    <h2>Tips</h2>
        <p>
            The UI will automatically scroll to keep the cursor visible.
            You can use the mouse wheel or touchpad to scroll the content.
            The left sidebar displays line numbers for reference.
        </p>
        <p>Enjoy navigating with your keyboard!</p>
    </div>
</div>

<style lang="postcss">
	:global(.prose) {
		@apply text-nvim-fg;
	}
	:global(.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6) {
		@apply text-nvim-fg font-bold mt-8 mb-4;
	}
	:global(.prose h1) {
		@apply text-3xl;
	}
	:global(.prose h2) {
		@apply text-2xl;
	}
	:global(.prose p) {
		@apply mb-4;
	}
	:global(.prose ul, .prose ol) {
		@apply ml-6 mb-4;
	}
	:global(.prose li) {
		@apply mb-2;
	}
	:global(.prose code) {
		@apply bg-nvim-statusline text-nvim-fg px-1 py-0.5 rounded;
	}
</style>
