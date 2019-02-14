const { createPullRequest } = require('../lib/pr-factory');

describe('createPullRequest', () => {
    test('returns valid pull request"', () => {
        const data = {
            actor: 'JohnDoe',
            ref: 'ref/heads/misc_feature-branch',
            base: 'master'
        };

        const result = createPullRequest(data);
        expect(result.title).toMatch('Misc Feature branch');
        expect(result.head).toMatch('misc_feature-branch');
        expect(result.base).toMatch('master');
    });


});