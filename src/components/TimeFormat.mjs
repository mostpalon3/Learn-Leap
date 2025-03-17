export function getFormattedTime(i) {
      const now = new Date();
      let hours = now.getHours();
      let period = (hours+i) % 24 >= 12 ? "pm" : "am";
  
      // Convert 24-hour format to 12-hour format
      hours = (hours+i) % 12 || 12;
      const hoursStr = String(hours).padStart(2, "0");
  
      return `${hoursStr} ${period}`;
}
