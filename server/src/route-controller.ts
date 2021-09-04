import { Application } from 'express';
import { StaticRoutes } from './routes/StaticFileRoutes';
import { staticDataRoutes } from './routes/StaticDataRoutes';
import { AllergyInfoRoutes } from './routes/AllergyInfoRoutes';

class RouteController {
  constructor(private app: Application) {
    this.apply();
  }
  
  private apply(): void {
    this.app.use('/api', AllergyInfoRoutes);
    this.app.use('/static/', staticDataRoutes);
    const a = new StaticRoutes(this.app);
  }
}

export { RouteController };
