import { getEnumValueByIndex } from 'src/common/utils';

export enum TripType {
	OneWay,
	RoundTrip,
}

export const mapTripType = (index: number): TripType => {
	return getEnumValueByIndex(TripType, index);
};
