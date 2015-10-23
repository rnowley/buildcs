function Command() {
    this.commandName = '';
    this.debugFlag = '';
    this.outputFilename = '';
    this.sourceFiles = '';
    this.buildTarget = '';
}

Command.prototype.generateCommand = function() {
    return "" + this.commandName + " " + this.sourceFiles + " " + this.debugFlag + " " +
    this.outputFilename + " " + this.buildTarget;
}

exports.Command = Command;