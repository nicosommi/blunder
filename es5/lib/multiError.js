"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _incognito = require("incognito");

var _incognito2 = _interopRequireDefault(_incognito);

var message = Symbol("message");

var MultiError = (function (_Error) {
	function MultiError(errors, prefix) {
		var _this = this;

		_classCallCheck(this, MultiError);

		_get(Object.getPrototypeOf(MultiError.prototype), "constructor", this).call(this);
		var _ = (0, _incognito2["default"])(this);
		_.prefix = prefix;
		Object.defineProperties(this, {
			"errors": {
				writable: false,
				enumerable: true,
				value: []
			},
			"message": {
				get: this[message]
			}
		});

		this.name = prefix; //so it has title to group by on jsonapi

		if (Array.isArray(errors)) {
			errors.forEach(function (error) {
				_this.push(error);
			});
		} else if (errors instanceof Error) {
			this.push(errors);
		}
	}

	_inherits(MultiError, _Error);

	_createClass(MultiError, [{
		key: "push",
		value: function push(newError) {
			var _this2 = this;

			var _ = (0, _incognito2["default"])(this);
			if (newError.constructor.name === this.constructor.name) {
				newError.errors.forEach(function (error) {
					error.name = _.prefix || error.name;
					_this2.errors.push(error);
				});
			} else {
				newError.name = _.prefix || newError.name;
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
			var _ = (0, _incognito2["default"])(this);
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
})(Error);

exports["default"] = MultiError;
module.exports = exports["default"];