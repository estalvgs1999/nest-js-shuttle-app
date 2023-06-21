import { getEnumValueByIndex } from 'src/common/utils';

export enum FlightType {
	Arrival,
	Departure,
}

export const mapFlightType = (index: number): FlightType => {
	return getEnumValueByIndex(FlightType, index);
};
