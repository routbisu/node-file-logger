const fs = require('fs');
let commonServices = require('./libs/common');

/***************************************************************************
 * Log data to a file
 * @param {object} options - User options
 * @param {string} fileName - File name to append data
 * @param {string} currentTime - Current Time
 * @param {string} logLevel - Log level
 * @param {string} errorMessage - Short error message
 * @param {string} serviceName - Service name
 * @param {string} methodName - Method Name
 * @param {any} errorObj - Error Object
 * @param {function} callback - Callback function
 **************************************************************************/
module.exports = function(options, currentTime, logLevel, errorMessage, serviceName, 
                                        methodName, errorObj, callback) {

    // Compute filename and timestamp
    let fileName = '';
    if(options.dateBasedFileNaming) {
        fileName = commonServices.GetCurrentDateFileName();
    } else {
        commonServices.GetLogFileName();
    }

    let time = moment().tz(options.timeZone).format(options.timeFormat);
    let date = moment().tz(options.timeZone).format(options.dateFormat);
    
    if(options.dateBasedFileNaming) {
        currentTime = time;
    } else {
        currentTime = date + time;
    }

    let errorLine = currentTime + ' | ' 
                    + logLevel + ' | ' 
                    + errorMessage + ' | '
                    + serviceName ? ('Service: ' + serviceName + ' | ') : ''
                    + methodName ? ('Method: ' + methodName + ' | ') : ''
                    + errorObj ? ('\n' + JSON.stringify(errorDetails) + '\n') : '';
                    + '\n';
    

    fs.appendFile(fileName, errorLine, (err) => {
        if(err) {
            console.log('Node file logger Error: ' + err);
        }
        callback(err);
    });
}