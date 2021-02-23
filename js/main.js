window.onload = function () {

  function userConsultation(name_user){
    return fetch(`https://api.github.com/users/${name_user.value}`)
  }

  const form = document.getElementById('form-profile-github')
  form.addEventListener('submit', async function (e) {
      e.preventDefault()
      doSubmit()
  })

   async function doSubmit(){
     try {
      const username = document.getElementById('username')
      if(username.value == ''){
        clearScreenData()
        document.getElementById('message').innerHTML = 'Preenche o campo nome do usuário'
      }else{
        const response = await userConsultation(username)
        if(response.status === 404){
            document.getElementById('message').innerHTML = 'Usuário não encontrado'
            clearScreenData()
          }else{
          const dateUser = await response.json()
          document.getElementById('date-user').innerHTML = renderUserTemplate(dateUser)
          searchesLastFourRepositories(dateUser);
          document.getElementById('message').innerHTML = ''
          document.getElementById('username').value = ''
        }
      }

     } catch (error) {
      document.getElementById('message').innerHTML = 'Lamentamos, ocorreu um erro. Tente novamente mais tarde.'
      clearScreenData();
     }
  }

    function renderUserTemplate(user_data) {
      return `
        <div class="avatar">
          <img src="${user_data.avatar_url}"/>
        </div>
        <div class="user_data">
          <p>Usuário: <span>${user_data.name}</span></p>
          <p>Seguidores: <span>${user_data.followers}</span></p>
          <p>Repositório: <span>${user_data.public_repos}</span></p>
        </div>
      `
    }

  async function searchesLastFourRepositories (data) {
    const response = await fetch(`${data.repos_url}?sort=created_at&per_page=4`)
    const repositories = await  response.json()
    document.getElementById('newest-repositories').innerHTML = repositoryLists(repositories)
  }

  function repositoryLists(repositories) {
    let html = '<h4>Repositorios mais populares</h4>'
    repositories.forEach(element => {
      html = html + renderRepositoryTemplate(element)
    });
    return html
  }

  function renderRepositoryTemplate(element) {
    return `
      <span>${element.name}</span>
    `
  }

  function clearScreenData(){
    document.getElementById('date-user').innerHTML = ''
    document.getElementById('newest-repositories').innerHTML = ''
    document.getElementById('username').value = ''
  }

}


















