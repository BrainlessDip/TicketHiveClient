import { useEffect, useState } from "react";
import {
  differenceInSeconds,
  intervalToDuration,
  formatDuration,
} from "date-fns";

const Countdown = ({ departure }) => {
  const [timeLeft, setTimeLeft] = useState("( ... )");

  useEffect(() => {
    const target = new Date(departure);

    const interval = setInterval(() => {
      const now = new Date();
      const diff = differenceInSeconds(target, now);

      if (diff <= 0) {
        setTimeLeft("( Departeds )");
        clearInterval(interval);
        return;
      }

      const duration = intervalToDuration({
        start: now,
        end: target,
      });

      const formatted = formatDuration(duration, {
        format: ["days", "hours", "minutes", "seconds"],
        zero: false,
      });

      setTimeLeft(formatted);
    }, 1000);

    return () => clearInterval(interval);
  }, [departure]);

  return timeLeft !== "( Departeds )" ? `- In ${timeLeft}` : timeLeft;
};

export default Countdown;
