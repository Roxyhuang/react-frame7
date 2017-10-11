const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const IS_RELEASE = process.env.NODE_ENV === 'release';

export const SHOULD_BUILD = IS_PRODUCTION || IS_RELEASE;
