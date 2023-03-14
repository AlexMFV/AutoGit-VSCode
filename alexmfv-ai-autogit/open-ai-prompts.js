//enumerator prompts with string values
const Prompts = {
    TAG: "$changes$",
    GET_COMMIT_MESSAGE: "Give me a commit message based on the following git changes: " + this.TAG,
};

//export Prompts
module.exports = { Prompts };