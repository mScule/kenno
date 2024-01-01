import style from "./style.module.css";

import {
  TbCircleX as CloseIcon,
  TbInfoCircle as InformationIcon,
  TbCheck as SuccessIcon,
  TbInfoTriangle as WarningIcon,
  TbExclamationMark as ErrorIcon
} from "react-icons/tb";

import Notification from "../../../types/Notification";
import Button from "../Button";
import Severity from "../../../types/Severity";
import clsx from "clsx";
import getUniqueKey from "../../../utility/getUniqueKey";
import Divider from "../Divider";
import Direction from "../../../types/Direction";

type NotifierProps = {
  notification: Notification;
  timeout: number;
  onClose: () => void;
};

export default function Notifier({
  notification,
  timeout,
  onClose
}: NotifierProps) {
  let severity = "";
  let severityBadge = <></>;

  switch (notification.severity) {
    case Severity.Information:
      severity = style.information;
      severityBadge = <InformationIcon size={32} />;
      break;
    case Severity.Success:
      severity = style.success;
      severityBadge = <SuccessIcon size={32} />;
      break;
    case Severity.Warning:
      severity = style.warning;
      severityBadge = <WarningIcon size={32} />;
      break;
    case Severity.Error:
      severity = style.error;
      severityBadge = <ErrorIcon size={32} />;
  }

  return (
    <div className={style.wrapper}>
      <div className={style.notification}>
        <div className={clsx(style.severityBadge, severity && severity)}>
          {severityBadge}
        </div>

        <Divider direction={Direction.Row} />

        <div className={style.body}>
          <div className={style.content}>
            <span>{notification.message}</span>
            <Button onClick={onClose}>
              <CloseIcon size={16} />
            </Button>
          </div>
          <div
            key={getUniqueKey()}
            style={{
              animationName: style.countDown,
              animationDuration: timeout + "ms"
            }}
            className={clsx(style.timer, severity && severity)}
          />
        </div>
      </div>
    </div>
  );
}
