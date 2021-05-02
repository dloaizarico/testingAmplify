export type SelectedRows = {
    data: SelectedRowsData[],
    lookup: {
      [key: number]: boolean;
    },
  }
  
  export type SelectedRowsData = {
    index: number;
    dataIndex: number;
  }
  
  export type rowsDeleted = {
    lookup: { [dataIndex: number]: boolean };
    data: Array<{ index: number; dataIndex: number }>;
  }