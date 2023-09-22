import { useState } from "react";
import _ from "lodash";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import PropType from "prop-types";
import GameDataForm from "./GameDataForm";
import EventDataForm from "./EventDataForm";
import CheatForm from "./CheatForm";

const CustomTabPanel = (props) => {
  const { children, selectedTab, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={selectedTab !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {selectedTab === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

CustomTabPanel.propTypes = {
  children: PropType.node,
  selectedTab: PropType.number,
  index: PropType.number,
};

const CustomTabbed = (props) => {
  const { data, setData, setDataChanged } = props;

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const updateData = (path, newValues) => {
    setDataChanged(true);
    setData((prev) => {
      let updatedData = { ...prev };
      _.set(updatedData, path, newValues);
      return updatedData;
    });
  };

  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="basic tabs example"
        >
          <Tab label="Game Data" />
          <Tab label="Event Data" />
          <Tab label="Cheats" disabled={!data.gameData.enableCheats} />
        </Tabs>
      </Box>
      <CustomTabPanel selectedTab={selectedTab} index={0}>
        <GameDataForm data={data} updateGameData={updateData} />
      </CustomTabPanel>
      <CustomTabPanel selectedTab={selectedTab} index={1}>
        <EventDataForm
          data={data}
          updateEventData={updateData}
          setData={setData}
        />
      </CustomTabPanel>
      <CustomTabPanel selectedTab={selectedTab} index={2}>
        <CheatForm data={data} updateCheatData={updateData} setData={setData} />
      </CustomTabPanel>
    </Box>
  );
};
CustomTabbed.propTypes = {
  setData: PropType.func,
  data: PropType.object,
  setDataChanged: PropType.func,
};

export default CustomTabbed;
