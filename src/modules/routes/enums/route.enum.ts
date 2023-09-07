export enum Route {
  LiberiaToNosara = 'Liberia - Nosara',
  NosaraToLiberia = 'Nosara - Liberia',
  SanJoseToNosara = 'San José - Nosara',
  NosaraToSanJose = 'Nosara - San José',
  LiberiaDowntownToNosara = 'Liberia Downtown - Nosara',
}

export const oppositeRoutesMap = new Map<Route, Route>([
  [Route.LiberiaToNosara, Route.NosaraToLiberia],
  [Route.NosaraToLiberia, Route.LiberiaToNosara],
  [Route.SanJoseToNosara, Route.NosaraToSanJose],
  [Route.NosaraToSanJose, Route.SanJoseToNosara],
  [Route.LiberiaDowntownToNosara, Route.NosaraToLiberia],
]);
