import { NextFunction, Request, Response } from 'express';
import prisma from '@/prisma';
import { IPromotion } from '@/interface/promotion.interface';
// import { Event } from '@/interface/event.interface';

export class EventController {
  async getEventData(req: Request, res: Response) {
    const eventData = await prisma.event.findMany();

    return res.status(200).send(eventData);
  }

  async getEventDataById(req: Request, res: Response) {
    const { id } = req.params;

    const event = await prisma.event.findUnique({
      where: { id: Number(id) },
    });

    if (!event) {
      return res.status(404).json({message: "LAH KOK GA ADA"})
    }

    return res.status(200).json({
        message: "ada nih",
        event
    })
  }

  async createEvent(req: Request, res: Response): Promise<void> {
    try {
      const {
        name,
        description,
        image,
        location,
        available_seats,
        start_date,
        end_date,
        categoryId,
        userId
      } = req.body;
  
      if (!userId) {
        res.status(400).json({ message: "Missing user ID in request body" });
      }

      const existingUser = await prisma.user.findUnique({
        where: { id: userId },
      });
  
      if (!existingUser) {
        res.status(400).json({ message: "Invalid user ID provided" });
      }
  
      const newEvent = await prisma.event.create({
        data: {
          name,
          description,
          image,
          location,
          userId,
          available_seats,
          start_date: new Date(start_date),
          end_date: new Date(end_date),
          categoryId
        },
      });
  
      res.status(201).json({ message: "Berhasil membuat event", data: newEvent });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  
//   async createPromotion(data: IPromotion) {
//     try {
//       const { promotion_name, discount, usage_limit, start_date, end_date } = data;

//       const createPromotion = await prisma.promotion.create({
//         data: {
//           promotion_name,
//           discount,
//           usage_limit,
//           start_date: new Date(start_date), 
//           end_date: new Date(end_date),  
//         },
//       });
  
//       return createPromotion;
//     } catch (error) {
//       console.error(error);
//       throw new Error('Internal server error'); 
//     }
//   }
}