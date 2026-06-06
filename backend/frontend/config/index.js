let config;
try {
    config = await import(`./env.${import.meta.env.VITE_BUILD ? import.meta.env.VITE_BUILD : 'development'}.js`);
} catch (err) {
    config = await import('./env.development.js');
}
export default config;
