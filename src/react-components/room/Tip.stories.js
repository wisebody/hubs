import React from "react";
import { RoomLayout } from "../layout/RoomLayout";
import { Tip } from "./Tip";

export default {
  title: "Tip",
  parameters: {
    layout: "fullscreen"
  }
};

export const Base = () => <RoomLayout viewport={<Tip onDismiss={() => {}} dismissLabel="Skip" />} />;
