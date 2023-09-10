import {
  VersionDetectFileType,
  VersionDetectProps,
} from "./VersionDetect.types";
import { compareVersion } from "./VersionDetect.utils";
import { RETRY_RELOAD_KEY } from "./VersionDetect.constants";
import React, { FC, useEffect } from "react";
// import useVersionDetectHook from "./VersionDetect.hooks";

const VersionDetect: FC<VersionDetectProps> = ({
  nameArg = "REACT_APP_BUILD_ID",
  children,
}) => {
  // const { version, setVersion, refreshCacheReload } = useVersionDetectHook();
  useEffect(() => {
    const currentVersion = localStorage.getItem(nameArg) || "0";
    console.log(
      "🚀 ~ file: VersionDetect.tsx:14 ~ useEffect ~ currentVersion:",
      currentVersion
    );

    fetch("/version.json", {
      cache: "no-store",
    })
      .then((response) => response.json())
      .then((data: VersionDetectFileType) => {
        const latestVersion = data.version;
        console.log(
          "🚀 ~ file: VersionDetect.tsx:25 ~ .then ~ latestVersion:",
          latestVersion
        );
        // const flagLatestVersion = false;

        const shouldForceRefresh = compareVersion(
          latestVersion,
          currentVersion
        );
        if (shouldForceRefresh) {
          console.log(
            `We have a new version - ${latestVersion}. Should force refresh`
          );
          //   refreshCacheReload();
          //   setVersion(latestVersion);
        } else {
          console.log(
            `You already have the latest version - ${latestVersion}. No cache refresh needed.`
          );
          localStorage.setItem(RETRY_RELOAD_KEY, "0");
          // flagLatestVersion = true;
        }
      });
  }, [location.pathname]);
  return <>{children}</>;
};
export default VersionDetect;
