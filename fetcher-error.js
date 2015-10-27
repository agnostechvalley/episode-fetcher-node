const Util = require('util');

function FetcherError(message) {
	Error.call(this);
	Error.captureStackTrace(this, this.constructor);
	this.name = this.constructor.name;
	this.message = message;
}

Util.inherits(FetcherError, Error);

module.exports = FetcherError;
