class ErrorWithExitCode extends Error {
    constructor(exitCode, ...args) {
        super(args);
        this.exitCode = exitCode;
    }

    getExitCode() {
        this.exitCode;
    }
};

class Neutral extends ErrorWithExitCode { 
    constructor(... args) {
        super(78, args);
    }

    getExitCode() {
        return 78;
    }
};

class Failure extends ErrorWithExitCode { 
    constructor(... args) {
        super(1, args);
    }

    getExitCode() {
        return 1;
    }
};

module.exports = { ErrorWithExitCode, Neutral, Failure }