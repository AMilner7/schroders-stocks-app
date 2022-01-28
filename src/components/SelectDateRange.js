import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import DateAdapter from '@mui/lab/AdapterDateFns';
import toast, { Toaster } from 'react-hot-toast';
import { dateInFutureMessage, invalidEndDateMessage, invalidStartDateMessage } from '../config/messageConfig';

export default function DateSelectTile(props) {

    function handleStartDate(newDate) {
        if (newDate > new Date()) {
            toast(dateInFutureMessage);
        } else if (newDate > props.endDate) {
            toast(invalidStartDateMessage);
        } else {
            const startTime = new Date(newDate).getTime();
            props.setStartDate(startTime);
        }
    }

    function handleEndDate(newDate) {
        if (newDate > new Date()) {
            toast(dateInFutureMessage);
        } else if (newDate < props.startDate) {
            toast(invalidEndDateMessage);
        } else {
            const endTime = new Date(newDate).getTime();
            props.setEndDate(endTime);
        }
    }

    return (
        <div>
            <LocalizationProvider dateAdapter={DateAdapter}>
            <Stack spacing={3} width='350'>
                <DesktopDatePicker
                    label="Start Date"
                    inputFormat="MM/dd/yyyy"
                    value={props.startDate}
                    onChange={handleStartDate}
                    renderInput={(params) => <TextField {...params} />}
                />
                <DesktopDatePicker
                    label="End Date"
                    inputFormat="MM/dd/yyyy"
                    value={props.endDate}
                    onChange={handleEndDate}
                    renderInput={(params) => <TextField {...params} />}
                />
            </Stack>
            </LocalizationProvider>
            <Toaster />
        </div>
    );
}
