'use strict';

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
    command.sourceDirectory = configuration.sourceDirectory ? configuration.sourceDirectory : command.sourceDirectory;
    command.destinationDirectory = configuration.destinationDirectory ? configuration.destinationDirectory : command.destinationDirectory;
    command.outputFilename = configuration.outputFilename
        ? "-out:" + command.destinationDirectory + configuration.outputFilename
        : '';
    command.sourceFiles = extractSourceFileList(configuration, command.sourceDirectory);
    command.buildTarget = extractBuildTarget(configuration);
    command.references = extractReferences(configuration);
    command.libraryPath = extractLibraryPath(configuration);
}

function extractSourceFileList(configuration, sourceDirectory) {

    for (var i = 0; i < configuration.sourceFiles.length; ++i) {
        configuration.sourceFiles[i] = sourceDirectory + configuration.sourceFiles[i];
    };

    return configuration.sourceFiles.join(' ');
}

function extractLibraryPath(configuration) {

    if (!configuration.libraryPath) {
        return '';
    }

    var libraryPath = configuration.libraryPath.join(',');

    return "-lib:" + libraryPath;
}

function extractReferences(configuration) {
    if(!configuration.references) {
        return '';
    }

    var referenceList = configuration.references.join(',');

    if(referenceList.length === 0) {
        return '';
    }

    return '-r:' + referenceList;
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
exports.processConfiguration = processConfiguration;