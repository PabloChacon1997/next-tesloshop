import { FC } from 'react';
import { ISize } from '../../interfaces';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

interface Props {
  selectedSize?: ISize;
  sizes: ISize[];

  // Methods
  onSelectedSize: (size: ISize) => void;
}


export const SizeSelector:FC<Props> = ({ selectedSize, sizes,onSelectedSize }) => {
  return (
    <Box>
      {
        sizes.map(size => (
          <Button
            key={size}
            size='small'
            onClick={ () => onSelectedSize(size)}
            color={ selectedSize === size ? 'primary': 'info' }
          >
            { size }
          </Button>
        ))
      }
    </Box>
  )
}
