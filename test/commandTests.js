'use strict';

var expect = require("chai").expect;
var Command = require('../command.js');

describe("Command", function() {
    describe("#getFileSuffix", function() {
    	it("Command buildTarget is 'exe', should return '.exe'", function() {
    		var command = new Command.Command();
    		command.buildTarget = '-target:exe';

    		var result = command.getFileSuffix();

    		expect(result).to.equal('.exe');
    	});

    	it("Command buildTarget is 'library', should return '.dll'", function() {
    		var command = new Command.Command();
    		command.buildTarget = '-target:library';

    		var result = command.getFileSuffix();

    		expect(result).to.equal('.dll');
    	});

    	it("Command buildTarget is 'module', should return '.netmodule'", function() {
    		var command = new Command.Command();
    		command.buildTarget = '-target:module';

    		var result = command.getFileSuffix();

    		expect(result).to.equal('.netmodule');
    	});

    	it("Command buildTarget is 'winexe', should return '.exe'", function() {
    		var command = new Command.Command();
    		command.buildTarget = '-target:winexe';

    		var result = command.getFileSuffix();

    		expect(result).to.equal('.exe');
    	});

    	it("Command buildTarget is not defined, should return '.exe'", function() {
    		var command = new Command.Command();
    		command.buildTarget = 'notdefined';

    		var result = command.getFileSuffix();

    		expect(result).to.equal('.exe');
    	});
    });
});