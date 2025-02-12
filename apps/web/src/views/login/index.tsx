import { type FormSchema, ProForm } from "@prime-admin/pro-form";
import { Button } from "primevue";
import { defineComponent, ref } from "vue";
import { z } from "zod";

export default defineComponent({
  name: "Login",
  setup() {
    const formRef = ref<{ submit: () => void }>();

    const formSchema: FormSchema[] = [
      {
        label: "用户名",
        name: "username",
        type: "input",
        validators: {
          onChange: z.string({
            message: "用户名不能为空",
          }),
        },
      },
      {
        label: "密码",
        name: "password",
        type: "password",
        validators: {
          onChange: z.string({
            message: "密码不能为空",
          }),
        },
      },
    ];

    return () => (
      <div class="w-screen h-screen flex justify-center items-center bg-gray-200">
        <div class="w-[300px] bg-white rounded-md p-6">
          <ProForm
            ref={formRef}
            schema={formSchema}
            onSubmit={(values: any) => {
              console.log(values);
            }}
            submitRender={() => (
              <Button size="small" onClick={() => formRef.value?.submit()}>
                登录
              </Button>
            )}
          />
        </div>
      </div>
    );
  },
});
