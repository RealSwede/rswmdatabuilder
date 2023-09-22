import PropTypes from "prop-types";
import { FieldArray, FormikProvider } from "formik";
import { Container, Grid, TextField, Button } from "@mui/material";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { newEventPreReq } from "../initialDataValues";
import EventPreReq from "./EventPreReq";

const EventForm = ({
  formik,
  setData,
  eventID,
  epID,
  handleEventDataChange,
}) => {
  // console.log(formik);
  const addNewPrereq = () => {
    setData((prev) => {
      const key = uuidv4();
      let newData = { ...prev };
      let newEventPrereqs = [...prev.eventData[epID].events[eventID].preReqs];
      let newPreReq = { ...newEventPreReq };
      newPreReq.key = key;
      newEventPrereqs.push(newPreReq);
      _.set(
        newData,
        `eventData[${epID}].events[${eventID}].preReqs`,
        newEventPrereqs,
      );
      return newData;
    });
  };

  const removeEvent = (index) => {
    // console.log(index);
    setData((prev) => {
      let newData = { ...prev };
      let newEvents = [...newData.eventData[epID].events];
      newEvents.splice(index, 1);
      _.set(newData, `eventData[${epID}].events`, newEvents);
      return newData;
    });
  };

  const updateEventID = (e) => {
    const changeEvent = { ...e };
    setData((prev) => {
      if (changeEvent.target.value == "") {
        changeEvent.target.value = "0";
      }
      let oldepID = prev.eventData.episodes[eventID];
      let newData = { ...prev };
      let episodeData = {
        ...newData.eventData[newData.eventData.episodes[eventID]],
      };
      let newEpisodes = [...prev.eventData.episodes];
      newEpisodes[eventID] = e.target.value;
      newData.eventData.episodes = newEpisodes;
      newData.eventData[e.target.value] = episodeData;
      delete newData.eventData[oldepID];
      return newData;
    });
    formik.handleChange(e);
  };

  const handleTagUpdate = (e) => {
    setData((prev) => {
      let newData = { ...prev };
      let tags = e.target.value.split(", ");
      // if (tags[tags.length - 1] == "") {
      //   tags.pop();
      // }
      _.set(newData, e.target.name, tags);
      return newData;
    });
  };

  // console.log(formik.values.eventData[epID].events[eventID].key);

  return (
    <Container>
      <FormikProvider value={formik}>
        <Grid container rowSpacing={2}>
          <Grid item xs={7}>
            <TextField
              fullWidth
              id={`eventData[${epID}].events[${eventID}].key`}
              name={`eventData[${epID}].events[${eventID}].key`}
              value={formik.values.eventData[epID].events[eventID].key}
              onChange={updateEventID}
              label="Episode ID"
            />
          </Grid>
          <Grid item xs={2} />
          <Grid
            item
            xs={3}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Button
              color="error"
              variant="outlined"
              onClick={() => removeEvent(eventID)}
              sx={{ marginTop: "10px" }}
            >
              Delete
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id={`eventData[${epID}].events[${eventID}].tags`}
              name={`eventData[${epID}].events[${eventID}].tags`}
              value={formik.values.eventData[epID].events[eventID].tags.join(
                ", ",
              )}
              onChange={handleTagUpdate}
              label="Tags"
            />
          </Grid>
          <Grid item xs={12}>
            <FieldArray>
              {() => {
                return (
                  <Grid container rowSpacing={1}>
                    {formik.values.eventData[epID].events[eventID].preReqs
                      .length > 0 &&
                      formik.values.eventData[epID].events[eventID].preReqs.map(
                        (preReq, prindex) => (
                          <Grid item xs={12} key={preReq.key}>
                            <EventPreReq
                              epID={epID}
                              eventID={eventID}
                              preReq={preReq}
                              setData={setData}
                              prindex={prindex}
                              formik={formik}
                              handleEventDataChange={handleEventDataChange}
                            />
                          </Grid>
                        ),
                      )}
                  </Grid>
                );
              }}
            </FieldArray>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              onClick={addNewPrereq}
              sx={{ paddingTop: "0px" }}
            >
              Add Prerequisite
            </Button>
          </Grid>
        </Grid>
      </FormikProvider>
    </Container>
  );
};

EventForm.propTypes = {
  formik: PropTypes.object,
  data: PropTypes.object,
  setData: PropTypes.func,
  eventID: PropTypes.number,
  epID: PropTypes.string,
  handleEventDataChange: PropTypes.func,
};

export default EventForm;
