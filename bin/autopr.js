#!/usr/bin/env node

const { run } = require('../lib');
const { ErrorWithExitCode } = require('../lib/errors');

const package = require('../package.json');

const main = () => {
    run()
        .then(pr => {
            console.log(pr);
            process.exitCode = 0;
            process.env.pr = {
                title: pr.title,
                url: pr.html_url
            };
        })
        .catch(e => {
            if (e instanceof ErrorWithExitCode) {
                process.exitCode = e.getExitCode();
                console.error(e);
            } else {
                process.exitCode = 11;
                console.error(e);
            }
        }).finally(() => {
            console.log(`Process exited with code: '${process.exitCode}'`);
        })
}
if (require.main === module) {
    console.info(`Running autpr in version: '${package.version}'`);
    main();
}