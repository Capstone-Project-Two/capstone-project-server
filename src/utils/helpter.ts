import { BadRequestException } from '@nestjs/common';
import dayjs from 'dayjs';

export function phoneFormat(ph: string) {
  const splitString = ph.slice(0, 4);
  return splitString.trim() + ph.slice(4, ph.length).trim();
}

export const wait = async (duration: number) => {
  await new Promise((res) => setTimeout(res, duration));
};

/**
 * @description Check time string if in HH:mm format
 * @param time 
 * @returns boolean
 */
export const isValidTimeFormat = (time: string): boolean => {
  const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;

  console.log(regex.test(time));

  return regex.test(time);
};

/**
 * 
 * @description Convert from time string (HH:mm) to ISOString
 * @returns Date
 */
export const timeStringToDate = ({
  time,
  date,
}: {
  time: string;
  date: Date;
}): Date => {
  const dateString = dayjs(date).format('YYYY-MM-DD');

  if (!isValidTimeFormat(time))
    throw new BadRequestException('Invalid time format. Use HH:mm');

  const dateTimeString = `${dateString}T${time}`;

  const dateTime = dayjs(dateTimeString).toISOString();

  return new Date(dateTime);
};

/**
 * 
 * @description Compares if date2 is after date1
 * @param date1
 * @param date2
 * @returns boolean
 */
export const compareDates = (date1: Date, date2: Date) => {
  const d1 = dayjs(date1)
  const d2 = dayjs(date2)

  return d2.isAfter(d1)
}
