const DosDetectorClass = require('./dosDetector'); // Import the module
const dosDetector = new DosDetectorClass.DosDetectorOBJ(2000); // Call the constructor on the new obj.

dosDetector.on('DOS Detected', (arg) => { // Eventlistener with callback
    console.log('Plausible DDOS attack detected', arg);
});

dosDetector.addUrl("url1");
dosDetector.addUrl("url2");
dosDetector.addUrl("url3");

//Simulate requests for same URL within short time period
setTimeout(() => {
    dosDetector.addUrl("url1");
    dosDetector.addUrl("url3");
}, 1000)

// Output
// Plausible DDOS attack detected { url: 'url1', timeBetweenCalls: 1003 }
// Plausible DDOS attack detected { url: 'url3', timeBetweenCalls: 1003 }