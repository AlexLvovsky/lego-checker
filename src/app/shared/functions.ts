import { SearchCriteria } from './interfaces';

export function buildUrlParams(searchCriteria: SearchCriteria): string {
  return Object.keys(searchCriteria)
    .filter(key => searchCriteria[key] !== undefined)
    .map(key => {
      const value = searchCriteria[key]!;
      return `${key}=${encodeURIComponent(value.toString())}`;
    })
    .join('&');
}

export function buildYears(): number[] {
  const max = new Date().getFullYear();
  const years: number[] = [];
  let min = 1949;

  while (min <= max) {
    years.push(min++);
  }

  return years.reverse();
}

export function getNoImageUrl() {
  return 'data:image/svg+xml;utf8,%3Csvg%20width%3D%22800%22%20height%3D%22800%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%22800%22%20height%3D%22800%22%20fill%3D%22%23cccccc%22%2F%3E%20%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20fill%3D%22%23333333%22%20font-family%3D%22Comic%20Sans%20MS%22%20font-size%3D%2230%22%20font-weight%3D%22normal%22%20text-anchor%3D%22middle%22%20alignment-baseline%3D%22middle%22%3ENO%20IMAGE%3C%2Ftext%3E%20%3C%2Fsvg%3E';
}

export function hexToRgb(hex: string): number[] {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
  hex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
  const result = fullHexRegex.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : [0, 0, 0];
}
