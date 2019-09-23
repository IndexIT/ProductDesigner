const mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react("resources/ts/index.tsx", "public/js").webpackConfig({
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: /resources\/ts/,
                loader: "ts-loader"
            }
        ]
    },
    resolve: {
        extensions: ["*", ".js", ".jsx", ".vue", ".ts", ".tsx"]
    },
    output: {
        publicPath: process.env.MIX_PUBLIC_PATH || "/",
        chunkFilename: "js/out/[name]-" + new Date().getTime() + ".js"
    },
    devServer: {
        hot: true, // this enables hot reload
        inline: true, // use inline method for hmr
        port: '8060',
        headers: { "Access-Control-Allow-Origin": "*" },
        watchOptions: {
            exclude: [/bower_components/, /node_modules/]
        }
    },
    node: {
        fs: "empty",
        module: "empty"
    }
});


mix.options({
   hmrOptions: {
       host: "127.0.0.1",
       port: '8060'
   }
});
