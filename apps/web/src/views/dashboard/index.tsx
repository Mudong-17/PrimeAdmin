import { defineComponent } from "vue";
import { ProTable } from "@prime-admin/pro-table";
import type { Column } from "@prime-admin/pro-table";
import { Button } from "primevue";

export default defineComponent({
  name: "Dashboard",
  setup() {
    const columns: Column[] = [
      {
        key: "select",
      },
      {
        key: "id",
        title: "任务编号",
        sorting: true,
      },
      {
        key: "title",
        title: "标题",
        filter: { type: "text" },
      },
      {
        key: "status",
        title: "状态",
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
        sorting: true,
      },
      {
        key: "actions",
        title: "操作",
        cell: ({ row }) => {
          return (
            <Button
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

    return () => (
      <div class="p-4 bg-white overflow-y-auto h-full rounded-border">
        <ProTable
          columns={columns}
          toolbar={() => [
            <Button key="add" label="新增" size="small" />,
            <Button key="export" label="导出" severity="info" size="small" />,
          ]}
        />
      </div>
    );
  },
});
