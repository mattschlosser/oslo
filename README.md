 # Oslo

 For easily scraping data from the adb logs to access motion sensor data on the Pixel 4/4 XL.

 1. Download adb tools and connect your phone to computer by USB debugging. Ensure the path var to adb is set correctly.
 2. Modify `index.js` to your liking to subscribe to events. Typically, in the form of:
```js
const Oslo = require('./oslo');
const oslo = new Oslo();
oslo.on('flick', (data) => {
    // do something fun
    console.log(data);
});

oslo.on('FLICK 1 SOUTH`, () => {
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