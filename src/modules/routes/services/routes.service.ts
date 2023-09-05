import { Injectable } from '@nestjs/common';
import { Route } from '../enums';

@Injectable()
export class RoutesService {
  private oppositeRoutesMap = new Map<Route, Route>([
    [Route.LiberiaToNosara, Route.NosaraToLiberia],
    [Route.NosaraToLiberia, Route.LiberiaToNosara],
    [Route.SanJoseToNosara, Route.NosaraToSanJose],
    [Route.NosaraToSanJose, Route.SanJoseToNosara],
    [Route.LiberiaDowntownToNosara, Route.NosaraToLiberia],
  ]);

  public getOppositeRoute(route: Route): Route {
    return this.oppositeRoutesMap.get(route);
  }
}
