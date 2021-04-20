import React from "react";
import { RoomLayout } from "../layout/RoomLayout";
import { TwitterOAuthModal } from "./TwitterOAuthModal";

export default {
  title: "TwitterOAuthModal",
  parameters: {
    layout: "fullscreen"
  }
};

export const Base = () => <RoomLayout modal={<TwitterOAuthModal appName="Hubs" />} />;
