import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { priceTypeCodes } from '../config/finnhubConfig';
import { ButtonGroup } from '@mui/material';

export default function SelectPriceType(props) {
    
    const [currentPrice, setCurrentPrice] = React.useState(props.priceType);
    
    function handleClick(selectedPrice) {
        setCurrentPrice(selectedPrice);
        props.setPriceType(selectedPrice);
    }

    return (
        <div>
            <Stack spacing={2} direction="row">
                <ButtonGroup orientation='vertical'>
                {priceTypeCodes.map((priceSettings) => 
                    <Button
                        key={`${priceSettings.priceCode}-button`}
                        variant='contained'
                        onClick={() => handleClick(priceSettings.priceCode)}
                        color={currentPrice === priceSettings.priceCode ? 'success' : 'error'
                    }>{priceSettings.displayName}</Button>)}
                </ButtonGroup>
            </Stack>
        </div>
    )
}
