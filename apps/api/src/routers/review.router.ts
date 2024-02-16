import { RiviewController } from '@/controllers/review.controller';
import { Router } from 'express';

export class ReviewRouter {
  private router: Router;
  private reviewController: RiviewController;

  constructor() {
    this.reviewController = new RiviewController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/review', this.reviewController.Riview);
    this.router.post('/comment', this.reviewController.Comment);
  }

  getRouter(): Router {
    return this.router;
  }
}
