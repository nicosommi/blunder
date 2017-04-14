"use strict";

var _ = require("../../");

var _2 = _interopRequireDefault(_);

var _chai = require("chai");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _chai.should)();

describe("MultiError(errors)", function () {
	var multiError = void 0,
	    errors = void 0;

	beforeEach(function () {
		errors = [new Error("You cannot do that"), new Error("You cannot do that, either"), new Error("You again? Stop it")];
		multiError = new _2.default(errors);
	});

	describe("(with prefix)", function () {
		var prefix = void 0;
		beforeEach(function () {
			prefix = "someprefix";
			multiError = new _2.default(errors, prefix);
		});

		describe(".message", function () {
			it("should concatenate messages together with the prefix", function () {
				multiError.message.should.eql(prefix + ": You cannot do that, You cannot do that, either, You again? Stop it");
			});
		});

		describe(".name", function () {
			it("should have the same name as the prefix to correctly allow gouping by name", function () {
				multiError.name.should.equal(prefix);
			});
		});
	});

	describe("(without prefix)", function () {
		beforeEach(function () {
			multiError = new _2.default(errors);
		});

		describe(".name", function () {
			it("should have the a name", function () {
				multiError.name.should.be.ok;
			});
		});
	});

	describe(".errors", function () {
		it("should be an instance of Array", function () {
			multiError.errors.should.be.instanceOf(Array);
		});

		describe("(with prefix on array)", function () {
			beforeEach(function () {
				multiError = new _2.default(errors, "ErrorPrefix");
			});

			it("should keep the error name as is", function () {
				multiError.errors[0].name.should.equal("Error");
			});
		});
		it("should be set to the errors passing an array of Errors by the constructor", function () {
			multiError = new _2.default(errors);
			multiError.errors.should.eql(errors);
		});
		it("should be set to the errors passing an Error on the constructor", function () {
			var originalError = new Error("some error");
			multiError = new _2.default(originalError);
			multiError.errors[0].should.eql(originalError);
		});
		it("should be set to an empty array when nothing is passed by the constructor", function () {
			multiError = new _2.default();
			multiError.errors.should.eql([]);
		});
	});

	describe(".message", function () {
		it("should concatenate messages together", function () {
			multiError.message.should.eql("You cannot do that, You cannot do that, either, You again? Stop it");
		});
	});

	describe("(methods)", function () {
		describe(".toJSON", function () {
			it("should return an array", function () {
				multiError.toJSON().should.be.instanceOf(Array);
			});

			it("should return an array with the proper length", function () {
				multiError.toJSON().length.should.equal(3);
			});
		});
	});
});