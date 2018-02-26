'use strict';

let defaultOptions = require('./config');
const moment = require('moment-timezone');
const momentJS = require('moment');
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
        if(options.timeZone) {
            if(moment.tz.zone(options.timeZone)) {
                defaultOptions.timeZone = options.timeZone;
            } else {
                console.log(warningPrefix + 'Invalid timezone. Set to default: ' + defaultOptions.timeZone);
            }
        }

        // Validate dateBasedFileName
        if(options.dateBasedFileNaming !== undefined)
            defaultOptions.dateBasedFileNaming = options.dateBasedFileNaming;

        // Validate file name
        if(defaultOptions.dateBasedFileNaming) {
            if(options.fileName && options.fileName.trim() != '') {
                console.log(warningPrefix + 'dateBasedFileName is set to true, so fileName parameter will be ignored');
            }
            if(options.fileNamePrefix) {
                if(options.fileNamePrefix.trim() == '') {
                    console.log(warningPrefix + 'Filename prefix is not set. Will be set to default: ' + defaultOptions.fileNamePrefix);
                } else {
                    defaultOptions.fileNamePrefix = options.fileNamePrefix;
                }
            }
        } else {
            if(!options.fileName || options.fileName.trim() == '') {
                console.log(warningPrefix + 'Filename is not set. Will be set to default: ' + defaultOptions.fileName);
            } else {
                defaultOptions.fileName = options.fileName;
            }

            if(options.fileNamePrefix  && options.fileNamePrefix.trim() != '') {
                console.log(warningPrefix + 'dateBasedFileName is set to false, so fileNamePrefix parameter will be ignored');
            }

            if(options.fileNameSuffix  && options.fileNameSuffix.trim() != '') {
                console.log(warningPrefix + 'dateBasedFileName is set to false, so fileNameSuffix parameter will be ignored');
            }
        }

        // Validate file name extension
        if(options.fileNameExtension) defaultOptions.fileNameExtension = options.fileNameExtension.trim();

        // Validate dateFormat and timeFormat
        if(options.dateFormat) defaultOptions.dateFormat = options.dateFormat;
        if(options.timeFormat) defaultOptions.timeFormat = options.timeFormat;

        // Validate log levels
        if(options.logLevel) {
            if(options.logLevel.toLowerCase() !== 'debug' &&
                options.logLevel.toLowerCase() !== 'prod' &&
                options.logLevel.toLowerCase() !== 'prod-trace') {
                    console.log(warningPrefix + 'Invalid log level. Will be set to default: ' + defaultOptions.logLevel);
                } else {
                    defaultOptions.logLevel = options.logLevel;
                }
        }

        // Validate onlyFileLogging
        if(options.onlyFileLogging !== undefined)
            defaultOptions.onlyFileLogging = options.onlyFileLogging;
        
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
    },

    /**
     * Get log file name when date based naming is not enabled
     */
    GetLogFileName: function() {
        let filePath = path.join(defaultOptions.folderPath, 
            defaultOptions.fileName + defaultOptions.fileNameExtension);

        return filePath;
    }
}

module.exports = commonServices;