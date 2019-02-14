const env = require('../lib/env');
const { Failure } = require('../lib/errors');

beforeEach(() => delete process.env.TEST_ENV_VAR);

describe('extractVar', () => {
    test('returns value for given env var', () => {
        process.env.TEST_ENV_VAR = 'test';

        const result = env.extractVar('TEST_ENV_VAR');
        expect(result).toBe('test');
    });

    test('does not return default value for given env var', () => {
        process.env.TEST_ENV_VAR = 'test';

        const result = env.extractVar('TEST_ENV_VAR', 'defaultTest');
        expect(result).toBe('test');
    });

    test('returns undefined for not given env var', () => {
        const result = env.extractVar('TEST_ENV_VAR');
        expect(result).toBeUndefined();
    });

    test('returns default value for not given env var', () => {
        const result = env.extractVar('TEST_ENV_VAR', 'defaultTest');
        expect(result).toBe('defaultTest');
    });
});

describe('extractRequiredVar', () => {
    test('returns value for given env var', () => {
        process.env.TEST_ENV_VAR = 'test';

        const result = env.extractRequiredVar('TEST_ENV_VAR');
        expect(result).toBe('test');
    });

    test('throws error for not defined env var', () => {
        expect(() => env.extractRequiredVar('TEST_ENV_VAR')).toThrow("required env variable 'TEST_ENV_VAR' not defined");
    });
});
