#!/usr/bin/env node --harmony
'use strict';

const EpisodeFetcher = require('./episode-fetcher');
const cli = require('cli');

const options = cli.parse({
	feed: ['f', 'URL of the podcast feed', 'string'],
	username: ['u', 'Username for authenticated feed', 'string'],
	password: ['p', 'Password for authenticated feed', 'string'],
	max: ['m', 'Maximum number of episodes to download', 'int', 10],
	dir: ['d', 'Directory to download episodes', 'string', './episodes']
});

const handleError = function handleError(err) {
	console.error('episode-fetcher ' + err.name + ': ' + err.message);
};

EpisodeFetcher.init(options).run().catch(handleError);
