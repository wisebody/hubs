import React from "react";
import { LoadingScreen } from "./LoadingScreen";
import logoSrc from "../../assets/images/company-logo.png";

export default {
  title: "Room/LoadingScreen",
  parameters: {
    layout: "fullscreen"
  }
};

const infoMessages = [
  { heading: " ", message: " " }
  }
];

export const Base = () => (
  <LoadingScreen logoSrc={logoSrc} message="Loading objects 2/14" infoMessages={infoMessages} />
);
