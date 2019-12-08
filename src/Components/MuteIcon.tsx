import React, { memo } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeMute } from "@fortawesome/free-solid-svg-icons";

const _MuteIcon: React.FC = () => (
  <FontAwesomeIcon icon={faVolumeMute} size="lg" />
);

export default memo(_MuteIcon);
