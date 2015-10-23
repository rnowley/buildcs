'use strict';

var fs = require('fs');

function setBuildType(buildType) {
    var buildArg;

    switch(buildType.toLowerCase()) {
        case 'debug':
            buildArg = "-debug";
            break;
        default:
            buildArg = '';
            break;
    }

    return buildArg;
}

function processConfiguration(configuration, command) {
    command.outputFilename = configuration.outputFilename ? "-out:" + configuration.outputFilename : '';
    command.sourceFiles = configuration.sourceFiles.join(' ');
    command.buildTarget = extractBuildTarget(configuration);
}

function readConfigurationFile(filename) {
    var config = JSON.parse(fs.readFileSync(filename, 'utf8'));
    return config;
}

function buildProject(command) {
    
}

function extractBuildTarget(configuration) {

    switch(configuration.buildTarget){
        case 'exe':
        case 'library':
        case 'module':
        case 'winexe':
            return '-target:' + configuration.buildTarget;
        default:
            return '-target:exe';
    }

}

exports.setBuildType = setBuildType;
exports.readConfigurationFile = readConfigurationFile;
exports.processConfiguration = processConfiguration;