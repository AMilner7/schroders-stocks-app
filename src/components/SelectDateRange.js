import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import DateAdapter from '@mui/lab/AdapterDateFns';
import toast, { Toaster } from 'react-hot-toast';
import {
    dateInFutureMessage,
    invalidEndDateMessage,
    invalidStartDateMessage,
} from '../config/messageConfig';

export default function SelectDateRange(props) {
    /**
     * Validates start date.
     * @param {Date} newDate - User selected date
     */
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

    /**
     * Validates end date.
     * @param {Date} newDate - User selected date
     */
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
                <Stack spacing={3}>
                    <DesktopDatePicker
                        label="Start Date"
                        inputFormat="MM/dd/yyyy"
                        value={props.startDate}
                        onChange={handleStartDate}
                        renderInput={(params) => <TextField {...params} />}
                        id="start-date"
                        InputProps={{ 'data-testid': 'start-date' }}
                    />
                    <DesktopDatePicker
                        label="End Date"
                        inputFormat="MM/dd/yyyy"
                        value={props.endDate}
                        onChange={handleEndDate}
                        renderInput={(params) => <TextField {...params} />}
                        id="end-date"
                        data-testid="end-date"
                    />
                </Stack>
            </LocalizationProvider>
            <Toaster />
        </div>
    );
}
