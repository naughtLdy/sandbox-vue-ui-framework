import OurVue from 'vue';
import { VueConstructor } from 'vue/types';
import {
  SandboxVueUiFramework as SandboxVueUiFrameworkPlugin,
  SandboxVueUiFrameworkUseOptions,
} from 'src/types';
import { consoleWarn, consoleError } from '../utils/console';

const SandboxVueUiFramework: SandboxVueUiFrameworkPlugin = {
  install(Vue, opts = {}) {
    if ((this as any).installed) return;
    (this as any).installed = true;

    if (OurVue !== Vue) {
      consoleError(
        `Multiple instances of Vue detected\nSandbox Vue Ui Framework Vue Version: ${
          OurVue.version
        }\nYour Vue Version: ${Vue.version}`,
      );
    }

    checkVueVersion(Vue);

    Vue.prototype.$sandboxVueUiFramework = new Vue();

    (function registerComponents(
      components: SandboxVueUiFrameworkUseOptions['components'],
    ) {
      if (components) {
        for (const key in components) {
          const component = components[key];
          if (
            component &&
            !registerComponents(component.$_sandboxVueUiFramework_subcomponents)
          ) {
            Vue.component(key, component as typeof Vue);
          }
        }
        return true;
      }
      return false;
    })(opts.components);
  },
  version: '0.1.0',
};

export function checkVueVersion(Vue: VueConstructor, requiredVue?: string) {
  // const vueDep = requiredVue || __REQUIRED_VUE__
  const vueDep = '2.6.10';

  const required = vueDep
    .split('.', 3)
    .map((v) => v.replace(/\D/g, ''))
    .map(Number);
  const actual = Vue.version.split('.', 3).map((n) => parseInt(n, 10));

  // Simple semver caret range comparison
  const passes =
    actual[0] === required[0] && // major matches
    (actual[1] > required[1] || // minor is greater
      (actual[1] === required[1] && actual[2] >= required[2])); // or minor is eq and patch is >=

  if (!passes) {
    consoleWarn(`SandboxVueUiFramework requires Vue version ${vueDep}`);
  }
}

export default SandboxVueUiFramework;
