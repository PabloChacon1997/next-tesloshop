import { useState, useEffect } from 'react';
import { AdminLayout } from "../../components/layouts"
import useSWR from 'swr';

import PeopleOutline from "@mui/icons-material/PeopleOutline"

import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from "@mui/material/MenuItem"

import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid"

import { IUser } from "../../interfaces"
import { tesloApi } from "../../api";


const UsersPage = () => {

  const { data, error } = useSWR<IUser[]>('/api/admin/users');

  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if(data) {
      setUsers(data);
    }
  }, [data]);
  


  if(!data && !error) return (<></>);

  const onRoleUpdate = async (userId: string, role: string) => {
    
    const previusUsers = users.map(user => ({...user}));

    const updatedUsers = users.map(user => ({
      ...user,
      role: userId === user._id ? role: user.role
    }));

    setUsers(updatedUsers);
    
    try {
      await tesloApi.put('/admin/users', { userId, role });
    } catch (error) {
      setUsers(previusUsers);
      console.log(error);
    }
  }

  const columns: GridColDef[] = [
    { field: 'email', headerName: 'Correo', width: 250 },
    { field: 'name', headerName: 'Nombre compleato', width: 300 },
    { 
      field: 'role',
      headerName: 'Rol',
      width: 300,
      renderCell: ({row}: GridValueGetterParams) => {
        return (
          <Select 
            value={row.role}
            label='Rol'
            onChange={({target}) => onRoleUpdate(row.id, target.value)}
            sx={{width: '300px'}}
          >
            <MenuItem value='admin'>Admin</MenuItem>
            <MenuItem value='super-user'>Super User</MenuItem>
            <MenuItem value='SEO'>SEO</MenuItem>
            <MenuItem value='client'>Client</MenuItem>
          </Select>
        );
      }
    },
  ]

  const rows = users.map( user => ({
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,

  }) )

  return (
    <AdminLayout 
      title={"Usuarios"} 
      subTitle={"Mantenimiento de usuarios"}
      icon={<PeopleOutline />}
    >

      <Grid container className='fadeIn'>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid 
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>

    </AdminLayout>
  )
}

export default UsersPage