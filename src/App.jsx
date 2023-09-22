import { Button, Container, Grid, Input } from "@mui/material";
import { useState } from "react";

import JSONDisplay from "./components/JSONDisplay";
import CustomTabbed from "./components/CustomTabbed";

import initialData from "./initialDataValues";

const App = () => {
  window.addEventListener("beforeunload", () => jsonexport());
  const [data, setData] = useState(initialData);
  const [dataChanged, setDataChanged] = useState(false);
  const [dataError, setDataError] = useState("");

  const jsonexport = () => {
    var dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(data));
    var dlNode = document.createElement("a");
    dlNode.setAttribute("href", dataStr);
    dlNode.setAttribute("download", "gameData.json");
    document.body.appendChild(dlNode);
    dlNode.click();
    dlNode.remove();
  };

  const jsonImport = (file) => {
    if (dataChanged) {
      setDataError(
        "Game data has changed, download data and refresh page before trying to import agin",
      );
    } else {
      const handleImport = (event) => {
        let str = event.target.result;
        let json = JSON.parse(str);
        setData(json);
      };

      const fileReader = new FileReader();
      fileReader.onload = handleImport;
      fileReader.readAsText(file);
    }
  };

  return (
    <Container maxWidth={"xl"} sx={{ display: "flex" }}>
      <Grid
        container
        spacing={2}
        rowGap={2}
        justifyContent={"start"}
        alignContent={"flex-start"}
      >
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          RealSwede Walkthrough Mod Data File Generator
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button variant="outlined" onClick={jsonexport}>
            Download Data File
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Initial Data Upload
            <Input
              type="file"
              accept=".json"
              onChange={(e) => jsonImport(e.target.files[0])}
            />
          </Container>
        </Grid>
        {dataError && (
          <Grid item xs={12} sx={{ textAlign: "center", color: "red" }}>
            {dataError}
          </Grid>
        )}
        <Grid
          item
          xs={5}
          sx={{
            flexGrow: 1,
            overflowY: "scroll",
            maxHeight: "80%",
            minHeight: "80%",
          }}
        >
          <JSONDisplay data={data} />
        </Grid>
        <Grid
          item
          xs={7}
          sx={{
            flexGrow: 1,
            overflowY: "scroll",
            maxHeight: "80%",
            minHeight: "80%",
          }}
        >
          <CustomTabbed
            setData={setData}
            data={data}
            setDataChanged={setDataChanged}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
