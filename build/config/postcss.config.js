  /* eslint-disable global-require */

const pkg = require('../../package.json');
const px2rem = require('postcss-px2rem');
const postcssCssnext = require('postcss-cssnext');

module.exports = () => ({

  plugins: [

    require('postcss-import')(),

    require('postcss-custom-properties')(),

    require('postcss-custom-media')(),

    require('postcss-media-minmax')(),

    require('postcss-custom-selectors')(),

    require('postcss-calc')(),

    require('postcss-nesting')(),

    require('postcss-nested')(),

    require('postcss-color-function')(),

    require('pleeease-filters')(),

    require('pixrem')(),

    require('postcss-selector-matches')(),

    require('postcss-selector-not')(),

    require('postcss-flexbugs-fixes')(),

    px2rem({remUnit: 75}),

    postcssCssnext({
      features: {
        customProperties: {
          variables: {
            mainColor: "red",
            altColor: "blue",
          }
        }
      }
    }),

    // require('autoprefixer')({
    //   browsers: pkg.browserslist,
    //   flexbox: 'no-2009',
    // }),
  ],
});
