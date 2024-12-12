import { Box, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import './styles/Date.css';

function Date() {
    return (
      <div className="datePicker">
        <Box style={{ padding: "20px" }}>
          <Typography variant="h5" color="black" style={{ padding: "10px" }}>
            {" "}
            Selecione uma data:{" "}
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Select Date" />
          </LocalizationProvider>
        </Box>
      </div>
    );
}

export default Date;