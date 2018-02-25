var log = require('./index');

log.SetUserOptions({
    timeZone: 'Asia/Kolkata',
    folderPath: './logs',      
    dateBasedFileNaming: true,
    fileNamePrefix: 'Logs_',
    fileNameExtension: '.log',         
    dateFormat: 'YYYY-MM-DD',
    timeFormat: 'HH:mm:ss.SSS'
});

// Log a simple error message
log.Info('Some informational log message');

// Log an error message with service and method names
log.Error('Something has failed!', 'Some service', 'Some method');

// Log an fatal error message with service and method names and error object
log.Fatal('Something has failed!', 'Some service', 'Some method', {
    bar: 'foo'
});

log.Info('Something has failed!', null, null, null, function() {
    // Do something
    console.log('Messages have been logged');
});