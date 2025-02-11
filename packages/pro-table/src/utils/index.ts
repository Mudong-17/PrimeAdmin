import ExcelJS from "exceljs";

const autoWidth = (worksheet: any, minimalWidth = 10) => {
  for (const column of worksheet.columns) {
    let maxColumnLength = 0;
    column.eachCell({ includeEmpty: true }, (cell: any) => {
      maxColumnLength = Math.max(
        maxColumnLength,
        minimalWidth,
        cell.value ? cell.value.toString().length : 0
      );
    });
    column.width = maxColumnLength + 2;
  }
};

export const exportExcel = (columns: any[], data: any[], filename: string) => {
  const workbook = new ExcelJS.Workbook();
  workbook.created = new Date();
  workbook.modified = new Date();
  const worksheet = workbook.addWorksheet("Sheet 1"); // 创建一个工作表

  // 设置列 去除type=selection、export=false,key=actions的列，将title转为header
  worksheet.columns = columns
    .filter((column) => {
      // 基础过滤条件
      if (column.key === "select" || column.key === "actions") {
        return false;
      }
      if (column.export === false) {
        return false;
      }
      return true;
    })
    .map((column) => ({
      header: column.title,
      key: column.key,
    }));

  autoWidth(worksheet);

  worksheet.addRows(data); // 添加数据

  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.xlsx`;
    link.click(); // 模拟点击下载文件
  });
};
