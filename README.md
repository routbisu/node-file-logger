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
moment.js 
moment-timezone.js 
node-stringify.js

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
const log = require('node-file-logger');
log.SetUserOptions(options); // Options are optional
```

## Using options
```javascript
// It is recommended to set options in a separate module and include it in the code
// Everything in the example below are default values
const options = {
  timeZone: 'America/Los_Angeles',
  folderPath: './logs/',      
  dateBasedFileNaming: true,
  // Required only if dateBasedFileNaming is set to false
  fileName: 'All_Logs',   
  // Required only if dateBasedFileNaming is set to true
  fileNamePrefix: 'Logs_',
  fileNameSuffix: '',
  fileNameExtension: '.log',     
  
  dateFormat: 'YYYY-MM-DD',
  timeFormat: 'HH:mm:ss.SSS',
  logLevel: 'debug',
  onlyFileLogging: true
}

// Note: If you set dateBasedFileNaming to false, then a log file will be created at the folder path with the provided fileName.
// If set to true then a logfile will be created with the name <fileName> provided in the options

log.SetUserOptions(options); 
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

const log = require('node-file-logger');
log.SetUserOptions(options);

// Log a simple error message
log.Info('Some informational log message');

// *****************************************************
// Ouput in Logfile: 
// File name : ./logs/Logs_2018_02_23.log
// 5:52:28 PM | Info | Some informational log message
// *****************************************************

// Log an error message with service and method names
log.Error('Something has failed!', 'Some service', 'Some method');

// *****************************************************
// Ouput in Logfile: 
// File name : ./logs/Logs_2018_02_23.log
// 5:52:28 PM | Error | Service: Some service | Method: Some method | Some error message
// *****************************************************

// Log an fatal error message with service and method names and error object
log.Fatal('Something has failed!', 'Some service', 'Some method', errorObj);

// *****************************************************
// Ouput in Logfile: 
// File name : ./logs/Logs_2018_02_23.log
// 5:52:28 PM | Fatal | Service: Some service | Method: Some method | Something is broken
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

const log = require('node-file-logger');
log.SetUserOptions(options);

// Log a simple error message
log.Info('Some informational log message');


// *****************************************************
// Ouput in Logfile: 
// File name : ./logs/All_Logs.log
// 2018_02_23 5:52:28 PM | Info | Some informational log message
// *****************************************************
```

# API Reference
## Methods:

### SetUserOptions()
Sets user options for node file logger

| Parameter | Description | Datatype | Optional |
| --------- |-------------| ---------| -------- |
| **object** | _Configuration Object_ | object | no |

#### Details of the configuration object

| Parameter | Description | Datatype | Default Value |
| --------- |-------------| ---------| -------- |
| **folderPath** | _Path of the folder where log file will be saved_ | string | ./logs/ |
| **dateBasedFileNaming** | _If set to true, date based file naming standard will be followed for log file_ | boolean |true |
| **fileName** | _Needed in case of single log file, where dateBasedFileNaming is set to false_ | string | All_Logs |
| **fileNamePrefix** | _Log file name prefix_ | string | Logs_ |
| **fileNameSuffix** | _Log file name suffix_ | string | '' |
| **fileNameExtension** | _Log file name extension_ | string | .log |
| **dateFormat** | _Date format for timestamp logging_ | string | YYYY-MM-DD |
| **timeFormat** | _Time format for timestamp logging_ | string | HH:mm:ss.SSS |
| **logLevel** | _Allowed values - debug, prod, prod-trace (Details below)_ | string | debug |
| **onlyFileLogging** | _If set to false then messages are logged to console as well_ | boolean | true |

#### Details of log levels
'prod' and 'prod-trace' levels are suitable for production releases

| Log level name | Description |
| --------- |-------------| 
| debug | All log level messages are logged |
| prod | Only 'warn', 'info', 'error' and 'fatal' messages are logged. 'debug' and 'trace' messages are not logged. |
| prod-trace | Only 'debug' messages are not logged. All the others are logged.  |

### Debug()
Logs a debug message in the log file

| Parameter | Description | Datatype | Optional |
| --------- |-------------| ---------| -------- |
| **errorMessage** | _Error message to be logged in the file_ | string | no |
| **serviceName** | _Service name from which info was logged_ | string | yes |
| **methodName** | _Method name from which info was logged_ | string | yes |
| **errorObj** | _Error object that needs to be logged_ | object | yes |
| **callback** | _Callback method that is called after error logging (may return an error)_ | function | yes |

### Trace()
Logs a trace message in the log file

| Parameter | Description | Datatype | Optional |
| --------- |-------------| ---------| -------- |
| **errorMessage** | _Error message to be logged in the file_ | string | no |
| **serviceName** | _Service name from which info was logged_ | string | yes |
| **methodName** | _Method name from which info was logged_ | string | yes |
| **errorObj** | _Error object that needs to be logged_ | object | yes |
| **callback** | _Callback method that is called after error logging (may return an error)_ | function | yes |

### Info()
Logs a informational message in the log file

| Parameter | Description | Datatype | Optional |
| --------- |-------------| ---------| -------- |
| **errorMessage** | _Error message to be logged in the file_ | string | no |
| **serviceName** | _Service name from which info was logged_ | string | yes |
| **methodName** | _Method name from which info was logged_ | string | yes |
| **errorObj** | _Error object that needs to be logged_ | object | yes |
| **callback** | _Callback method that is called after error logging (may return an error)_ | function | yes |

### Warn()
Logs a warning message in the log file

| Parameter | Description | Datatype | Optional |
| --------- |-------------| ---------| -------- |
| **errorMessage** | _Error message to be logged in the file_ | string | no |
| **serviceName** | _Service name from which info was logged_ | string | yes |
| **methodName** | _Method name from which info was logged_ | string | yes |
| **errorObj** | _Error object that needs to be logged_ | object | yes |
| **callback** | _Callback method that is called after error logging (may return an error)_ | function | yes |

### Error()
Logs a error message in the log file

| Parameter | Description | Datatype | Optional |
| --------- |-------------| ---------| -------- |
| **errorMessage** | _Error message to be logged in the file_ | string | no |
| **serviceName** | _Service name from which info was logged_ | string | yes |
| **methodName** | _Method name from which info was logged_ | string | yes |
| **errorObj** | _Error object that needs to be logged_ | object | yes |
| **callback** | _Callback method that is called after error logging (may return an error)_ | function | yes |

### Fatal()
Logs a fatal error message in the log file

| Parameter | Description | Datatype | Optional |
| --------- |-------------| ---------| -------- |
| **errorMessage** | _Error message to be logged in the file_ | string | no |
| **serviceName** | _Service name from which info was logged_ | string | yes |
| **methodName** | _Method name from which info was logged_ | string | yes |
| **errorObj** | _Error object that needs to be logged_ | object | yes |
| **callback** | _Callback method that is called after error logging (may return an error)_ | function | yes |

### Log()
Used to log any kind of log message in the log file (Custom Log level)

| Parameter | Description | Datatype | Optional |
| --------- |-------------| ---------| -------- |
| **logLevel** | _Log level - 'debug', 'trace', 'info', 'warn', 'error', 'fatal', on any custom log level _ | string | no |
| **errorMessage** | _Error message to be logged in the file_ | string | no |
| **serviceName** | _Service name from which info was logged_ | string | yes |
| **methodName** | _Method name from which info was logged_ | string | yes |
| **errorObj** | _Error object that needs to be logged_ | object | yes |
| **callback** | _Callback method that is called after error logging (may return an error)_ | function | yes |

## License

Apache 2.0

