import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styles from "./CustomTabs.module.css";
import Note from "../Note/Note";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function CustomTabs({
  videoInfo,
  event,
  onDurationChange,
  playlistId,
}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="fullWidth"
        >
          <Tab sx={{ color: "#fff" }} label="Overview" {...a11yProps(0)} />
          <Tab sx={{ color: "#fff" }} label="Notes" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div className={styles.title}>
          <Typography variant="h6">{videoInfo?.title}</Typography>
        </div>
        <div className={styles.description}>
          <Typography variant="body2">{videoInfo?.description}</Typography>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Note
          event={event}
          videoId={videoInfo?.contentDetails?.videoId}
          videoInfo={videoInfo}
          onDurationChange={onDurationChange}
          playlistId={playlistId}
        />
      </TabPanel>
    </Box>
  );
}
