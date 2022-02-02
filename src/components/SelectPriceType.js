import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { priceTypeCodes } from '../config/finnhubConfig';
import { buttonDefaults, green, lightBlue } from '../config/styleConfig';
import { TextField } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import { movingAvgPrompt } from '../config/displayConfig';
import { mavgCannotBeZeroMessage } from '../config/messageConfig';

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

    /**
     * Set the moving average days.
     * @param {KeyboardEvent} event - User input
     */
    function handleChange(event) {
        if (event.target.value <= 0) {
            toast(mavgCannotBeZeroMessage);
        } else {
            props.setMovingAvgDays(event.target.value);
        }
    }

    return (
        <div>
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                <TextField
                    id="input-mavg"
                    type="number"
                    label={movingAvgPrompt}
                    defaultValue={props.movingAvgDays}
                    variant="outlined"
                    onChange={handleChange}
                    sx={{ width: '70%' }}
                    data-testid="input-mavg"
                />
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
            <Toaster />
        </div>
    );
}
