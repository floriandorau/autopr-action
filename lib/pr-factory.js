const changeCase = require('change-case');

const { Failure } = require('./errors');
const { extractBranchName } = require('./util');
const { name, version, homepage } = require('../package.json');

/**
 * NOTE: Do not change format of the template string. Otherwise it will not render properly in GH.
 */
const createPullRequestBody = (featureBranch, actor) => {
    return `Auto-created Pull-Request for branch _${featureBranch}_ pushed by @${actor}.

> This *PR* was created with :heart: by [${name}](${homepage}) 
> Version: ${version}`;
}

const toSentenceCase = (featureBranch) => {
    return featureBranch.split('_')
        .map(s => changeCase.sentenceCase(s))
        .join(' ');
}

const createPullRequesTitle = (featureBranch, prefix) => {
    let title = prefix ? `${prefix}: ` : '';
    return title + toSentenceCase(featureBranch);
};

const createPullRequest = ({ ref, base = 'master', actor = 'unknown', prefix }) => {
    if (!ref || !ref.length) {
        throw new Failure('Can not create pull request for undefined "ref"');
    }

    const featureBranch = extractBranchName(ref);

    return {
        title: createPullRequesTitle(featureBranch, prefix),
        body: createPullRequestBody(featureBranch, actor),
        head: featureBranch,
        base: base,
    };
};

module.exports = { createPullRequest };