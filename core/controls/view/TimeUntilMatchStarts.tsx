'use client';

import Link from "next/link";
import React, { useState, useEffect, JSX } from "react";

const TimeUntilMatchStarts: React.FC<{ value: string; status: number, matchLink: string }> = (props) => {


  const calculateTimeDifference = (startDate: string, status: number, matchLink: string): JSX.Element => {
    const localDate = new Date();
    const startDateUtc = new Date(startDate);

    const diffMs = startDateUtc.getTime() - localDate.getTime();
    const isPast = diffMs < 0;

    // If status is 3, show "Completed"
    if (status === 3) {
      return <span className="font-bold" >Completed</span>;
    }

    // If the event is in the past and status is not 3, show "Watch Live"
    if (isPast && status !== 3) {
      return <Link href={props.matchLink} className="flex justify-center items-center border p-2 border-neutral-200" >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF5000" xmlns="http://www.w3.org/2000/svg" className="sc-192om8w-0 cpdeUK"><path d="M6.5 6.47v11.06c0 .844.943 1.357 1.67.898l8.826-5.531a1.06 1.06 0 000-1.805L8.17 5.572c-.727-.459-1.67.054-1.67.897z" fill="#FF5000"></path></svg>Watch Live</Link>;
    }

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    // If the event is on the same local calendar day
    if (
      startDateUtc.getFullYear() === localDate.getFullYear() &&
      startDateUtc.getMonth() === localDate.getMonth() &&
      startDateUtc.getDate() === localDate.getDate()
    ) {
      return (
        <p className="font-normal text-neutral-700 text-center">
          Watch Live <br /> in <br /><b className="font-extrabold text-black">{diffHours}h</b> : <b className="font-extrabold text-black">{diffMinutes}m</b>
        </p>
      );
    } else {
      // If the event is on a different calendar day
      const options: Intl.DateTimeFormatOptions = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      const formattedTime = startDateUtc.toLocaleTimeString(undefined, options);
      return (
        <p className="font-normal text-neutral-700 text-center">
          Watch Live <br /> At <br /> <b className="font-extrabold text-black">{formattedTime}</b>
        </p>
      );
    }
  };

  const isValidDate = (date: string): boolean => {
    return !isNaN(Date.parse(date));
  };

  const [timeUntilStart, setTimeUntilStart] = useState<JSX.Element>(() => {
    if (props.value && isValidDate(props.value)) {
      return calculateTimeDifference(props.value, props.status, props.matchLink);
    }
    return <span />;
  });

  useEffect(() => {
    if (props.value && isValidDate(props.value)) {
      const initialDiffMs = new Date(props.value).getTime() - new Date().getTime();
      if (initialDiffMs > 0) {
        const interval = setInterval(() => {
          setTimeUntilStart(calculateTimeDifference(props.value, props.status, props.matchLink));
        }, 1000);
        return () => clearInterval(interval);
      } else {
        setTimeUntilStart(calculateTimeDifference(props.value, props.status, props.matchLink));
      }
    } else {
      setTimeUntilStart(<span />);
    }
  }, [props.value, props.status]);

  return <div>{timeUntilStart}</div>;
};

export default TimeUntilMatchStarts;
