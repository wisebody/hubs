import React from "react";
import PropTypes from "prop-types";
import { Sidebar } from "../sidebar/Sidebar";
import { CloseButton } from "../input/CloseButton";
import { BackButton } from "../input/BackButton";
import { Button } from "../input/Button";
import { Column } from "../layout/Column";
import styles from "./UserProfileSidebar.scss";
import { FormattedMessage, useIntl } from "react-intl";

export function UserProfileSidebar({
  className,
  displayName,
  identityName,
  avatarPreview,
  isSignedIn,
  canPromote,
  onPromote,
  canDemote,
  onDemote,
  isHidden,
  onToggleHidden,
  canMute,
  onMute,
  canKick,
  onKick,
  showBackButton,
  onBack,
  onClose,
  ...rest
}) {
  const intl = useIntl();

  return (
    <Sidebar
      title={identityName ? `${displayName} (${identityName})` : displayName}
      beforeTitle={showBackButton ? <BackButton onClick={onBack} /> : <CloseButton onClick={onClose} />}
      className={className}
      {...rest}
    >
      <Column center padding>
        <div className={styles.avatarPreviewContainer}>{avatarPreview || <div />}</div>
        {canPromote && (
          <Button
            preset="green"
            disabled={!isSignedIn}
            title={
              isSignedIn
                ? intl.formatMessage({ id: "user-profile-sidebar.promote-button", defaultMessage: "Promote" })
                : intl.formatMessage(
                    {
                      id: "user-profile-sidebar.promote-button-disabled-label",
                      defaultMessage: "{displayName} is signed out."
                    },
                    { displayName }
                  )
            }
            onClick={onPromote}
          >
            <FormattedMessage id="user-profile-sidebar.promote-button" defaultMessage="Promote" />
          </Button>
        )}
        {canDemote && (
          <Button
            preset="red"
            disabled={!isSignedIn}
            title={
              isSignedIn
                ? intl.formatMessage({ id: "user-profile-sidebar.demote-button", defaultMessage: "Demote" })
                : intl.formatMessage(
                    {
                      id: "user-profile-sidebar.demote-button-disabled-label",
                      defaultMessage: "{displayName} is signed out."
                    },
                    { displayName }
                  )
            }
            onClick={onDemote}
          >
            <FormattedMessage id="user-profile-sidebar.demote-button" defaultMessage="Demote" />
          </Button>
        )}
        {canMute && (
          <Button preset="red" onClick={onMute}>
            <FormattedMessage id="user-profile-sidebar.mute-button" defaultMessage="Mute" />
          </Button>
        )}
      </Column>
    </Sidebar>
  );
}
/*
<Button onClick={onToggleHidden}>
  {isHidden ? (
    <FormattedMessage id="user-profile-sidebar.unhide-button" defaultMessage="Unhide" />
  ) : (
    <FormattedMessage id="user-profile-sidebar.hide-button" defaultMessage="Hide" />
  )}
</Button>
{canKick && (
          <Button preset="red" onClick={onKick}>
            <FormattedMessage id="user-profile-sidebar.kick-button" defaultMessage="Kick" />
          </Button>
        )}
*/
UserProfileSidebar.propTypes = {
  className: PropTypes.string,
  displayName: PropTypes.string,
  identityName: PropTypes.string,
  avatarPreview: PropTypes.node,
  isSignedIn: PropTypes.bool,
  canPromote: PropTypes.bool,
  onPromote: PropTypes.func,
  canDemote: PropTypes.bool,
  onDemote: PropTypes.func,
  isHidden: PropTypes.bool,
  onToggleHidden: PropTypes.func,
  canMute: PropTypes.bool,
  onMute: PropTypes.func,
  canKick: PropTypes.bool,
  onKick: PropTypes.func,
  showBackButton: PropTypes.bool,
  onBack: PropTypes.func,
  onClose: PropTypes.func
};
