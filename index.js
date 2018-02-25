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

// Set user options
options = commonServices.ValidateOptions(options);
commonServices.SetOptions(options);

let log = {

    /**
    * Log a debug message in log file
    * @param {string} errorMessage - Error message
    * @param {string} serviceName - Name of the service when error is thrown
    * @param {string} methodName - Name of method where error is thrown
    * @param {string} errorObj - Error object
    * @param {string} cb - Callback method
    */
    Debug: function(errorMessage, serviceName, methodName, errorObj, cb) {

    }
}


