import {DefinePlugin} from 'webpack';

const { parsed } = require('dotenv-safe').config();

export default (config, env, helpers) => {
    config.resolve.alias.src = env.src;
    // dotenv injection
    config.plugins.push(new DefinePlugin(
        Object.keys(parsed).reduce(
            (env, key) => ({
                ...env,
                [`process.env.${key}`]: JSON.stringify(parsed[key]),
            }),
            {}
        ))
    );
}
