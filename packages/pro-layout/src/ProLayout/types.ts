import type { DefineComponent, VNode } from "vue";
import type { RouteLocationNormalized, Router } from "vue-router";
import type { JSX } from "vue/jsx-runtime";

export type WithFalse<T> = T | false;

export type RouterTypes = {
  location: {
    pathname: string;
  };
};

export type MenuDataItem = {
  /** @name 子菜单 */
  children?: MenuDataItem[];
  /** @name 在菜单中隐藏子节点 */
  hideChildrenInMenu?: boolean;
  /** @name 在菜单中隐藏自己和子节点 */
  hideInMenu?: boolean;
  /** @name 菜单的icon */
  icon?: JSX.Element;
  /** @name 菜单的名字 */
  name?: string;
  /** @name 用于标定选中的值，默认是 path */
  key?: string;
  /** @name disable 菜单选项 */
  disabled?: boolean;
  /** @name 路径,可以设定为网页链接 */
  path?: string;
  /**
   * 当此节点被选中的时候也会选中 parentKeys 的节点
   *
   * @name 自定义父节点
   */
  parentKeys?: string[];
  /** @name 隐藏自己，并且将子节点提升到与自己平级 */
  flatMenu?: boolean;
  /** @name 指定外链打开形式，同a标签 */
  target?: string;
  [key: string]: any;
};

export interface ProLayoutProps {
  route: RouteLocationNormalized;
  router: Router;
  /**
   *  @name 自定义 logo
   */
  logo: WithFalse<(collapsed: boolean) => JSX.Element> | false;

  userRender: WithFalse<() => JSX.Element> | false;

  contentRender: JSX.Element | (() => JSX.Element);

  /**
   *  @name 侧边栏宽度
   */
  siderWidth?: number;

  /**
   * @name 处理 menuData 的数据，可以动态的控制数据
   * @see 尽量不要用异步数据来处理，否则可能造成更新不及时，如果异步数据推荐使用 menu.request 和 params。
   *
   * @example 删除一些菜单 menuDataRender=((menuData) => { return menuData.filter(item => item.name !== 'test') })
   * @example 增加一些菜单 menuDataRender={(menuData) => { return menuData.concat({ path: '/test', name: '测试', icon: 'smile' }) }}
   * @example 修改菜单 menuDataRender={(menuData) => { return menuData.map(item => { if (item.name === 'test') { item.name = '测试' } return item }) }}
   * @example 打平数据 menuDataRender={(menuData) => { return menuData.reduce((pre, item) => { return pre.concat(item.children || []) }, []) }}
   */
  menuDataRender?: (menuData: MenuDataItem[]) => MenuDataItem[];

  menus: MenuDataItem[];

  defaultCollapsed?: boolean;

  breakpoint?: number;

  footerRender?: WithFalse<() => JSX.Element> | false;
}

export type ProLayout = DefineComponent<ProLayoutProps>;
