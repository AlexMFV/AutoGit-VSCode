const vscode = require('vscode');
const simpleGit = require('simple-git');

//Enumerator for commands
const AGCommands = {
	Commit: "AutoGit Commit",
	ModifyCommit: "AutoGit Modify Commit Message",
	CommitAndPush: "AutoGit Commit and Push",
	Settings: "Settings",
};

//Commands Code
async function AutoGitCommit() {
	var message = "test";

	console.table(vscode.workspace.workspaceFolders);
	console.log(vscode.workspace.workspaceFolders[0].uri);

	const git = simpleGit.default(vscode.workspace.workspaceFolders[0].uri.fsPath);

	await git.addConfig('user.name', 'OpenAI-AutoGit');
	await git.addConfig('user.email', 'openai-alexmfv@gmail.com');

	await git.checkout("main");
	const branch = await git.branch();

	//const configs = await git.listConfig();
	//console.table(configs);

	await git.add('./*');

	var result = await git.commit('AutoGit Commit', function (err, result) {
		if (err)
			vscode.window.showErrorMessage(err);
		else
			vscode.window.showInformationMessage('Committed with message: ' + message);
	});

	console.log(result);

	var resultpush = await git.push('remotes/origin/main', branch, function (err, result) {
		if (err)
			vscode.window.showErrorMessage(err);
		else
			vscode.window.showInformationMessage('Pushed to origin/' + branch);
	});

	console.log(resultpush);
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

async function listNonCommittedChanges() {
	try {
		const git = simpleGit('C:\\Users\\Alex\\Desktop\\Repos\\Test-Repo');
		const status = await git.status();
		const diff = await git.diff(['--color=never']);

		if (status.not_added.length === 0 && status.modified.length === 0 && status.deleted.length === 0) {
			console.log('No non-committed changes found.');
			return;
		}

		console.log('Non-committed changes:');
		console.log('\nNot Added:');
		status.not_added.forEach(file => console.log(`  - ${file}`));

		console.log('\nModified:');
		status.modified.forEach(file => console.log(`  - ${file}`));

		console.log('\nDeleted:');
		status.deleted.forEach(file => console.log(`  - ${file}`));

		//variable that converts tokens to words (1000 tokens = 750 words)
		const tokenLimit = 1000;
		const charLimit = tokenLimit * 4;

		// Process the diff output
		let importantChanges = diff.split('\n')
		.filter(line => line.match(/^(\+|-)[^+-\s]/)) // Filter lines with + or - that are not followed by another +, - or a space
		.map(line => {
		  const prefix = line[0] === '+' ? '+' : '-';
		  const content = line.slice(1).trim();
		  return `${prefix} ${content}|`;
		});

		//substring limited by charLimit
		let allChanges = importantChanges.join('\n')
		allChanges = allChanges.substring(0, charLimit);
  
	  	console.log(allChanges);

	} catch (error) {
		console.error('Error:', error);
	}
}

//export functions
module.exports = { AGCommands, AutoGitCommit, AutoGitCommitAndPush, AutoGitModifyCommitMessage, Settings, listNonCommittedChanges };