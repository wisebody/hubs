import React, { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import configs from "../../utils/configs";
import { useIntl } from "react-intl";
import { LoadingScreen } from "./LoadingScreen";
import { useRoomLoadingState } from "./useRoomLoadingState";

export function LoadingScreenContainer({ onLoaded, scene }) {
  const intl = useIntl();

  const { loading, message } = useRoomLoadingState(scene);

  useEffect(
    () => {
      if (!loading) {
        onLoaded();
      }
    },
    [loading, onLoaded]
  );

  //TODO: Make these configurable
  const infoMessages = useMemo(
    () => [
      {
        heading: intl.formatMessage({ id: "loading-screen.heading.tip", defaultMessage: " " }),
        message: intl.formatMessage({
          id: "loading-screen.message.keyboard-controls",
          defaultMessage: " "
        })
      }
    ],
    [intl]
  );

  return <LoadingScreen logoSrc={configs.image("logo")} message={message} infoMessages={infoMessages} />;
}

LoadingScreenContainer.propTypes = {
  scene: PropTypes.object.isRequired,
  onLoaded: PropTypes.func.isRequired
};
