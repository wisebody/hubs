import React from "react";
import PropTypes from "prop-types";
import { Modal } from "../modal/Modal";
import { Button } from "../input/Button";
import { ReactComponent as MicrophoneIcon } from "../icons/Microphone.svg";
import styles from "./MicPermissionsModal.scss";
import { BackButton } from "../input/BackButton";
import { Column } from "../layout/Column";
import { FormattedMessage } from "react-intl";

export function MicPermissionsModal({ className, error, onClickErrorButton, errorButtonLabel, onBack, ...rest }) {
  return (
    <Modal
      title={<FormattedMessage id="mic-permissions-modal.title" defaultMessage="이 기기로 입장" />}
      beforeTitle={<BackButton onClick={onBack} />}
      className={className}
      {...rest}
    >
      <Column padding center className={styles.content}>
        <b>
          <FormattedMessage id="mic-permissions-modal.grant-mic-permissions" defaultMessage="마이크 사용권한 부여" />
        </b>
        <small>
          <FormattedMessage
            id="mic-permissions-modal.mic-access-needed"
            defaultMessage="다른 사람이 들을 수 있도록 마이크 권한이 필요했습니다..{linebreak} 방에서 마이크를 음소거 할 수 있습니다.."
            values={{ linebreak: <br /> }}
          />
        </small>
        <div className={styles.microphoneIconContainer}>
          <MicrophoneIcon />
        </div>
        {error && (
          <>
            <small className={styles.error}>{error}</small>
            <Button preset="primary" onClick={onClickErrorButton}>
              {errorButtonLabel}
            </Button>
          </>
        )}
      </Column>
    </Modal>
  );
}

MicPermissionsModal.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  errorButtonLabel: PropTypes.string,
  onClickErrorButton: PropTypes.func,
  onBack: PropTypes.func
};
