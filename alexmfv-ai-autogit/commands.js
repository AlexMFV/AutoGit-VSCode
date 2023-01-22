const vscode = require('vscode');
const git = require('simple-git');
const Prompts = require('./open-ai-prompts.js').Prompts;
const aiconfig = require("openai");
const helpers = require('./helpers.js');
var configuration; // = new aiconfig.Configuration({ apiKey: "", });
var openai; // = new aiconfig.OpenAIApi(configuration);

//Enumerator for commands
const AGCommands = {
	Commit: "AutoGit Commit",
	ModifyCommit: "AutoGit Modify Commit Message",
	CommitAndPush: "AutoGit Commit and Push",
	Settings: "Settings",
	TestPrompt: "Test Prompt",
};

async function TestOpenAIprompt() {
	InstantiateOpenAI();

	var prompt = Prompts.GET_COMMIT_MESSAGE;
	prompt = prompt.replace("$changes$", "+const git = require(\"simple-git\");|-const aiconfig = require(\"openai\");");

	try {
		var completion = await openai.createCompletion({
			model: helpers.models.Davinci3,
			prompt: prompt,
			temperature: 0.7,
			max_tokens: 4000,
		});

		console.log(completion);
		console.log(completion.data.choices[0].text);
	}
	catch (err) {
		console.log(err);
	}
}

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

function InstantiateOpenAI() {
	if (configuration == null || configuration == undefined) {
		if (helpers.CheckTokenExists()) {
			var getToken = vscode.workspace.getConfiguration('alexmfv-ai-autogit').get('token');
			var orgToken = vscode.workspace.getConfiguration('alexmfv-ai-autogit').get('orgtoken');
			configuration = new aiconfig.Configuration({
				organization: orgToken,
				apiKey: getToken
			});
			openai = new aiconfig.OpenAIApi(configuration);
		}
	}
}

//export functions
module.exports = { AGCommands, AutoGitCommit, AutoGitCommitAndPush, AutoGitModifyCommitMessage, Settings, TestOpenAIprompt };