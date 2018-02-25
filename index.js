/* ============================================================================= 
 _   _           _        _____ _ _        _                                
 | \ | | ___   __| | ___  |  ___(_) | ___  | |    ___   __ _  __ _  ___ _ __ 
 |  \| |/ _ \ / _` |/ _ \ | |_  | | |/ _ \ | |   / _ \ / _` |/ _` |/ _ \ '__|
 | |\  | (_) | (_| |  __/ |  _| | | |  __/ | |__| (_) | (_| | (_| |  __/ |   
 |_| \_|\___/ \__,_|\___| |_|   |_|_|\___| |_____\___/ \__, |\__, |\___|_|   
                                                       |___/ |___/            
============================================================================= */

const fs = require('fs');
const moment = require('moment-timezone');

let options = require('./libs/config');
let commonServices = require('./libs/common');
commonServices.SetOptions(options);

console.log(commonServices.ValidateOptions({
    folderPath: 'G://dsdf',
    timeZone: 'Asia/Kolkata1',
    fileName: 'Yoyo',
    dateBasedFileNaming: true,
    fileNamePrefix: 'ds',
    fileNameSuffix: 'sds',
    fileNameExtension: '.log', 
    dateFormat: 'invliad',
    timeFormat: 'invalid'
}));