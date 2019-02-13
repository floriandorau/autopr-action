// Make a pull against
const got = require('got');

const { extractVar } = require('./env');
const { Failure } = require('./errors');

const createData = (branch, targetBranch, actor) => {
    return {
        title: 'Magic pull request',
        body: `Auto-created Pull-Request for ${branch} pushed by ${actor}. Made with <3 by autopr`,
        head: branch,
        base: targetBranch,
    };
};

const createPullRequest = async () => {
    const actor = extractVar("GITHUB_ACTOR");
    const token = extractVar("GITHUB_TOKEN");
    const repository = extractVar("GITHUB_REPOSITORY");
    const branch = extractVar("GITHUB_REF");
    const targetBranch = 'develop';

    const client = got.extend({
        baseUrl: 'https://api.github.com/',
        headers: {
            'Authorization': `token ${token}`
        }
    });

    try {
        const data = createData(branch, targetBranch, actor);
        console.log(`Creating pull-request '${JSON.stringify(data, null, 2)}' at repositroy '${repository}'`);
        const repsonse = await client.post(`/repos/${repository}/pulls`, { json: data });
        const { resBody } = repsonse.json();
        console.log(`Response body '${JSON.stringify(resBody, null, 2)}'`)
    } catch (err) {
        console.error(err);
        throw new Failure(err);
    }
};

module.exports = { createPullRequest } 