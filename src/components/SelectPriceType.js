import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { priceTypeCodes } from '../config/finnhubConfig';

export default function SelectPriceType(props) {
    
    const [currentPrice, setCurrentPrice] = React.useState(props.priceType);
    
    function handleClick(selectedPrice) {
        setCurrentPrice(selectedPrice);
        props.setPriceType(selectedPrice);
    }

    return (
        <div>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                {priceTypeCodes.map((priceSettings) => 
                    <Button
                        key={`${priceSettings.priceCode}-button`}
                        variant='contained'
                        onClick={() => handleClick(priceSettings.priceCode)}
                        sx={{
                            width: '70%',
                            backgroundColor: currentPrice === priceSettings.priceCode ? "#32a852": '#3287a8',
                            ':hover': {
                                bgcolor: '#1a4759',
                                color: 'white',
                            },
                        }}
                    >{priceSettings.displayName}</Button>)
                }
            </Stack>
        </div>
    )
}
