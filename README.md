# Oslo Events

 For easily scraping data from the ADB logs to access the Motion Sense data on the Pixel 4/4 XL. This is named Oslo because Oslo was the code name while the
 Pixel 4 was in development. It is part of a wider project known as [Project Soli](https://atap.google.com/soli/)




```
npm i oslo-events
```
 1. Install the dependency above.
 2. Download adb tools and connect your Pixel 4 or 4 XL to your computer by USB debugging. Ensure the path variable to adb is set correctly. For more info 
on setting this up, see more on how to [configure on-device developer options](https://developer.android.com/studio/debug/dev-options).
 3. Create a file and subscribe to events of your liking. These take the classic form of `.on(event, callback)` like so:
```js
const Oslo = require('oslo-events');
const oslo = new Oslo();
oslo.on('flick', (data) => {
    // do something fun
    console.log(data);
});

oslo.on('FLICK 1 SOUTH', () => {
    console.log("USER FLICKED SOUTH");
})
```

## Events with data
These event names will return a data payload
* `flick`
* `reach`
* `status`
* `presence`
* `swipe`

These will only fire if something is subscribed to listen to that event. (e.g. the flick event only triggers if media is playing).

## Events without data
* `FLICK 1 WEST`
* `FLICK 1 EAST`
* `FLICK 1 SOUTH`
* `FLICK 1 UNKNOWN`
* `REACH 1`
* `REACH 0`
* `PRESENCE 1`
* `PRESENCE 0`

These events always fire, regardless of subscription status. 

## ADB Troubleshooting

If you experience issues getting this to run (e.g. you get the `-- wating for device--` message), you may need to set the USB mode on your phone to file transfer mode,
as well as enabling USB Debugging mode. 

## Cool Example
If you have Ubuntu, lock your screen when your Pixel detects you leave

```js
const {spawn} = require('child_process');
const Oslo = require('oslo-events');
const oslo = new Oslo();
// when the user leaves
oslo.on('PRESENCE 0', () => {
   // send a terminal command to lock the screen
   spawn('xdg-screensaver', ['lock']);
});
```
