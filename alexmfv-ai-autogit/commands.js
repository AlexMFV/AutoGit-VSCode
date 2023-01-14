const vscode = require('vscode');

//Enumerator for commands
const AGCommands = {
	Commit: "AutoGit Commit",
	ModifyCommit: "AutoGit Modify Commit Message",
	CommitAndPush: "AutoGit Commit and Push",
	Settings: "Settings"
};

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

function Settings() {
    vscode.window.showInformationMessage('Pressed Settings Button!');
}

//export functions
module.exports = { AGCommands, AutoGitCommit, AutoGitCommitAndPush, AutoGitModifyCommitMessage, Settings };