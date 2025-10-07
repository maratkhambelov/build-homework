module.exports = {
    name: 'host',
    remotes: {
        components: 'components@http://localhost:3002/mf-manifest.json',
    },
    shared: {
        react: { singleton: true, eager: true },
        'react-dom': { singleton: true, eager: true },
        'react/jsx-runtime': { singleton: true },
        'react/jsx-dev-runtime': { singleton: true, eager: true },
    },
};
