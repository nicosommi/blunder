import privateData from "incognito";

const message = Symbol("message");

export default class MultiError extends Error {
	constructor(errors, prefix) {
		super();
		const _ = privateData(this);
		_.prefix = prefix;
		Object.defineProperties(
			this,
			{
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
		const _ = privateData(this);
		if (newError.constructor.name === this.constructor.name) {
			newError.errors.forEach((error) => {
				error.name = _.prefix || error.name;
				this.errors.push(error);
			});
		} else {
			newError.name = _.prefix || newError.name;
			this.errors.push(newError);
		}
	}

	toJSON() {
		let result = new Array();
		this.errors.forEach((error) => {
			//standard ERROR properties from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
			result.push({name: error.name, message: error.message});
		});
		return result;
	}

	[message]() {
		const _ = privateData(this);
		let returnedMessage = "";
		if(_.prefix) {
			returnedMessage = _.prefix + ": ";
		}

		returnedMessage += this.errors.map((error) => {
			return error.message;
		}).join(", ");

		return returnedMessage;
	}
}
