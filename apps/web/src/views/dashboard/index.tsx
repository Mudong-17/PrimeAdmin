import { defineComponent, ref } from "vue";
import { exportExcel, ProTable } from "@prime-admin/pro-table";
import { ProSearch } from "@prime-admin/pro-form";
import type { Column } from "@prime-admin/pro-table";
import { Button, Splitter, SplitterPanel } from "primevue";
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
        export: false,
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
      {
        id: 1,
        title:
          "任务1任务1任务1任务1任务1任务1任务1任务1任务1任务1任务1任务1任务1任务1任务1任务1任务1任务1任务1任务1任务1任务1任务1任务1任务1任务1任务1任务1任务1任务1任务1任务1任务1任务1任务1任务1任务1任务1任务1任务1任务1任务1任务1任务1",
        status: "backlog",
      },
      { id: 2, title: "任务2", status: "todo" },
      { id: 3, title: "任务3", status: "in progress" },
      { id: 4, title: "任务4", status: "done" },
      { id: 5, title: "任务5", status: "canceled" },
      { id: 6, title: "任务6", status: "backlog" },
      { id: 7, title: "任务7", status: "todo" },
      { id: 8, title: "任务8", status: "in progress" },
      { id: 9, title: "任务9", status: "done" },
      { id: 10, title: "任务10", status: "canceled" },
      { id: 11, title: "任务11", status: "backlog" },
      { id: 12, title: "任务12", status: "todo" },
      { id: 13, title: "任务13", status: "in progress" },
      { id: 14, title: "任务14", status: "done" },
      { id: 15, title: "任务15", status: "canceled" },
      { id: 16, title: "任务16", status: "backlog" },
      { id: 17, title: "任务17", status: "todo" },
      { id: 18, title: "任务18", status: "in progress" },
      { id: 19, title: "任务19", status: "done" },
      { id: 20, title: "任务20", status: "canceled" },
      { id: 1, title: "任务1", status: "backlog" },
      { id: 2, title: "任务2", status: "todo" },
      { id: 3, title: "任务3", status: "in progress" },
      { id: 4, title: "任务4", status: "done" },
      { id: 5, title: "任务5", status: "canceled" },
      { id: 6, title: "任务6", status: "backlog" },
      { id: 7, title: "任务7", status: "todo" },
      { id: 8, title: "任务8", status: "in progress" },
      { id: 9, title: "任务9", status: "done" },
      { id: 10, title: "任务10", status: "canceled" },
      { id: 11, title: "任务11", status: "backlog" },
      { id: 12, title: "任务12", status: "todo" },
      { id: 13, title: "任务13", status: "in progress" },
      { id: 14, title: "任务14", status: "done" },
      { id: 15, title: "任务15", status: "canceled" },
      { id: 16, title: "任务16", status: "backlog" },
      { id: 17, title: "任务17", status: "todo" },
      { id: 18, title: "任务18", status: "in progress" },
      { id: 19, title: "任务19", status: "done" },
      { id: 20, title: "任务20", status: "canceled" },
      { id: 1, title: "任务1", status: "backlog" },
      { id: 2, title: "任务2", status: "todo" },
      { id: 3, title: "任务3", status: "in progress" },
      { id: 4, title: "任务4", status: "done" },
      { id: 5, title: "任务5", status: "canceled" },
      { id: 6, title: "任务6", status: "backlog" },
      { id: 7, title: "任务7", status: "todo" },
      { id: 8, title: "任务8", status: "in progress" },
      { id: 9, title: "任务9", status: "done" },
      { id: 10, title: "任务10", status: "canceled" },
      { id: 11, title: "任务11", status: "backlog" },
      { id: 12, title: "任务12", status: "todo" },
      { id: 13, title: "任务13", status: "in progress" },
      { id: 14, title: "任务14", status: "done" },
      { id: 15, title: "任务15", status: "canceled" },
      { id: 16, title: "任务16", status: "backlog" },
      { id: 17, title: "任务17", status: "todo" },
      { id: 18, title: "任务18", status: "in progress" },
      { id: 19, title: "任务19", status: "done" },
      { id: 20, title: "任务20", status: "canceled" },
      { id: 1, title: "任务1", status: "backlog" },
      { id: 2, title: "任务2", status: "todo" },
      { id: 3, title: "任务3", status: "in progress" },
      { id: 4, title: "任务4", status: "done" },
      { id: 5, title: "任务5", status: "canceled" },
      { id: 6, title: "任务6", status: "backlog" },
      { id: 7, title: "任务7", status: "todo" },
      { id: 8, title: "任务8", status: "in progress" },
      { id: 9, title: "任务9", status: "done" },
      { id: 10, title: "任务10", status: "canceled" },
      { id: 11, title: "任务11", status: "backlog" },
      { id: 12, title: "任务12", status: "todo" },
      { id: 13, title: "任务13", status: "in progress" },
      { id: 14, title: "任务14", status: "done" },
      { id: 15, title: "任务15", status: "canceled" },
      { id: 16, title: "任务16", status: "backlog" },
      { id: 17, title: "任务17", status: "todo" },
      { id: 18, title: "任务18", status: "in progress" },
      { id: 19, title: "任务19", status: "done" },
      { id: 20, title: "任务20", status: "canceled" },
      { id: 1, title: "任务1", status: "backlog" },
      { id: 2, title: "任务2", status: "todo" },
      { id: 3, title: "任务3", status: "in progress" },
      { id: 4, title: "任务4", status: "done" },
      { id: 5, title: "任务5", status: "canceled" },
      { id: 6, title: "任务6", status: "backlog" },
      { id: 7, title: "任务7", status: "todo" },
      { id: 8, title: "任务8", status: "in progress" },
      { id: 9, title: "任务9", status: "done" },
      { id: 10, title: "任务10", status: "canceled" },
      { id: 11, title: "任务11", status: "backlog" },
      { id: 12, title: "任务12", status: "todo" },
      { id: 13, title: "任务13", status: "in progress" },
      { id: 14, title: "任务14", status: "done" },
      { id: 15, title: "任务15", status: "canceled" },
      { id: 16, title: "任务16", status: "backlog" },
      { id: 17, title: "任务17", status: "todo" },
      { id: 18, title: "任务18", status: "in progress" },
      { id: 19, title: "任务19", status: "done" },
      { id: 20, title: "任务20", status: "canceled" },
      { id: 1, title: "任务1", status: "backlog" },
      { id: 2, title: "任务2", status: "todo" },
      { id: 3, title: "任务3", status: "in progress" },
      { id: 4, title: "任务4", status: "done" },
      { id: 5, title: "任务5", status: "canceled" },
      { id: 6, title: "任务6", status: "backlog" },
      { id: 7, title: "任务7", status: "todo" },
      { id: 8, title: "任务8", status: "in progress" },
      { id: 9, title: "任务9", status: "done" },
      { id: 10, title: "任务10", status: "canceled" },
      { id: 11, title: "任务11", status: "backlog" },
      { id: 12, title: "任务12", status: "todo" },
      { id: 13, title: "任务13", status: "in progress" },
      { id: 14, title: "任务14", status: "done" },
      { id: 15, title: "任务15", status: "canceled" },
      { id: 16, title: "任务16", status: "backlog" },
      { id: 17, title: "任务17", status: "todo" },
      { id: 18, title: "任务18", status: "in progress" },
      { id: 19, title: "任务19", status: "done" },
      { id: 20, title: "任务20", status: "canceled" },
      { id: 1, title: "任务1", status: "backlog" },
      { id: 2, title: "任务2", status: "todo" },
      { id: 3, title: "任务3", status: "in progress" },
      { id: 4, title: "任务4", status: "done" },
      { id: 5, title: "任务5", status: "canceled" },
      { id: 6, title: "任务6", status: "backlog" },
      { id: 7, title: "任务7", status: "todo" },
      { id: 8, title: "任务8", status: "in progress" },
      { id: 9, title: "任务9", status: "done" },
      { id: 10, title: "任务10", status: "canceled" },
      { id: 11, title: "任务11", status: "backlog" },
      { id: 12, title: "任务12", status: "todo" },
      { id: 13, title: "任务13", status: "in progress" },
      { id: 14, title: "任务14", status: "done" },
      { id: 15, title: "任务15", status: "canceled" },
      { id: 16, title: "任务16", status: "backlog" },
      { id: 17, title: "任务17", status: "todo" },
      { id: 18, title: "任务18", status: "in progress" },
      { id: 19, title: "任务19", status: "done" },
      { id: 20, title: "任务20", status: "canceled" },
      { id: 1, title: "任务1", status: "backlog" },
      { id: 2, title: "任务2", status: "todo" },
      { id: 3, title: "任务3", status: "in progress" },
      { id: 4, title: "任务4", status: "done" },
      { id: 5, title: "任务5", status: "canceled" },
      { id: 6, title: "任务6", status: "backlog" },
      { id: 7, title: "任务7", status: "todo" },
      { id: 8, title: "任务8", status: "in progress" },
      { id: 9, title: "任务9", status: "done" },
      { id: 10, title: "任务10", status: "canceled" },
      { id: 11, title: "任务11", status: "backlog" },
      { id: 12, title: "任务12", status: "todo" },
      { id: 13, title: "任务13", status: "in progress" },
      { id: 14, title: "任务14", status: "done" },
      { id: 15, title: "任务15", status: "canceled" },
      { id: 16, title: "任务16", status: "backlog" },
      { id: 17, title: "任务17", status: "todo" },
      { id: 18, title: "任务18", status: "in progress" },
      { id: 19, title: "任务19", status: "done" },
      { id: 20, title: "任务20", status: "canceled" },
      { id: 1, title: "任务1", status: "backlog" },
      { id: 2, title: "任务2", status: "todo" },
      { id: 3, title: "任务3", status: "in progress" },
      { id: 4, title: "任务4", status: "done" },
      { id: 5, title: "任务5", status: "canceled" },
      { id: 6, title: "任务6", status: "backlog" },
      { id: 7, title: "任务7", status: "todo" },
      { id: 8, title: "任务8", status: "in progress" },
      { id: 9, title: "任务9", status: "done" },
      { id: 10, title: "任务10", status: "canceled" },
      { id: 11, title: "任务11", status: "backlog" },
      { id: 12, title: "任务12", status: "todo" },
      { id: 13, title: "任务13", status: "in progress" },
      { id: 14, title: "任务14", status: "done" },
      { id: 15, title: "任务15", status: "canceled" },
      { id: 16, title: "任务16", status: "backlog" },
      { id: 17, title: "任务17", status: "todo" },
      { id: 18, title: "任务18", status: "in progress" },
      { id: 19, title: "任务19", status: "done" },
      { id: 20, title: "任务20", status: "canceled" },
      { id: 1, title: "任务1", status: "backlog" },
      { id: 2, title: "任务2", status: "todo" },
      { id: 3, title: "任务3", status: "in progress" },
      { id: 4, title: "任务4", status: "done" },
      { id: 5, title: "任务5", status: "canceled" },
      { id: 6, title: "任务6", status: "backlog" },
      { id: 7, title: "任务7", status: "todo" },
      { id: 8, title: "任务8", status: "in progress" },
      { id: 9, title: "任务9", status: "done" },
      { id: 10, title: "任务10", status: "canceled" },
      { id: 11, title: "任务11", status: "backlog" },
      { id: 12, title: "任务12", status: "todo" },
      { id: 13, title: "任务13", status: "in progress" },
      { id: 14, title: "任务14", status: "done" },
      {
        id: 15,
        title:
          "任务15任务15任务15任务15任务15任务15任务15任务15任务15任务15任务15任务15任务15任务15",
        status: "canceled",
      },
      { id: 16, title: "任务16", status: "backlog" },
      { id: 17, title: "任务17", status: "todo" },
      { id: 18, title: "任务18", status: "in progress" },
      { id: 19, title: "任务19", status: "done" },
      { id: 20, title: "任务20", status: "canceled" },
      { id: 1, title: "任务1", status: "backlog" },
      { id: 2, title: "任务2", status: "todo" },
      { id: 3, title: "任务3", status: "in progress" },
      { id: 4, title: "任务4", status: "done" },
      { id: 5, title: "任务5", status: "canceled" },
      { id: 6, title: "任务6", status: "backlog" },
      { id: 7, title: "任务7", status: "todo" },
      { id: 8, title: "任务8", status: "in progress" },
      { id: 9, title: "任务9", status: "done" },
      { id: 10, title: "任务10", status: "canceled" },
      { id: 11, title: "任务11", status: "backlog" },
      { id: 12, title: "任务12", status: "todo" },
      { id: 13, title: "任务13", status: "in progress" },
      { id: 14, title: "任务14", status: "done" },
      { id: 15, title: "任务15", status: "canceled" },
      { id: 16, title: "任务16", status: "backlog" },
      { id: 17, title: "任务17", status: "todo" },
      { id: 18, title: "任务18", status: "in progress" },
      { id: 19, title: "任务19", status: "done" },
      { id: 20, title: "任务20", status: "canceled" },
    ]);

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
        <SplitterPanel size={15} minSize={15} class="pr-4">
          <Block class="h-full">
            <h1>123</h1>
          </Block>
        </SplitterPanel>
        <SplitterPanel
          class="overflow-y-auto h-full rounded-border gap-4 flex flex-col pl-4"
          size={85}
          minSize={70}
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

      // <div class="overflow-y-auto h-full rounded-border gap-4 flex flex-col">

      // </div>
    );
  },
});
