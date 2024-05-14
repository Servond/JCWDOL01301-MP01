import { SampleController } from '@/controllers/sample.controller';
import { Router } from 'express';

export class SampleRouter {
  private router: Router;
  private sampleController: SampleController;

  constructor() {
    this.sampleController = new SampleController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.sampleController.getSampleData);
    this.router.get('/:id', this.sampleController.getSampleDataById);
    this.router.post('/', this.sampleController.createSampleData);
  }

  getRouter(): Router {
    return this.router;
  }
}

// public createTodoQuery = async (
//   userId: number,
//   task: string
// ): Promise<Todo> => {
//   try {
//     const t = await prisma.$transaction(async (prisma) => {
//       try {
//         const todo = await prisma.todos.create({
//           data: {
//             userId,
//             task: task.toUpperCase(),
//             isCompleted: false,
//           },
//         });

//         return todo;
//       } catch (err) {
//         throw err;
//       }
//     });
//     return t;
//   } catch (err) {
//     throw err;
//   }
// };