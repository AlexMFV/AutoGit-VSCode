const vscode = require('vscode');
const git = require('simple-git');

//Enumerator for commands
const AGCommands = {
	Commit: "AutoGit Commit",
	ModifyCommit: "AutoGit Modify Commit Message",
	CommitAndPush: "AutoGit Commit and Push",
	Settings: "Settings",
};

//Commands Code
function AutoGitCommit() {
	vscode.window.showInformationMessage('Not Implemented');
	git = git.simpleGit();
}

function AutoGitCommitAndPush() {
	vscode.window.showInformationMessage('Not Implemented');
}

function AutoGitModifyCommitMessage() {
	vscode.window.showInformationMessage('Not Implemented');
}

function Settings() {
	vscode.window.showInformationMessage('Not Implemented');
}

//export functions
module.exports = { AGCommands, AutoGitCommit, AutoGitCommitAndPush, AutoGitModifyCommitMessage, Settings };