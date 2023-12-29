import { useEffect, useRef, useState } from "react";
import moment from "moment";

export function useTimeout(endDate: Date): moment.Duration {
  const endRef = useRef(moment(endDate));

  const [duration, setDuration] = useState(
    moment.duration(endRef.current.diff(new Date()))
  );
  useEffect(() => {
    endRef.current = moment(endDate);
    const end = endRef.current;
    if (duration.asMilliseconds() <= 0) {
      return () => {};
    }
    const intervalId = setInterval(() => {
      const diff = moment.duration(end.diff(new Date()));

      if (diff.asMilliseconds() <= 0) {
        clearInterval(intervalId);
      }

      setDuration(diff);
    }, 500);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return duration;
}
