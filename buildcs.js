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
var fs = require('fs-extra');

var buildType = argv.buildType;

var command = new Command.Command();

command.debugFlag = commandBuilder.setBuildType(buildType);

var configuration = readConfigurationFile(argv.projectFile);
commandBuilder.processConfiguration(configuration, command);
console.log(command.generateCommand());

ensureDestinationDirectoryExists(command);

exec(command.generateCommand(), function callback(error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);

    if (error !== null) {
      console.log('exec error: ' + error);
    }
    else {
        copyReferencesToBuildDirectory(configuration, command);
    }

});

function ensureDestinationDirectoryExists(command) {

	if(command.destinationDirectory !== '') {
		fs.ensureDirSync(command.destinationDirectory,
			function(err) {
				console.log(err);
			})
	}
}

function readConfigurationFile(filename) {
    var config = JSON.parse(fs.readFileSync(filename, 'utf8'));
    return config;
}

function copyReferencesToBuildDirectory(configuration, command) {

    if(!configuration.references) {
        return;
    }

    var destinationDirectory = command.destinationDirectory

    for(var i = 0; i < configuration.references.length; ++i) {

            if(configuration.references[i].path) {
                var path = configuration.references[i].path;
                var referenceName = configuration.references[i].name
                var fileExtension = '.dll';
                fs.copy(path + referenceName + fileExtension,
                    destinationDirectory + referenceName + fileExtension,
                    function (err) {

                        if (err) {
                            return console.error(err);
                        }

                    })
            }
    }
}