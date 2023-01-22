const vscode = require('vscode');

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

function openLinkInBrowser(link) {
	vscode.env.openExternal(vscode.Uri.parse(link));
}

//export
module.exports = { CheckTokenExists, models };