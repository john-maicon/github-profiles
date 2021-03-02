const $form = document.getElementById('form-profile-github'),
$usernameInput = document.getElementById('username'),
$message = document.getElementById('message'),
$userProfile = document.getElementById('user-profile'),
$userRepositories = document.getElementById('newest-repositories');

$form.addEventListener('submit',  (event) => {
  event.preventDefault();

  Form.getUsername($usernameInput)
  .then(username => RequestManager.getUserProfile(username))
  .then(user => RequestManager.getLastUserRepositories(user))
  .then(userWithRepos => {
    Renderer.renderUserProfile(userWithRepos, $userProfile);
    Renderer.renderUserRepositories(userWithRepos.lastRepositories,$userRepositories);
    Renderer.renderError(null, $message)
    Form.clearInputs($form); 
  })
  .catch(error => {
    Renderer.renderError(error, $message);
    Form.clearInputs($form); 
    Renderer.renderUserProfile(null ,$userProfile);
    Renderer.renderUserRepositories(null, $userRepositories);
  })

})