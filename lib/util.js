const isBranch = (ref) => {
    // the ref of created branches contains heads. if we have a created tags it will contain tags
    return ref.indexOf('heads') !== -1;
}

const extractBranchName = (githubRef) => {
    // extract branch name from ref string e.g. 'refs/heads/branch_name'
    return githubRef.substr(githubRef.lastIndexOf('/') + 1);
}

module.exports = { isBranch, extractBranchName };