/* eslint-disable @calm/react-intl/missing-formatted-message */
import React from "react";
import { withDesign } from "storybook-addon-designs";
import { ReactComponent as InviteIcon } from "../icons/Invite.svg";
import { ReactComponent as MicrophoneIcon } from "../icons/Microphone.svg";
import { ReactComponent as ShareIcon } from "../icons/Share.svg";
import { ReactComponent as ObjectIcon } from "../icons/Object.svg";
import { ReactComponent as ReactionIcon } from "../icons/Reaction.svg";
import { ReactComponent as ChatIcon } from "../icons/Chat.svg";
import { ReactComponent as LeaveIcon } from "../icons/Leave.svg";
import { ReactComponent as MoreIcon } from "../icons/More.svg";
import { ToolbarButton, presets } from "./ToolbarButton";
import styleUtils from "../styles/style-utils.scss";
import { Column } from "../layout/Column";
import { RoomLayout } from "../layout/RoomLayout";

export default {
  title: "Toolbar",
  decorators: [withDesign],
  argTypes: {
    selected: { control: "boolean" }
  }
};

export const AllButtons = args => (
  <Column padding>
    {presets.map(preset => <ToolbarButton key={preset} icon={<ShareIcon />} label={label} preset={preset} {...args} />)}
    <ToolbarButton icon={<ShareIcon />} label="공유" preset="purple" statusColor="red" />
    <ToolbarButton icon={<MicrophoneIcon />} label="음성" statusColor="green" />
  </Column>
);

AllButtons.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/Xag5qaEgYs3KzXvoxx5m8y/Hubs-Redesign?node-id=17%3A725"
  },
  selected: false
};

export const RoomToolbar = () => (
  <RoomLayout
    toolbarLeft={<ToolbarButton icon={<InviteIcon />} label="초대" preset="basic" />}
    toolbarCenter={
      <>
        <ToolbarButton icon={<MicrophoneIcon />} label="음성" preset="basic" />
        <ToolbarButton icon={<ShareIcon />} label="공유" preset="purple" />
        <ToolbarButton icon={<ObjectIcon />} label="장소" preset="green" />
        <ToolbarButton icon={<ReactionIcon />} label="반응" preset="orange" />
        <ToolbarButton icon={<ChatIcon />} label="대화" preset="blue" />
      </>
    }
    toolbarRight={
      <>
        <ToolbarButton icon={<LeaveIcon />} label="떠나기" preset="red" />
        <ToolbarButton icon={<MoreIcon />} label="더보기" preset="transparent" />
      </>
    }
  />
);

RoomToolbar.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/Xag5qaEgYs3KzXvoxx5m8y/Hubs-Redesign?node-id=17%3A667"
  }
};

export const EntryToolbar = () => (
  <RoomLayout
    toolbarLeft={<ToolbarButton icon={<InviteIcon />} label="초대" preset="basic" />}
    toolbarCenter={
      <>
        <ToolbarButton icon={<InviteIcon />} label="초대" preset="basic" className={styleUtils.hideLg} />
        <ToolbarButton icon={<ChatIcon />} label="대화" preset="blue" />
      </>
    }
    toolbarRight={<ToolbarButton icon={<MoreIcon />} label="더보기" preset="transparent" />}
  />
);

EntryToolbar.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/Xag5qaEgYs3KzXvoxx5m8y/Hubs-Redesign?node-id=61%3A4500"
  }
};
