export function getFormattedTime() {
      const now = new Date();
      let hours = now.getHours();
      let period = hours >= 12 ? "pm" : "am";
  
      // Convert 24-hour format to 12-hour format
      hours = hours % 12 || 12;
  
      return `${hours} ${period}`;
}
