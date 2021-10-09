const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const glob = require('glob');
const { packagesDir, examplesDir } = require('../scripts/paths');

const RegName = /(?<=.*\/packages\/).*?(?=\/index.md)/;

function CompileData() {
  const fileJSON = [];
  const fileMap = {};
  const files = glob.sync(path.join(packagesDir, '*/index.md'));

  files.forEach((filePath, i) => {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { tag, title } = matter(fileContent).data || {};
    const componentName = filePath.match(RegName)[0];
    const routePath = `/components/${componentName.toLocaleLowerCase()}`;

    const data = {
      title,
      routePath,
      componentName,
    };
    if (fileJSON.length && !fileMap[tag]) {
      const index = fileMap[tag];
      fileJSON[index].child.push(data);
    } else {
      fileMap[tag] = i;
      fileJSON.push({
        tag,
        child: [data],
      });
    }
  });

  const dataJSON = `{"data":${JSON.stringify(fileJSON, null, 2)}}`;
  const dataPath = path.resolve(examplesDir, `data/components.json`);
  fs.writeFileSync(dataPath, dataJSON);
}

module.exports = CompileData;
