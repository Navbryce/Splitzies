import {DefinePlugin} from 'webpack';

const { required } = require('dotenv-safe').config();

export default (config, env, helpers) => {
    config.resolve.alias.src = env.src;
    // dotenv injection
    config.plugins.push(new DefinePlugin(
        Object.keys(required).reduce(
            (env, key) => ({
                ...env,
                [`process.env.${key}`]: JSON.stringify(required[key]),
            }),
            {}
        ))
    );

    // tailwind
    const postCssLoaders = helpers.getLoadersByName(config, 'postcss-loader');
    postCssLoaders.forEach(({ loader }) => {
        const plugins = loader.options.postcssOptions.plugins;

        // Add tailwind css at the top.
        plugins.unshift(require('tailwindcss'));

        // for purging css to make build smaller
        const purgecss = require('@fullhuman/postcss-purgecss')({
            // Specify the paths to all of the template files in your project
            content: ['./src/**/*.{js,jsx,ts,tsx}'],

            // Include any special characters you're using in this regular expression
            defaultExtractor: content => content.match(params.regex) || [],
        });
        if (process.env.NETLIFY) {
            console.log("PROD")
            plugins.push(purgecss);
        }
    });
    return config;
}
