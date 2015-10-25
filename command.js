function Command() {
    this.commandName = 'mcs';
    this.debugFlag = 'debug';
    this.outputFilename = '';
    this.sourceFiles = '';
    this.buildTarget = 'exe';
    this.references = '';
    this.sourceDirectory = "./src/";
    this.destinationDirectory = "./build/";
    this.libraryPath = '';
}

Command.prototype.generateCommand = function() {
    return "" + this.commandName + " " + this.sourceFiles + " " + this.debugFlag + " " +
    this.outputFilename + this.getFileSuffix() + " " + this.buildTarget + " " + this.references +
    " " + this.libraryPath;
}

Command.prototype.getFileSuffix = function() {

	switch(this.buildTarget) {
		case 'exe':
			return '.exe';
		case 'library':
			return '.dll';
		case 'module':
			return '.netmodule';
		case 'winexe':
			return '.exe';
		default:
			return '.exe';
	}

};

exports.Command = Command;