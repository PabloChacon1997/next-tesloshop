import React, { FC } from 'react'
import { PropsWithChildren } from 'react';

import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'


interface Props {
  title: string | number;
  subTitle: string;
  icon: JSX.Element;
}

export const SummaryTile: FC<PropsWithChildren<Props>> = ({ title,subTitle, icon }) => {
  return (
    <Grid item xs={12} sm={4} md={3}>
      <Card sx={{ display: 'flex' }}>  
        <CardContent 
          sx={{ width: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          {/* <CreditCardOutlined color='secondary' sx={{ fontSize: 40 }}/> */}
          {icon}
        </CardContent>
        <CardContent sx={{ flex: '1 0 auto' , display: 'flex', flexDirection: 'column'}}>
          <Typography variant="h3">{ title }</Typography>
          <Typography variant="caption">{ subTitle }</Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}
