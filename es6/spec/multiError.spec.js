import MultiError from "../../";

describe("MultiError(errors)", () => {
	let multiError, errors;

	beforeEach(() => {
		errors = [
			new Error("You cannot do that"),
			new Error("You cannot do that, either"),
			new Error("You again? Stop it")
		];
		multiError = new MultiError(errors);
	});

	describe("(with prefix)", () => {
		let prefix;
		beforeEach(() => {
			prefix = "someprefix";
			multiError = new MultiError(errors, prefix);
		});

		describe(".message", () => {
			it("should concatenate messages together with the prefix", () => {
				multiError.message.should.eql(`${prefix}: You cannot do that, You cannot do that, either, You again? Stop it`);
			});
		});

		describe(".name", () => {
			it("should have the same name as the prefix to correctly allow gouping by name", () => {
				multiError.name.should.equal(prefix);
			});
		});
	});

	describe(".errors", () => {
		it("should be an instance of Array", () => {
			multiError.errors.should.be.instanceOf(Array);
		});
		describe("(with prefix on array)", () => {
			beforeEach(() => {
				multiError = new MultiError(errors, "ErrorPrefix");
			});

			it("should set the errors name to be the prefix", () => {
				multiError.errors[0].name.should.equal("ErrorPrefix");
			});
		});
		it("should be set to the errors passing an array of Errors by the constructor", () => {
			multiError = new MultiError(errors);
			multiError.errors.should.eql(errors);
		});
		it("should be set to the errors passing an Error on the constructor", () => {
			const originalError = new Error("some error");
			multiError = new MultiError(originalError);
			multiError.errors[0].should.eql(originalError);
		});
		it("should be set to an empty array when nothing is passed by the constructor", () => {
			multiError = new MultiError();
			multiError.errors.should.eql([]);
		});
	});

	describe(".message", () => {
		it("should concatenate messages together", () => {
			multiError.message.should.eql("You cannot do that, You cannot do that, either, You again? Stop it");
		});
	});

	describe("(methods)", () => {
		describe(".toJSON", () => {
			it("should return an array", () => {
				multiError.toJSON().should.be.instanceOf(Array);
			});

			it("should return an array with the proper length", () => {
				multiError.toJSON().length.should.equal(3);
			});
		});
	});
});
