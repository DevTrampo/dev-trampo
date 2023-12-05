export function generateOrderByClauses(orderByParams: Array<string>): Array<string> {
  const orderByClauses: Array<string> = [];
  orderByParams.forEach(fieldWithDirection => {
    const [field, dir] = fieldWithDirection.split(':');
    const direction = dir === 'desc' ? 'desc' : 'asc';
    if (field) {
      orderByClauses.push(`${field} ${direction}`);
    }
  });
  return orderByClauses;
}

export function formatErrorMessage(errorMessage: string, replacements: Array<any>): string {
  return errorMessage.replace(/{\d+}/g, match => {
    const position = parseInt(match.match(/\d+/)[0], 10);
    return replacements[position] !== undefined ? replacements[position] : match;
  });
}

export function stringMatchesEnumValue(value: string, enumType: any): boolean {
  return Object.values(enumType).includes(value as any);
}
