import { Container } from "@mui/material";
import PropTypes from "prop-types";

const JSONDisplay = ({ data }) => {
  return (
    <Container sx={{ textAlign: "start" }}>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Container>
  );
};

JSONDisplay.propTypes = {
  data: PropTypes.object,
};

export default JSONDisplay;
