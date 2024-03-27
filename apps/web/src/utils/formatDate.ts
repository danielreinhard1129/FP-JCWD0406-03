// File: formatDate.tsx

const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('id-ID', options);
};

const formatDateRange = (startDate: Date, endDate: Date): string => {
  const startMonth = startDate?.toLocaleDateString('en-US', { month: 'short' });
  const endMonth = endDate?.toLocaleDateString('en-US', { month: 'short' });

  const options: Intl.DateTimeFormatOptions = { day: 'numeric' };

  const formattedStartDate = startDate?.toLocaleDateString('en-US', options);
  const formattedEndDate = endDate?.toLocaleDateString('en-US', options);

  if (startMonth === endMonth) {
    return `${startMonth} ${formattedStartDate}-${formattedEndDate}`;
  } else {
    return `${startMonth} ${formattedStartDate}-${endMonth} ${formattedEndDate}`;
  }
};

const formatDateNew = (
  startDate: Date | null,
  endDate: Date | null,
): string => {
  if (!startDate || !endDate) return '';

  const startMonth = startDate.toLocaleDateString('en-US', { month: 'short' });
  const endMonth = endDate.toLocaleDateString('en-US', { month: 'short' });

  const options: Intl.DateTimeFormatOptions = { day: 'numeric' };

  const formattedStartDate = startDate.toLocaleDateString('en-US', options);
  const formattedEndDate = endDate.toLocaleDateString('en-US', options);

  if (startMonth === endMonth) {
    return `${startMonth} ${formattedStartDate}-${formattedEndDate}`;
  } else {
    return `${startMonth} ${formattedStartDate}-${endMonth} ${formattedEndDate}`;
  }
};

export { formatDate, formatDateRange, formatDateNew };
