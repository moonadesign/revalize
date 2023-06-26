const g = document.getElementById.bind(document)
const q = document.querySelectorAll.bind(document)

q('[data-nav]').forEach((a, i, all) => {
  a.addEventListener('click', e => {
    all.forEach(c => {
      c.classList.remove('selected')
      c.querySelector('i').className = 'fa-regular fa-circle'
    })

    a.classList.add('selected')
    a.querySelector('i').className = 'fa-solid fa-circle-dot'
    const bodyClasses = document.body.classList
    bodyClasses.remove('nav-white', 'nav-blue', 'nav-de')
    bodyClasses.add(`nav-${a.dataset.nav}`)
  })
  if (!i) a.click() // default to first
})

q('[data-theme]').forEach((a, i, all) => {
  a.addEventListener('click', e => {
    all.forEach(c => {
      c.classList.remove('selected')
      c.querySelector('i').className = 'fa-regular fa-circle'
    })
    a.classList.add('selected')
    a.querySelector('i').className = 'fa-solid fa-circle-dot'
    const bodyClasses = document.body.classList
    bodyClasses.remove('theme-moona', 'theme-de', 'theme-kendo', 'theme-bootstrap', 'theme-og')
    bodyClasses.add(`theme-${a.dataset.theme}`)
  })
  if (!i) a.click() // default to first
})

document.addEventListener('keypress', e => {
  const ui = g('ui')
  if (e.key === 'u') {
    const now = ui.style.display
    ui.style.display = !now || now === 'flex' ? 'none' : 'flex'
  }
})
