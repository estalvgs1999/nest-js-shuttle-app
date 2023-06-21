import { getEnumValueByIndex } from 'src/common/utils';

export enum TripMode {
	Private,
	Shared,
	Shuttle,
}

export const mapTripMode = (index: number): TripMode => {
	return getEnumValueByIndex(TripMode, index);
};
