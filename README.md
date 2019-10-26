 # Oslo

 For easily scraping data from the adb logs to access motion sensor data on the Pixel 4/4 XL.

 1. Download adb tools and connect your phone to computer by USB debugging. Ensure the path var to adb is set correctly. For more info 
on setting this up, see more on how to [configure on-device developer options](https://developer.android.com/studio/debug/dev-options).
 2. Install the dependency:
 ```
npm install oslo-events
```
 3. Create a file and subscribe  to events of your liking. These take the classic form of `.on(event, callback)` like so:
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
