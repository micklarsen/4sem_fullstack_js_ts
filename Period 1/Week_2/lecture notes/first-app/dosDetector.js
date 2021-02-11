const EventEmitter = require("events")
/*
2) Simple DOS-detector file
Create a file dosDetector.js and paste in the code below. 
It's the start code for an event-based control which should 
fire (emit) an event "DosDetected" if the same URL is added 
more than once before the time-interval TIME_BETWEEN_CALLS has expired.

Create a simple test file that should import the class, 
make an instance, and test the behaviour by 
adding the same URL more than once (use setTimeout to make the second call)

Hints: Observe how this code uses JavaScripts Map (not the map-method on an Array, but the type Map) 
to store URLs, and how the URL itself is used as the key.

*/
class DOS_Detector extends EventEmitter {
  constructor(timeValue) {
    super();
    this.urls = new Map();
    this.TIME_BETWEEN_CALLS = timeValue;
  }
  addUrl = (url) => {
    const time = new Date().getTime();
    if (this.urls.has(url)) {
      const deltaTime = time - this.urls.get(url)
      if (deltaTime < this.TIME_BETWEEN_CALLS) {
        this.emit("DosDetected", { url: url, timeBetweenCalls: deltaTime });
      }
    }
    this.urls.set(url, time);
  }
}
module.exports.DosDectector = DOS_Detector;