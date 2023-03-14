const vscode = require('vscode');
const Prompts = require('./open-ai-prompts.js').Prompts;
const aiconfig = require("openai");
const helpers = require('./helpers.js');
var configuration; // = new aiconfig.Configuration({ apiKey: "", });
var openai; // = new aiconfig.OpenAIApi(configuration);

const models = {
    "Davinci3": "text-davinci-003",
    "Davinci2": "text-davinci-002",
    "Curie": "text-curie-001",
    "Babbage": "text-babbage-001",
    "Ada": "text-ada-001",
}

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
		return false;
	}
	return true;
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

async function RequestPrompt(prompt, replacer){
	console.log("Prompt: " + prompt);
	console.log("Replace with: " + replacer);

	prompt = prompt.replace(Prompts.TAG, replacer);

	console.log("Final: " + prompt);

	try {
		var completion = await openai.createCompletion({
			model: helpers.models.Davinci3,
			prompt: prompt,
			temperature: 0.7,
			max_tokens: 4000,
		});

		console.log(completion.data.choices[0].text);
	}
	catch (err) {
		console.log(err);
	}
}

function openLinkInBrowser(link) {
	vscode.env.openExternal(vscode.Uri.parse(link));
}

//export
module.exports = { CheckTokenExists, RequestPrompt, InstantiateOpenAI, models };