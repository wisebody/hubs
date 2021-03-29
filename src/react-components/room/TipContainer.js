import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { FormattedMessage, useIntl, defineMessages } from "react-intl";
import { Tip } from "./Tip";
import { useEffect } from "react";
import { discordBridgesForPresences, hasEmbedPresences } from "../../utils/phoenix-utils";
import configs from "../../utils/configs";

// These keys are hardcoded in the input system to be based on the physical location on the keyboard rather than character
let moveKeys = "W A S D";
let turnLeftKey = "Q";
let turnRightKey = "E";

// TODO The API to map from physical key to character is experimental. Depending on prospects of this getting wider
// implimentation we may want to cook up our own polyfill based on observing key inputs
if (window.navigator.keyboard !== undefined && window.navigator.keyboard.getLayoutMap) {
  window.navigator.keyboard.getLayoutMap().then(function(map) {
    moveKeys = `${map.get("KeyW")} ${map.get("KeyA")} ${map.get("KeyS")} ${map.get("KeyD")}`.toUpperCase();
    turnLeftKey = map.get("KeyQ").toUpperCase();
    turnRightKey = map.get("KeyE").toUpperCase();
  });
}

const onboardingMessages = defineMessages({
  "tips.mobile.look": {
    id: "tips.mobile.look",
    defaultMessage: "환영합니다! 화면 터치를 통해 둘러볼 수 있습니다."
  },
  "tips.mobile.locomotion": {
    id: "tips.mobile.locomotion",
    defaultMessage: "두 손가락을 사용하여 이동할 수 있습니다."
  },
  "tips.mobile.invite": {
    id: "tips.mobile.invite",
    defaultMessage: "이 방을 다른 사람에게 알리려면 왼쪽 하단에 있는 초대 버튼을 사용하세요."
  },
  "tips.desktop.look": {
    id: "tips.desktop.look",
    defaultMessage: "{appName} 에 접속하신 것을 환영합니다."
  },
  "tips.desktop.locomotion": {
    id: "tips.desktop.locomotion",
    defaultMessage: "{moveKeys} 키를 사용해서 이동하세요. 쉬프트키를 누르시면 빠른 이동이 가능합니다."
  },
  "tips.desktop.turning": {
    id: "tips.desktop.turning",
    defaultMessage: "{turnLeftKey} 왼쪽 방향 전환, {turnRightKey} 오른쪽 방향 전환 합니다."
  },
  "tips.desktop.invite": {
    id: "tips.desktop.invite",
    defaultMessage: "이 방에는 아무도 없습니다."
  }
});

function OkDismissLabel() {
  return <FormattedMessage id="tips.dismiss.ok" defaultMessage="확인" />;
}

function SkipDismissLabel() {
  return <FormattedMessage id="tips.dismiss.skip" defaultMessage="건너뛰기" />;
}

export function FullscreenTip(props) {
  return (
    <Tip {...props} dismissLabel={<OkDismissLabel />}>
      <FormattedMessage
        id="tips.fullscreen"
        defaultMessage="전체화면 모드로 접속했습니다. ESC 키를 누르시면 메뉴가 표시됩니다."
      />
    </Tip>
  );
}

export function TipContainer({ hide, inLobby, inRoom, isStreaming, isEmbedded, scene, store, hubId, presences }) {
  const intl = useIntl();
  const [lobbyTipDismissed, setLobbyTipDismissed] = useState(false);
  const [broadcastTipDismissed, setBroadcastTipDismissed] = useState(() =>
    store.state.confirmedBroadcastedRooms.includes(hubId)
  );
  const [streamingTipDismissed, setStreamingTipDismissed] = useState(false);
  const [embeddedTipDismissed, setEmbeddedTipDismissed] = useState(false);
  const [onboardingTipId, setOnboardingTipId] = useState(null);

  const onSkipOnboarding = useCallback(
    () => {
      scene.systems.tips.skipTips();
    },
    [scene]
  );

  useEffect(
    () => {
      function onSceneTipChanged({ detail: tipId }) {
        setOnboardingTipId(tipId);
      }

      scene.addEventListener("tip-changed", onSceneTipChanged);

      setOnboardingTipId(scene.systems.tips.activeTip);
    },
    [scene]
  );

  const discordBridges = presences ? discordBridgesForPresences(presences) : [];
  const isBroadcasting = discordBridges.length > 0;

  // TODO: This only exists because we store local state in this component.
  // If we move tip state to a context then we can remove this and not render this component at all.
  if (hide) {
    return null;
  } else {
    return null;
  }

  if (inLobby) {
    if (lobbyTipDismissed) {
      return null;
    }

    return (
      <Tip onDismiss={() => setLobbyTipDismissed(true)} dismissLabel={<OkDismissLabel />}>
        <FormattedMessage
          id="tips.lobby"
          defaultMessage="로비에 접속했습니다. 다른 사람과 대화를 하거나 다른 사람을 볼 수 없습니다."
        />
      </Tip>
    );
  } else if (inRoom) {
    if (onboardingTipId) {
      return (
        <Tip onDismiss={onSkipOnboarding} dismissLabel={<SkipDismissLabel />}>
          {intl.formatMessage(onboardingMessages[onboardingTipId], {
            appName: configs.translation("app-name"),
            moveKeys,
            turnLeftKey,
            turnRightKey
          })}
        </Tip>
      );
    }

    if (isStreaming && !streamingTipDismissed) {
      return (
        <Tip onDismiss={() => setStreamingTipDismissed(true)} dismissLabel={<OkDismissLabel />}>
          <FormattedMessage id="tips.streaming" defaultMessage="로비로 스트리밍 중입니다." />
        </Tip>
      );
    }

    if (isBroadcasting && !broadcastTipDismissed) {
      return (
        <Tip onDismiss={() => setBroadcastTipDismissed(true)} dismissLabel={<OkDismissLabel />}>
          <FormattedMessage
            id="tips.discord"
            defaultMessage="이 방의 대화는 디스코드로 연결됩니다. {broadcastTarget}"
            values={{ broadcastTarget: discordBridges.map(channelName => "#" + channelName).join(", ") }}
          />
        </Tip>
      );
    }

    if ((isEmbedded || hasEmbedPresences(presences)) && !embeddedTipDismissed) {
      return (
        <Tip onDismiss={() => setEmbeddedTipDismissed(true)} dismissLabel={<OkDismissLabel />}>
          <FormattedMessage
            id="tips.embedded"
            defaultMessage="이 방은 공개되어 있습니다. 다른 웹사이트 방문자가 볼 수 있습니다."
          />
        </Tip>
      );
    }

    return null;
  }

  return null;
}

TipContainer.propTypes = {
  hide: PropTypes.bool,
  inLobby: PropTypes.bool,
  inRoom: PropTypes.bool,
  isStreaming: PropTypes.bool,
  isEmbedded: PropTypes.bool,
  scene: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  hubId: PropTypes.string,
  presences: PropTypes.object
};
