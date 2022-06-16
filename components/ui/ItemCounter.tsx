import AddCircleOutline from "@mui/icons-material/AddCircleOutline"
import RemoveCircleOutline from "@mui/icons-material/RemoveCircleOutline"
import { Box, IconButton, Typography } from "@mui/material"
import { FC } from "react"

interface Props{

}


export const ItemCounter:FC<Props> = () => {
  return (
    <Box display='flex' alignItems="center">
      <IconButton>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }}>1</Typography>
      <IconButton>
        <AddCircleOutline />
      </IconButton>
    </Box>
  )
}
