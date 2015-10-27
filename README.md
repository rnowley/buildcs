# buildcs
Provides a way of building mono applications on Linux using a project definition defined in a .json file.

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
