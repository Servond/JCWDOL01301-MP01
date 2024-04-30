import { HttpException } from "@/exceptions/HttpException";
import { IEvent } from "@/interface/event.interface";
import { IPromotion } from "@/interface/promotion.interface";
import { EventQuery, createEventQuery, getEventQuery } from "@/queries/event.query";
import { Event, Promotion } from "@prisma/client";

// const createEventAction = async (
//     name: string,
//     description: string,
//     image: string,
//     location: string,
//     userId: number,
//     created_date: Date,
//     is_active: boolean,
//     available_seats: number,
//     start_date: Date,
//     end_date: Date,
//     categoryId: number,
//     promotionId: number
// ) => {
//     try {
//         const event = await this.EventQuery.(
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

//         return event
//     } catch (error) {
//         throw error
//     }
// }

const getEventAction = async (id: number): Promise<Event | null> => {
    try {
      const branch = await getEventQuery(id);
  
      if (!branch) throw new HttpException(404, "Data Not Found");
  
      return branch;
    } catch (err) {
      throw err;
    }
  };

export {
    // createEventAction,
    getEventAction
}

// const getBranchesAction = async (filters: {
//     branchName?: string;
//     location?: string;
//   }): Promise<Branch[]> => {
//     try {
//       const branches = await getBranchesQuery(filters);
  
//       return branches;
//     } catch (err) {
//       throw err;
//     }
//   };

export class EventAction {
    eventQuery: EventQuery;

    constructor() {
        this.eventQuery = new EventQuery()
      }

    async getEventsAction(
        filters: {
            name?: string;
        }
    ) {
        try {
            const events = await this.eventQuery.getEventsQuery(filters)

            return events
        } catch (error) {
            throw error
        }
    }

    async getEventAction(
        id: number
    ): Promise<Event> {
        try {
            const event = await getEventQuery(id)

            if (!event) throw new HttpException(404, "Data Not asik")

            return event
        } catch (error) {
            throw error
        }
    }

    async createEventAction(
        data: IEvent
    ): Promise<Event> {
        try {
            const eventData = await this.eventQuery.createEventQuery(data)

            return eventData
        } catch (error) {
            throw error
        }
    }

    async createPromotionAction(
        data: IPromotion
    ): Promise<Promotion> {
        try {
            const promotion = await this.eventQuery.createPromotionQuery(data)

            return promotion
        } catch (error) {
            throw error
        }
    }
}