import { getEnumValueByIndex } from 'src/common/utils';

export enum Route {
	LiberiaToNosara = 'Liberia - Nosara',
	NosaraToLiberia = 'Nosara - Liberia',
	SanJoseToNosara = 'San José - Nosara',
	NosaraToSanJose = 'Nosara - San José',
	LiberiaDowntownToNosara = 'Liberia Downtown - Nosara',
}

const oppositeRoutesMap = new Map<Route, Route>([
	[Route.LiberiaToNosara, Route.NosaraToLiberia],
	[Route.NosaraToLiberia, Route.LiberiaToNosara],
	[Route.SanJoseToNosara, Route.NosaraToSanJose],
	[Route.NosaraToSanJose, Route.SanJoseToNosara],
	[Route.LiberiaDowntownToNosara, Route.NosaraToLiberia],
]);

export const getOppositeRoute = (route: Route): Route | undefined => {
	return oppositeRoutesMap.get(route);
};

export const mapRoute = (index: number): Route => {
	return getEnumValueByIndex(Route, index);
};
