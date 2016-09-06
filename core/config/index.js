const username = localStorage.getItem('settings.repo.username');
const reponame = localStorage.getItem('settings.repo.reponame');
const config = {
  API_BASE_URL: `https://${username}.github.io/${reponame}/api`,
};

export default config;

