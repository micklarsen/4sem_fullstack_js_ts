const EventEmitter = require('events');

class DOS_Detector extends EventEmitter {
    constructor(timeValue) { // Threshold
        super();  //Figure out what it is you have to extend (use moshes video)
        this.urls = new Map();
        this.TIME_BETWEEN_CALLS = timeValue;
    }
    addUrl = (url) => {
        const time = new Date().getTime();
        if (this.urls.has(url)) {
            const deltaTime = time - this.urls.get(url)
            if (deltaTime < this.TIME_BETWEEN_CALLS) {
                // First string is what the eventlistener is listening for - they have to match!
                this.emit('DOS Detected', {url : url, timeBetweenCalls : deltaTime});
            }
        }
        this.urls.set(url, time);
    }
}

// Export the class using nodes CommonJS module system (require/exports)
module.exports.DosDetectorOBJ = DOS_Detector;