'use strict';

var argv = require('yargs')
    .usage('Usage: $0')
    .default('buildType', 'debug', 'Defaults to a debug build.')
    .choices('buildType', ['debug', 'release'])
    .default('projectFile', 'project.json', 'The name of the default project file.')
    .help('h')
    .argv;
var commandBuilder = require('./commandBuilder');
var Command = require('./command.js');
var exec = require('child_process').exec;

var buildType = argv.buildType;

var command = new Command.Command();
command.commandName = "mcs";

command.debugFlag = commandBuilder.setBuildType(buildType);

var configuration = commandBuilder.readConfigurationFile(argv.projectFile);
commandBuilder.processConfiguration(configuration, command);
console.log(command.generateCommand());

exec(command.generateCommand(), function callback(error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);

    if (error !== null) {
      console.log('exec error: ' + error);
    }

});