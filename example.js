var log = require('./index');

// log.SetUserOptions({
//     timeZone: 'Asia/Kolkata',
//     folderPath: './logs',      
//     dateBasedFileNaming: true,
//     fileNamePrefix: 'Logs_',
//     fileNameExtension: '.log',         
//     dateFormat: 'YYYY-MM-DD',
//     timeFormat: 'HH:mm:ss.SSS'
// });

log.SetUserOptions({
    timeZone: 'Asia/Kolkata1',
    folderPath: './logs',      
    dateBasedFileNaming: true,
    fileName: 'Global_Logs',
    fileNamePrefix: 'Logs_',
    fileNameExtension: '.log',         
    dateFormat: 'YYYY-M-DD',
    timeFormat: 'HH:mm:ss.SSS',
    logLevel: 'prod',
    onlyFileLogging: false
});

// Log a simple error message
log.Info('Some informational log message');

// Log an error message with service and method names
log.Error('Something has failed!', 'Some service', 'Some method');

log.Debug('Debug message 1', 'Debug service', 'Debug method');
log.Trace('Trace message 1', 'Trace service', 'Trace method');
log.Info('Info message 1', 'Info service', 'Info method');
log.Warn('Warning message 1', 'Warn service', 'warn method');
log.Error('Error message 1', 'Error service', 'Error method');
log.Fatal('Fatal message 1', 'Fatal service', 'Fatal method');
log.Log('debug', 'Debug message 2', 'S1', 'M1', { baz: 'foo' }, 
    () => { console.log('Debug message 2'); })

// Log an fatal error message with service and method names and error object
log.Fatal('Something has failed!', 'Some service', 'Some method', {
    bar: 'foo'
});

log.Info('Something has failed!', null, null, null, function() {
    // Do something
    console.log('Messages have been logged');
});


