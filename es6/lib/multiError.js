import privateData from "incognito";

const message = Symbol("message");
const getErrorName = Symbol("getErrorName");

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

		this.name = prefix || 'error'; //so it has title to group by on jsonapi
		this.concat(errors)
	}

	concat(errors) {
		if (Array.isArray(errors)) {
				console.log('this is', { tp: this.push })
			errors.forEach((error) => {
				this.push(error);
			});
		} else if (errors instanceof Error) {
			this.push(errors);
		}
	}

	[getErrorName](error) {
		const _ = privateData(this);
		return _.prefix || error.name;
	}

	push(newError) {
		if (newError.constructor.name === this.constructor.name) {
			newError.errors.forEach((error) => {
				error.name = this[getErrorName](error);
				this.errors.push(error);
			});
		} else {
			newError.name = this[getErrorName](newError);
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
