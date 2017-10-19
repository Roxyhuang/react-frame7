/* eslint-disable no-param-reassign */
import Console from './Console';

class ErrorHandler {
  handle(exception) {
    if (exception && exception.handled === false) {
      Console.log(`${exception.code}: ${exception.message}!`);

      exception.handled = true;

      switch (exception.code) {
        case -1000:
          this.kick();
          break;
        case -1001:
          ErrorHandler.showError(exception.code, exception.message);
          break;
        case -10000:
          ErrorHandler.showError(exception.code, '您的网络正在发呆，请稍候');
          break;
        default:
          ErrorHandler.showError(exception.code, exception.message);
          break;
      }
      return true;
    }
    return false;
  }

  static kick() {
    Console.log('kicked');
  }

  static showError(errorCode, errorMessage) {
    Console.warn(`${errorCode}: ${errorMessage}`);
    Console.log(errorMessage);
  }
}

export default new ErrorHandler();
