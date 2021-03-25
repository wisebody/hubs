import React from "react";
import PropTypes from "prop-types";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";
import { LoadingScreenLayout } from "../layout/LoadingScreenLayout";
import { Button } from "../input/Button";

export const ExitReason = {
  exited: "exited",
  closed: "closed",
  denied: "denied",
  disconnected: "disconnected",
  left: "left",
  full: "full",
  sceneError: "sceneError",
  connectError: "connectError",
  versionMismatch: "versionMismatch"
};

const messages = defineMessages({
  [ExitReason.exited]: {
    id: "exited-room-screen.reason.exited",
    defaultMessage: "세션이 종료되었습니다. 새로고침 또는 새로운 창을 열어서 접속해주세요."
  },
  [ExitReason.closed]: {
    id: "exited-room-screen.reason.closed",
    defaultMessage: "이 방은 더 이상 사용할 수 없습니다."
  },
  [ExitReason.denied]: {
    id: "exited-room-screen.reason.denied",
    defaultMessage: "이 방에 참여할 수 었습니다. 방 관리자에게 허가를 요청하세요."
  },
  [ExitReason.disconnected]: {
    id: "exited-room-screen.reason.disconnected",
    defaultMessage: "방에서 연결이 끊어졌습니다. 다시 연결을 시도하려면 페이지를 새로고침 하세요."
  },
  [ExitReason.left]: {
    id: "exited-room-screen.reason.left",
    defaultMessage: "방을 나갔습니다."
  },
  [ExitReason.full]: {
    id: "exited-room-screen.reason.full",
    defaultMessage: "방이 꽉 찼습니다. 나중에 다시 접속해주세요."
  },
  [ExitReason.sceneError]: {
    id: "exited-room-screen.reason.scene-error",
    defaultMessage: "장면을 불러오는데 실패했습니다."
  },
  [ExitReason.connectError]: {
    id: "exited-room-screen.reason.connect-error",
    defaultMessage: "이 방에 연결할 수 없습니다. 나중에 다시 시도해주세요."
  },
  [ExitReason.versionMismatch]: {
    id: "exited-room-screen.reason.version-mismatch",
    defaultMessage: "현재 버전은 사용할 수 없습니다. 브라우저는 5초 후에 새로고침 됩니다."
  }
});

export function ExitedRoomScreen({ reason, showTerms, termsUrl, logoSrc, showSourceLink }) {
  const intl = useIntl();

  let subtitle = null;
  if (reason === ExitReason.closed) {
    const contactEmail = intl.formatMessage({ id: "contact-email" });

    subtitle = (
      <>
        <b>
          <FormattedMessage
            id="exited-room-screen.no-longer-availible"
            defaultMessage="죄송합니다. 이 방은 더 이상 사용할 수 없습니다."
          />
        </b>
        {showTerms && (
          <p>
            <FormattedMessage
              id="exited-room-screen.closed-room-tos"
              defaultMessage="방 소유자가 방을 폐쇄하거나 이용 약관 위반 신고를 받은 경우 방을 폐쇄할 수 있습니다."
              values={{
                // eslint-disable-next-line react/display-name
                toslink: chunks => (
                  <a target="_blank" rel="noreferrer noopener" href={termsUrl}>
                    {chunks}
                  </a>
                )
              }}
            />
          </p>
        )}
        <p>
          <FormattedMessage
            id="exited-room-screen.contact-us"
            defaultMessage="문의 메일 : {contactEmail}."
            values={{ contactEmail: <a href={`mailto:${contactEmail}`}>{contactEmail}</a> }}
          />
        </p>
        {showSourceLink && (
          <p>
            <FormattedMessage
              id="exited-room-screen.source-link"
              defaultMessage="허브클라우드"
              values={{
                // eslint-disable-next-line react/display-name
                a: chunks => <a href="https://github.com/mozilla/hubs">{chunks}</a>
              }}
            />
          </p>
        )}

        <Button as="a" preset="accept" href="/">
          <FormattedMessage id="exited-room-screen.home-button" defaultMessage="Back to Home" />
        </Button>
      </>
    );
  } else {
    const tcpUrl = new URL(document.location.toString());
    const tcpParams = new URLSearchParams(tcpUrl.search);
    tcpParams.set("force_tcp", true);
    tcpUrl.search = tcpParams.toString();

    subtitle = (
      <>
        <b>{intl.formatMessage(messages[reason])}</b>

        {reason === ExitReason.connectError && (
          <p>
            <FormattedMessage
              id="exited-room-screen.connect-tcp"
              defaultMessage="You can try <a>connecting via TCP</a>, which may work better on some networks."
              values={{
                // eslint-disable-next-line react/display-name
                a: chunks => <a href={tcpUrl.toString()}>{chunks}</a>
              }}
            />
          </p>
        )}
        {![ExitReason.left, ExitReason.disconnected, ExitReason.sceneError].includes(reason) && (
          <p>
            <FormattedMessage
              id="exited-room-screen.create-room"
              defaultMessage=" "
              values={{
                // eslint-disable-next-line react/display-name
                a: chunks => <a href="/">{chunks}</a>
              }}
            />
          </p>
        )}

        <Button as="a" preset="accept" href={window.location.href}>
          <FormattedMessage id="exited-room-screen.refresh-page-button" defaultMessage="새로고침" />
        </Button>
      </>
    );
  }

  return <LoadingScreenLayout center={subtitle} logoSrc={logoSrc} />;
}

ExitedRoomScreen.propTypes = {
  reason: PropTypes.string.isRequired,
  showTerms: PropTypes.bool,
  termsUrl: PropTypes.string,
  logoSrc: PropTypes.string,
  showSourceLink: PropTypes.bool
};
