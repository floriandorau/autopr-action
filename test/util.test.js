const util = require('../lib/util');

describe('extractBranchName', () => {
    test('returns "feature-branch-1" from "refs/heads/feature-branch-1"', () => {
        const result = util.extractBranchName('refs/heads/feature-branch-1');
        expect(result).toMatch('feature-branch-1');
    });

    test('returns "feature-branch-1" from "refs/tags/feature-branch-1"', () => {
        const result = util.extractBranchName('refs/tags/feature-branch-1');
        expect(result).toMatch('feature-branch-1');
    });
});

describe('isBranch', () => {
    test('returns true for "refs/heads/..."', () => {
        const result = util.isBranch('refs/heads/feature-branch-1');
        expect(result).toBe(true);
    });

    test('returns false for "refs/tags/..."', () => {
        const result = util.isBranch('refs/tags/feature-branch-1');
        expect(result).toBe(false);
    });
});