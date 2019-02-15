const { Failure } = require('../lib/errors');
const { createPullRequest } = require('../lib/pr-factory');

describe('createPullRequest', () => {
    test('returns valid pull request with default data', () => {
        const result = createPullRequest({ref: 'ref/heads/misc_feature-branch'});
        expect(result.title).toMatch('Misc Feature branch');
        expect(result.head).toMatch('misc_feature-branch');
        expect(result.base).toMatch('master');
        expect(result.body).toBeDefined();
    });

    test('returns valid pull request', () => {
        const data = {
            ref: 'ref/heads/misc_feature-branch',
            base: 'develop'
        };

        const result = createPullRequest(data);
        expect(result.title).toMatch('Misc Feature branch');
        expect(result.head).toMatch('misc_feature-branch');
        expect(result.base).toMatch('develop');
        expect(result.body).toBeDefined();
    });

    test('returns pull request with prefixed title', () => {
        const data = {
            ref: 'ref/heads/misc_feature-branch',
            prefix: 'WiP'
        };

        const result = createPullRequest(data);
        expect(result.title).toMatch('WiP: Misc Feature branch');
        expect(result.head).toMatch('misc_feature-branch');
        expect(result.base).toMatch('master');
        expect(result.body).toBeDefined();
    });

    test('throws error if ref is undefined', () => {
        expect(()=> createPullRequest({})).toThrow(Failure);
    });
});