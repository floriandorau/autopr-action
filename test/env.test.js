const env = require('../lib/env');

beforeEach(() => delete process.env.TEST_ENV_VAR);

test('extractVar returns value for given env var', () => {
    process.env.TEST_ENV_VAR='test';

    const result = env.extractVar('TEST_ENV_VAR');
    expect(result).toBe('test');
});

test('extractVar does not return default value for given env var', () => {
    process.env.TEST_ENV_VAR='test';

    const result = env.extractVar('TEST_ENV_VAR', 'defaultTest');
    expect(result).toBe('test');
});

test('extractVar returns undefined for not given env var', () => {
    const result = env.extractVar('TEST_ENV_VAR');
    expect(result).toBeUndefined();
});

test('extractVar returns default value for not given env var', () => {
    const result = env.extractVar('TEST_ENV_VAR', 'defaultTest');
    expect(result).toBe('defaultTest');
});
