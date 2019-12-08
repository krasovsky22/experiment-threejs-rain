import React, { memo } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const _PlayIcon: React.FC = () => <FontAwesomeIcon icon={faPlay} size="lg" />;

export default memo(_PlayIcon);
