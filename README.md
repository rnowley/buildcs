# buildcs
Provides a way of building Mono C# applications on Linux using a project definition defined in a .json file. The aim of this utility is to allow Mono C# projects to be easily compiled without needing to use an IDE.

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
  --colours, This is used to indicate if the tool should use coloured output when printing to the console. The allowed values are true and false. It defaults to true.
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
    "buildTarget": "exe",
    "outputFilename": "hello",
    "sourceDirectory": "./src/",
    "destinationDirectory": "./build/",
    "libraryPath": [
        "./lib"
    ],
    "packageList": [
        "gtk-sharp-2.0"
    ],
    "warningLevel": 2
}
```
* __name__: The name of the project.
* __version__: The current version of the project.
* __description__: A summary of the purpose of the application.
* __references__: A list of references used by the project.
  * __name__: The name of the reference.
  * __path__: The location of the dll, this is used for copying dlls to the output directory.
* __sourceFiles__: A list of source files to be compiled.
* __resources__: A list of non-compilable resources that need to be copied to the destination directory on a successful build.
  * __source__: The source location of the resource file.
  * __destination__: The destination where the resource file is to be copied to.
* __buildTarget__: The type of file produced by the build process, this can have the values:
  * _exe_
  * _library_
  * _module_
  * _winexe_
* __outputFilename__: The filename to be given to the file produced by the build process. The file extension is determined by the build type.
* __sourceDirectory__: The root directory where the source files are located.
* __destinationDirectory__: The directory where the compiled file and reference dlls are to be output to.
* __libraryPath__: A list of directories where the reference dlls are located.
* __packageList__: A list of packages to include in the build. A package is a list of related assemblies.
* __warningLevel__: This allows you to set the level of warning to be emitted for the compilation task this can be the values 0 (lowest warning) to 4 (highest warning). This is optional.

## The default directory layout used
```
└── root project directory
    └── src
        └── <Source code files go here>
    └── project.json
    └── build
```
