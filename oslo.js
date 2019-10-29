const fs = require('fs');
const lr = require('readline');
const {spawn} = require('child_process');

class Oslo {
    x = {};
    constructor() {
        this.r = spawn('adb', ['logcat', '-b', 'main', '--regex=(to NanoApp)|(Oslo.*output)'])
        this.r.stdout.on('data', (data) => {
            data.toString().split('\n').forEach((line,i) => {;
                let k = line.match(/Oslo (.*)? output:/);
                if (k) {
                    let payload = {};
                    let event = k[1];
                    let mDetected = line.match(/mDetected = (true|false)/);
                    if (mDetected) payload['mDetected'] = mDetected[1] == 'true';
                    let mLikelihood = line.match(/mLikelihood = ([-]?[0-9]*\.?[0-9]*([Ee][+-]?[0-9]+)?)/);
                    if (mLikelihood) payload['mLikelihood'] = Number(mLikelihood[1]);
                    let mDistance = line.match(/mDistance = ([-]?[0-9]*\.?[0-9]*([Ee][+-]?[0-9]+)?)/);
                    if (mDistance) payload['mDistance'] = Number(mDistance[1]);
                    let mAxialVelocity = line.match(/mAxialVelocity = ([-]?[0-9]*\.?[0-9]*([Ee][+-]?[0-9]+)?)/);
                    if (mAxialVelocity) payload['mAxialVelocity'] = Number(mAxialVelocity[1]);
                    let mAngle0 = line.match(/mAngle\[0\] = ([-]?[0-9]*\.?[0-9]*([Ee][+-]?[0-9]+)?)/);
                    let mAngle1 = line.match(/mAngle\[1\] = ([-]?[0-9]*\.?[0-9]*([Ee][+-]?[0-9]+)?)/);
                    let mAngle = line.match(/mAngle = ([-]?[0-9]*\.?[0-9]*([Ee][+-]?[0-9]+)?)/);
                    if (mAngle0 && mAngle1) payload['mAngle'] = [Number(mAngle0[1]), Number(mAngle1[1])];
                    if (mAngle) payload['mAngle'] = Number(mAngle[1]);
                    let mGatingReason = line.match(/mGatingReason = (\d)/);
                    if (mGatingReason) payload['mGatingReason'] = mGatingReason[1];
                    let mIsEnabled = line.match(/mIsEnabled = (true|false)/);
                    if (mIsEnabled) payload['mIsEnabled'] = mIsEnabled[1] == "true";
                    if (this.x[event]) {
                        this.x[event].forEach(e => e(payload));
                    }
                }
                let l = line.match(/Sent (.*)? to NanoApp/);
                if (l) {
                    let event = l[1];
                    if (this.x[event]) {
                        this.x[event].forEach(e => e());
                    }
                }
            })
        })
        this.r.stderr.on('data', (data)=> {
            console.error(data.toString());
        })
    }

    on(event, on) {
        if (this.x[event]) {
            this.x[event].append(on)
        } else {
            this.x[event] = [on]; 
        }
    }
}

module.exports = Oslo;