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
                    {
                        "name": "System.Module.X"
                    }
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
                    {
                        "name": "System.Module.X",
                        "path": "./lib"
                    },
                    {
                        "name": "System.Module.Y"
                    }
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

        it("Provide a single package name and generates a '-pkg' command for that package", function() {
            var configuration = {
                "outputFilename": "hello",
                "sourceFiles": [
                    "hello.cs"
                ],
                "packageList": [
                    "gtk-sharp-2.0"
                ]
            };

            var command = new Command.Command();

            commandBuilder.processConfiguration(configuration, command);
            expect(command.packageList).to.equal('-pkg:gtk-sharp-2.0');
        });

        it("Provide multiple package names and generates a '-pkg' command for those packages", function() {
            var configuration = {
                "outputFilename": "hello",
                "sourceFiles": [
                    "hello.cs"
                ],
                "packageList": [
                    "gtk-sharp-2.0",
                    "olive"
                ]
            };

            var command = new Command.Command();

            commandBuilder.processConfiguration(configuration, command);
            expect(command.packageList).to.equal('-pkg:gtk-sharp-2.0,olive');
        });

        it("Configuration does not contain a warnLevel property. The command builder does not generate a '-warn' flag", function() {
            var configuration = {
                "name": "hello",
                "sourceFiles": [
                    "hello.cs"
                ]
            };

            var command = new Command.Command();

            commandBuilder.processConfiguration(configuration, command);
            expect(command.warningLevel).to.equal('');
        });

        it("Configuration contains a warnLevel property of 2. The command builder generates a '-warn:2' flag", function() {
            var configuration = {
                "name": "hello",
                "sourceFiles": [
                    "hello.cs"
                ],
                "warningLevel": 2
            };

            var command = new Command.Command();

            commandBuilder.processConfiguration(configuration, command);
            expect(command.warningLevel).to.equal('-warn:2');
        });

        it("Configuration contains a warnLevel property of -1. The command builder does not generate a '-warn' flag", function() {
            var configuration = {
                "name": "hello",
                "sourceFiles": [
                    "hello.cs"
                ],
                "warningLevel": -1
            };

            var command = new Command.Command();

            commandBuilder.processConfiguration(configuration, command);
            expect(command.warningLevel).to.equal('');
        });

        it("Configuration contains a warnLevel property of 5. The command builder does not generate a '-warn' flag", function() {
            var configuration = {
                "name": "hello",
                "sourceFiles": [
                    "hello.cs"
                ],
                "warningLevel": 5
            };

            var command = new Command.Command();

            commandBuilder.processConfiguration(configuration, command);
            expect(command.warningLevel).to.equal('');
        });

        it("Configuration contains a warnLevel property that is not numeric. The command builder does not generate a '-warn' flag", function() {
            var configuration = {
                "name": "hello",
                "sourceFiles": [
                    "hello.cs"
                ],
                "warningLevel": "This is wrong"
            };

            var command = new Command.Command();

            commandBuilder.processConfiguration(configuration, command);
            expect(command.warningLevel).to.equal('');
        });

        it("configuration does not contain a warningsAsErrors property. The command builder property warningsAsErrors is an empty string", function() {
            var configuration = {
                "name": "hello",
                "sourceFiles": [
                    "hello.cs"
                ],
                "warningLevel": "This is wrong"
            };

            var command = new Command.Command();

            commandBuilder.processConfiguration(configuration, command);
            expect(command.warningsAsErrors).to.equal('');
        });

        it("configuration does not contains a warningsAsErrors property that is not a boolean. The command builder property warningsAsErrors is an empty string", function() {
            var configuration = {
                "name": "hello",
                "sourceFiles": [
                    "hello.cs"
                ],
                "warningLevel": "This is wrong",
                "warningsAsErrors": "elephant"
            };

            var command = new Command.Command();

            commandBuilder.processConfiguration(configuration, command);
            expect(command.warningsAsErrors).to.equal('');
        });

        it("configuration contains a warningsAsErrors property that is set to true. The command builder property warningsAsErrors is '-warnaserror+'", function() {
            var configuration = {
                "name": "hello",
                "sourceFiles": [
                    "hello.cs"
                ],
                "warningLevel": "This is wrong",
                "warningsAsErrors": true
            };

            var command = new Command.Command();

            commandBuilder.processConfiguration(configuration, command);
            expect(command.warningsAsErrors).to.equal('-warnaserror+');
        });

        it("configuration contains a warningsAsErrors property that is set to false. The command builder property warningsAsErrors is '-warnaserror-'", function() {
            var configuration = {
                "name": "hello",
                "sourceFiles": [
                    "hello.cs"
                ],
                "warningLevel": "This is wrong",
                "warningsAsErrors": false
            };

            var command = new Command.Command();

            commandBuilder.processConfiguration(configuration, command);
            expect(command.warningsAsErrors).to.equal('-warnaserror-');
        });
    })
})