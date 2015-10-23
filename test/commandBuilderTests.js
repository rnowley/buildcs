'use strict';

var expect = require("chai").expect;
var commandBuilder = require('../commandBuilder.js');
var Command = require('../command.js');

describe("CommandBuilder", function() {
    describe("#setBuildType", function() {
        it("Should return the mcs --debug flag when debug is passed in", function() {
            var result = commandBuilder.setBuildType('debug')
            expect(result).to.equal('-debug');
        });

        it("Should return the empty string when release is passed in", function() {
            var result = commandBuilder.setBuildType('release')
            expect(result).to.equal('');
        })
    });

    describe("#processConfiguration", function() {
        it("output filename provided and command should contain output filename", function() {
            var configuration = {
                "outputFilename": "hello",
                "sourceFiles": [
                    "hello.cs"
                ]
            };

            var command = new Command.Command();

            commandBuilder.processConfiguration(configuration, command);
            expect(command.outputFilename).to.equal('-out:hello');
        });

        it("output filename not provided and command should not contain output filename", function() {
            var configuration = {
                "name": "hello",
                "sourceFiles": [
                    "hello.cs"
                ]
            };

            var command = new Command.Command();

            commandBuilder.processConfiguration(configuration, command);
            expect(command.outputFilename).to.equal('');
        });

        it("One source file provided, provides a string with one file", function() {
            var configuration = {
                "sourceFiles": [
                    "hello.cs"
                ]
            };

            var command = new Command.Command();

            commandBuilder.processConfiguration(configuration, command);
            expect(command.sourceFiles).to.equal('hello.cs');
        });

        it("multiple source files provided, provides a string with these files comma separated", function() {
            var configuration = {
                "sourceFiles": [
                    "hello.cs",
                    "greeter.cs"
                ]
            };

            var command = new Command.Command();

            commandBuilder.processConfiguration(configuration, command);
            expect(command.sourceFiles).to.equal('hello.cs greeter.cs');
        });

        it("Build target provded as winexe, '-target:winexe' is returned", function() {

            var configuration = {
                "sourceFiles": [
                    "hello.cs"
                ],
                "buildTarget": "winexe"
            };

            var command = new Command.Command();
            commandBuilder.processConfiguration(configuration, command);
            expect(command.buildTarget).to.equal('-target:winexe');
        });

        it("Build target provded as exe, '-target:exe' is returned", function() {

            var configuration = {
                "sourceFiles": [
                    "hello.cs"
                ],
                "buildTarget": "exe"
            };

            var command = new Command.Command();
            commandBuilder.processConfiguration(configuration, command);
            expect(command.buildTarget).to.equal('-target:exe');
        });

        it("Build target provded as library, '-target:library' is returned", function() {

            var configuration = {
                "sourceFiles": [
                    "hello.cs"
                ],
                "buildTarget": "library"
            };

            var command = new Command.Command();
            commandBuilder.processConfiguration(configuration, command);
            expect(command.buildTarget).to.equal('-target:library');
        });

        it("Build target provded as module, '-target:module' is returned", function() {

            var configuration = {
                "sourceFiles": [
                    "hello.cs"
                ],
                "buildTarget": "module"
            };

            var command = new Command.Command();
            commandBuilder.processConfiguration(configuration, command);
            expect(command.buildTarget).to.equal('-target:module');
        });
    })
})