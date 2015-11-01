## GtkSharp Demo
This example project shows you how to create a basic GtkSharp GUI program using the buildcs utility program. It is a very simple program consisting of a project.json file and a single csharp code file called gtkHelloWorld.cs. This project demonstrates using a package with buildcs.

This project has the following file structure:
```
gtksharpdemo
    └── src
        └── gtkHelloWorld.cs
    └── project.json
    └── build
```
## The project.json File

```javascript
{
    "name": "GtkSharpDemo",
    "version": "0.0.1",
    "references": [
        {
            "name": "System.Drawing"
        }
    ],
    "packageList": [
        "gtk-sharp-2.0"
    ],
    "sourceFiles": [
        "gtkHelloWorld.cs"
    ],
    "buildType": "exe",
    "outputFilename": "gtkHelloWorld",
    "sourceDirectory": "./src/",
    "destinationDirectory": "./build/"
}

```

## gtkHelloWorld.cs
This source code comes from http://www.mono-project.com/docs/gui/gtksharp/hello-world

```csharp
using Gtk;
using System;
 
class Hello {

  static void Main() {
    Application.Init ();

    // Set up a button object.
    Button btn = new Button ("Hello World");
    // when this button is clicked, it'll run hello()
    btn.Clicked += new EventHandler (hello);

    Window window = new Window ("helloworld");
    // when this window is deleted, it'll run delete_event()
    window.DeleteEvent += delete_event;

    // Add the button to the window and display everything
    window.Add (btn);
    window.ShowAll ();

    Application.Run ();
  }


  // runs when the user deletes the window using the "close
  // window" widget in the window frame.
  static void delete_event (object obj, DeleteEventArgs args) {
    Application.Quit ();
  }

  // runs when the button is clicked.
  static void hello (object obj, EventArgs args) {
    Console.WriteLine("Hello World");
    Application.Quit ();
  }

}

```
