const message = Symbol();

export default class MultiError extends Error {
	constructor(errors, prefix) {
		super();
		Object.defineProperties(
			this,
			{
				"_prefix": {
					enumerable: false,
					writable: true,
					value: prefix
				},
				"errors": {
					writable: false,
					enumerable: true,
					value: []
				},
				"message": {
					get: this[message]
				}
			}
		);

		this.name = prefix; //so it has title to group by on jsonapi

		if (Array.isArray(errors)) {
			errors.forEach((error) => {
				this.push(error);
			});
		} else if (errors instanceof Error) {
			this.push(errors);
		}
	}

	push(newError) {
		if (newError.constructor.name === this.constructor.name) {
			newError.errors.forEach((error) => {
				error.name = this._prefix || error.name;
				this.errors.push(error);
			});
		} else {
			newError.name = this._prefix || newError.name;
			this.errors.push(newError);
		}
	}

	[message]() {
		let returnedMessage = "";
		if(this._prefix) {
			returnedMessage = this._prefix + ": ";
		}

		returnedMessage += this.errors.map((error) => {
			return error.message;
		}).join(", ");

		return returnedMessage;
	}
}
