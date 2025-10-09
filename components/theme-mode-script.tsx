export function ThemeModeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              var theme = localStorage.getItem('theme');
              var systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              
              // Determine the theme to apply
              var shouldBeDark = false;
              if (theme === 'dark') {
                shouldBeDark = true;
              } else if (theme === 'light') {
                shouldBeDark = false;
              } else {
                // No saved preference, use system preference
                shouldBeDark = systemPrefersDark;
              }
              
              // Apply the theme immediately
              if (shouldBeDark) {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
              
              // Store the resolved theme
              localStorage.setItem('theme', shouldBeDark ? 'dark' : 'light');
            } catch (e) {
              // Fallback: apply dark mode if system prefers it
              if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add('dark');
              }
            }
          })();
        `,
      }}
    />
  );
}