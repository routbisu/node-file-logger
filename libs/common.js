'use strict';

let defaultOptions = require('./config');
const moment = require('moment-timezone');
const fs = require('fs');
const path = require('path');

let commonServices = {

    SetOptions: function(options) {
        defaultOptions = options ? options : defaultOptions;
    },

    /**
     * Validate options enter by user and return back updated options object
     * @param options Options
     */
    ValidateOptions: function(options) {
        let warningPrefix = 'Node File Logger Warning: ';

        // Validate folder name
        try {
            if (options.folderPath && !fs.existsSync(options.folderPath)) {
                fs.mkdirSync(options.folderPath);
                defaultOptions.folderPath = options.folderPath;
            }
        } catch(ex) {
            console.log(warningPrefix + 'Error occured while creating log folder. Set to default: ' + defaultOptions.folderPath);
        } 
        
        // Validate time zone
        if(options.timeZone && moment.tz.zone(options.timeZone)) {
            defaultOptions.timeZone = options.timeZone;
        } else {
            console.log(warningPrefix + 'Invalid timezone. Set to default: ' + defaultOptions.timeZone);
        }

        // Validate dateBasedFileName
        defaultOptions.dateBasedFileNaming = options.dateBasedFileNaming;

        // Validate file name
        if(defaultOptions.dateBasedFileNaming) {
            if(options.fileName && options.fileName.trim() != '') {
                console.log(warningPrefix + 'dateBasedFileName is set to true, so fileName parameter will be ignored');
            }
        } else {
            if(options.fileNamePrefix  && options.fileNamePrefix.trim() != '') {
                console.log(warningPrefix + 'dateBasedFileName is set to false, so fileNamePrefix parameter will be ignored');
            }

            if(options.fileNameSuffix  && options.fileNameSuffix.trim() != '') {
                console.log(warningPrefix + 'dateBasedFileName is set to false, so fileNameSuffix parameter will be ignored');
            }
        }

        // Validate file name extension
        if(options.fileNameExtension != '');
        
        return defaultOptions;
    },

    /**
     * Get log file name with current date
     */
    GetCurrentDateFileName: function() {
        let folderPath = defaultOptions.folderPath;

        let fileName = defaultOptions.fileNamePrefix 
                        + moment.tz(defaultOptions.timeZone).format(defaultOptions.dateFormat)
                        + defaultOptions.fileNameSuffix
                        + defaultOptions.fileNameExtension;

        let fileLocation = path.join(folderPath, fileName);                            

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }

        return fileLocation;
    }
}

module.exports = commonServices;