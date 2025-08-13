(() => {
    const toggle = document.getElementById('theme-toggle');

    /**
     * Set or remove 'dark' class on document.
     * @param theme 
     */
    function applyTheme(theme: string): void {
        if ('dark' === theme) {
            document.documentElement.classList.add('dark');
        }
        else {
            document.documentElement.classList.remove('dark');
        }

        localStorage.setItem('theme', theme);
    }

    /**
     * Load theme settings from local storage,
     * or apply browser settings.
     */
    function loadTheme(): void {
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme) {
            applyTheme(savedTheme);
        }
        else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            applyTheme(prefersDark ? 'dark' : 'light');
        }
    }

    /**
     * Add listener to toggle.
     */
    function addThemeToggle(): void {
        toggle?.addEventListener('click', () => {
            const isDark = document.documentElement.classList.contains('dark');
            const newTheme = isDark ? 'light' : 'dark';

            applyTheme(newTheme);
        });
    }

    loadTheme();
    addThemeToggle();
})();