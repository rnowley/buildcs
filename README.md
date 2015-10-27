# buildcs
Provides a way of building Mono C# applications on Linux using a project definition defined in a .json file.

## Install

```sh
$ npm install -g buildcs
```

To use buildcs to build a set of csharp files you must create a project.json file which must be in the root directory of the project.

The project.json file has the following options:


## Usage
```
buildcs {OPTIONS}

The available options are:

  -buildType,   Used to indicate if the build is a "debug" or "release" build. It defaults to a "debug" build if not provided.
  -projectFile, The name of the project file to use to build the project. Defaults to "project.json" if not propvided.
  -h            Display help for this command.
```

## The Structure of a Project File
```
{
    "name": "hello",
    "version": "0.0.1",
    "description": "A description of the purpose of the application",
    "references": [
        {
            "name": "System"
        },
        {
            "name": "Nancy",
            "path": "./lib/Nancy.0.21.1/lib/net40/"
        },
    ],
    "sourceFiles": [
        "main.cs",
        "hello.cs",
        "goodbye.cs"
    ],
    "buildType": "exe",
    "languageVersion": 6,
    "outputFilename": "hello",
    "sourceDirectory": "./src/",
    "destinationDirectory": "./build/",
    "libraryPath": [
        "./lib"
    ]
}
```
name: The name of the project.
version: The current version of the project.
description: A summary of the purpose of the application.
references: A list of references used by the project.
name: The name of the reference.
path: The location of the dll, this is used for copying dlls to the output directory.
sourceFiles: A list of source files to be compiled.
