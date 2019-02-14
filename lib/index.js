const { createPullRequest } = require('./github');

const run = async () => {
    console.log("You asked me to create a Pull Request");
    const result = await createPullRequest();
    console.log("I did it!");
    return result;
}

module.exports = { run };