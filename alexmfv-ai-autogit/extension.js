// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const git = require('simple-git');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

//Enumerator for commands
const AGCommands = {
	Commit: "AutoGit Commit",
	ModifyCommit: "AutoGit Modify Commit Message",
	CommitAndPush: "AutoGit Commit and Push"
};

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "alexmfv-ai-autogit" is now active!');

	var statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	statusBarItem.text = "AutoGit";
	statusBarItem.command = "alexmfv-ai-autogit.openOptionsMenu";
	statusBarItem.show();

	let disposable = vscode.commands.registerCommand('alexmfv-ai-autogit.openOptionsMenu', function () {
		//Show quick pick menu with options: AutoGit Commit, AutoGit Modify Commit Message, AutoGit Commit and Push
		vscode.window.showQuickPick([AGCommands.Commit, AGCommands.CommitAndPush, AGCommands.ModifyCommit]).then(selection => {
			switch (selection) {
				case AGCommands.Commit: AutoGitCommit(); break;
				case AGCommands.CommitAndPush: AutoGitCommitAndPush(); break;
				case AGCommands.ModifyCommit: AutoGitModifyCommitMessage(); break;
				default: break;
			}
		});
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

//Commands Code
function AutoGitCommit() {
	vscode.window.showInformationMessage('Pressed AutoGit Commit Button!');
}

function AutoGitCommitAndPush() {
	vscode.window.showInformationMessage('Pressed AutoGit Commit and Push Button!');
}

function AutoGitModifyCommitMessage() {
	vscode.window.showInformationMessage('Pressed AutoGit Modify Commit Message Button!');
}

module.exports = {
	activate,
	deactivate,
	AutoGitCommit,
	AutoGitCommitAndPush,
	AutoGitModifyCommitMessage
}
