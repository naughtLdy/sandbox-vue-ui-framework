import { VueConstructor } from 'vue';
import SandboxVueUiFrameworkPlougin from './plugins';
import * as components from './components';

const install = (Vue: VueConstructor, config = {}) => {
  if (install.installed) {
    /* istanbul ignore next */
    return;
  }
  install.installed = true;

  Vue.use(SandboxVueUiFrameworkPlougin, { components });
};

install.installed = false;

const SandboxVueUiFramework = {
  install,
};

// if (typeof window !== 'undefined' && window.Vue) {
//   window.Vue.use(SandboxVueUiFramework)
// }

export default SandboxVueUiFramework;
