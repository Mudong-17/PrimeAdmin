import { defineComponent } from "vue";
import { ProTable } from "@prime-admin/pro-table";

export default defineComponent({
  name: "Dashboard",
  setup() {
    return () => <ProTable />;
  },
});
