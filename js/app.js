const Form = {
  clearInputs: ($form) => {
    $form.reset()
  },
  getUsername: ($input) => {
    if(!$input.value.trim()){ return Promise.reject('Campo vazio.') }
    return new Promise(resolve => resolve($input.value.trim()));
  },
}

const RequestManager = {
  getUserProfile: async (username) =>  {
    const response = await fetch(`https://api.github.com/users/${username}`)
    if(response.status === 404) return Promise.reject('Usuário não encontrado')
    return response.json()
  },
  getLastUserRepositories: async (user, totalOfRepos = 4) => {
    const response = await fetch(`${user.repos_url}?sort=created_at&per_page=${totalOfRepos}`)
    const repositories = await response.json()
    return new Promise(resolve => resolve({...user, lastRepositories: repositories}))
  } 
}

const Renderer = {
  renderUserProfile: (user, $userProfile) => {
    $userProfile.innerHTML = user ? Template.getUserProfileTemplate(user) : '' 
  },
  renderUserRepositories: (repositories, $userRepositories) => {
    $userRepositories.innerHTML = repositories ? Template.getUserRepositoriesTemplate(repositories) : ''
  },
  renderError: (error, $errorSection) => {
    $errorSection.innerHTML = error ? error : ''
  }
}

const Template = {
  getUserProfileTemplate: (user) => {
    return `
            <div class="avatar">
              <img src="${user.avatar_url}"/>
            </div>
            <div class="user_data mt-5">
              <p>Usuário: <span>${user.name}</span></p>
              <p>Seguidores: <span>${user.followers}</span></p>
              <p>Repositório: <span>${user.public_repos}</span></p>
            </div>
          `
  },
  getUserRepositoriesTemplate: (repositories) => {
    const repositoriesTemplate = repositories.map(repo => `<p>${repo.name}</p>`).join("")
    return `<h4 class="mt-5">Repositorios mais populares</h4> ${repositoriesTemplate}`
  },
}