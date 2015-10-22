'use strict';

var argv = require('yargs')
    .usage('Usage: $0')
    .default('buildType', 'debug', 'Defaults to a debug build.')
    .choices('buildType', ['debug', 'release'])
    .default('projectFile', 'project.json', 'The name of the default project file.')
    .help('h')
    .argv;
var commandBuilder = require('./commandBuilder')

var buildType = argv.buildType;



var command = new commandBuilder.Command();
command.commandName = "mcs";

command.debugFlag = commandBuilder.setBuildType(buildType);

var configuration = commandBuilder.readConfigurationFile(argv.projectFile);
commandBuilder.processConfiguration(configuration, command);
console.log(configuration);

console.log("command: " + command.commandName + " debugFlag: " + command.debugFlag +
			" outputFilename: " + command.outputFilename +
			" sourceFiles: " + command.sourceFiles);