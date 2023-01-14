const vscode = require('vscode');
const git = require('simple-git');
const Prompts = require('./open-ai-prompts.js').Prompts;
const Commands = require('./commands.js');
const CommandCodes = Commands.AGCommands;

const aiconfig = require("openai");
const configuration = new aiconfig.Configuration({
  apiKey: "",
});
const openai = new aiconfig.OpenAIApi(configuration);

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	CheckTokenExists();

	var statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	statusBarItem.text = "AutoGit";
	statusBarItem.command = "alexmfv-ai-autogit.openOptionsMenu";
	statusBarItem.show();

	let disposable = vscode.commands.registerCommand('alexmfv-ai-autogit.openOptionsMenu', function () {
		//Show quick pick menu with options: AutoGit Commit, AutoGit Modify Commit Message, AutoGit Commit and Push
		vscode.window.showQuickPick(Object.values(CommandCodes)).then(selection => {
			switch (selection) {
				case CommandCodes.Commit: Commands.AutoGitCommit(); break;
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

//During runtime, checks if the user has a valid OpenAI API token defined in the settings of the extension
async function CheckTokenExists() {
	var getToken = vscode.workspace.getConfiguration('alexmfv-ai-autogit').get('token');

	if (getToken == "" || getToken == null || getToken == undefined ||
	getToken == "Your-OpenAI-Token-Here" || !getToken.startsWith("sk-"))
	{
		const selection = await vscode.window.showErrorMessage("Please enter your OpenAI API Token in the AutoGit settings! \n" +
		"You can get your access token on the OpenAI website.", "Open OpenAI Website");

		if(selection == "Open OpenAI Website") {
			openLinkInBrowser("https://beta.openai.com/account/api-keys");
		}
	}
}

function openLinkInBrowser(link) {
	vscode.env.openExternal(vscode.Uri.parse(link));
}

module.exports = {
	activate,
	deactivate
}
