export function ok() {
  return {
    status: 200,
    message: 'OK'
  };
}

export function toUnixTimestamp(date?: Date): number | undefined {
  if (!date) {
    return;
  }
  return date.getTime();
}

/**
 * @returns value in ms
 */
export function time(value: number, unit: 'seconds' | 'minutes' | 'hours' | 'days'): number {
  switch (unit) {
    case 'seconds':
      return value * 1000;
    case 'minutes':
      return value * 60 * 1000;
    case 'hours':
      return value * 60 * 60 * 1000;
    case 'days':
      return value * 24 * 60 * 60 * 1000;
    default:
      throw Error(`Unknown unit: ${unit}`);
  }
}

export function elapsedTimeSince(value: number, elapsedTime: number): boolean {
  return Date.now() > (value + elapsedTime);
}
