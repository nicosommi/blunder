"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _libMultiErrorJs = require("../lib/multiError.js");

var _libMultiErrorJs2 = _interopRequireDefault(_libMultiErrorJs);

describe("MultiError(errors)", function () {
	var multiError = undefined,
	    errors = undefined;

	beforeEach(function () {
		errors = [new Error("You cannot do that"), new Error("You cannot do that, either"), new Error("You again? Stop it")];
		multiError = new _libMultiErrorJs2["default"](errors);
	});

	describe("(with prefix)", function () {
		beforeEach(function () {
			multiError = new _libMultiErrorJs2["default"](errors, "Error");
		});

		describe(".message", function () {
			it("should concatenate messages together with the prefix", function () {
				multiError.message.should.eql("Error: You cannot do that, You cannot do that, either, You again? Stop it");
			});
		});
	});

	describe(".errors", function () {
		it("should be an instance of Array", function () {
			multiError.errors.should.be.instanceOf(Array);
		});
		describe("(with prefix on array)", function () {
			beforeEach(function () {
				multiError = new _libMultiErrorJs2["default"](errors, "ErrorPrefix");
			});

			it("should set the errors name to be the prefix", function () {
				multiError.errors[0].name.should.equal("ErrorPrefix");
			});
		});
		it("should be set to the errors passing an array of Errors by the constructor", function () {
			multiError = new _libMultiErrorJs2["default"](errors);
			multiError.errors.should.eql(errors);
		});
		it("should be set to the errors passing an Error on the constructor", function () {
			var originalError = new Error("some error");
			multiError = new _libMultiErrorJs2["default"](originalError);
			multiError.errors[0].should.eql(originalError);
		});
		it("should be set to an empty array when nothing is passed by the constructor", function () {
			multiError = new _libMultiErrorJs2["default"]();
			multiError.errors.should.eql([]);
		});
	});

	describe(".message", function () {
		it("should concatenate messages together", function () {
			multiError.message.should.eql("You cannot do that, You cannot do that, either, You again? Stop it");
		});
	});
});