// Make a pull against
const got = require('got');

const { extractVar } = require('./env');
const { Failure } = require('./errors');

class HttpClientError extends Error {
    constructor(data) {
        super();
        Object.assign(this, data);
        Error.captureStackTrace(this, HttpClientError);
    }
}

const createHttpClientError = (err) => {
    let errorData;
    if (err.name === 'RequestError') {
        const { name, method, url, code } = err;
        errorData = { name, method, url, code };
    } else if (err.name === 'HTTPError') {
        const { name, method, url, statusCode, statusMessage } = err;
        errorData = { name, method, url, statusCode, statusMessage };
    } else {
        const { url, method } = err;
        errorData = { url, method };
    }

    return new HttpClientError(errorData);

};

const createData = (branch, targetBranch, actor) => {
    return {
        title: 'Magic pull request',
        body: `Auto-created Pull-Request for ${branch} pushed by ${actor}. Made with <3 by autopr`,
        head: branch,
        base: targetBranch,
    };
};

const isBranch = (ref) => {
    // the ref of created branches contains heads. if we have a created tags it will contain tags
    return ref.indexOf('heads') !== -1;
}

const extractBranchName = (githubRef) => {
    // githubRef e.g. refs/heads/branch_name
    return githubRef.substr(githubRef.length - githubRef.lastIndexOf('/') - 1);
}

const createPullRequest = async () => {
    const actor = extractVar("GITHUB_ACTOR");
    const token = extractVar("GITHUB_TOKEN");
    const repository = extractVar("GITHUB_REPOSITORY");
    const ref = extractVar("GITHUB_REF");
    const targetBranch = 'develop';

    if (isBranch(ref)) {
        console.log(`${ref} is a branch. Creating pull-request now`);

        const client = got.extend({
            baseUrl: 'https://api.github.com/',
            headers: {
                'Authorization': `token ${token}`
            }
        });

        try {
            const data = createData(extractBranchName(ref), targetBranch, actor);
            console.log(`Creating pull-request '${JSON.stringify(data, null, 2)}' at repositroy '${repository}'`);
            const repsonse = await client.post(`/repos/${repository}/pulls`, { json: data });
            const { resBody } = repsonse.json();
            console.log(`Response body '${JSON.stringify(resBody, null, 2)}'`)
        } catch (err) {
            const e = createHttpClientError(err);
            console.error(e);
            throw new Failure(e);
        }
    } else {
        console.log(`${ref} is no branch. Therefore skipping creation of pull-request`);
    }
};

module.exports = { createPullRequest }

console.log(extractBranchName('refs/heads/branch_name'));