import { FormikProvider } from "formik";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";

const EventPreReq = ({
  preReq,
  prindex,
  formik,
  handleEventDataChange,
  epID,
  eventID,
  setData,
}) => {
  // console.log({ epID, eventID, prindex });
  // console.log(formik.values.eventData[epID].events[eventID].preReqs[prindex]);
  const path = `eventData[${epID}].events[${eventID}].preReqs[${prindex}]`;

  const removePreReq = (index) => {
    console.log(index);
    setData((prev) => {
      let newData = { ...prev };
      let newEpisodes = [...prev.eventData.episodes];
      let key = newEpisodes.splice(index, 1);
      delete newData.eventData[key];
      newData.eventData.episodes = newEpisodes;
      return newData;
    });
  };
  return (
    <FormikProvider value={formik}>
      <Grid key={preReq.key} item container spacing={1} xs={12}>
        <Grid item xs={5}>
          <TextField
            fullWidth
            id={`${path}.flag`}
            name={`${path}.flag`}
            label="Variable"
            value={
              formik.values.eventData[epID].events[eventID].preReqs[prindex]
                .flag
            }
            onChange={handleEventDataChange}
          />
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              id={`${path}.operation`}
              name={`${path}.operation`}
              value={
                formik.values.eventData[epID].events[eventID].preReqs[prindex]
                  .operation
              }
              onChange={handleEventDataChange}
            >
              <MenuItem value={"teq"}>= (String)</MenuItem>
              <MenuItem value={"neq"}>= (Number)</MenuItem>
              <MenuItem value={"gt"}>&gt;</MenuItem>
              <MenuItem value={"gteq"}>&gt;=</MenuItem>
              <MenuItem value={"lt"}>&lt;</MenuItem>
              <MenuItem value={"lteq"}>&lt;=</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            id={`${path}.value`}
            name={`${path}.value`}
            label="Value"
            value={
              formik.values.eventData[epID].events[eventID].preReqs[prindex]
                .value
            }
            onChange={handleEventDataChange}
          />
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Button
            color="error"
            variant="outlined"
            onClick={() => removePreReq(prindex)}
          >
            x
          </Button>
        </Grid>
      </Grid>
    </FormikProvider>
  );
};

EventPreReq.propTypes = {
  preReq: PropTypes.object,
  prindex: PropTypes.number,
  formik: PropTypes.object,
  handleEventDataChange: PropTypes.func,
  epID: PropTypes.string,
  eventID: PropTypes.number,
  setData: PropTypes.func,
};

export default EventPreReq;
