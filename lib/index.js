const { createPullRequest } = require('./github');

const run = async () => {
    console.log("You asked me to create a Pull Request");
    await createPullRequest();
    console.log("I did it!");
}

module.exports = { run };