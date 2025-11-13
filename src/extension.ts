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
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "pyra-lang" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand(
    "pyra-lang.helloWorld",
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage("Hello World from Pyra Lang!");
    }
  );

  context.subscriptions.push(disposable);

  const create_project_cmd = vscode.commands.registerCommand(
    "pyra-lang.createproject",
    async function () {
      // Await the user's input
      const result = await vscode.window.showInputBox({
        placeHolder: "Project Name",
        prompt: "Please provide name for the Pyra project",
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
      makebuild(command, "Pyra");
      // Use the result
      vscode.window.showInformationMessage(`Building: ${result} Targets`);
    }
  );

  context.subscriptions.push(create_project_cmd);

  const build_withflags_cmd = vscode.commands.registerCommand(
    "pyra-lang.build.t",
    async function () {
      // Await the user's input
      const targets = ["web", "android", "ios"];
      const result = await vscode.window.showInputBox({
        placeHolder: "build targets (e.g., web android ios)",
        prompt: "Please provide Build targets for the Pyra project",
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
      makebuild(command, "Pyra");
      // Use the result
      vscode.window.showInformationMessage(`Building: ${result} Targets`);
    }
  );

  context.subscriptions.push(build_withflags_cmd);

  const build_cmd = vscode.commands.registerCommand(
    "pyra-lang.build",
    function () {
      const command = `./main.exe build`;
      makebuild(command, "Pyra");
      vscode.window.showInformationMessage(`Building Pyra Project`);
    }
  );

  context.subscriptions.push(build_cmd);

  const run_withflags_cmd = vscode.commands.registerCommand(
    "pyra-lang.run.t",
    async function () {
      // Await the user's input
      const targets = ["web", "android", "ios"];
      const result = await vscode.window.showInputBox({
        placeHolder: "run targets (e.g., web android ios)",
        prompt: "Please provide run targets for the Pyra project",
        validateInput: (text) => {
          return text === "" ? "At least one target required!" : null;
        },
      });

      if (result === undefined || result.trim() === "") {
        return;
      }

      const command = `./main.exe run ${targets.join(" ")}`;
      makebuild(command, "Pyra");
      // Use the result
      vscode.window.showInformationMessage(`Running: ${result} Targets`);
    }
  );

  context.subscriptions.push(run_withflags_cmd);

  const run_cmd = vscode.commands.registerCommand("pyra-lang.run", function () {
    const command = `./main.exe run`;
    makebuild(command, "Pyra");
    vscode.window.showInformationMessage(`Running Pyra Project`);
  });

  context.subscriptions.push(run_cmd);

  const dev_withflags_cmd = vscode.commands.registerCommand(
    "pyra-lang.dev.t",
    async function () {
      // Await the user's input
      const targets = ["web", "android", "ios"];
      const result = await vscode.window.showInputBox({
        placeHolder: "[test] run targets (e.g., web android ios)",
        prompt: "Please provide targets for the Pyra project",
        validateInput: (text) => {
          return text === "" ? "At least one target required!" : null;
        },
      });

      if (result === undefined || result.trim() === "") {
        return;
      }

      const command = `./main.exe dev ${targets.join(" ")}`;
      makebuild(command, "Pyra");
      // Use the result
      vscode.window.showInformationMessage(
        `Running: ${result} Targets on Dev Mode`
      );
    }
  );

  context.subscriptions.push(run_withflags_cmd);

  const dev_cmd = vscode.commands.registerCommand("pyra-lang.dev", function () {
    const command = `./main.exe dev`;
    makebuild(command, "Pyra");
    vscode.window.showInformationMessage(`Running Pyra Project`);
  });

  context.subscriptions.push(run_cmd);
}

// This method is called when your extension is deactivated
export function deactivate() {}
