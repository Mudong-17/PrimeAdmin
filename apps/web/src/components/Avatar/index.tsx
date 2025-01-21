import { Avatar, TieredMenu } from "primevue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Avatar",
  setup() {
    const menu = ref();

    const menus = [
      {
        label: "修改密码",
        icon: "pi pi-key",
        command: () => {
          console.log("修改密码");
        },
      },
      {
        separator: true,
      },
      {
        label: "退出登录",
        icon: "pi pi-sign-out",
        command: () => {
          console.log("退出登录");
        },
      },
    ];

    return () => (
      <div>
        <div
          class="cursor-pointer select-none"
          onClick={(event) => {
            menu.value?.toggle(event);
          }}
          aria-haspopup="true"
          aria-controls="overlay_tmenu"
        >
          <Avatar
            style="background-color: #ece9fc; color: #2a1261"
            label="东"
            image="https://cdn.pixabay.com/photo/2024/08/15/19/19/highland-cow-8972000_1280.jpg"
            size="normal"
            shape="circle"
          />
        </div>

        <TieredMenu ref={menu} model={menus} popup />
      </div>
    );
  },
});
