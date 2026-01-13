// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

function makebuild(targets: string, title: string): void {
  // Create a new terminal instance

  const terminal = vscode.window.createTerminal({
    name: title,
  });
  terminal.show(); // Show the terminal panel

  // Send the command text to the terminal and press Enter (\u000D is carriage return)
  terminal.sendText(targets + "\u000D");
}

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "Helios-lang.helloWorld",
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage("Hello World from Helios Lang!");
    }
  );

  context.subscriptions.push(disposable);

  const create_project_cmd = vscode.commands.registerCommand(
    "Helios-lang.createproject",
    async function () {
      // Await the user's input
      const result = await vscode.window.showInputBox({
        placeHolder: "Project Name",
        prompt: "Please provide name for the Helios project",
        validateInput: (text) => {
          return text === "" ? "Name required!" : null;
        },
        // validateInput: text => {
        //     // Optional validation logic
        //     return text.length >= 3 ? null : 'Name must be at least 3 characters long.';
        // }
      });

      if (result === undefined || result.trim() === "") {
        return;
      }

      const command = `./main.exe create ${result}`;
      makebuild(command, "Helios");
      // Use the result
      vscode.window.showInformationMessage(`Building: ${result} Targets`);
    }
  );

  context.subscriptions.push(create_project_cmd);

  const build_withflags_cmd = vscode.commands.registerCommand(
    "Helios-lang.build.t",
    async function () {
      // Await the user's input
      const targets = ["web", "android", "ios"];
      const result = await vscode.window.showInputBox({
        placeHolder: "build targets (e.g., web android ios)",
        prompt: "Please provide Build targets for the Helios project",
        validateInput: (text) => {
          return text === "" ? "At least one target required!" : null;
        },
        // validateInput: text => {
        //     // Optional validation logic
        //     return text.length >= 3 ? null : 'Name must be at least 3 characters long.';
        // }
      });

      if (result === undefined || result.trim() === "") {
        return;
      }

      const command = `./main.exe build ${targets.join(" ")}`;
      makebuild(command, "Helios");
      // Use the result
      vscode.window.showInformationMessage(`Building: ${result} Targets`);
    }
  );

  context.subscriptions.push(build_withflags_cmd);

  const build_cmd = vscode.commands.registerCommand(
    "Helios-lang.build",
    function () {
      const command = `./main.exe build`;
      makebuild(command, "Helios");
      vscode.window.showInformationMessage(`Building Helios Project`);
    }
  );

  context.subscriptions.push(build_cmd);

  const run_withflags_cmd = vscode.commands.registerCommand(
    "Helios-lang.run.t",
    async function () {
      // Await the user's input
      const targets = ["web", "android", "ios"];
      const result = await vscode.window.showInputBox({
        placeHolder: "run targets (e.g., web android ios)",
        prompt: "Please provide run targets for the Helios project",
        validateInput: (text) => {
          return text === "" ? "At least one target required!" : null;
        },
      });

      if (result === undefined || result.trim() === "") {
        return;
      }

      const command = `./main.exe run ${targets.join(" ")}`;
      makebuild(command, "Helios");
      // Use the result
      vscode.window.showInformationMessage(`Running: ${result} Targets`);
    }
  );

  context.subscriptions.push(run_withflags_cmd);

  const run_cmd = vscode.commands.registerCommand("Helios-lang.run", function () {
    const command = `./main.exe run`;
    makebuild(command, "Helios");
    vscode.window.showInformationMessage(`Running Helios Project`);
  });

  context.subscriptions.push(run_cmd);

  const dev_withflags_cmd = vscode.commands.registerCommand(
    "Helios-lang.dev.t",
    async function () {
      // Await the user's input
      const targets = ["web", "android", "ios"];
      const result = await vscode.window.showInputBox({
        placeHolder: "[test] run targets (e.g., web android ios)",
        prompt: "Please provide targets for the Helios project",
        validateInput: (text) => {
          return text === "" ? "At least one target required!" : null;
        },
      });

      if (result === undefined || result.trim() === "") {
        return;
      }

      const command = `./main.exe dev ${targets.join(" ")}`;
      makebuild(command, "Helios");
      // Use the result
      vscode.window.showInformationMessage(
        `Running: ${result} Targets on Dev Mode`
      );
    }
  );

  context.subscriptions.push(run_withflags_cmd);

  const dev_cmd = vscode.commands.registerCommand("Helios-lang.dev", function () {
    const command = `./main.exe dev`;
    makebuild(command, "Helios");
    vscode.window.showInformationMessage(`Running Helios Project`);
  });

  context.subscriptions.push(run_cmd);

   vscode.workspace.getConfiguration().update(
        'workbench.iconTheme', 
        'helios-icon', // Must match the 'id' in package.json
        vscode.ConfigurationTarget.Global
    );
}

// This method is called when your extension is deactivated
export function deactivate() {}
