'use strict';

const _ = require('lodash');
const Promise = require('bluebird');
const URI = require('URIjs');
const parserRss = require('parserss');
const rss = Promise.promisify(parserRss);
const FS = require('fs');
const FP = require('filepath');
const got = require('got');

const EpisodeFetcher = function () {};

EpisodeFetcher.prototype = {
	init: function (options) {
		this.episodesDirectory = FP.create(options.dir).mkdir().path;
		this.maxEpisodes = options.max;
		this.username = options.username;
		this.password = options.password;
		this.feedUrl = new URI(options.feed);
		this.feedUrl.username(this.username);
		this.feedUrl.password(this.password);

		return this;
	},

	authenticatedURL: function () {
		return this.feedUrl.toString();
	},

	processFeed: function (feed) {
		const episodesDirectory = this.episodesDirectory;
		const username = this.username;
		const password = this.password;

		console.info('episode-fetcher: Found ' + feed.articles.length + ' episodes');

		return Promise.all(_.map(feed.articles, function (episode) {
			const episodeURL = new URI(episode.enclosures[0].url);
			episodeURL.username(username);
			episodeURL.password(password);

			const episodeFilename = episodeURL.filename();
			const file = FP.create([episodesDirectory, episodeFilename].join('/'));

			if (file.exists()) {
				return Promise.resolve();
			}
			return new Promise(function streamFile(resolve, reject) {
				const stream = file.newWriteStream();
				const data = got.stream(episodeURL.toString());
				data.pipe(stream);
				data.on('end', resolve);
				data.on('error', reject);
			})
				.then(function returnFilename() {
					return Promise.resolve(episodeFilename);
				})
				.catch(function () {
					console.error('episode-fetcher: Error fetching/writing episode... removing ' + episodeFilename);
					return file.remove();
				});
		}));
	},

	run: function () {
		console.info('episode-fetcher: Fetching RSS feed...');
		console.log(this.authenticatedURL());
		return rss(this.authenticatedURL(), this.maxEpisodes)
			.bind(this)
			.then(this.processFeed)
			.then(function reportEpisodes(newEpisodes) {
				newEpisodes = _(newEpisodes).compact().map(function (newEpisode) {
					if (newEpisode) {
						console.info('episode-fetcher: New episode: ' + newEpisode);
					}
					return newEpisode;
				}).value();
				console.info('episode-fetcher: Downloaded ' + newEpisodes.length + ' new episodes');
				console.info('episode-fetcher: Complete!');
			});
	}
};

module.exports = new EpisodeFetcher();
