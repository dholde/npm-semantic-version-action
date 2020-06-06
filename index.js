const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');
const io = require('@actions/io');

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  const dir = __dirname;
  io.mkdirP('path/to/make').then(() => {
    console.log("Successfully created path");
  }).catch(err => console.log(err));
  exec.exec('npm version patch -m \"Automatic bump to %s\"').then(() => {
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