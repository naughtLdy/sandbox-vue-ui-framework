import Vue, {
  Component,
  PluginFunction,
  VueConstructor,
  DirectiveOptions
} from 'vue';
import './lib';
import './alacarte';
import './colors';

declare const SandboxVueUiFramework: SandboxVueUiFramework;
export default SandboxVueUiFramework;
export interface SandboxVueUiFramework {
  install: PluginFunction<SandboxVueUiFrameworkUseOptions>;
  version: string;
}

export type ComponentOrPack = Component & {
  $_sandboxVueUiFramework_subcomponents?: Record<string, ComponentOrPack>;
};

export interface SandboxVueUiFrameworkUseOptions {
  transitions?: Record<string, VueConstructor>;
  directives?: Record<string, DirectiveOptions>;
  components?: Record<string, ComponentOrPack>;
  breakpoint?: Partial<SandboxVueUiFrameworkBreakpointOptions> | false;
  options?: Partial<SandboxVueUiFrameworkOptions>;
  rtl?: boolean;
}

export interface SandboxVueUiFrameworkObject extends Vue {
  readonly breakpoint: Readonly<SandboxVueUiFrameworkBreakpoint>;
  readonly goTo: <T extends string | number | HTMLElement | Vue>(
    target: T,
    options?: SandboxVueUiFrameworkGoToOptions
  ) => Promise<T>;
  application: SandboxVueUiFrameworkApplication;
  options: SandboxVueUiFrameworkOptions;
  rtl: boolean;
}

declare module 'vue/types/vue' {
  export interface Vue {
    $sandboxVueUiFramework: SandboxVueUiFrameworkObject;
  }
}

export type SandboxVueUiFrameworkIconComponent = {
  component: Component | string;
  props?: object;
};
export type SandboxVueUiFrameworkIcon =
  | string
  | SandboxVueUiFrameworkIconComponent;

export interface SandboxVueUiFrameworkApplication {
  bar: number;
  bottom: number;
  footer: number;
  left: number;
  right: number;
  top: number;
  bind(uid: number, target: string, value: number): void;
  unbind(uid: number, target: string): void;
  update(target: string): void;
}

export interface SandboxVueUiFrameworkBreakpointThresholds {
  xs: number;
  sm: number;
  md: number;
  lg: number;
}

export interface SandboxVueUiFrameworkBreakpointOptions {
  thresholds: SandboxVueUiFrameworkBreakpointThresholds;
  scrollbarWidth: number;
}

export interface SandboxVueUiFrameworkBreakpoint {
  height: number;
  lg: boolean;
  lgAndDown: boolean;
  lgAndUp: boolean;
  lgOnly: boolean;
  md: boolean;
  mdAndDown: boolean;
  mdAndUp: boolean;
  mdOnly: boolean;
  name: string;
  sm: boolean;
  smAndDown: boolean;
  smAndUp: boolean;
  smOnly: boolean;
  width: number;
  xl: boolean;
  xlOnly: boolean;
  xs: boolean;
  xsOnly: boolean;
  thresholds: SandboxVueUiFrameworkBreakpointThresholds;
  scrollbarWidth: number;
}

export type SandboxVueUiFrameworkThemeItem =
  | string
  | number
  | {
      base: string | number;
      lighten5: string | number;
      lighten4: string | number;
      lighten3: string | number;
      lighten2: string | number;
      lighten1: string | number;
      darken1: string | number;
      darken2: string | number;
      darken3: string | number;
      darken4: string | number;
    };

export interface SandboxVueUiFrameworkTheme {
  [name: string]: SandboxVueUiFrameworkThemeItem;

  primary: SandboxVueUiFrameworkThemeItem;
  accent: SandboxVueUiFrameworkThemeItem;
  secondary: SandboxVueUiFrameworkThemeItem;
  info: SandboxVueUiFrameworkThemeItem;
  warning: SandboxVueUiFrameworkThemeItem;
  error: SandboxVueUiFrameworkThemeItem;
  success: SandboxVueUiFrameworkThemeItem;
}

export interface SandboxVueUiFrameworkThemeCache {
  get: (parsedTheme: SandboxVueUiFrameworkTheme) => string | null;
  set: (parsedTheme: SandboxVueUiFrameworkTheme, css: string) => void;
}

export interface SandboxVueUiFrameworkOptions {
  customProperties: boolean;
  /** @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src#Unsafe_inline_script */
  cspNonce: string | null;
}

export type SandboxVueUiFrameworkGoToEasing =
  | ((t: number) => number)
  | 'linear'
  | 'easeInQuad'
  | 'easeOutQuad'
  | 'easeInOutQuad'
  | 'easeInCubic'
  | 'easeOutCubic'
  | 'easeInOutCubic'
  | 'easeInQuart'
  | 'easeOutQuart'
  | 'easeInOutQuart'
  | 'easeInQuint'
  | 'easeOutQuint'
  | 'easeInOutQuint';

export interface SandboxVueUiFrameworkGoToOptions {
  container?: string | HTMLElement | Vue;
  duration?: number;
  offset?: number;
  easing?: SandboxVueUiFrameworkGoToEasing;
  appOffset?: boolean;
}
