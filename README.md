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

# Features
## Suports all logging levels
DEBUG: The DEBUG Level designates fine-grained informational events that are most useful to debug an application. 
TRACE: The TRACE Level designates finer-grained informational events than the DEBUG 
INFO: The INFO level designates informational messages that highlight the progress of the application at coarse-grained level. 
WARN: The WARN level designates potentially harmful situations. 
ERROR: The ERROR level designates error events that might still allow the application to continue running.
FATAL: The FATAL level designates very severe error events that will presumably lead the application to abort. 

## Create date-wise log files
It has an option to create a new log file for the current date which will be named like YYYY-MM-DD-log.log

## Has a callback


## Installation

`npm install node-file-logger --save`
