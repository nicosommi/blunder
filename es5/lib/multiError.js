"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _incognito = require("incognito");

var _incognito2 = _interopRequireDefault(_incognito);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _extendableBuiltin(cls) {
	function ExtendableBuiltin() {
		var instance = Reflect.construct(cls, Array.from(arguments));
		Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
		return instance;
	}

	ExtendableBuiltin.prototype = Object.create(cls.prototype, {
		constructor: {
			value: cls,
			enumerable: false,
			writable: true,
			configurable: true
		}
	});

	if (Object.setPrototypeOf) {
		Object.setPrototypeOf(ExtendableBuiltin, cls);
	} else {
		ExtendableBuiltin.__proto__ = cls;
	}

	return ExtendableBuiltin;
}

var message = Symbol("message");
var getErrorName = Symbol("getErrorName");

var MultiError = function (_extendableBuiltin2) {
	_inherits(MultiError, _extendableBuiltin2);

	function MultiError(errors, prefix) {
		_classCallCheck(this, MultiError);

		var _this = _possibleConstructorReturn(this, (MultiError.__proto__ || Object.getPrototypeOf(MultiError)).call(this));

		var _ = (0, _incognito2.default)(_this);
		_.prefix = prefix;
		Object.defineProperties(_this, {
			"errors": {
				writable: false,
				enumerable: true,
				value: []
			},
			"message": {
				get: _this[message]
			}
		});

		_this.name = prefix || 'error'; //so it has title to group by on jsonapi
		_this.concat(errors);
		return _this;
	}

	_createClass(MultiError, [{
		key: "concat",
		value: function concat(errors) {
			var _this2 = this;

			if (Array.isArray(errors)) {
				errors.forEach(function (error) {
					_this2.push(error);
				});
			} else if (errors instanceof Error) {
				this.push(errors);
			}
		}
	}, {
		key: getErrorName,
		value: function value(error) {
			var _ = (0, _incognito2.default)(this);
			return error.name || _.prefix;
		}
	}, {
		key: "push",
		value: function push(newError) {
			var _this3 = this;

			if (newError.constructor.name === this.constructor.name) {
				newError.errors.forEach(function (error) {
					error.name = _this3[getErrorName](error);
					_this3.errors.push(error);
				});
			} else {
				newError.name = this[getErrorName](newError);
				this.errors.push(newError);
			}
		}
	}, {
		key: "toJSON",
		value: function toJSON() {
			var result = new Array();
			this.errors.forEach(function (error) {
				//standard ERROR properties from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
				result.push({ name: error.name, message: error.message });
			});
			return result;
		}
	}, {
		key: message,
		value: function value() {
			var _ = (0, _incognito2.default)(this);
			var returnedMessage = "";
			if (_.prefix) {
				returnedMessage = _.prefix + ": ";
			}

			returnedMessage += this.errors.map(function (error) {
				return error.message;
			}).join(", ");

			return returnedMessage;
		}
	}]);

	return MultiError;
}(_extendableBuiltin(Error));

exports.default = MultiError;