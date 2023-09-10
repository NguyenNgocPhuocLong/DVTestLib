import { useState } from "react";
import { MAX_RETRY_TIMES, RETRY_RELOAD_KEY } from "./VersionDetect.constants";

const useVersionDetectHook = () => {
  const [loading, setLoading] = useState(false);
  const [version, setVersion] = useState("-1");

  const refreshCacheReload = async () => {
    setLoading(true);
    console.log("Clearing cache and hard reloading...");
    if (caches) {
      // Service worker cache should be cleared with caches.delete()
      const names = await caches.keys();
      await Promise.all(names.map((name) => caches.delete(name)));
    }
    const rawRetryReload = localStorage.getItem(RETRY_RELOAD_KEY);
    let retryReload = Number(rawRetryReload ?? 0);
    if (retryReload < MAX_RETRY_TIMES) {
      //delete browser cache and hard reload
      retryReload++;
      console.log(`Retry reload ${retryReload}`);
      window.location.reload();
    } else {
      console.log(`Retry reload exceeds max retry times`);
    }
    localStorage.setItem(RETRY_RELOAD_KEY, retryReload.toString());
    setLoading(false);
  };

  return {
    loading,
    version,
    setVersion,
    refreshCacheReload,
  };
};
export default useVersionDetectHook;
