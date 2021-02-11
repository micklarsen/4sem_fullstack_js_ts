const MyEventEmitter = require('./MyEventPublisher.js')

const publisher = new MyEventEmitter();

publisher.on("odd", (e) => console.log(`Odd: ${JSON.stringify(e)}`));
publisher.on("even", (e) => console.log(`Even: ${JSON.stringify(e)}`));
publisher.on("high", (e) => console.log(`High: ${JSON.stringify(e)}`));
publisher.on("low", (e) => console.log(`Low: ${JSON.stringify(e)}`));

publisher.simulateData();