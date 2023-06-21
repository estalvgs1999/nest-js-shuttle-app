export function getEnumValueByIndex<T>(
	enumObject: T,
	index: number,
): T[keyof T] | undefined {
	const values = Object.values(enumObject);
	const enumIndex = index - 1;

	if (enumIndex >= 0 && enumIndex < values.length) {
		return values[enumIndex];
	}

	return undefined;
}
