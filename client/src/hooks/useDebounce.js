import React, { useCallback, useRef } from "react";

export const useDebounce = (callBack, delay) => {
  const timerRef = useRef();

  const debounce = useCallback(
    (...args) => {
      if (timerRef.current != null) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => callBack(...args), delay);
    },
    [callBack, delay]
  );

  return debounce;
};
