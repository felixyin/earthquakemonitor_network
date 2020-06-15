module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
        node: true
    },
    extends: 'standard',
    plugins: [
        'html'
    ],
    'rules': {
        "semi": [0, "never"],
        "space-before-blocks": [0, "always"],
        "space-before-function-paren": [0, "always"],
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        "no-mixed-spaces-and-tabs":1,
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
}
