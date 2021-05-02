import React from 'react';
import MUIDataTable, { DisplayData, MUIDataTableColumn, MUIDataTableOptions } from 'mui-datatables';
import { FilterObj, PaginationData } from 'src/types/paginate';
import { Button } from '@material-ui/core';
import { rowsDeleted, SelectedRows } from 'src/types/dataTable';

interface Props<T = any> {
  title?: string,
  selectableRows?: "none" | "multiple" | "single" | undefined,
  list: T[],
  onClick?(obj: T): void,
  serverSide?: boolean,
  download?: boolean,
  filter?: boolean,
  viewColumns?: boolean,
  count?: number
  getData?(params: PaginationData<T>): void,
  tableColumns: MUIDataTableColumn[]
  customToolbarSelect?(selectedRows: SelectedRows, displayData: DisplayData, setSelectedRows: (rows: number[]) => void): any
  customToolbar?(data: { displayData: DisplayData }): any
  onRowsDelete?(data: rowsDeleted): any
}

const DataTable: React.FC<Props> = ({ title = '', download = true, filter = true, viewColumns = true, selectableRows = 'none', list, onClick, serverSide = false, tableColumns, onRowsDelete, count = 0, getData, customToolbarSelect, customToolbar }) => {

  const [state, setState] = React.useState<{ page: number, rowsPerPage: number, sort: string | undefined, order: string | undefined, filter: typeof list[number] }>({
    page: 0,
    rowsPerPage: 10,
    sort: undefined,
    order: undefined,
    filter: {}
  })

  const handleClick = React.useCallback((rowData, rowMeta) => {
    if (onClick) onClick(list[rowMeta.dataIndex].id)
  }, [onClick, list])

  React.useEffect(() => {
    if (getData) {
      getData({
        skip: state.page * state.rowsPerPage,
        limit: state.rowsPerPage,
        sort: state.sort,
        order: state.order,
        filter: state.filter
      })
    }
  }, [getData, state])

  const applyFilters = (applyNewFilters?: () => string[][]) => {
    const filter: FilterObj = {}
    if (applyNewFilters) {
      const newFilter: string[][] = applyNewFilters()
      tableColumns.forEach((column: MUIDataTableColumn, i: number) => {
        if (newFilter[i][0]) filter[column.name] = newFilter[i][0]
      })
    }
    setState((s) => ({ ...s, filter }))
  }

  const options: MUIDataTableOptions = {
    filterType: 'textField',
    responsive: 'simple',
    search: false,
    print: false,
    download: download,
    filter: filter,
    viewColumns: viewColumns,
    selectableRows,
    draggableColumns: { enabled: true, transitionTime: 100 },
    onRowClick: handleClick,
    serverSide: serverSide,
    count: count,
    confirmFilters: true,
    onRowsDelete,
    customFilterDialogFooter: (_filterList, applyNewFilters) => {
      return (
        <div style={{ marginTop: '40px' }}>
          <Button variant="contained" color="primary" onClick={() => applyFilters(applyNewFilters)} >Apply Filters</Button>
        </div>
      )
    },
    onTableChange: (action, tableState) => {
      const actions: string[] = ['changePage', 'sort', 'changeRowsPerPage']
      if (actions.indexOf(action) > -1) {
        setState((s) => ({ ...s, page: tableState.page, rowsPerPage: tableState.rowsPerPage, sort: tableState.sortOrder.name, order: tableState.sortOrder.direction }))
      }
    },
    onFilterChipClose: (index: number) => {
      setState((s) => ({ ...s, filter: { ...s.filter, [tableColumns[index].name]: undefined } }))
    },
    customToolbarSelect,
    selectableRowsHeader: false,
    customToolbar
  }

  return (
    <MUIDataTable
      title={title}
      data={list || []}
      columns={tableColumns}
      options={options}
    />
  )
}

export default DataTable
