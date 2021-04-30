import { Dashboard } from '@material-ui/icons'
import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const DashboardLayout = () => {

    const navigate = useNavigate()

    React.useEffect(()=>{
        if(!localStorage.getItem('token')) navigate('/login')
    }, [navigate])

    return(
        <div>
            Dashboard
        </div>
    )
}

export default DashboardLayout;