export const isMatchLiveNow = (match_status: number, startDate: string): boolean => {
    // console.log("Match Status:", match_status, "Start Time:", start_date_time);
  
    // Check if the match is ongoing
    const now = new Date(); // Current time
    const startDateUtc = new Date(startDate); // Match start time

    const diffMs = startDateUtc.getTime() - now.getTime();
    const isPast = diffMs < 0;

    if (isPast && match_status !== 3) {
        return true;
    }else{
        return false;
    }

  };