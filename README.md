episode-fetcher
===============

A toy project to download the latest episode(s) of your favorite podcast.

# Install it

`npm install`

# Run it

`$ ./fetch-episodes.js -f private-feed-server.herokuapp.com -u agnostechvalley -p polyglot`

# Help

```
Usage:
  fetch-episodes.js [OPTIONS] [ARGS]

Options:
  -f, --feed STRING      URL of the podcast feed
  -u, --username STRING  Username for authenticated feed
  -p, --password STRING  Password for authenticated feed
  -m, --max [NUMBER]     Maximum number of episodes to download (Default is 10)
  -d, --dir [STRING]     Directory to download episodes (Default is ./episodes)
  -h, --help             Display help and usage details
```
