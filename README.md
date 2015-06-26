# Blunder.js [![npm version](https://img.shields.io/npm/v/blunder.svg)](https://www.npmjs.com/package/blunder) [![license type](https://img.shields.io/npm/l/blunder.svg)](https://github.com/FreeAllMedia/blunder.git/blob/master/LICENSE) [![npm downloads](https://img.shields.io/npm/dm/blunder.svg)](https://www.npmjs.com/package/blunder) ![ECMAScript 6](https://img.shields.io/badge/ECMAScript-6-red.svg)

ES6 Component for handling errors

```javascript
import MultiError from "blunder";

const multiError = new Blunder([new Error("some error"), new Error("some other")]); //you can use an array or just one
throw multiError; //multiError is an instance of Error too
```

# Quality and Compatibility

[![Build Status](https://travis-ci.org/FreeAllMedia/blunder.png?branch=master)](https://travis-ci.org/FreeAllMedia/blunder) [![Coverage Status](https://coveralls.io/repos/FreeAllMedia/blunder/badge.svg)](https://coveralls.io/r/FreeAllMedia/blunder) [![Code Climate](https://codeclimate.com/github/FreeAllMedia/blunder/badges/gpa.svg)](https://codeclimate.com/github/FreeAllMedia/blunder) [![Dependency Status](https://david-dm.org/FreeAllMedia/blunder.png?theme=shields.io)](https://david-dm.org/FreeAllMedia/blunder?theme=shields.io) [![Dev Dependency Status](https://david-dm.org/FreeAllMedia/blunder/dev-status.svg)](https://david-dm.org/FreeAllMedia/blunder?theme=shields.io#info=devDependencies)

*Every build and release is automatically tested on the following platforms:*

![node 0.12.x](https://img.shields.io/badge/node-0.12.x-brightgreen.svg) ![node 0.11.x](https://img.shields.io/badge/node-0.11.x-brightgreen.svg) ![node 0.10.x](https://img.shields.io/badge/node-0.10.x-brightgreen.svg)
![iojs 2.x.x](https://img.shields.io/badge/iojs-2.x.x-brightgreen.svg) ![iojs 1.x.x](https://img.shields.io/badge/iojs-1.x.x-brightgreen.svg)


[![Sauce Test Status](https://saucelabs.com/browser-matrix/blunder.svg)](https://saucelabs.com/u/blunder)


*If your platform is not listed above, you can test your local environment for compatibility by copying and pasting the following commands into your terminal:*

```
npm install blunder
cd node_modules/blunder
gulp test-local
```

# Installation

Copy and paste the following command into your terminal to install Blunder:

```
npm install blunder --save
```

## Import / Require

```
// ES6
import MultiError from "blunder";
```

```
// ES5
var MultiError = require("blunder");
```

```
// Require.js
define(["require"] , function (require) {
    var MultiError = require("blunder");
});
```

# Getting Started

## Using it
You can import the MultiError class from blunder.
It extends the Error native class and allows you to join several errors.
The constructor accepts both an Error instances or an Error array.
There is also a push method to add more errors on it.

```javascript
import MultiError from "blunder";

someFunctionThatReturnAnInternError((error) => {//if error is a blunder Multierror it's ok too!
	const multiError = new MultiError([new Error("another error attached"), error]);
	multiError.push(Error("one more thing wrong"));
	callback(multiError);
});
```

# How to Contribute

See something that could use improvement? Have a great feature idea? We listen!

You can submit your ideas through our [issues system](https://github.com/FreeAllMedia/blunder/issues), or make the modifications yourself and submit them to us in the form of a [GitHub pull request](https://help.github.com/articles/using-pull-requests/).

We always aim to be friendly and helpful.

## Running Tests

It's easy to run the test suite locally, and *highly recommended* if you're using Blunder.js on a platform we aren't automatically testing for.

```
npm test
```


### SauceLabs Credentials

We've setup our tests to automatically detect whether or not you have our saucelabs credentials installed in your environment (`process.env.SAUCE_USERNAME`).

If our saucelabs credentials are not installed, the tests are setup to automatically detect all browsers you have installed on your local system, then use them to run the tests.

#### Obtaining Our SauceLabs Credentials

If you'd like to develop Blunder.js using SauceLabs, you need only create a new entry in our [issue tracker](https://github.com/FreeAllMedia/blunder/issues) asking for our SauceLabs credentials.

We'll send over all credentials specific to this project so that you can perform comprehensive cross-platform tests.
