const g = document.getElementById.bind(document)
const q = document.querySelectorAll.bind(document)

document.addEventListener('DOMContentLoaded', () => {
  const mainNav = g('nav-main')

  document.body.addEventListener('click', e => {
    const navItem = e.target.closest('.nav-item')

    if (!navItem) return

    navItem.parentNode.querySelectorAll('.nav-item').forEach(item => item.classList.remove('selected'))
    navItem.classList.add('selected')

    if (navItem === mainNav.querySelector('.nav-item')) mainNav.classList.remove('collapsed')
    else mainNav.classList.add('collapsed')
  })

  // tooltips
  let tippyInstances = []

  const createTooltips = () => {
    if (mainNav.classList.contains('collapsed')) {
      destroyTooltips()
      tippyInstances = tippy('.nav-item[data-label]', {
        arrow: false,
        content: reference => reference.getAttribute('data-label'),
        offset: [0, 4],
        placement: 'right',
        theme: 'custom',
      })
    } else destroyTooltips()
  }

  const destroyTooltips = () => {
    tippyInstances.forEach(instance => instance.destroy())
    tippyInstances = []
  }

  createTooltips()

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') createTooltips()
    })
  })

  observer.observe(mainNav, { attributes: true })

  window.addEventListener('unload', () => observer.disconnect())
  // end tooltips
})
