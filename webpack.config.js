const webpack = require("webpack");

function getReleaseBranchName() {
  let branchName;
  if (process.platform === "darwin") {
    branchName = process.env.CIRCLE_BRANCH;
  } else if (process.platform === "win32") {
    branchName = process.env.APPVEYOR_REPO_BRANCH;
  }

  return branchName || "";
}

function getReleaseChannel() {
  // Branch name format: __release-CHANNEL-DEPLOY_ID
  const pieces = getReleaseBranchName().split("-");
  if (pieces.length < 3 || pieces[0] !== "__release") {
    return process.env.NODE_ENV || "development";
  }

  return pieces[1];
}

const channel = getReleaseChannel();

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      __DARWIN__: process.platform === "darwin",
      __WIN32__: process.platform === "win32",
      __LINUX__: process.platform === "linux",
      __DEV__: channel === "development",
      __RELEASE_CHANNEL__: JSON.stringify(channel)
    })
  ]
};
