class Exception {
  constructor(code, message, data) {
    this.handled = false;
    this.code = undefined ? -10000 : code;
    this.message = undefined ? 'Internal Error' : message;
    this.data = data;
  }
}

export default Exception;
