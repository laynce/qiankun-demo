import cheerio from 'cheerio'

export const qiankunLifecyle = (name, lifecyle) => {
  window.proxy.qiankunLegancy ||= {}
  window.proxy.qiankunLegancy[name] ||= {}
  window.proxy.qiankunLegancy[name].lifecyle = lifecyle
}

export const qiankunLegancy = (name) => {
  return {
    name: 'qiankun-legancy',
    transformIndexHtml(html) {
      const $ = cheerio.load(html)
      const moduleScripts = $('script[type=module]')
      Array.from(moduleScripts).forEach((el, index) => {
        const scriptEl = $(el)
        const src = scriptEl.attr('src')
        
        if (index === moduleScripts.length - 1) {
          scriptEl.html(`
            var publicPath = (window.proxy && window.proxy.__INJECTED_PUBLIC_PATH_BY_QIANKUN__) || ''
            window.qiankunLegancy ||= {}
            window.qiankunLegancy.${name} ||= {}
            window.qiankunLegancy.${name}.dynamicImport = import(publicPath.slice(0, publicPath.length - 1) + '${src}')
          `)
        } else {
          scriptEl.html(`
            var publicPath = (window.proxy && window.proxy.__INJECTED_PUBLIC_PATH_BY_QIANKUN__) || ''
            import(publicPath.slice(0, publicPath.length - 1) + '${src}')
          `)
        }
        scriptEl.removeAttr('type')
        scriptEl.removeAttr('src')
      })

      $('body').append(`
        <script>
          const app = window.qiankunLegancy.${name}
          window.${name} = {
            bootstrap: (...args) => app.dynamicImport.then(() => app.lifecyle.bootstrap(...args)),
            mount: (...args) => app.dynamicImport.then(() => app.lifecyle.mount(...args)),
            unmount: (...args) => app.dynamicImport.then(() => app.lifecyle.unmount(...args)),
          }
        </script>
      `)
      
      return $.html()
    }
  }
}