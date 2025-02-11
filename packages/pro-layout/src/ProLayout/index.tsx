import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  reactive,
  watch,
  type PropType,
} from "vue";
import type { ProLayoutProps } from "./types";
import Sidder from "./Sidder";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import { useDebounceFn } from "@vueuse/core";
import type { RouteLocationNormalized, Router } from "vue-router";

// 添加 404 组件
const NotFound = () => (
  <div class="flex-1 flex items-center justify-center flex-col gap-4">
    <div class="text-8xl font-bold text-primary-500">404</div>
    <div class="text-xl text-gray-500">页面不存在</div>
  </div>
);

const NotPermission = () => (
  <div class="flex-1 flex items-center justify-center flex-col gap-4">
    <div class="text-8xl font-bold text-primary-500">403</div>
    <div class="text-xl text-gray-500">没有权限</div>
  </div>
);

export default defineComponent<ProLayoutProps>({
  name: "ProLayout",
  props: {
    route: {
      type: Object as PropType<RouteLocationNormalized>,
      required: true,
    },
    router: {
      type: Object as PropType<Router>,
      required: true,
    },
    logo: {
      type: [Function, Boolean],
      default: () => <></>,
    },
    userRender: {
      type: [Function, Boolean],
      default: () => <></>,
    },
    contentRender: {
      type: [Object, Function],
      default: () => <></>,
    },
    siderWidth: {
      type: Number,
      default: 256,
    },
    menus: {
      type: Array,
      default: () => [],
    },
    defaultCollapsed: {
      type: Boolean,
      default: false,
    },
    breakpoint: {
      type: Number,
      default: 768,
    },
    footerRender: {
      type: [Function, Boolean],
      default: false,
    },
    whiteList: {
      type: Array as PropType<string[]>,
      default: () => ["/login"],
    },
  },
  setup(props) {
    const layoutState = reactive({
      collapsed: props.defaultCollapsed ?? false,
      isMobile: false,
      isReady: false,
      currentPath: props.route.path,
    });

    // 监听路由变化
    watch(
      () => props.route.path,
      (newPath) => {
        layoutState.currentPath = newPath;
      },
      { immediate: true }
    );

    const layoutStyle = computed(() => ({
      "--sider-width": `${props.siderWidth}px`,
      "--header-height": "48px",
      "--content-padding": "16px",
      "--icon-size": "24px",
    }));

    const handleResize = useDebounceFn(() => {
      layoutState.isMobile = window.innerWidth < (props.breakpoint ?? 768);
      layoutState.collapsed = layoutState.isMobile;
    }, 100);

    const toggleCollapsed = () => {
      layoutState.collapsed = !layoutState.collapsed;
    };

    // const handleRouteChange = () => {
    //   layoutState.currentPath = props.route.path;
    // };

    onMounted(async () => {
      await props.router.isReady();
      layoutState.isReady = true;
      window.addEventListener("resize", handleResize);
      handleResize();
    });

    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });

    // 修改检查路径是否在菜单中的函数，增加白名单检查
    const isPathInMenus = (
      path: string,
      menus: typeof props.menus
    ): boolean => {
      // 首先检查是否在白名单中
      if (props.whiteList?.includes(path)) {
        return true;
      }

      return menus.some((menu) => {
        if (menu.path === path) return true;
        if (menu.children) {
          return isPathInMenus(path, menu.children);
        }
        return false;
      });
    };

    const renderContent = () => {
      // 首先检查路由是否存在
      if (props.route.matched.length === 0) {
        return <NotFound />;
      }

      // 然后检查是否有权限访问（路径是否在菜单中）
      if (!isPathInMenus(props.route.path, props.menus)) {
        return <NotPermission />;
      }

      return typeof props.contentRender === "function"
        ? props.contentRender()
        : props.contentRender;
    };

    return () => {
      if (!layoutState.isReady) return null;

      return (
        <>
          {props.route.meta?.pure ? (
            renderContent()
          ) : (
            <div style={layoutStyle.value} class="w-screen h-screen flex">
              <Sidder
                collapsed={layoutState.collapsed}
                logo={props.logo}
                router={props.router}
                menus={props.menus}
                activePath={layoutState.currentPath}
                isMobile={layoutState.isMobile}
              />
              <div class="flex-1 flex flex-col bg-emphasis overflow-hidden">
                <Header
                  collapsed={layoutState.collapsed}
                  onCollapsed={toggleCollapsed}
                  userRender={props.userRender}
                />
                <Content
                  content={renderContent()}
                  loading={!layoutState.isReady}
                />
                {props.footerRender && <Footer render={props.footerRender} />}
              </div>
            </div>
          )}
        </>
      );
    };
  },
});
