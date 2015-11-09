using System;
using System.Drawing;
using Gtk;
using Gdk;
using GLib;

public class GtkHelloWorld {
	public int x = 50;
	public int y = 50;

	static HBox MakeBox(bool homogeneous, int spacing, bool expand,
						bool fill, uint padding) {
		var box = new HBox(homogeneous, spacing);

		var button = new Button("gtk_box_pack");
		box.PackStart(button, expand, fill, padding);
		button.Show();

		button = new Button("(box,");
		box.PackStart(button, expand, fill, padding);
		button.Show();

		button = new Button("button");
		box.PackStart(button, expand, fill, padding);
		button.Show();

		if(expand == true) {
			button = new Button("TRUE");
		}
		else {
			button = new Button("FALSE");
		}

		box.PackStart(button, expand, fill, padding);
		button.Show();

		button = new Button(fill ? "TRUE," : "FALSE,");
		box.PackStart(button, expand, fill, padding);
		button.Show();

		var padstr = padding.ToString() + ");";

		button = new Button(padstr);
		box.PackStart(button, expand, fill, padding);
		button.Show();

		return box;
	}

	static void Delete_Event(object obj, DeleteEventArgs args) {
		Application.Quit();
	}

	static void ExitButton_Event(object obj, ButtonPressEventArgs args) {
		Application.Quit();
	}

	static void ClickedEventHandler(object sender, EventArgs e) {
		Application.Quit();
	}

	public static void Main(string[] args) {

		if(args.Length != 1) {
			Console.WriteLine("Usage: gtkHelloWorld num, where num is 1, 2, or 3");
			return(1);
		}

		int which = Convert.ToInt32(args[0]);
		var window = new Window("packingdemo");
		window.DeleteEvent += Delete_Event;
		window.BorderWidth = 10;

		var box1 = new VBox(false, 0);

		switch(which) {
			case 1:
				var label = new Label("gtk_hbox_new(FALSE, 0);");
				var box2 = new HBox(false, 0);
				label.SetAlignment(0, 0);
				box1.PackStart(label, false, false, 0);
				label.Show();

				box2 = MakeBox(false, 0, false, false, 0);
				box1.PackStart(box2, false, false, 0);
				box2.Show();

				box2 = MakeBox(false, 0, true, false, 0);
				box1.PackStart(box2, false, false, 0);
				box2.Show();

				box2 = MakeBox(false, 0, true, true, 0);
				box1.PackStart(box2, false, false, 0);
				box2.Show();

				var separator = new HSeparator();

				box1.PackStart(separator, false, true, 5);
				separator.Show();

				box1 = new VBox(true, 0);
				label = new Label("gtk_hbox_new(TRUE, 0);");
				label.SetAlignment(0, 0);
				box1.PackStart(label, false, false, 0);
				label.Show();

				box2 = MakeBox(true, 0, true, true, 0);
				box1.PackStart(box2, false, false, 0);
				box2.Show();

				box2 = MakeBox(true, 0, true, true, 0);
				box1.PackStart(box2, false, false, 0);
				box2.Show();

				separator = new HSeparator();

				box1.PackStart(separator, false, true, 5);
				separator.Show();
				break;
			case 2:
				break;
		}
	}

}
