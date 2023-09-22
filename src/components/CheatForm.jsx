import { FieldArray, FormikProvider, useFormik } from "formik";
import {
  Container,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

import { newCheat } from "../initialDataValues";

const CheatForm = ({ data, updateCheatData, setData }) => {
  const formik = useFormik({
    initialValues: data,
    enableReinitialize: true,
  });
  const handleCheatDataChange = (e) => {
    console.log(e);
    updateCheatData(e.target.name, e.target.value);
    formik.handleChange(e);
  };

  const addNewCheat = (newCheatData) => {
    setData((prev) => {
      let newData = { ...prev };
      let newCheats = [...prev.cheats];
      newCheats.push(newCheatData);
      newData.cheats = newCheats;
      return newData;
    });
  };

  const removeCheat = (index) => {
    setData((prev) => {
      let newData = { ...prev };
      let newCheats = [...prev.cheats];
      newCheats.splice(index, 1);
      newData.cheats = newCheats;
      return newData;
    });
  };

  return (
    <Container>
      <form>
        <FormikProvider value={formik}>
          <FieldArray name="cheats">
            {({ remove, push }) => {
              const addNew = () => {
                let newCheatObj = { ...newCheat };
                newCheatObj.key = uuidv4();
                addNewCheat(newCheatObj);
                push(newCheatObj);
              };

              const removeCheatAt = (index) => {
                removeCheat(index);
                remove(index);
              };

              return (
                <>
                  {formik.values.cheats &&
                    formik.values.cheats.length > 0 &&
                    formik.values.cheats.map((cheat, index) => (
                      <Grid
                        key={cheat.key}
                        sx={{
                          border: "1px solid white",
                          paddingBottom: "10px",
                          paddingRight: "10px",
                          marginBottom: "20px",
                        }}
                        item
                        container
                        spacing={1}
                        xs={12}
                      >
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            id={`cheats[${index}].desc`}
                            name={`cheats[${index}].desc`}
                            label="Button Text"
                            value={formik.values.cheats[index].desc}
                            onChange={handleCheatDataChange}
                          />
                        </Grid>
                        <Grid item xs={5}>
                          <TextField
                            fullWidth
                            id={`cheats[${index}].variable`}
                            name={`cheats[${index}].variable`}
                            label="Variable"
                            value={formik.values.cheats[index].variable}
                            onChange={handleCheatDataChange}
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <FormControl fullWidth>
                            <InputLabel>Operator</InputLabel>
                            <Select
                              id={`cheats[${index}].operation`}
                              name={`cheats[${index}].operation`}
                              value={formik.values.cheats[index].operation}
                              onChange={handleCheatDataChange}
                            >
                              <MenuItem value={"tset"}>Set (String)</MenuItem>
                              <MenuItem value={"nset"}>Set (Number)</MenuItem>
                              <MenuItem value={"add"}>Increase</MenuItem>
                              <MenuItem value={"minus"}>Decrease</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            inputProps={
                              formik.values.cheats[index].operation != "tset"
                                ? {
                                    inputMode: "numeric",
                                    pattern: "[0-9]*",
                                  }
                                : {}
                            }
                            fullWidth
                            id={`cheats[${index}].value`}
                            name={`cheats[${index}].value`}
                            label="Value"
                            value={formik.values.cheats[index].value}
                            onChange={handleCheatDataChange}
                          />
                        </Grid>
                        <Grid
                          item
                          xs={1}
                          sx={{ display: "flex", alignContent: "center" }}
                        >
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => removeCheatAt(index)}
                          >
                            X
                          </Button>
                        </Grid>
                      </Grid>
                    ))}
                  <Button variant="outlined" onClick={addNew}>
                    Add Cheat
                  </Button>
                </>
              );
            }}
          </FieldArray>
        </FormikProvider>
      </form>
    </Container>
  );
};

CheatForm.propTypes = {
  data: PropTypes.object,
  updateCheatData: PropTypes.func,
  setData: PropTypes.func,
};

export default CheatForm;
