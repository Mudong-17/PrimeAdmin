import { ProForm } from "@prime-admin/pro-form";
import { defineComponent } from "vue";
import { z } from "zod";

export default defineComponent({
  name: "About",
  setup() {
    const formSchema = [
      {
        name: "name",
        label: "名称",
        type: "text",
        validators: {
          onChange: z
            .string({ message: "名称不能为空" })
            .min(3, "名称至少3个字符"),
        },
      },
      {
        name: "demo",
        label: "名称",
        type: "text",
        validators: {
          onChange: z.string().min(3, "名称至少3个字符"),
        },
      },
      {
        name: "state",
        label: "状态",
        type: "select",
        options: [
          { label: "记录", value: "backlog" },
          { label: "待办", value: "todo" },
          { label: "进行中", value: "in progress" },
          { label: "已完成", value: "done" },
          { label: "已取消", value: "canceled" },
        ],
      },
      {
        name: "status",
        label: "状态",
        type: "select",
        multiple: true,
        options: [
          { label: "记录", value: "backlog" },
          { label: "待办", value: "todo" },
          { label: "进行中", value: "in progress" },
          { label: "已完成", value: "done" },
          { label: "已取消", value: "canceled" },
        ],
      },
      {
        name: "city",
        label: "城市",
        type: "cascade",
        options: [
          {
            label: "北京",
            value: "beijing",
            children: [
              { label: "朝阳区", value: "chaoyang" },
              { label: "海淀区", value: "haidian" },
              { label: "丰台区", value: "fengtai" },
              {
                label: "大兴区",
                value: "daxing",
                children: [
                  { label: "亦庄镇", value: "yizhuang" },
                  { label: "黄村镇", value: "huangcun" },
                ],
              },
            ],
          },
          { label: "上海", value: "shanghai", children: [] },
          { label: "广州", value: "guangzhou", children: [] },
          { label: "深圳", value: "shenzhen", children: [] },
          {
            label: "合肥",
            value: "tianjin",
            children: [
              { label: "蜀山区", value: "shushan" },
              { label: "包河区", value: "baohe" },
              {
                label: "肥西县",
                value: "feixi",
                children: [
                  { label: "上派镇", value: "shangpai" },
                  { label: "桃花镇", value: "taohua" },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "hobby",
        label: "爱好",
        type: "checkbox",
        options: [
          { label: "篮球", value: "basketball" },
          { label: "足球", value: "football" },
          { label: "乒乓球", value: "pingpong" },
        ],
      },
      {
        name: "birthday",
        label: "生日",
        type: "date",
        fieldProps: {
          showTime: true,
        },
      },
      {
        name: "phone",
        label: "手机号",
        type: "mask",
        fieldProps: {
          mask: "999-9999-9999",
        },
      },
      {
        name: "age",
        label: "年龄",
        type: "number",
      },

      {
        name: "code",
        label: "验证码",
        type: "opt",
        fieldProps: {
          length: 6,
        },
      },
      {
        name: "password",
        label: "密码",
        type: "password",
      },
      {
        name: "description",
        label: "描述",
        type: "textarea",
      },
    ];

    return () => (
      <div class="flex ">
        <div class="">
          <ProForm
            layout={{
              cols: 2,
              gutter: 18,
            }}
            schema={formSchema}
            onSubmit={(values) => {
              console.log(values);
            }}
          />
        </div>
      </div>
    );
  },
});
