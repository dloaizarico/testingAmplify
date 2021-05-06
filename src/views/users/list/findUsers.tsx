import React, { useState } from 'react'
import clsx from 'clsx'
import PerfectScrollbar from 'react-perfect-scrollbar'
import Datatable from 'src/components/datatable'
import { Box, Card, IconButton, Tooltip } from '@material-ui/core'
import tableColumns from './tableColumns'
import { updateUser } from 'src/graphql/mutations'
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import IUser, { GetUsersQuery } from 'src/types/user'
import { useNavigate } from 'react-router-dom'
import Paginate, { PaginationData } from 'src/types/paginate'
import { Block } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import { SelectedRowsData, SelectedRows } from 'src/types/dataTable'
import { listUsers } from 'src/graphql/queries'

const useStyles = makeStyles(() => ({
  toolbarText: {
    fontSize: '.8rem',
    paddingLeft: '5px'
  }
}))

const FindUsers: React.FC<{ className: string }> = ({ className, ...rest }) => {

  const [userData, setUserData] = React.useState<Paginate<IUser[]>>({ data: [], count: 0 })
  const classes = useStyles()
  const navigate = useNavigate()

  const handleClick = (id: string) => navigate(id)

  const getData = React.useCallback(async (params: PaginationData<IUser>) => {

    try {
      const users = await API.graphql(graphqlOperation(listUsers)) as {
        data: GetUsersQuery
      }
      const userList: IUser[] = users.data.listUsers.items
      const dataObject: Paginate<IUser[]> = {
        data: userList,
        count: userList.length
      }
      setUserData(dataObject);
    } catch (error) {
      console.log('error on fetching users', error);
    }
  }, [])

  const customActionSelect = (selectedRows: SelectedRows) => {
    return (
      <Tooltip title={"Deactivate users"}>
        <IconButton onClick={() => handleDeactivateUsers(selectedRows)} >
          <Block /> <span className={classes.toolbarText}>Deactivate Users</span>
        </IconButton>
      </Tooltip>
    )
  }

  const handleDeactivateUsers = (deactivatedRows: SelectedRows) => {
    const idList: string[] = deactivatedRows.data.map((row: SelectedRowsData) => userData.data[row.dataIndex].id)
    try {
      await API.graphql(graphqlOperation(updateUser, {
        input: {
          status: false
        },
        condition: {
          // id in idList

        }

      }))
    }
    catch (error) {
      console.log('error on fetching users', error);
    }
  }


    return (
      <Card className={clsx(className)} {...rest} >
        <PerfectScrollbar>
          <Box minWidth={1050}>
            <Datatable
              list={userData.data}
              count={userData.count}
              onClick={handleClick}
              tableColumns={tableColumns}
              getData={getData}
              selectableRows='multiple'
              serverSide
              customToolbarSelect={customActionSelect}
            />
          </Box>
        </PerfectScrollbar>
      </Card>
    )


  }
  export default FindUsers
