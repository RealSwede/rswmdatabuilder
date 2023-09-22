import { useFormik } from "formik";
import {
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";

const GameDataForm = ({ updateGameData, data }) => {
  const formik = useFormik({
    initialValues: data,
    enableReinitialize: true,
  });

  const handleGameDataChange = (e) => {
    updateGameData(
      e.target.id,
      e.target.type == "checkbox" ? e.target.checked : e.target.value,
    );
    formik.handleChange(e);
  };

  return (
    <Container>
      <form>
        <FormGroup sx={{ marginTop: "10px" }}>
          <TextField
            id="gameData.id"
            name="gameData.id"
            label="Game ID"
            value={formik.values.gameData.id}
            onChange={handleGameDataChange}
          />
          <FormGroup row sx={{ display: "flex", alignItems: "center" }}>
            <FormControlLabel
              sx={{ marginTop: "10px" }}
              control={
                <Checkbox
                  id="gameData.episodic"
                  onChange={handleGameDataChange}
                  checked={formik.values.gameData.episodic}
                />
              }
              label="Episodic"
              labelPlacement="top"
            />
            <TextField
              id="gameData.episodevar"
              name="gameData.episodevar"
              label="Episode Variable"
              value={formik.values.gameData.episodevar}
              onChange={handleGameDataChange}
              disabled={!formik.values.gameData.episodic}
            />
          </FormGroup>
          <FormControlLabel
            sx={{ marginTop: "10px" }}
            control={
              <Checkbox
                id="gameData.enableCheats"
                onChange={handleGameDataChange}
                checked={formik.values.gameData.enableCheats}
              />
            }
            label="Enable Cheats"
          />
        </FormGroup>
      </form>
    </Container>
  );
};

GameDataForm.propTypes = {
  updateGameData: PropTypes.func,
  data: PropTypes.object,
};

export default GameDataForm;
