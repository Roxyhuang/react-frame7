import { SHOULD_BUILD } from '../script/shouldBuild';

const webpackConfig = (SHOULD_BUILD)
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf');

export default webpackConfig;
