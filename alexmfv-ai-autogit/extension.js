const vscode = require('vscode');
const Commands = require('./commands.js');
const CommandCodes = Commands.AGCommands;
const helpers = require('./helpers.js');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	helpers.CheckTokenExists();

	var statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	statusBarItem.text = "AutoGit";
	statusBarItem.command = "alexmfv-ai-autogit.openOptionsMenu";
	statusBarItem.show();

	let disposable = vscode.commands.registerCommand('alexmfv-ai-autogit.openOptionsMenu', function () {
		//Show quick pick menu with options: AutoGit Commit, AutoGit Modify Commit Message, AutoGit Commit and Push
		vscode.window.showQuickPick(Object.values(CommandCodes)).then(selection => {
			switch (selection) {
				case CommandCodes.Commit: Commands.listNonCommittedChanges(); break;
				case CommandCodes.CommitAndPush: Commands.AutoGitCommitAndPush(); break;
				case CommandCodes.ModifyCommit: Commands.AutoGitModifyCommitMessage(); break;
				case CommandCodes.Settings: Commands.Settings(); break;
				default: break;
			}
		});
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
