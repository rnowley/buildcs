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
        });
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
            expect(command.outputFilename).to.equal('-out:./build/hello');
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
            expect(command.sourceFiles).to.equal('./src/hello.cs');
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
            expect(command.sourceFiles).to.equal('./src/hello.cs ./src/greeter.cs');
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

        it("A single reference is provided 'System.Module.X', '-r:System.Module.X' is returned", function() {

            var configuration = {
                "sourceFiles": [
                    "hello.cs"
                ],
                "references": [
                    "System.Module.X"
                ],
                "buildTarget": "exe"
            };

            var command = new Command.Command();
            commandBuilder.processConfiguration(configuration, command);
            expect(command.references).to.equal('-r:System.Module.X');
        });

        it("A multiple references are provided and multiple references are contained in references list", function() {

            var configuration = {
                "sourceFiles": [
                    "hello.cs"
                ],
                "references": [
                    "System.Module.X",
                    "System.Module.Y"
                ],
                "buildTarget": "exe"
            };

            var command = new Command.Command();
            commandBuilder.processConfiguration(configuration, command);
            expect(command.references).to.equal('-r:System.Module.X,System.Module.Y');
        });

        it("A new source directory is provided and files in source list are prefixed with this directory", function() {

            var configuration = {
                "sourceFiles": [
                    "hello.cs"
                ],
                "buildTarget": "exe",
                "sourceDirectory": "./newsrc/"
            };

            var command = new Command.Command();
            commandBuilder.processConfiguration(configuration, command);
            expect(command.sourceFiles).to.equal('./newsrc/hello.cs');
        });

        it("A new source directory is provided and multiple files in the source list are prefixed with this directory", function() {
            var configuration = {
                "sourceFiles": [
                    "hello.cs",
                    "greeter.cs",
                    "main.cs"
                ],
                "sourceDirectory": "./newsrc/"
            };

            var command = new Command.Command();

            commandBuilder.processConfiguration(configuration, command);
            expect(command.sourceFiles).to.equal('./newsrc/hello.cs ./newsrc/greeter.cs ./newsrc/main.cs');
        });

        it("if different destination directory is provided then the output filename provided and command should contain this destination prefixed to the output filename", function() {
            var configuration = {
                "outputFilename": "hello",
                "sourceFiles": [
                    "hello.cs"
                ],
                "destinationDirectory": "./newbuild/"
            };

            var command = new Command.Command();

            commandBuilder.processConfiguration(configuration, command);
            expect(command.outputFilename).to.equal('-out:./newbuild/hello');
        });

        it("Provide a library path and generates a library path option.", function() {
            var configuration = {
                "outputFilename": "hello",
                "sourceFiles": [
                    "hello.cs"
                ],
                "libraryPath": [
                    "./lib/"
                ]
            };

            var command = new Command.Command();

            commandBuilder.processConfiguration(configuration, command);
            expect(command.libraryPath).to.equal('-lib:./lib/');
        });

        it("Provide multiple library paths and generates a library path option with those paths separated by commas.", function() {
            var configuration = {
                "outputFilename": "hello",
                "sourceFiles": [
                    "hello.cs"
                ],
                "libraryPath": [
                    "./lib/",
                    "./lib2/"
                ]
            };

            var command = new Command.Command();

            commandBuilder.processConfiguration(configuration, command);
            expect(command.libraryPath).to.equal('-lib:./lib/,./lib2/');
        });
    })
})