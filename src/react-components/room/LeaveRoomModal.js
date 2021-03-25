import React from "react";
import { useIntl, defineMessages, FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import { Modal } from "../modal/Modal";
import { CloseButton } from "../input/CloseButton";
import { Button } from "../input/Button";
import { Column } from "../layout/Column";

export const LeaveReason = {
  leaveRoom: "leaveRoom",
  joinRoom: "joinRoom",
  createRoom: "createRoom"
};

const reasonMessages = defineMessages({
  [LeaveReason.leaveRoom]: {
    id: "leave-room-modal.leave-room.message",
    defaultMessage: "이 방에서 나가시겠습니까?"
  },
  [LeaveReason.joinRoom]: {
    id: "leave-room-modal.join-room.message",
    defaultMessage: "새 방에 참여하면 이 방에서 나갑니다. 이 방에서 나가시겠습니까"
  },
  [LeaveReason.createRoom]: {
    id: "leave-room-modal.create-room.message",
    defaultMessage: "새 방을 생성하면 이 방에서 나갑니다. 이 방에서 나가시겠습니까?"
  }
});

const confirmationMessages = defineMessages({
  [LeaveReason.leaveRoom]: {
    id: "leave-room-modal.leave-room.confirm",
    defaultMessage: "방 떠나기"
  },
  [LeaveReason.joinRoom]: {
    id: "leave-room-modal.join-room.confirm",
    defaultMessage: "방 입장하기"
  },
  [LeaveReason.createRoom]: {
    id: "leave-room-modal.create-room.confirm",
    defaultMessage: "방 나간 후 방 생성"
  }
});

export function LeaveRoomModal({ reason, destinationUrl, onClose }) {
  const intl = useIntl();

  return (
    <Modal
      title={<FormattedMessage id="leave-room-modal.title" defaultMessage="방 나가기" />}
      beforeTitle={<CloseButton onClick={onClose} />}
    >
      <Column padding center centerMd="both" grow>
        <p>{intl.formatMessage(reasonMessages[reason])}</p>
        <Button as="a" preset="cancel" href={destinationUrl} rel="noopener noreferrer">
          {intl.formatMessage(confirmationMessages[reason])}
        </Button>
      </Column>
    </Modal>
  );
}

LeaveRoomModal.propTypes = {
  reason: PropTypes.string,
  destinationUrl: PropTypes.string,
  onClose: PropTypes.func
};
