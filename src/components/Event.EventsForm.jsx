import { FormikProvider, FieldArray } from "formik";
import {
  Button,
  Grid,
  TextField,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EventForm from "./EventForm";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { newEvent } from "../initialDataValues";
import { useState } from "react";

const EventEventsForm = ({
  formik,
  epIdx,
  data,
  setData,
  handleEventDataChange,
}) => {
  const [eventAccordian, setEventAccordian] = useState(false);
  const handleAccordianExpansion = (panel) => (e, expanded) => {
    setEventAccordian(expanded ? panel : false);
  };

  const epID = formik.values.eventData.episodes[epIdx];
  const epEvents = formik.values.eventData[epID].events;

  const addNewEvent = () => {
    setData((prev) => {
      const key = uuidv4();
      let newData = { ...prev };
      let newEpEvents = [...prev.eventData[epID].events];
      const newEventData = { ...newEvent };
      newEventData.key = key;
      newEpEvents.push(newEventData);
      newData.eventData[epID].events = newEpEvents;
      setEventAccordian(`ev${newEpEvents.length - 1}`);
      // console.log(newData);
      return newData;
    });
  };

  const removeEpisode = (index) => {
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

  const updateEpisodeID = (e) => {
    const index = e.target.id.split("[")[1].split("]")[0];
    const changeEvent = { ...e };
    setData((prev) => {
      if (changeEvent.target.value == "") {
        changeEvent.target.value = "0";
      }
      let oldepID = prev.eventData.episodes[index];
      let newData = { ...prev };
      let episodeData = {
        ...newData.eventData[newData.eventData.episodes[index]],
      };
      let newEpisodes = [...prev.eventData.episodes];
      newEpisodes[index] = e.target.value;
      newData.eventData.episodes = newEpisodes;
      newData.eventData[e.target.value] = episodeData;
      delete newData.eventData[oldepID];
      return newData;
    });
    formik.handleChange(e);
  };

  return (
    <FormikProvider value={formik}>
      <Grid container>
        {data.gameData.episodic && (
          <Grid item xs={6}>
            <TextField
              fullWidth
              id={`data.eventData.episodes[${epIdx}]`}
              name={`data.eventData.episodes[${epIdx}]`}
              value={formik.values.eventData.episodes[epIdx]}
              onChange={updateEpisodeID}
              label="Episode ID"
            />
          </Grid>
        )}
      </Grid>
      <FieldArray name={`eventData.events[${epID}]`}>
        {() => {
          return (
            <Grid container>
              <Grid item xs={12} />
              {epEvents.length > 0 && (
                <Grid
                  item
                  xs={12}
                  sx={{ border: "1px solid white", marginTop: "10px" }}
                >
                  {epEvents.map((event, eventidx) => (
                    <Accordion
                      key={event.key}
                      expanded={eventAccordian === `ev${eventidx}`}
                      onChange={handleAccordianExpansion(`ev${eventidx}`)}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        id={`ep${eventidx}`}
                      >
                        <Typography sx={{ width: "66%", flexShrink: 0 }}>
                          {event.key}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <EventForm
                          event={event}
                          key={event.key}
                          eventID={eventidx}
                          formik={formik}
                          data={data}
                          setData={setData}
                          epID={epID}
                          handleEventDataChange={handleEventDataChange}
                        />
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Grid>
              )}
              <Grid item xs={3}>
                <Button
                  variant="outlined"
                  onClick={addNewEvent}
                  sx={{ marginTop: "10px" }}
                >
                  Add Event
                </Button>
              </Grid>

              <Grid item xs={6}>
                <></>
              </Grid>
              <Grid
                item
                xs={3}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                {data.eventData.episodes.length > 1 ? (
                  <Button
                    color="error"
                    variant="outlined"
                    onClick={() => removeEpisode(epIdx)}
                    sx={{ marginTop: "10px" }}
                  >
                    Delete Episode
                  </Button>
                ) : (
                  <></>
                )}
              </Grid>
            </Grid>
          );
        }}
      </FieldArray>
    </FormikProvider>
  );
};

EventEventsForm.propTypes = {
  formik: PropTypes.object.isRequired,
  epIdx: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  handleEventDataChange: PropTypes.func.isRequired,
};

export default EventEventsForm;
