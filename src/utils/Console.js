/* eslint-disable no-console */
/* eslint-disable prefer-rest-params */

let Console = {
  log() {
  },
  info() {
  },
  error() {
  },
  warn() {
  },
  dir() {
  },
};

// if (process.env.NODE_ENV !== 'production') {
if (window.console && console.log) {
  if (Function.prototype.bind) {
    Console = {
      log: Function.prototype.bind.call(console.log, console),
      info: Function.prototype.bind.call(console.info, console),
      error: Function.prototype.bind.call(console.error, console),
      warn: Function.prototype.bind.call(console.warn, console),
      dir: Function.prototype.bind.call(console.dir, console),
    };
  } else {
    Console = {
      log() {
        Function.prototype.apply.call(console.log, console, arguments);
      },
      info() {
        Function.prototype.apply.call(console.info, console, arguments);
      },
      error() {
        Function.prototype.apply.call(console.error, console, arguments);
      },
      warn() {
        Function.prototype.apply.call(console.warn, console, arguments);
      },
      dir() {
        Function.prototype.apply.call(console.dir, console, arguments);
      },
    };
  }
}
// }

module.exports = Console;
