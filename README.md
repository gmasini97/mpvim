MPVIM
-------

This project is a simple utility for chaining [yt-dlp](https://github.com/yt-dlp/yt-dlp) and [mpv](https://mpv.io/).

## Requirements
Download and install nodejs, [yt-dlp](https://github.com/yt-dlp/yt-dlp) and [mpv](https://mpv.io/). Check that all of them are accessible from your command line.

## Quickstart
Clone the github repo. Then from the cloned folder run:
```
npm install
npm install -g .
```

Then try:
```
npx mpvim "<youtube-url>"
```

## Reference

Check help at
```
npx mpvim --help
```

For audio/video selectors check the [yt-dlp documentation about format selection](https://github.com/yt-dlp/yt-dlp#format-selection).