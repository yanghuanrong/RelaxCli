// const fs = require('fs');
// const path = require('path');
// var source = fs.readFileSync(
//   path.resolve(__dirname, '../demo/packages/button/index.md'),
//   'utf8'
// );
// setTimeout(mdLoader, 0, source);

const loaderUtils = require('loader-utils');
const mdContainer = require('markdown-it-container');
const matter = require('gray-matter');
// const topbar = '<div class="hljs-topbar"><div class="dot"><i class="red"></i><i class="yellow"></i><i class="green"></i></div></div>'
const topbar = '';
const md = require('markdown-it')({
  highlight: function(str, lang) {
    return `<pre class="hljs-pre">${topbar}<code>${md.utils.escapeHtml(
      str
    )}</code></pre>`;
  },
});

let docPart = [];

md.use(mdContainer, 'demo', {
  render: function(tokens, idx) {
    const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
    if (tokens[idx].nesting === 1) {
      const description = m && m.length > 1 ? m[1] : '';
      const content =
        tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : '';

      docPart.push(content);

      return `<demo-block>
      ${description ? `<div>${md.render(description)}</div>` : ''}
      <demo${docPart.length} slot="source"/>
      `;
    }
    return '</demo-block>';
  },
});

md.use(function() {
  const defaultRender = md.renderer.rules.fence;
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];

    // 判断该 fence 是否在 :::demo 内
    const prevToken = tokens[idx - 1];
    const isInDemoContainer =
      prevToken &&
      prevToken.nesting === 1 &&
      prevToken.info.trim().match(/^demo\s*(.*)$/);
    if (token.info.trim() === 'html' && isInDemoContainer) {
      return `<template slot="highlight"><pre class="hljs-pre" v-pre><code class="html">${md.utils.escapeHtml(
        token.content
      )}</code></pre></template>`;
    }
    return defaultRender(tokens, idx, options, env, self);
  };
});

function mdLoader(source) {
  docPart = [];
  const loadObj = this.resourceQuery
    ? loaderUtils.parseQuery(this.resourceQuery)
    : {};

  const compileSource = matter(source);
  const html = md.render(compileSource.content);

  if (loadObj.demo) {
    return docPart[loadObj.demo - 1];
  }

  const demoRequest = docPart
    .map((demo, index) => {
      return `import Demo${index + 1} from ${loaderUtils.stringifyRequest(
        this,
        this.resourcePath + `?demo=${index + 1}`
      )}`;
    })
    .join('\n');
  const template = `
  <template>
    <div class="relax-docs">
        ${html}
    </div>
  </template>`;

  const script = `
  <script>
  ${demoRequest}
  import hljs from 'highlight.js'
  export default {
    components: {
      ${docPart.map((demo, index) => `Demo${index + 1}`).join(',\n')}
    },
    mounted(){
      this.$nextTick(()=>{
        const blocks = document.querySelectorAll('pre code:not(.hljs)')
        Array.prototype.forEach.call(blocks, hljs.highlightBlock)
      })
    },
  }
  </script>
  `;

  const page = `
  ${template}
  ${script}
  `;
  return page;
}

module.exports = mdLoader;
