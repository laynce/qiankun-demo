import cheerio from 'cheerio'

export const getMicroApp = appName => {
  const global = (0, eval)('window')
  console.log((global.qiankunLegancy && global.qiankunLegancy[appName]),666)
  return (global.qiankunLegancy && global.qiankunLegancy[appName]) || {
    __POWERED_BY_QIANKUN__: window.__POWERED_BY_QIANKUN__
  }
}

export const createLifecyle = (name, lifecyle) => {
  const global = (0, eval)('window')
  global.qiankunLegancy ||= {}
  global.qiankunLegancy[name] ||= {}
  global.qiankunLegancy[name].lifecyle = lifecyle
}

export const qiankunLegancy = (name) => {
  const vite = {}

  const lifecyleStr = `
    const app = global.qiankunLegancy[name]
    window[name] = {
      bootstrap: (...args) => app.dynamicImport.then(() => app.lifecyle.bootstrap(...args)),
      mount: (...args) => app.dynamicImport.then(() => app.lifecyle.mount(...args)),
      unmount: (...args) => app.dynamicImport.then(() => app.lifecyle.unmount(...args)),
    }
  `

  const createLegancyHtml = html => {
    return `(function () {
      const global = (0, eval)('window')
      const name = '${name}'
      const proxy = global.proxy || {}
      let publicPath = (proxy && proxy.__INJECTED_PUBLIC_PATH_BY_QIANKUN__) || ''
      publicPath = publicPath.slice(0, publicPath.length - 1)
      global.qiankunLegancy ||= {}
      global.qiankunLegancy[name] ||= {}
      
      Object.assign(global.qiankunLegancy[name], {
        '__INJECTED_PUBLIC_PATH_BY_QIANKUN__': proxy.__INJECTED_PUBLIC_PATH_BY_QIANKUN__,
        '__POWERED_BY_QIANKUN__': proxy.__INJECTED_PUBLIC_PATH_BY_QIANKUN__,
      })
      console.log(global.qiankunLegancy[name].__INJECTED_PUBLIC_PATH_BY_QIANKUN__, 3443)
      ${html}
    })()`
  }

  const devTransformIndexHtml = html => {
    const $ = cheerio.load(html)
    const moduleScripts = $('script[type=module]')


    Array.from(moduleScripts).forEach((el, index) => {
      const scriptEl = $(el)
      const src = scriptEl.attr('src')
      
      if (index === moduleScripts.length - 1) {
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
        ${createLegancyHtml(lifecyleStr)}
      </script>
    `)
    
    return $.html()
  }

  const proTransformIndexHtml = html => {
    const $ = cheerio.load(html)
    Array.from($('script[type=module]')).forEach(el => $(el).remove())
    Array.from($('script[nomodule]')).forEach(el => {
      const scriptEl = $(el)
      scriptEl.removeAttr('nomodule')
      
      if (scriptEl.attr('id') === 'vite-legacy-polyfill') {
        console.log()
      } else if (scriptEl.attr('id') === 'vite-legacy-entry') {
        scriptEl.html(createLegancyHtml(`
          global.qiankunLegancy[name].dynamicImport = System.import('${scriptEl.attr("data-src")}')
        `))
      } else {
        scriptEl.remove()
      }
    })

    $('body').append(`
      <script>
        ${createLegancyHtml(lifecyleStr)}
      </script>
    `)

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