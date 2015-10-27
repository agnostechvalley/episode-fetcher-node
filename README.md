episode-fetcher
===============

A toy project to download the latest episode(s) of your favorite podcast.

# Run it

The script requires that the following environment variables are set:

- `FEED_URL` - The URL of the Podcast feed.
- `USERNAME` - The feed is behind basic auth.
- `PASSWORD` - The feed is behind basic auth.
- `MAX_EPISODES` - I've had bad results with > `15`. Default is `10`.
- `EPISODES_DIRECTORY` - Download 'em wherever you want. Default is the project's `./episodes`.

Minimally, you would run `USERNAME=you@email.com PASSWORD=yourpass npm start`
