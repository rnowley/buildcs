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
    command.packageList = extractPackageList(configuration);
    command.warningLevel = setWarningLevel(configuration);
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

function setWarningLevel(configuration) {

    if(!configuration.warningLevel) {
        return '';
    }

    if(isNaN(configuration.warningLevel)) {
        return '';
    }

    var level = parseInt(configuration.warningLevel, 10)

    if(((level | 0) === level) && (level >= 0 && level <= 4)) {
        return '-warn:' + level;
    }
    else {
        console.log("Warning: Invalid value for warning level (" + configuration.warningLevel + "), using the default value for the compiler.");
        return '';
    }

}

function extractReferences(configuration) {
    if(!configuration.references) {
        return '';
    }

    var referenceNames = [];

    for(var i = 0; i < configuration.references.length; ++i){
        referenceNames.push(configuration.references[i].name);
    }

    var referenceList = referenceNames.join(',');

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

function extractPackageList(configuration) {

    if(!configuration.packageList) {
        return '';
    }

    var packageNames = [];

    for(var i = 0; i < configuration.packageList.length; ++i){
        packageNames.push(configuration.packageList[i]);
    }

    var packageList = packageNames.join(',');

    if(packageList.length === 0) {
        return '';
    }

    return '-pkg:' + packageList;
}

exports.setBuildType = setBuildType;
exports.processConfiguration = processConfiguration;