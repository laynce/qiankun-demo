import cheerio from 'cheerio'

export const getMicroApp = appName => window.qiankunLegancy[appName]

export const createLifecyle = (name, lifecyle) => {
  window.qiankunLegancy ||= {}
  window.qiankunLegancy[name] ||= {}
  window.qiankunLegancy[name].lifecyle = lifecyle
}

export const qiankunLegancy = (name) => {
  const vite = {}

  const devTransformIndexHtml = html => {
    const $ = cheerio.load(html)
    const moduleScripts = $('script[type=module]')

    const createLegancyHtml = html => {
      return `(function () {
        const global = (0, eval)('window')
        const name = '${name}'
        const proxy = window.proxy || {}
        let publicPath = (proxy && proxy.__INJECTED_PUBLIC_PATH_BY_QIANKUN__) || ''
        publicPath = publicPath.slice(0, publicPath.length - 1)
        global.qiankunLegancy ||= {}
        global.qiankunLegancy[name] ||= {}
        Object.assign(global.qiankunLegancy[name], {
          '__INJECTED_PUBLIC_PATH_BY_QIANKUN__': proxy.__INJECTED_PUBLIC_PATH_BY_QIANKUN__,
          '__POWERED_BY_QIANKUN__': proxy.__INJECTED_PUBLIC_PATH_BY_QIANKUN__,
        })
        ${html}
      })()`
    }

    Array.from(moduleScripts).forEach((el, index) => {
      const scriptEl = $(el)
      const src = scriptEl.attr('src')
      
      if (index === moduleScripts.length - 1) {
        const html = 
        scriptEl.html(createLegancyHtml(`
          global.qiankunLegancy[name].dynamicImport = import(publicPath + '${src}')
        `))
      } else {
        scriptEl.html(createLegancyHtml(`
          import(publicPath + '${src}')
        `))
      }
      scriptEl.removeAttr('type')
      scriptEl.removeAttr('src')
    })

    $('body').append(`
      <script>
        ${createLegancyHtml(`
          const app = global.qiankunLegancy[name]
          window[name] = {
            bootstrap: (...args) => app.dynamicImport.then(() => app.lifecyle.bootstrap(...args)),
            mount: (...args) => app.dynamicImport.then(() => app.lifecyle.mount(...args)),
            unmount: (...args) => app.dynamicImport.then(() => app.lifecyle.unmount(...args)),
          }
        `)}
      </script>
    `)
    
    return $.html()
  }

  const proTransformIndexHtml = html => {
    console.log(html)
    const $ = cheerio.load(html)
    console.log(Array.from($('script[type=module]')).length, '+++')
    Array.from($('script[type=module]')).forEach(el => {
      $(el).remove()
    })
    Array.from($('script[nomodule]')).forEach(el => {
      if (!['vite-legacy-polyfill', 'vite-legacy-entry'].includes($(el).attr('id'))) {
        $(el).remove()
      }
    })

    return $.html()
  }

  return {
    name: 'qiankun-legancy',
    enforce: 'post',
    config(config, env) {
      Object.assign(vite, {
        config,
        env
      })
    },
    transformIndexHtml(html) {
      return vite.env.mode === 'production' ? proTransformIndexHtml(html) : devTransformIndexHtml(html)
    }
  }
}