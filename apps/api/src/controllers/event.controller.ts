
import { EventAction, getEventAction } from "@/action/event.action";
import prisma from "@/prisma";
import { Request, Response, NextFunction } from "express";

// const createEventController = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ): Promise<void> => {
//     try {
//         const { 
//             name,
//             description,
//             image,
//             location,
//             userId,
//             created_date,
//             is_active,
//             available_seats,
//             start_date,
//             end_date,
//             categoryId,
//             promotionId
//          } = req.body;

//         const data = await createEventAction(
//             name,
//             description,
//             image,
//             location,
//             userId,
//             created_date,
//             is_active,
//             available_seats,
//             start_date,
//             end_date,
//             categoryId,
//             promotionId
//         )

//         res.status(200).json({
//             message: "Create event success",
//             data
//         })
//     } catch (error) {
//         next(error)
//     }
// }

// const getEventController = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): Promise<void> => {
//     try {
//       const filters = req.query;
  
//       const data = await getEventAction(filters);
  
//       res.status(200).json({
//         message: "Get Event Success",
//         data,
//       });
//     } catch (err) {
//       next(err);
//     }
//   };

// const getEventController = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): Promise<void> => {
//     try {
//       const { id } = req.params;
//       const data = await getEventAction(Number(id));
  
//       res.status(200).json({
//         message: "Get Event success",
//         data,
//       });
//     } catch (error) {
//       next(error);
//     }
//   };

export class EventController {
  eventAction: EventAction;

  constructor() {
    this.eventAction = new EventAction()
  }

  async getEventsData(
    req: Request, 
    res: Response, 
    next: NextFunction
  ) {
    try {
      const eventData = await prisma.event.findMany()  

      res.status(200).json({
        message: "Get Event success",
        eventData,
      });

      return eventData
    } catch (error) {
      next(error);
    }
  }

  async getEventDataById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params
    const data = await getEventAction(Number(id))


    res.status(200).json({
      message: "Get Event Success",
      data,
    });
    } catch (error) {
      next(error)
    }
  }

  async createEventData(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = await this.eventAction.createEventAction(req.body)

      res.status(200).json({
        message: "Succes Create Event",
        data
      })

    } catch (error) {
      next(error)
    }
  }

  async createPromotion(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const promotion = await this.eventAction.createPromotionAction(req.body)

      res.send(200).json({
        message: "Create promotion success",
        promotion
      })
    } catch (error) {
      console.log('tset')
      next(error)
    }
  }
}