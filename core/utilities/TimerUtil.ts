export function getMatchTimer(matchDate: Date): string {
    const currentStamp = new Date().getTime();
    const matchDateObj = typeof matchDate === "string" ? new Date(matchDate) : matchDate;
    const matchStamp = matchDateObj.getTime();
    const diff = Math.round((matchStamp - currentStamp) / 1000);
  
    if (diff > 0) {
      const hours = Math.floor(diff / 3600);
      const minutes = Math.floor((diff % 3600) / 60);
      return `Watch in ${hours}h ${minutes}m`;
    } else {
      return "Watch Live";
    }
  }

  // export function scheduleMatchTimer(
  //   matchDate: Date,
  //   updateTimerState: (state: { enableStream: boolean; content: string }) => void
  // ) {
  //   const currentStamp = new Date().getTime();
  //   const matchStamp = matchDate.getTime();
  //   let diff = Math.round((matchStamp - currentStamp) / 1000);
  
  //   if (diff > 0) {
  //     const days = Math.floor(diff / (24 * 60 * 60));
  //     diff -= days * 24 * 60 * 60;
  
  //     const hours = Math.floor(diff / (60 * 60));
  //     diff -= hours * 60 * 60;
  
  //     const minutes = Math.floor(diff / 60);
  //     const seconds = diff % 60;
  
  //     let enableStream = false;
  //     let content = "";
  //     let interval = 1000 * 60; // Default interval
  
  //     if (hours > 0) {
  //       content = `Watch Live In <br><b class="complete">${hours}h : ${minutes}m</b>`;
  //     } else if (minutes > 0) {
  //       content = `Watch Live In <br/><b class="complete">${minutes}m : ${seconds}s</b>`;
  //       interval = 1000; // Update every second
  //     } else {
  //       enableStream = true;
  //       content = `
  //         <label id="watch_liv_btn">
  //           <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF5000" xmlns="http://www.w3.org/2000/svg">
  //             <path d="M6.5 6.47v11.06c0 .844.943 1.357 1.67.898l8.826-5.531a1.06 1.06 0 000-1.805L8.17 5.572c-.727-.459-1.67.054-1.67.897z" fill="#FF5000"></path>
  //           </svg>
  //           Watch live
  //         </label>`;
  //     }
  
  //     updateTimerState({ enableStream, content });
  
  //     if (!enableStream) {
  //       setTimeout(() => {
  //         scheduleMatchTimer(matchDate, updateTimerState);
  //       }, interval);
  //     }
  //   } else {
  //     updateTimerState({
  //       enableStream: true,
  //       content: `
  //         <label id="watch_liv_btn">
  //           <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF5000" xmlns="http://www.w3.org/2000/svg">
  //             <path d="M6.5 6.47v11.06c0 .844.943 1.357 1.67.898l8.826-5.531a1.06 1.06 0 000-1.805L8.17 5.572c-.727-.459-1.67.054-1.67.897z" fill="#FF5000"></path>
  //           </svg>
  //           Watch live
  //         </label>`,
  //     });
  //   }
  // }
  