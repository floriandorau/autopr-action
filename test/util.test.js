const util = require('../lib/util');

test('extractBranchName returns "feature-branch-1" from "refs/heads/..."', () => {
    const result = util.extractBranchName('refs/heads/feature-branch-1');
    expect(result).toMatch('feature-branch-1');
});

test('extractBranchName returns "feature-branch-1" from "refs/tags/..."', () => {
    const result = util.extractBranchName('refs/tags/feature-branch-1');
    expect(result).toMatch('feature-branch-1');
});


test('isBranch is true for "refs/heads/..."', () => {
    const result = util.isBranch('refs/heads/feature-branch-1');
    expect(result).toBe(true);
});

test('isBranch is false for "refs/tags/..."', () => {
    const result = util.isBranch('refs/tags/feature-branch-1');
    expect(result).toBe(false);
});