import { useEffect } from "react";

export default function useOnKeyDown(keyName, action) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.code === keyName) action();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [action, keyName]);
}
