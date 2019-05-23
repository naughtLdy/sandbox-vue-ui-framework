const RuleSet = require('webpack/lib/RuleSet');

interface SandboxVueUiFrameworkOptions {}

class SandboxVueUiFrameworkPlugin {
  options: SandboxVueUiFrameworkOptions;

  constructor(options: SandboxVueUiFrameworkOptions) {
    this.options = options;
  }

  apply(compiler: any) {
    // use webpack's RuleSet utility to normalize user rules
    const rawRules = compiler.options.module.rules;
    const { rules } = new RuleSet(rawRules);

    // find the rule that applies to vue files
    let vueRuleIndex = rules.findIndex(
      (rule: any) =>
        rule.use && rule.use.find((u: any) => u.loader === 'vue-loader'),
    );
    const vueRule = rules[vueRuleIndex];

    if (!vueRule) {
      throw new Error(
        `[SandboxVueUiFrameworkPlugin Error] No matching rule for vue-loader found.\n` +
          `Make sure there is at least one root-level rule that uses vue-loader.`,
      );
    }

    vueRule.use.unshift({
      loader: require.resolve('./loader'),
      options: this.options,
    });

    compiler.options.module.rules = rules;
  }
}

export default SandboxVueUiFrameworkPlugin;
