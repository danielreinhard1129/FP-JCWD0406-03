import { RiviewController } from '@/controllers/review/review.controller';
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
    this.router.get('/review/all', this.reviewController.getRiviewController);
    this.router.get(
      '/review/:id',
      this.reviewController.findRiviewByIdController,
    );
    this.router.post(
      '/review/property/:id',
      this.reviewController.findReviewByPropertyId,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
