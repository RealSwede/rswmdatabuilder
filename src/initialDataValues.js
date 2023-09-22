import _ from "lodash";

const baseData = {
  gameData: {
    id: "",
    episodic: false,
    episodevar: "",
    enableCheats: false,
  },
  eventData: { episodes: ["0"], 0: { key: "0", events: [] } },
  cheats: [],
};

const newCheat = {
  key: "",
  desc: "",
  variable: "",
  operation: "tset",
  value: "",
};

const newEpisode = {
  key: "",
  events: [],
};

const newEventPreReq = {
  key: "",
  flag: "",
  operation: "",
  value: "",
};

const newEvent = {
  key: "",
  tags: [],
  complete: { ...newEventPreReq },
  preReqs: [],
};

const interData = { ...baseData };
_.set(interData, `eventData.episodes`, ["0"]);
const interEpisode = { ...newEpisode };
interEpisode.key = "0";
_.set(interData, `eventData["0"]`, interEpisode);

const initialData = { ...interData };

export {
  initialData as default,
  newCheat,
  newEpisode,
  newEvent,
  newEventPreReq,
};
