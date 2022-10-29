<p align="center">
  <a href="https://playerloop.io" target="_blank" align="center">
    <img src="https://avatars.githubusercontent.com/u/97310002?s=200&v=4" width="100">
  </a>
  <br />
</p>

# PlayerLoop NPM package

Get bug reports from your players, fast. Improve your game, reward the community.

If your player thinks there is a bug, you have something to fix. A lot of these do not throw exceptions in your code. With PlayerLoop, you can easily implement a bug reporting feature inside your game. You also get an easy-to-use interface to check the reports and download the savegame files and the screenshots to figure out what the problem is.

We are currently in free closed Beta! You can join us here on Discord: [![Discord Chat](https://img.shields.io/discord/929061183233884200?logo=discord&logoColor=ffffff&color=7389D8)](https://discord.gg/rGeGVqnVps)

## Getting started

If you did not do that already, head over [playerloop.io](https://playerloop.io) and sign up for an account.

Then install the NPM package:
`npm install playerloop`

Now you can use Playerloop in your code:

```javascript
const PlayerloopSDK = require('playerloop')
```

Now you can initate the object as follows. To initiate the object, you will need your Playerloop secret. You can retrieve it in your Settings page of your project at [app.playerloop.io](https://app.playerloop.io/). Copy it from there and set it up as follows:

```javascript
const playerloop = new PlayerloopSDK({ secret: "YOUR SECRET HERE" });
```

Now you can create a new bug report like this:

```javascript
playerloop.createReport({text: "the text written by your player"})
```

## Uploading files

You will want to attach a savegame file to your player's report, to make it easier to debug. To do so, you can call the same function as above with the additional attachment field:

```javascript
playerloop.createReport({
  text: "the text written by your player",
  attachments: [ "file path 1", "file path 2" ]
})
```

The attachments will be uploaded together with your bug report.

## Unique Player IDs

Coming soon

## Full reference

Coming soon

## Contributing

Make a PR :)