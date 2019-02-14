// Make a pull against
const got = require('got');
const changeCase = require('change-case');

const env = require('./env');
const package = require('../package.json');
const { HttpClientError } = require('./errors');
const { isBranch, extractBranchName } = require('./util');

const createHttpClientError = (err) => {
    let errorData;
    if (err.name === 'RequestError') {
        const { name, method, url, code } = err;
        errorData = { name, method, url, code };
    } else if (err.name === 'HTTPError') {
        const { name, method, url, statusCode, statusMessage, body } = err;
        errorData = { name, method, url, statusCode, statusMessage, body };
    } else {
        const { url, method } = err;
        errorData = { url, method };
    }

    return new HttpClientError(errorData);

};

const createPullRequestBody = (featureBranch, actor) => {
    return `Auto-created Pull-Request for branch _${featureBranch}_ pushed by @${actor}.

> This *PR* was created with :heart: by [${package.name}](${package.homepage}) 
> Version:${package.version}`;
}

const createPullRequesTitle = (featureBranch) => {
    return featureBranch.split('_')
        .map(s => changeCase.sentenceCase(s))
        .join(' ');
}

const createData = ({ ref, base = 'master', actor = 'unknown' }) => {
    const featureBranch = extractBranchName(ref);

    return {
        title: createPullRequesTitle(featureBranch),
        body: createPullRequestBody(featureBranch, actor),
        head: featureBranch,
        base: base,
    };
};

const createClient = (authToken) => {
    return got.extend({
        baseUrl: 'https://api.github.com/',
        headers: {
            'Authorization': `token ${authToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json'
        }
    });
}

const extractGithubOptions = () => {
    return {
        actor: env.extractRequiredVar("GITHUB_ACTOR"),
        token: env.extractRequiredVar("GITHUB_TOKEN"),
        repository: env.extractRequiredVar("GITHUB_REPOSITORY"),
        ref: env.extractVar("GITHUB_REF"),
        base: env.extractVar("AUTOPR_BASE_BRANCH", 'master')
    }
};

const createPullRequestResult = (result) => {
    const {id, title, body, number, html_url, created_at} = result;
    return {id, title, body, number, html_url, created_at};
}

const createPullRequest = async () => {
    const githubOptions = extractGithubOptions();

    if (!githubOptions.ref || !githubOptions.ref.length) {
        throw new Failure('Unable to create Pull Request for an unknown feature branch');
    }

    if (isBranch(githubOptions.ref)) {
        console.log(`'${githubOptions.ref}' is a branch. Creating pull-request now`);

        const client = createClient(githubOptions.token);

        try {
            const data = createData(githubOptions);
            console.log(`Creating pull-request '${JSON.stringify(data)}' at repository '${githubOptions.repository}'`);

            const result = await client.post(`/repos/${githubOptions.repository}/pulls`, { body: JSON.stringify(data) });      
            console.log(`${result.statusCode}: ${result.statusMessage}`);
            return createPullRequestResult(JSON.parse(result.body));         
        } catch (err) {
            throw createHttpClientError(err);
        }
    } else {
        console.log(`'${githubOptions.ref}' is no branch. Therefore skipping creation of pull-request`);
    }
};

const getPullRequests = async () => {
    const githubOptions = extractGithubOptions();

    try {
        const client = createClient(githubOptions.token);
        console.log(`Fetching pull-requests from repository '${githubOptions.repository}'`);
        return await client.get(`/repos/${githubOptions.repository}/pulls`);
    } catch (err) {
        throw createHttpClientError(err);
    }
};

module.exports = { createPullRequest, getPullRequests };