function Command() {
    this.commandName = 'mcs';
    this.debugFlag = '';
    this.outputFilename = '';
    this.sourceFiles = '';
    this.buildTarget = '';
    this.references = '';
    this.sourceDirectory = "./src/";
    this.destinationDirectory = "./build/"
}

Command.prototype.generateCommand = function() {
    return "" + this.commandName + " " + this.sourceFiles + " " + this.debugFlag + " " +
    this.outputFilename + " " + this.buildTarget + " " + this.references;
}

exports.Command = Command;