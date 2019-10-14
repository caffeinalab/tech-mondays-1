function introView() {
  const appScript = document.querySelector('script[data-src]')
  const appStyle = document.querySelector('link[data-href]')

  appScript.setAttribute('src', appScript.dataset.src)
  appStyle.setAttribute('href', appStyle.dataset.href)
}

function init() {
  document.fonts
    ? document.fonts.ready.then(introView)
    : introView()
}

document.addEventListener('DOMContentLoaded', init)
