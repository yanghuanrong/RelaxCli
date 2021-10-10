const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const glob = require('glob');
const { packagesDir, examplesDir, rootDir } = require('../scripts/paths');
const { prefix } = require(path.resolve(rootDir, 'cli.config.js'));
const RegName = /(?<=.*\/packages\/).*?(?=\/index.md)/;

module.exports = function() {
  const fileJSON = [];
  const files = glob.sync(path.join(packagesDir, '*/index.md'));

  files.forEach((filePath, i) => {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { tag, title } = matter(fileContent).data || {};
    const componentName = filePath.match(RegName)[0];
    const routePath = `/components/${componentName.toLocaleLowerCase()}`;
    const tagName = `${prefix}-${componentName}`;
    const data = {
      title,
      routePath,
      componentName,
      tagName,
    };

    let index = -1;
    for (let i = 0; i < fileJSON.length; i++) {
      const item = fileJSON[i];
      if (item.tag === tag) {
        index = i;
        break;
      }
    }

    if (fileJSON.length && index != -1) {
      fileJSON[index].child.push(data);
    } else {
      fileJSON.push({
        tag,
        child: [data],
      });
    }
  });

  const dataJSON = `{"data":${JSON.stringify(fileJSON, null, 2)}}`;
  const dataPath = path.resolve(examplesDir, `data/components.json`);
  fs.writeFileSync(dataPath, dataJSON);
};
