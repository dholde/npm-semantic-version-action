const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  const dir = __dirname;
  exec.exec(`test.sh`).then(() => {
    console.log(`Hello there you, ${nameToGreet}!!!`);
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`The event payload: ${payload}`);
  }).catch(err => console.log(err));
} catch (error) {
  core.setFailed(error.message);
}