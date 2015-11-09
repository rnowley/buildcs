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
    this.packageList = '';
}

Command.prototype.generateCommand = function() {
    return "" + this.commandName + " " + this.sourceFiles + " " + this.debugFlag + " " +
    this.outputFilename + this.getFileSuffix() + " " + this.buildTarget + " " + this.references +
    " " + this.libraryPath + " " + this.packageList;
}

Command.prototype.getFileSuffix = function() {

	switch(this.buildTarget) {
        case '-target:exe':
			return '.exe';
		case '-target:library':
			return '.dll';
		case '-target:module':
			return '.netmodule';
		case '-target:winexe':
			return '.exe';
		default:
			return '.exe';
	}

};

exports.Command = Command;