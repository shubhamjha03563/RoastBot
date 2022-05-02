exports.daysUntilNext = (month, day) => {
  var tday = new Date(),
    y = tday.getFullYear(),
    next = new Date(y, month - 1, day);
  tday.setHours(0, 0, 0, 0);
  if (tday > next) next.setFullYear(y + 1);
  return Math.round((next - tday) / 8.64e7);
};
