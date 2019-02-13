const process = require("process");

const { Failure } = require('./errors');

const extractVar = (name) => {  
    const value = process.env[name];
    if (!value || !value.length) {
        throw new Failure(`access token '${name}' not defined`);
    }

    return value;
}

module.exports = { extractVar };