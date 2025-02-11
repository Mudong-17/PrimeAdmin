import { defineComponent, ref } from "vue";
import { ProTable } from "@prime-admin/pro-table";
import { ProSearch } from "@prime-admin/pro-form";
import type { Column } from "@prime-admin/pro-table";
import { Button } from "primevue";
import { z } from "zod";
import { Block } from "@/components";

export default defineComponent({
  name: "Dashboard",
  setup() {
    const columns: Column[] = [
      {
        key: "select",
        pin: true,
        size: 80,
      },
      {
        key: "id",
        title: "任务编号",
        sorting: false,
        filter: false,
        size: 120,
      },
      {
        key: "title",
        title: "标题",
        filter: { type: "text" },
        size: 120,
        enableResizing: true,
        pin: "left",
      },
      {
        key: "status",
        title: "状态",
        size: 400,
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
        key: "title1",
        title: "标题",
        size: 400,
        filter: { type: "text" },
      },
      {
        key: "status1",
        title: "状态",
        size: 400,
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
        key: "title2",
        title: "标题",
        size: 400,
        filter: { type: "text" },
      },
      {
        key: "status2",
        title: "状态",
        size: 400,
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
        key: "title3",
        title: "标题",
        size: 400,
        filter: { type: "text" },
      },
      {
        key: "title4",
        title: "标题",
        size: 400,
        filter: { type: "text" },
      },
      {
        key: "title5",
        title: "标题",
        size: 400,
        filter: { type: "text" },
      },
      {
        key: "title6",
        title: "标题",
        size: 400,
        filter: { type: "text" },
      },
      {
        key: "title7",
        title: "标题",
        size: 400,
        filter: { type: "text" },
      },
      {
        key: "actions",
        title: "操作",
        sorting: false,
        size: 400,
        pin: "right",
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

    const dataSource = ref([
      { id: 1, title: "任务1", status: "backlog" },
      { id: 2, title: "任务2", status: "todo" },
      { id: 3, title: "任务3", status: "in progress" },
    ]);

    return () => (
      <div class="overflow-y-auto h-full rounded-border gap-4 flex flex-col">
        <Block>
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
            filter={true}
            toolbar={() => [<Button key="add" label="新增" size="small" />]}
          />
        </Block>
      </div>
    );
  },
});
