// wd/webpack.config.js

const path = require('path');

module.exports = {
    entry: './static/react/Index.js', // Adjust to match your entry point
    output: {
        path: path.resolve(__dirname, 'static/react'), // Output in the same directory
        filename: 'bundle.js', // Bundled file
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/, // Matches both .js and .jsx files
                exclude: /node_modules/, // Exclude dependencies
                use: {
                    loader: 'babel-loader', // Use Babel for ES6+ and React syntax
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'], // Ensure React and modern JS support
                    },
                },
            },
            {
                test: /\.css$/, // Matches .css files
                use: ['style-loader', 'css-loader'], // Process CSS files with these loaders
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'], // Auto-resolve extensions for imports
    },
    mode: 'production', // Use 'development' or 'production' as needed
};
