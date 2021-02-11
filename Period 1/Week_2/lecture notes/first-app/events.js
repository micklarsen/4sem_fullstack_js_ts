const Logger = require('./moduleLogger');
const logger = new Logger();

// Listener gets called when events are raised
logger.on('messageLogged', (arg) => { //arg could be 'e' or 'eventArg'
    console.log('Listener called', arg);
});

logger.log('message');
