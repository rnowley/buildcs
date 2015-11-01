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

  --buildType,   Used to indicate if the build is a "debug" or "release" build. It defaults to a "debug" build if not provided.
  --projectFile, The name of the project file to use to build the project. Defaults to "project.json" if not provided.
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
    "resources": [
        {
            "source": "View/index.html",
            "destination": "View/index.html"
        },
        {
            "source": "View/Test/test.html",
            "destination": "View/Test/test.html"
        }
    ],
    "buildType": "exe",
    "outputFilename": "hello",
    "sourceDirectory": "./src/",
    "destinationDirectory": "./build/",
    "libraryPath": [
        "./lib"
    ],
    "packageList": [
        "gtk-sharp-2.0"
    ]
}
```
* name: The name of the project.
* version: The current version of the project.
* description: A summary of the purpose of the application.
* references: A list of references used by the project.
  * name: The name of the reference.
  * path: The location of the dll, this is used for copying dlls to the output directory.
* sourceFiles: A list of source files to be compiled.
* resources: A list of non-compilable resources that need to be copied to the destination directory on a successful build.
  * source: The source location of the resource file.
  * destination: The destination where the resource file is to be copied to.
* buildType: The type of file produced by the build process, this can have the values:
  * exe
  * library
  * module
  * winexe
* outputFilename: The filename to be given to the file produced by the build process. The file extension is determined by the build type.
* sourceDirectory: The root directory where the source files are located.
* destinationDirectory: The directory where the compiled file and reference dlls are to be output to.
* libraryPath: A list of directories where the reference dlls are located.
* packageList: A list of packages to include in the build. A package is a list of related assemblies.

## The default directory layout used
```
└── root project directory
    └── src
        └── <Source code files go here>
    └── project.json
    └── build
```
