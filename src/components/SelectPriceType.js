import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { priceTypeCodes } from '../config/finnhubConfig';
import { buttonDefaults, green, lightBlue } from '../config/styleConfig';

export default function SelectPriceType(props) {
    const [currentPrice, setCurrentPrice] = useState(props.priceType);

    /**
     * Set the global price type when user selects price.
     * @param {string} selectedPrice - Selected price type
     */
    function handleClick(selectedPrice) {
        setCurrentPrice(selectedPrice);
        props.setPriceType(selectedPrice);
    }

    return (
        <div>
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                {priceTypeCodes.map((priceSettings) => (
                    <Button
                        key={`${priceSettings.priceCode}-button`}
                        variant="contained"
                        onClick={() => handleClick(priceSettings.priceCode)}
                        sx={{
                            width: '70%',
                            ...buttonDefaults,
                            backgroundColor:
                                currentPrice === priceSettings.priceCode ? green : lightBlue,
                        }}
                    >
                        {priceSettings.displayName}
                    </Button>
                ))}
            </Stack>
        </div>
    );
}
