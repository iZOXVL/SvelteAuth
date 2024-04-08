import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette';
// other imports...

const config = {
    // ... other properties
    content: ["./src/**/*.{html,js,svelte,ts}"],
    darkMode: 'class',
    theme: {
        // rest of theme code
    },
    plugins: [addVariablesForColors]
};

function addVariablesForColors({ addBase, theme }: any) {
    let allColors = flattenColorPalette(theme('colors'));
    let newVars = Object.fromEntries(
        Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
    );

    addBase({
        ':root': newVars
    });
}