// Required for jest to work with TS
module.exports = {
    presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        ['@babel/preset-typescript', { allowDeclareFields: true }],
    ],
};