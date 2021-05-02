import { MUIDataTableColumn } from "mui-datatables"
import userTypeEnum from "src/enum/userTypeEnum";
import { getEnumValue } from "src/helpers/enumHelper";

const tableColumns: MUIDataTableColumn[] = [
   {
    label: 'Name',
    name: 'name'
  }, {
    label: 'Email',
    name: 'email'
  }, {
    label: 'Phone Number',
    name: 'phoneNumber'
  }, 
  {
    label: 'Role',
    name: 'type',
    options: {
      customBodyRender: (value: string) => getEnumValue(value, userTypeEnum)
    }
  }, {
    label: 'Status',
    name: 'isActive',
    options: {
      customBodyRender: (value: boolean) => value ? 'Active' : 'Not Active'
    }
  }
];

export default tableColumns