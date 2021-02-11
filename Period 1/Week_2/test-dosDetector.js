const {DosDetector} = require('./dosDetector'); // Import the module
const ddosDetector = new DosDetector(2000); // Call the constructor on the new obj.

ddosDetector.on('DOS Detected', (arg) => { // Eventlistener with callback
    console.log('Plausible DDOS attack detected', arg);
});

ddosDetector.addUrl("url1");
ddosDetector.addUrl("url2");
ddosDetector.addUrl("url3");

//Simulate requests for same URL within short time period
setTimeout(() => {
    ddosDetector.addUrl("url1");
    ddosDetector.addUrl("url3");
}, 1000)

// Output
// Plausible DDOS attack detected { url: 'url1', timeBetweenCalls: 1003 }
// Plausible DDOS attack detected { url: 'url3', timeBetweenCalls: 1003 }