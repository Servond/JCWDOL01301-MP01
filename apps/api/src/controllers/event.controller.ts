import { Request, Response } from 'express';
import prisma from '@/prisma';
import { Event } from '@/interface/event.interface';

export class EventController {
  async getEventData(req: Request, res: Response) {
    const eventData = await prisma.sample.findMany();

    return res.status(200).send(eventData);
  }

  async getEventDataById(req: Request, res: Response) {
    const { id } = req.params;

    const event = await prisma.sample.findUnique({
      where: { id: Number(id) },
    });

    if (!event) {
      return res.send(404);
    }

    return res.status(200).send(event);
  }

  async createEvent(req: Request, res: Response): Promise<void> {
    try {
      // Extract request body data
      const {
        name,
        description,
        image,
        location,
        available_seats,
        start_date,
        end_date,
        categoryId,
        userId, // Make userId required
      } = req.body;
  
      // Check for missing userId
      if (!userId) {
        res.status(400).json({ message: "Missing user ID in request body" });
      }
  
      // Verify user existence (optional)
      const existingUser = await prisma.user.findUnique({
        where: { id: userId },
      });
  
      if (!existingUser) {
        res.status(400).json({ message: "Invalid user ID provided" });
      }
  
      // Create the new event
      const newEvent = await prisma.event.create({
        data: {
          name,
          description,
          image,
          location,
          userId,
          available_seats,
          start_date: new Date(start_date), // Assuming start_date is a string
          end_date: new Date(end_date),   // Assuming end_date is a string
          categoryId,
        },
      });
  
      res.status(201).json({ message: "Berhasil membuat event", data: newEvent });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  
}