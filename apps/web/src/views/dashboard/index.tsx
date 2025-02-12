import { defineComponent, ref } from "vue";
import { exportExcel, ProTable } from "@prime-admin/pro-table";
import { ProSearch } from "@prime-admin/pro-form";
import type { Column } from "@prime-admin/pro-table";
import { Button, Splitter, SplitterPanel } from "primevue";
import { z } from "zod";
import { Block, ProTree } from "@/components";

const generateMockData = (count: number) => {
  const statusList = ["backlog", "todo", "in progress", "done", "canceled"];
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    title: `任务${index + 1}`,
    status: statusList[index % statusList.length],
  }));
};

export default defineComponent({
  name: "Dashboard",
  setup() {
    const columns: Column[] = [
      {
        key: "select",
        size: 80,
        pin: "left",
      },
      {
        key: "id",
        title: "任务编号",
        sorting: false,
        filter: false,
        export: false,
        size: 180,
      },
      {
        key: "title",
        title: "标题",
        filter: { type: "text" },
        size: 180,
      },
      {
        key: "title1",
        title: "标题",
        filter: { type: "text" },
        size: 180,
      },
      {
        key: "title2",
        title: "标题",
        filter: { type: "text" },
        size: 180,
      },
      {
        key: "title3",
        title: "标题",
        filter: { type: "text" },
        size: 180,
      },
      {
        key: "title4",
        title: "标题",
        filter: { type: "text" },
        size: 180,
      },
      {
        key: "status",
        title: "状态",
        size: 180,
        filter: {
          type: "select",
          options: [
            { label: "记录", value: "backlog" },
            { label: "待办", value: "todo" },
            { label: "进行中", value: "in progress" },
            { label: "已完成", value: "done" },
            { label: "已取消", value: "canceled" },
          ],
        },
      },
      {
        key: "actions",
        title: "操作",
        sorting: false,
        size: 200,
        cell: ({ row }) => {
          return (
            <Button
              text
              label="编辑"
              size="small"
              onClick={() => {
                console.log(row);
              }}
            />
          );
        },
      },
    ];
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
    ];

    const dataSource = ref(generateMockData(5000));

    return () => (
      <Splitter
        class="h-full"
        dt={{
          background: "transparent",
          border: {
            color: "transparent",
          },
        }}
      >
        <SplitterPanel size={20} minSize={20} class="pr-4">
          <Block class="h-full p-0">
            <ProTree
              nodes={[
                {
                  key: "0",
                  label: "Documents",
                  data: "Documents Folder",
                  icon: "pi pi-fw pi-inbox",
                  children: [
                    {
                      key: "0-0",
                      label: "Work",
                      data: "Work Folder",
                      icon: "pi pi-fw pi-cog",
                      children: [
                        {
                          key: "0-0-0",
                          label: "Expenses.doc",
                          icon: "pi pi-fw pi-file",
                          data: "Expenses Document",
                        },
                        {
                          key: "0-0-1",
                          label: "Resume.doc",
                          icon: "pi pi-fw pi-file",
                          data: "Resume Document",
                        },
                      ],
                    },
                    {
                      key: "0-1",
                      label: "Home",
                      data: "Home Folder",
                      icon: "pi pi-fw pi-home",
                      children: [
                        {
                          key: "0-1-0",
                          label: "Invoices.txt",
                          icon: "pi pi-fw pi-file",
                          data: "Invoices for this month",
                        },
                      ],
                    },
                  ],
                },
              ]}
              onSelected={(node) => {
                console.log(node);
              }}
              tools={() => [<Button size="small" key="12" label="新增" text />]}
            />
          </Block>
        </SplitterPanel>
        <SplitterPanel
          class="overflow-y-auto h-full rounded-border gap-4 flex flex-col pl-4"
          size={75}
          minSize={75}
        >
          <Block class="flex-shrink-0">
            <ProSearch
              schema={formSchema}
              defaultValues={{
                name: "123",
                demo: "123",
                demo1: "123",
                demo2: "123",
                state: "backlog",
                status: ["backlog", "todo"],
              }}
              onSubmit={(values: Record<string, any>) => {
                console.log(values);
              }}
            />
          </Block>

          <Block>
            <ProTable
              title="任务列表"
              columns={columns}
              dataSource={dataSource.value}
              toolbar={() => [<Button key="add" label="新增" size="small" />]}
              onExport={() => {
                exportExcel(columns, dataSource.value, "任务列表");
              }}
              onChangePage={(e) => {
                console.log(e);
              }}
            />
          </Block>
        </SplitterPanel>
      </Splitter>
    );
  },
});
