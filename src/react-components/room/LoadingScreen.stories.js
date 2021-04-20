import React from "react";
import { LoadingScreen } from "./LoadingScreen";
import logoSrc from "../../assets/images/company-logo.png";

export default {
  title: "LoadingScreen"
};

const infoMessages = [
  { heading: " ", message: " " }
  }
];

export const Base = () => (
  <LoadingScreen logoSrc={logoSrc} message="Loading objects 2/14" infoMessages={infoMessages} />
);

Base.parameters = {
  layout: "fullscreen"
};
