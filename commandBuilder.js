'use strict';

var fs = require('fs');

function setBuildType(buildType) {
    var buildArg;

    switch(buildType.toLowerCase()) {
        case 'debug':
            buildArg = "--debug";
            break;
        default:
            buildArg = '';
            break;
    }

    return buildArg;
}

function Command() {
    this.commandName = '';
    this.debugFlag = '';
    this.outputFilename = '';
    this.sourceFiles = '';
}

function processConfiguration(configuration, command) {
    command.outputFilename = configuration.outputFilename ? configuration.outputFilename : '';
    command.sourceFiles = configuration.sourceFiles.join(', ');
}

function readConfigurationFile(filename) {
    var config = JSON.parse(fs.readFileSync(filename, 'utf8'));
    return config;
}

exports.setBuildType = setBuildType;
exports.readConfigurationFile = readConfigurationFile;
exports.processConfiguration = processConfiguration;
exports.Command = Command;