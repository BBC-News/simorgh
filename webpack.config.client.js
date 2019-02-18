/* eslint-disable global-require */
const AssetsPlugin = require('assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');
const { getClientEnvVars } = require('./src/clientEnvVars');

const DOT_ENV_CONFIG = dotenv.config();

if (DOT_ENV_CONFIG.error) {
  throw DOT_ENV_CONFIG.error;
}

module.exports = ({ resolvePath, IS_CI, IS_PROD, START_DEV_SERVER }) => {
  const APP_ENV = process.env.APP_ENV || 'live';
  const webpackDevServerPort = 1124; // arbitrarily picked. Has to be different to server port (7080)
  const clientConfig = {
    target: 'web', // compile for browser environment
    entry: START_DEV_SERVER
      ? [
          `webpack-dev-server/client?http://localhost:${webpackDevServerPort}`,
          'webpack/hot/only-dev-server',
          './src/client',
        ]
      : ['./src/client'],
    devServer: {
      host: 'localhost',
      port: webpackDevServerPort,
      historyApiFallback: true,
      hot: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      disableHostCheck: true,
    },
    output: {
      path: resolvePath('build/public'),
      // need unhashed client bundle when running dev server: https://github.com/jaredpalmer/razzle/tree/master/packages/create-razzle-app/templates/default#how-razzle-works-the-secret-sauce
      filename: START_DEV_SERVER
        ? 'static/js/[name].js'
        : 'static/js/[name].[hash:8].js',
      // need full URL for dev server & HMR: https://github.com/webpack/docs/wiki/webpack-dev-server#combining-with-an-existing-server
      publicPath: START_DEV_SERVER
        ? `http://localhost:${webpackDevServerPort}/`
        : `${process.env.SIMORGH_PUBLIC_STATIC_ASSETS_PATH}/`,
    },
    optimization: {
      // specify min/max file sizes for each JS chunk for optimal performance
      splitChunks: {
        chunks: 'initial',
        automaticNameDelimiter: '-',
        minSize: 184320, // 180kb
        maxSize: 245760, // 240kb
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
          },
        },
      },
    },
    node: {
      // Override webpacks default handling for these as they arnt availible on the client.
      fs: 'empty',
      __filename: 'mock',
    },
    plugins: [
      // keep track of the generated chunks in build/assets.json
      // this determines what scripts get put in the footer of the page
      new AssetsPlugin({
        path: resolvePath('build'),
        filename: `assets-${APP_ENV}.json`,
      }),
      // copy static files otherwise untouched by Webpack, e.g. favicon
      new CopyWebpackPlugin([
        {
          from: 'public',
        },
      ]),
      new webpack.DefinePlugin({
        'process.env': getClientEnvVars(DOT_ENV_CONFIG),
      }),
      /*
       * This replaces calls to logger.node.js with logger.web.js, a client
       * side replacement, when building the bundle code for the client.
       * This avoids the weight of winston being included in the bundles and
       * issues arising from it trying to the use the file system
       */
      new webpack.NormalModuleReplacementPlugin(
        /(.*)logger.node(\.*)/,
        resource => {
          // eslint-disable-next-line no-param-reassign
          resource.request = resource.request.replace(
            /logger.node/,
            `logger.web`,
          );
        },
      ),
    ],
  };

  if (START_DEV_SERVER) {
    clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  if (IS_PROD) {
    const BrotliPlugin = require('brotli-webpack-plugin');
    const CompressionPlugin = require('compression-webpack-plugin');

    clientConfig.plugins.push(
      /**
       * Compresses Webpack assets with Brotli compression algorithm.
       * More advanced than gzip (compression-webpack-plugin).
       * https://github.com/mynameiswhm/brotli-webpack-plugin
       */
      new BrotliPlugin({
        asset: '[path].br[query]',
        test: /\.js$/,
        threshold: 10240,
        minRatio: 0.8,
      }),
      /**
       * Compresses Webpack assets with gzip Content-Encoding.
       * Prefer Brotli (using brotli-webpack-plugin) but we fall back to gzip.
       * https://github.com/webpack-contrib/compression-webpack-plugin
       */
      new CompressionPlugin({
        algorithm: 'gzip',
        filename: '[path].gz[query]',
        test: /\.js$/,
        threshold: 10240,
        minRatio: 0.8,
      }),
    );
  }
  if (!IS_CI && IS_PROD) {
    const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer'); // eslint-disable-line
    /**
     * Visualize size of webpack output files with an interactive zoomable treemap.
     * https://github.com/webpack-contrib/webpack-bundle-analyzer
     */
    clientConfig.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        defaultSizes: 'gzip',
        generateStatsFile: true,
        openAnalyzer: false,
        reportFilename: '../../reports/webpackBundleReport.html',
        statsFilename: '../../reports/webpackBundleReport.json',
      }),
    );
  }
  return clientConfig;
};
