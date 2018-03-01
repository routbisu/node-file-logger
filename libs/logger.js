const fs = require('fs');
const commonServices = require('./common');
const moment = require('moment-timezone');
const stringify = require('node-stringify');

/***************************************************************************
 * Log data to a file
 * @param {object} options - User options
 * @param {string} logLevel - Log level
 * @param {string} errorMessage - Short error message
 * @param {string} serviceName - Service name
 * @param {string} methodName - Method Name
 * @param {any} errorObj - Error Object
 * @param {function} callback - Callback function
 **************************************************************************/
module.exports = function(options, logLevel, errorMessage, serviceName, 
                                        methodName, errorObj, callback) {
    
    try {
        // Log messages based on log-level
        // If logLevel is prod or prod-trace then dont log debug/trace messages
        if(options.logLevel.toLowerCase() === 'prod') {
            if(logLevel) {
                if(logLevel.toLowerCase() === 'debug' || logLevel.toLowerCase() === 'trace')
                    return;
            }
        }

        if(options.logLevel.toLowerCase() === 'prod-trace') {
            if(logLevel) {
                if(logLevel.toLowerCase() === 'debug')
                    return;
            }
        }

        // Compute filename and timestamp
        let fileName = '';
        if(options.dateBasedFileNaming) {
            fileName = commonServices.GetCurrentDateFileName();
        } else {
            fileName = commonServices.GetLogFileName();
        }

        let time = moment().tz(options.timeZone).format(options.timeFormat);
        let date = moment().tz(options.timeZone).format(options.dateFormat);
        
        if(options.dateBasedFileNaming) {
            currentTime = time;
        } else {
            currentTime = date + ' ' + time;
        }

        let errorLine = '';

        try {
            errorLine = currentTime + ' | ' 
                        + logLevel + ' | ' 
                        + stringify(errorMessage) + ' | '
                        + (serviceName ? ('Service: ' + serviceName + ' | ') : '')
                        + (methodName ? ('Method: ' + methodName + ' | ') : '')
                        + (errorObj ? ('\n' + stringify(errorObj)) : '')
                        + '\n';
        }
        catch(err) {
            errorLine = currentTime + ' | ' 
                        + logLevel + ' | ' 
                        + stringify(errorMessage) + ' | '
                        + (serviceName ? ('Service: ' + serviceName + ' | ') : '')
                        + (methodName ? ('Method: ' + methodName + ' | ') : '')
                        + 'Error object could not be logged'
                        + '\n';
        }

        // Log to console if needed
        if(!options.onlyFileLogging) console.log(errorLine);

        fs.appendFile(fileName, errorLine, (err) => {
            if(err) {
                console.log('Node file logger Error: ' + err);
            }
            if(callback) callback(err);
        });

    } catch(ex) {
        
    }
}