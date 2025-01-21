import { defineComponent, KeepAlive, onMounted, ref, Transition } from "vue";
import type { VNode } from "vue";
import { ProLayout } from "@prime-admin/pro-layout";
import { RouterView, useRoute, useRouter } from "vue-router";
import { Logo, Avatar } from "./components";

export default defineComponent({
  name: "App",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const isReady = ref(false);

    onMounted(async () => {
      await router.isReady();
      isReady.value = true;
    });

    const menus = [
      {
        name: "控制台",
        icon: "pi pi-home",
        path: "/dashboard",
      },
      {
        name: "系统管理",
        icon: "pi pi-cog",
        children: [
          {
            name: "用户管理",
            icon: "pi pi-user",
            path: "/system/user",
          },
          {
            name: "角色管理角色管理角色管理角色管理",
            icon: "pi pi-users",
            children: [
              {
                name: "角色列表",
                icon: "pi pi-list",
                path: "/system/role/list",
              },
            ],
          },
          {
            name: "菜单管理",
            icon: "pi pi-list",
            path: "/system/menu",
          },
        ],
      },
    ];

    return () => {
      if (!isReady.value) return null;
      return (
        <ProLayout
          route={route}
          router={router}
          logo={(collapsed) => <Logo collapsed={collapsed} />}
          userRender={() => <Avatar />}
          menus={menus}
          contentRender={
            <RouterView>
              {{
                default: ({ Component }: { Component: VNode }) => {
                  return (
                    <Transition name="fade">
                      <KeepAlive>{Component}</KeepAlive>
                    </Transition>
                  );
                },
              }}
            </RouterView>
          }
        />
      );
    };
  },
});
