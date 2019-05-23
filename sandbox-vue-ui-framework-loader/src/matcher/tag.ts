interface tag {
  kebabTag: string;
  camelTag: string;
}

const components = ['HelloWorld'];

module.exports = function match(_: any, { kebabTag, camelTag }: tag) {
  if (components.includes(camelTag)) {
    return [camelTag, `import { ${camelTag} } from 'sandbox-vue-ui-framework/src/components/${camelTag}'`];
  }
};
