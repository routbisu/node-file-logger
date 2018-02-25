# Node File Logger
A simple logger for logging exceptions and error details in a log file.

```
  _   _           _        _____ _ _        _                                
 | \ | | ___   __| | ___  |  ___(_) | ___  | |    ___   __ _  __ _  ___ _ __ 
 |  \| |/ _ \ / _` |/ _ \ | |_  | | |/ _ \ | |   / _ \ / _` |/ _` |/ _ \ '__|
 | |\  | (_) | (_| |  __/ |  _| | | |  __/ | |__| (_) | (_| | (_| |  __/ |   
 |_| \_|\___/ \__,_|\___| |_|   |_|_|\___| |_____\___/ \__, |\__, |\___|_|   
                                                       |___/ |___/            
```

# Docs & Features
## Dependencies
Moment.js

## Suports all logging levels
- DEBUG: The DEBUG Level designates fine-grained informational events that are most useful to debug an application. 
- TRACE: The TRACE Level designates finer-grained informational events than the DEBUG 
- INFO: The INFO level designates informational messages that highlight the progress of the application at coarse-grained level. 
- WARN: The WARN level designates potentially harmful situations. 
- ERROR: The ERROR level designates error events that might still allow the application to continue running.
- FATAL: The FATAL level designates very severe error events that will presumably lead the application to abort. 

## Create date-wise log files
It has an option to create a new log file for the current date which will be named like `YYYY-MM-DD-log.log`

## Extras
- Allows logging the service name & method name
- Allows logging a short error message and an entire error object (optional)
- Error objects are stringified and then logged to the log file

## Has a callback
It allows you to run a callback after the logging process.


# Steps to use
## Installation
`npm install node-file-logger --save`

## Create instance of Node file logger
```javascript
// Ceate an instance of node file logger
const nfl = require('node-file-logger');
const logger = nfl(options); // Options are optional
```

## Using options
```javascript
// It is recommended to set options in a separate module and include it in the code
// Everything in the example below are default values
const options = {
  folderPath: './logs/',      
  dateBasedFileNaming: true,
  // Required only if dateBasedFileNaming is set to false
  fileName: '',   
  // Required only if dateBasedFileNaming is set to true
  fileNamePrefix: 'Logs_',
  fileNameSuffix: '',
  fileNameExtension: '.log',     
  
  dateFormat: 'YYYY-MM-DD',
  timeFormat: 'HH:mm:ss.SSS',
}

// Note: If you set dateBasedFileNaming to false, then a log file will be created at the folder path with the provided fileName.
// If set to true then a logfile will be created with the name <fileName> provided in the options

const logger = nfl(options); 
```

# Examples
## Simple logging to a file with date-based log file naming
```javascript
const options = {
  folderPath: './logs/',
  dateBasedFileNaming: true,
  fileNamePrefix: 'DailyLogs_',
  fileNameExtension: '.log',    
  dateFormat: 'YYYY_MM_D',
  timeFormat: 'h:mm:ss A',
}

const logger = require('node-file-logger');
const log = logger(options);

// Log a simple error message
log.Info('Some informational log message');

// *****************************************************
// Ouput in Logfile: 
// File name : ./logs/Logs_2018_02_23.log
// 5:52:28 PM | Some informational log message
// *****************************************************

// Log an error message with service and method names
log.Error('Something has failed!', 'Some service', 'Some method');

// *****************************************************
// Ouput in Logfile: 
// File name : ./logs/Logs_2018_02_23.log
// 5:52:28 PM | Service: Some service | Method: Some method | Some error message
// *****************************************************

// Log an fatal error message with service and method names and error object
log.Fatal('Something has failed!', 'Some service', 'Some method', errorObj);

// *****************************************************
// Ouput in Logfile: 
// File name : ./logs/Logs_2018_02_23.log
// 5:52:28 PM | Service: Some service | Method: Some method | Something is broken
{
  unhandledException: Something serious has happened
}
// *****************************************************

// Log an error message with callback
log.Info('Something has failed!', null, null, null, function() {
  // Do something
});

```

## Simple logging to a file without date-based file naming
```javascript
const options = {
  folderPath: './logs/',
  dateBasedFileNaming: false,
  fileName: 'All_Logs.log', 
  dateFormat: 'YYYY_MM_D',
  timeFormat: 'h:mm:ss A',
}

const logger = require('node-file-logger');
const log = logger(options);

// Log a simple error message
log.Info('Some informational log message');


// *****************************************************
// Ouput in Logfile: 
// File name : ./logs/All_Logs.log
// 2018_02_23 5:52:28 PM | Some informational log message
// *****************************************************
```

# API Reference
## Methods:
- **Debug**(errorMessage, serviceName (optional), methodName (optional), errorObj (optional), callback (optional))
- **Trace**(errorMessage, serviceName (optional), methodName (optional), errorObj (optional), callback (optional))
- **Info**(errorMessage, serviceName (optional), methodName (optional), errorObj (optional), callback (optional))
- **Warn**(errorMessage, serviceName (optional), methodName (optional), errorObj (optional), callback (optional))
- **Error**(errorMessage, serviceName (optional), methodName (optional), errorObj (optional), callback (optional))
- **Fatal**(errorMessage, serviceName (optional), methodName (optional), errorObj (optional), callback (optional))

- **_Log_**(logLevel, errorMessage, serviceName (optional), methodName (optional), errorObj (optional), callback (optional))

### Valid values of logLevel
'debug', 'trace', 'info', 'warn', 'error', 'fatal'
