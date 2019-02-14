const packageJson = require('../package.json');
const changeCase = require('change-case');

const { extractBranchName } = require('./util');

const createPullRequestBody = (featureBranch, actor) => {
    return `Auto-created Pull-Request for branch _${featureBranch}_ pushed by @${actor}.

> This *PR* was created with :heart: by [${packageJson.name}](${packageJson.homepage}) 
> Version: ${packageJson.version}`;
}

const createPullRequesTitle = (featureBranch) => {
    return featureBranch.split('_')
        .map(s => changeCase.sentenceCase(s))
        .join(' ');
};

const createPullRequest = ({ ref, base = 'master', actor = 'unknown' }) => {
    const featureBranch = extractBranchName(ref);

    return {
        title: createPullRequesTitle(featureBranch),
        body: createPullRequestBody(featureBranch, actor),
        head: featureBranch,
        base: base,
    };
};

module.exports = { createPullRequest };