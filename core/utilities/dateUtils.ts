
export function getDateFormat(date: Date, setTimeZone = '', format = 1): string | { date: string; time: string } {
    const convertedDate = new Date(date.toLocaleString("en-US", { timeZone: setTimeZone }));
    if (format === 1) {
        // Fri, 6th Dec, 9:55 PM ======= 1
      const arrDate = convertedDate.toString().split(' ');
      return `${arrDate[0]}, ${setNumberFormat(arrDate[2])} ${arrDate[1]}, ${setTimeFormat(arrDate[4])}`;

    } else if (format === 2) {
        // 9:56 PM ======== 2
      const arrDate = convertedDate.toString().split(' ');
      return setTimeFormat(arrDate[4]);

    } else if (format === 3) {
        // 6th Dec, 2024 ======= 3
      const arrDate = convertedDate.toString().split(' ');
      return `${setNumberFormat(arrDate[2])} ${arrDate[1]}, ${arrDate[3]}`;

    } else if (format === 4) {
        // 9:58 PM ======= 4
      const arrDate = convertedDate.toString().split(' ');
      return setTimeFormat(arrDate[4]);

    } else if (format === 5) {
        // 2024-12-06 ======= 5
      const msec = Date.parse(convertedDate.toString());
      const currentTime = new Date(msec);
      const month = String(currentTime.getMonth() + 1).padStart(2, '0');
      const day = String(currentTime.getDate()).padStart(2, '0');
      const year = currentTime.getFullYear();
      return `${year}-${month}-${day}`;

    } else if (format === 6) {
        // {date: '6th Dec, 2024', time: '9:59 PM'}
      const arrDate = convertedDate.toString().split(' ');
      return {
        date: `${setNumberFormat(arrDate[2])} ${arrDate[1]}, ${arrDate[3]}`,
        time: setTimeFormat(arrDate[4]),
      };

    } else if (format === 7) {
        // 2024-12-05
      convertedDate.setDate(convertedDate.getDate() - 1);
      const msec = Date.parse(convertedDate.toString());
      const currentTime = new Date(msec);
      const month = String(currentTime.getMonth() + 1).padStart(2, '0');
      const day = String(currentTime.getDate()).padStart(2, '0');
      const year = currentTime.getFullYear();
      return `${year}-${month}-${day}`;

    } else {
        // Fri Dec 06 2024 22:00:51 GMT-1200 (GMT-12:00)
      return convertedDate.toString();
    }
  }
  
  function setNumberFormat(val: string) {
    const day = Number(val);
    // if (day === 1) return `${day}st`;
    // if (day === 2) return `${day}nd`;
    // if (day === 3) return `${day}rd`;
    // return `${day}th`;
    const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
          ? "rd"
          : "th";
          return `${day}${suffix}`
  }
  
  function setTimeFormat(getTime: string): string {
    const arrTime = getTime.split(':');
    let md: string;
    let hour = Number(arrTime[0]);
  
    if (hour < 12) {
      md = 'AM';
    } else if (hour === 12) {
      md = 'PM';
    } else {
      hour -= 12;
      md = 'PM';
    }
  
    return `${hour}:${arrTime[1]} ${md}`;
  }
 export function getScheduleDate(date: Date, setTimeZone = "",currentDate: string,prevDate: string) {
    date = new Date(date.toLocaleString("en-US", { timeZone: setTimeZone }));
    const getDate = date.toLocaleDateString('en-CA');
    const arrDate = date.toString().split(' ');
    let setDateFormat: string = '';
    // console.log("arrDate",arrDate);
    // console.log("getDate",getDate);
    
    if(getDate === currentDate) {
        setDateFormat = 'Today ' + setNumberFormat(arrDate[2]) + ' ' + arrDate[1];
    } else if(getDate === prevDate) {
        setDateFormat = 'Yesterday ' + setNumberFormat(arrDate[2]) + ' ' + arrDate[1];
    } else {
        setDateFormat = date.toLocaleDateString('en-US', { weekday: 'long' }) + ' ' + setNumberFormat(arrDate[2]) + ' ' + arrDate[1];
    }
    // console.log("setDateFormat",setDateFormat);
    
    return setDateFormat;
}

export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const day = days[date.getDay()];
  const month = months[date.getMonth()];
  const dayOfMonth = date.getDate();

  // Add ordinal suffix for the day
  const ordinalSuffix = (n: number) => {
    if (n > 3 && n < 21) return "th"; // Covers 11th - 19th
    switch (n % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };

  const time = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true, 
  });

  return `${day}, ${dayOfMonth}${ordinalSuffix(dayOfMonth)} ${month}, ${time}`;
};

export function getMonth(date: Date) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[date.getMonth()];
}

export  function isSameDay(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}
export function getDay(date: Date) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}
export function getDate(date: Date) {
  return date.getDate() + " " + getMonth(date);
}