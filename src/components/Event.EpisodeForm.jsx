import { useState } from "react";
import { FormikProvider, FieldArray } from "formik";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

import EventEventsForm from "./Event.EventsForm";
import { newEpisode } from "../initialDataValues";

const EventEpisodeForm = ({ formik, data, handleEventDataChange, setData }) => {
  const [epExpanded, setEpExpanded] = useState(false);

  const handleAccordianExpansion = (panel) => (e, expanded) => {
    setEpExpanded(expanded ? panel : false);
  };

  const addNewEpisode = () => {
    setData((prev) => {
      const key = uuidv4();
      let newData = { ...prev };
      let newEpisodes = [...prev.eventData.episodes];
      newEpisodes.push(key);
      newData.eventData.episodes = newEpisodes;
      newData.eventData[key] = { ...newEpisode };
      newData.eventData[key].key = key;
      return newData;
    });
  };

  const removeEpisode = (index) => {
    setData((prev) => {
      let newData = { ...prev };
      let newEpisodes = [...prev.eventData.episodes];
      let key = newEpisodes.splice(index, 1);
      newData.eventData[key] = null;
      newData.eventData.episodes = newEpisodes;
      return newData;
    });
  };

  return (
    <FormikProvider value={formik}>
      <FieldArray name="eventData.episodes">
        {() => {
          return (
            <>
              {formik.values.eventData.episodes.length > 0 &&
                formik.values.eventData.episodes.map((episode, epindex) => (
                  <Accordion
                    key={formik.values.eventData[episode].key}
                    expanded={epExpanded === `ep${epindex}`}
                    onChange={handleAccordianExpansion(`ep${epindex}`)}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      id={`ep${epindex}`}
                    >
                      <Typography sx={{ width: "66%", flexShrink: 0 }}>
                        {`${formik.values.eventData.episodes[epindex]}`}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <EventEventsForm
                        formik={formik}
                        epIdx={epindex}
                        data={data}
                        setData={setData}
                        removeEpisode={removeEpisode}
                        handleEventDataChange={handleEventDataChange}
                      />
                    </AccordionDetails>
                  </Accordion>
                ))}
              <Button
                variant="outlined"
                onClick={addNewEpisode}
                sx={{ marginTop: "10px" }}
              >
                Add Episode
              </Button>
            </>
          );
        }}
      </FieldArray>
    </FormikProvider>
  );
};

EventEpisodeForm.propTypes = {
  formik: PropTypes.object,
  data: PropTypes.object,
  setData: PropTypes.func,
  handleEventDataChange: PropTypes.func,
};

export default EventEpisodeForm;
