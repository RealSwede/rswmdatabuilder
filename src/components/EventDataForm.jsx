import { useFormik } from "formik";
import { Container } from "@mui/material";
import PropTypes from "prop-types";
import EventEpisodeForm from "./Event.EpisodeForm";
import EventEventsForm from "./Event.EventsForm";

const EventDataForm = ({ updateEventData, data, setData }) => {
  const formik = useFormik({
    initialValues: data,
    enableReinitialize: true,
  });

  const handleEventDataChange = (e) => {
    updateEventData(
      e.target.name,
      e.target.type == "checkbox" ? e.target.checked : e.target.value,
    );
    formik.handleChange(e);
  };

  return (
    <Container>
      <form>
        {data.gameData.episodic ? (
          <EventEpisodeForm
            formik={formik}
            data={data}
            setData={setData}
            handleEventDataChange={handleEventDataChange}
          />
        ) : (
          <>
            {
              <EventEventsForm
                formik={formik}
                data={data}
                setData={setData}
                handleEventDataChange={handleEventDataChange}
                epIdx={0}
              />
            }
          </>
        )}
      </form>
    </Container>
  );
};

EventDataForm.propTypes = {
  updateEventData: PropTypes.func,
  data: PropTypes.object,
  setData: PropTypes.func,
};

export default EventDataForm;
