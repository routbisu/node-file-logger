let options = {
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

module.exports = options;