import * as webpack from 'webpack';
import { RawSourceMap } from 'webpack/node_modules/source-map';
import * as path from 'path';

const loaderUtils = require('loader-utils');
const compiler = require('vue-template-compiler');

const tagMatcher = require('./matcher/tag');
const { camelize, capitalize, hyphenate } = require('./util');
const runtimePaths = {
  installComponents: require.resolve('./runtime/installComponents'),
};

function getMatches(
  path: string,
  type: string,
  items: Set<string>,
  matches: any[],
  component: any,
) {
  const imports: string[] = [];

  items.forEach((item: any) => {
    for (const matcher of matches) {
      const match = matcher(item, {
        [`kebab${type}`]: hyphenate(item),
        [`camel${type}`]: capitalize(camelize(item)),
        path,
        component,
      });
      if (match) {
        imports.push(match);
        break;
      }
    }
  });

  imports.sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
  return imports;
}

function install(
  loadFile: string,
  install: 'installComponents',
  content: string,
  imports: string[],
) {
  if (imports.length) {
    let newContent = '/* sandbox-vue-ui-framework-loader */\n';
    newContent += `import ${install} from ${loadFile}\n`;
    newContent += imports.map((i) => i[1]).join('\n') + '\n';
    newContent += `${install}(component, {${imports
      .map((i) => i[0])
      .join(',')}})\n`;

    // Insert our modification before the HMR code
    const hotReload = content.indexOf('/* hot reload */');
    if (hotReload > -1) {
      content =
        content.slice(0, hotReload) +
        newContent +
        '\n\n' +
        content.slice(hotReload);
    } else {
      content += '\n\n' + newContent;
    }
  }

  return content;
}

async function loader(
  this: webpack.loader.LoaderContext,
  content: string,
  sourceMap: RawSourceMap,
) {
  this.async();
  this.cacheable();

  const options = {
    match: [],
    ...loaderUtils.getOptions(this),
  };

  if (!Array.isArray(options.match)) {
    options.match = [options.match];
  }

  options.match.push(tagMatcher);

  if (!this.resourceQuery) {
    const readFile = (path: string) =>
      new Promise((resolve, reject) => {
        this.fs.readFile(path, function(err: any, data: any) {
          if (err) reject(err);
          else resolve(data);
        });
      });

    this.addDependency(this.resourcePath);

    const tags = new Set<string>();
    const file = (<any>await readFile(this.resourcePath)).toString('utf8');
    const component: any = compiler.parseComponent(file);
    if (component.template) {
      if (component.template.src) {
        const externalFile = path.resolve(
          path.dirname(this.resourcePath),
          component.template.src,
        );
        const externalContent = (<any>await readFile(externalFile)).toString(
          'utf8',
        );
        component.template.content = externalContent;
      }
      compiler.compile(component.template.content, {
        modules: [
          {
            postTransformNode: (node: any) => {
              tags.add(node.tag);
            },
          },
        ],
      });
    }

    const matches = getMatches(
      this.resourcePath.substring(this.rootContext.length + 1),
      'Tag',
      tags,
      options.match,
      component,
    );
    content = install(
      loaderUtils.stringifyRequest(
        this,
        '!' + runtimePaths['installComponents'],
      ),
      'installComponents',
      content,
      matches,
    );
  }

  this.callback(null, content, sourceMap);
}

export default loader;
