/* ============================================================================= 
  _   _           _        _____ _ _        _                                
 | \ | | ___   __| | ___  |  ___(_) | ___  | |    ___   __ _  __ _  ___ _ __ 
 |  \| |/ _ \ / _` |/ _ \ | |_  | | |/ _ \ | |   / _ \ / _` |/ _` |/ _ \ '__|
 | |\  | (_) | (_| |  __/ |  _| | | |  __/ | |__| (_) | (_| | (_| |  __/ |   
 |_| \_|\___/ \__,_|\___| |_|   |_|_|\___| |_____\___/ \__, |\__, |\___|_|   
                                                       |___/ |___/            
============================================================================= */

// Import libraries
const fs = require('fs');
const moment = require('moment-timezone');
const logger = require('./libs/logger');

let options = require('./libs/config');
let commonServices = require('./libs/common');

let nodeFileLogger = {

    /**
     * Set user options
     */
    SetUserOptions : function(options) {
        options = commonServices.ValidateOptions(options);
        commonServices.SetOptions(options);
    },

    /**
    * Log a debug message in log file
    * @param {string} errorMessage - Error message
    * @param {string} serviceName - Name of the service when error is thrown
    * @param {string} methodName - Name of method where error is thrown
    * @param {any} errorObj - Error object
    * @param {function} cb - Callback method
    */
    Debug: function(errorMessage, serviceName, methodName, errorObj, cb) {
        logger(options, 'Debug', errorMessage, serviceName, methodName, errorObj, cb);
    },

    /**
    * Log a trace message in log file
    * @param {string} errorMessage - Error message
    * @param {string} serviceName - Name of the service when error is thrown
    * @param {string} methodName - Name of method where error is thrown
    * @param {any} errorObj - Error object
    * @param {function} cb - Callback method
    */
    Trace: function(errorMessage, serviceName, methodName, errorObj, cb) {
        logger(options, 'Trace', errorMessage, serviceName, methodName, errorObj, cb);
    },

    /**
    * Log an informational message in log file
    * @param {string} errorMessage - Error message
    * @param {string} serviceName - Name of the service when error is thrown
    * @param {string} methodName - Name of method where error is thrown
    * @param {any} errorObj - Error object
    * @param {function} cb - Callback method
    */
    Info: function(errorMessage, serviceName, methodName, errorObj, cb) {
        logger(options, 'Info', errorMessage, serviceName, methodName, errorObj, cb);
    },

    /**
    * Log a warning message in log file
    * @param {string} errorMessage - Error message
    * @param {string} serviceName - Name of the service when error is thrown
    * @param {string} methodName - Name of method where error is thrown
    * @param {any} errorObj - Error object
    * @param {function} cb - Callback method
    */
    Warn: function(errorMessage, serviceName, methodName, errorObj, cb) {
        logger(options, 'Warn', errorMessage, serviceName, methodName, errorObj, cb);
    },

    /**
    * Log an error message in log file
    * @param {string} errorMessage - Error message
    * @param {string} serviceName - Name of the service when error is thrown
    * @param {string} methodName - Name of method where error is thrown
    * @param {any} errorObj - Error object
    * @param {function} cb - Callback method
    */
    Error: function(errorMessage, serviceName, methodName, errorObj, cb) {
        logger(options, 'Error', errorMessage, serviceName, methodName, errorObj, cb);
    },

    /**
    * Log a fatal error message in log file
    * @param {string} errorMessage - Error message
    * @param {string} serviceName - Name of the service when error is thrown
    * @param {string} methodName - Name of method where error is thrown
    * @param {any} errorObj - Error object
    * @param {function} cb - Callback method
    */
    Fatal: function(errorMessage, serviceName, methodName, errorObj, cb) {
        logger(options, 'Fatal', errorMessage, serviceName, methodName, errorObj, cb);
    },

    /**
    * Log message of any level
    * @param {string} logLevel - Error message
    * @param {string} errorMessage - Error message
    * @param {string} serviceName - Name of the service when error is thrown
    * @param {string} methodName - Name of method where error is thrown
    * @param {any} errorObj - Error object
    * @param {function} cb - Callback method
    */
    Log: function(logLevel, errorMessage, serviceName, methodName, errorObj, cb) {
        logger(options, logLevel, errorMessage, serviceName, methodName, errorObj, cb);
    }
}

module.exports = nodeFileLogger;