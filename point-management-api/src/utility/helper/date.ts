function getDateInform(dateString: string): string {
  if (dateString && dateString !== '') {
    const date = new Date(dateString);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    return date.toLocaleString('th-TH', {
      year: 'numeric',
      month: '2-digit',
      day: 'numeric',
    });
  }

  return '';
}

function getDateTimeDisplayLocal(dateString: string): string {
  if (dateString && dateString !== '') {
    const date = new Date(dateString);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    return date.toLocaleString('th-TH', {
      year: 'numeric',
      month: '2-digit',
      day: 'numeric',
    });
  }

  return '';
}

const getDateISOTime = (date: string) => {
  const newDate = new Date(
    ` ${new Date(date ?? '').getMonth() + 1}/${new Date(date ?? '').getDate()}/${new Date(date ?? '').getFullYear()} ${
      new Date(date ?? '').getHours() + 7
    }:${new Date(date ?? '').getMinutes()}`,
  ).toISOString();

  return newDate;
};

function getDateStringFromDateTime(date: Date | null): string {
  if (date) {
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    return date.toLocaleString('th-TH', {
      year: 'numeric',
      month: '2-digit',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });
  }

  return '';
}

const getYearBudgetLastDigit = () => {
  const date = new Date();
  const now = new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
  const year = date.getFullYear() + 543;

  if (now >= new Date(`${date.getFullYear()}-10-01 00:00:00`) && now <= new Date(`${date.getFullYear()}-12-31 23:59:59`)) {
    return `${year + 1}`.substring(year >= 3000 ? 1 : 2, 4);
  }

  return `${year}`.substring(year >= 3000 ? 1 : 2, 4);
};

const dateToDateString = (date: Date) => {
  const now = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()} ${String(
    date.getHours(),
  ).padStart(2, '0')}.${String(date.getMinutes()).padStart(2, '0')}`;
  return now;
};

export default {
  getDateInform,
  getDateTimeDisplayLocal,
  getDateISOTime,
  getDateStringFromDateTime,
  getYearBudgetLastDigit,
  dateToDateString,
};
