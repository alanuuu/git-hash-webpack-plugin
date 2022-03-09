const { execSync } = require('child_process');

function getGitCommitId() {
  try {
    return execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
  } catch (error) {
    console.error('git commit error', error);
    return '';
  }
}

module.exports = {
  getGitCommitId,
};