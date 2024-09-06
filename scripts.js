const g = document.getElementById.bind(document)

dayjs.extend(dayjs_plugin_relativeTime)

const insert = (target = document.body, tag = 'div') => {
  const el = document.createElement(tag)
  target.appendChild(el)
  return el
}

const iconMap = {
  figma: 'fa-brands fa-figma',
  github: 'fa-brands fa-github',
  browser: 'fa-solid fa-browser',
  trello: 'fa-brands fa-trello',
}

const createProjectCards = projects => {
  projects.forEach(project => {
    const card = insert(g('project-loop'), 'div')
    card.className = 'project'

    // const year = insert(card)
    // year.className = 'project-year'
    // year.textContent = project.year
    const title = insert(card, 'h2')
    title.textContent = project.name
    const note = insert(card, 'p')
    note.className = 'project-note'
    note.textContent = project.note

    const people = insert(card, 'div')
    people.className = 'project-people'

    const designer = insert(people, 'div')
    designer.className = 'project-designer'
    designer.innerHTML = `<b>Designer</b> ${project.designer}`

    const owner = insert(people, 'div')
    owner.className = 'project-owner'
    owner.innerHTML = `<b>Owner</b> ${project.owner}`

    const links = insert(card, 'div')
    links.className = 'project-links'

    project.links.forEach(link => {
      const button = insert(links, 'a')
      button.className = 'project-link'
      button.href = link.url
      button.target = '_blank'

      const icon = insert(button, 'i')
      icon.className = iconMap[link.type] || 'fas fa-link'

      const label = insert(button, 'span')
      label.textContent = `${link.label}`
    })

    const updated = insert(card)
    updated.className = 'project-updated'
    updated.innerHTML = `Last updated <b>${dayjs(project.updated).fromNow()}</b> on <b>${dayjs(project.updated).format(
      'MMM DD',
    )}</b>`
  })
}

const fetchProjects = async () => {
  try {
    const response = await fetch('./projects.json')
    if (!response.ok) throw new Error('Network response was not ok')
    const projects = await response.json()
    createProjectCards(projects)
  } catch (error) {
    console.error(error)
  }
}
fetchProjects()
