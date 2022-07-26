import { FC } from 'react';

import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutline from "@mui/icons-material/RemoveCircleOutline";

import IconButton from "@mui/material/IconButton";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface Props{
  currentValue: number;
  updatedQuantity: (updateValue: number) => void;
  maxValue: number;
}


export const ItemCounter:FC<Props> = ({currentValue, updatedQuantity, maxValue}) => {


  const addOrRemove = (value: number) => {
    if (value === -1) {
      if(currentValue === 1) return;
      return updatedQuantity(currentValue -1);
    }

    if(currentValue >= maxValue) return;
     updatedQuantity(currentValue +1);

  }


  return (
    <Box display='flex' alignItems="center">
      <IconButton
        onClick={() => addOrRemove(-1)}
      >
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }}>{ currentValue }</Typography>
      <IconButton
        onClick={() => addOrRemove(+1)}
      >
        <AddCircleOutline />
      </IconButton>
    </Box>
  )
}
