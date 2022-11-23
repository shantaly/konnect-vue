export const getDayDiff = (startDate: Date, endDate: Date): number => {
  const msInDay = 24 * 60 * 60 * 1000

  return Math.round(Math.abs(Number(endDate) - Number(startDate)) / msInDay)
}
