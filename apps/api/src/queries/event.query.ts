import { PrismaClient } from "@prisma/client";
// import { Event } from "@prisma/client";
import { IEvent } from "@/interface/event.interface";
import { IPromotion } from "@/interface/promotion.interface";

const prisma = new PrismaClient()

const createEventQuery = async (
    name: string,
    description: string,
    image: string,
    location: string,
    userId: number,
    created_date: Date,
    is_active: boolean,
    available_seats: number,
    start_date: Date,
    end_date: Date,
    categoryId: number,
    promotionId: number,
) => {
    // try {
    //     const test = prisma.$transaction(async (prisma) => {
         try {
            const event = await prisma.event.create({
                data: {
                    name,
                    description,
                    image,
                    location,
                    userId,
                    created_date,
                    is_active,
                    available_seats,
                    start_date,
                    end_date,
                    categoryId,
                    promotionId
                }
            })
         } catch (error) {
            throw error
         }
        // })
        
    //     return test
    // } catch (error) {
    //     throw error
    // }
}

// const getEventQuery = async (filters: {
//     name?: string,
//     description?: string,
//     image?: string,
//     location?: string,
//     userId?: number,
//     created_date?: Date,
//     is_active?: boolean,
//     available_seats?: number,
//     start_date?: Date,
//     end_date?: Date,
//     categoryId?: number,
//     promotionId?: number
//   }): Promise<Event[]> => {
//     try {
//       const { branchName, location, page, pageSize } = filters;
//       const skipPage =
//         Number(page) > 1 ? (Number(page) - 1) * Number(pageSize) : 0;
//       const branches = await prisma.branch.findMany({
//         skip: skipPage,
//         take: Number(pageSize),
//         where: {
//           branchName: {
//             contains: branchName,
//           },
//         },
//       });
  
//       return branches;
//     } catch (err) {
//       throw err;
//     }
//   };

const getEventQuery = async (id: number) => {
    try {
      const event = await prisma.event.findUnique({
        where: {
          id,
        },
      });
      return event;
    } catch (err) {
      throw err;
    }
  };

export {
    createEventQuery,
    getEventQuery
}

export class EventQuery {
  async getEventsQuery (
    filters: {
      name?: string
      page?: number
      pageSize?: number
    }
  ) {
    try {
      const { name, page, pageSize } = filters
      const skipPage = 
      Number(page) > 1 ? (Number(page) - 1) * Number(pageSize) : 0;
      const events = await prisma.event.findMany({
        skip: skipPage,
        take: Number(pageSize),
        where: {
          name: {
            contains: name
          }
        }
      })
      return events
    } catch (error) {
      throw error
    }
    
  }

  async getEventQuery (
    id: number) {
      try {
        const event = await prisma.event.findUnique({
          where: {
            id,
          }
        })

        return event
      } catch (error) {
        throw error
      }
    }
  
  async createEventQuery(data: IEvent) {
    try {
      const eventData = await prisma.event.create({
        data: {
          userId: data.userId,
          name: data.name,
          description: data.description,
          image: data.image,
          location: data.location,
          available_seats: data.available_seats,
          start_date: new Date(data.start_date),
          end_date: new Date(data.end_date),
          categoryId: data.categoryId,
          promotionId: data.promotionId,
        },
      });
  
      return eventData;
    } catch (error) {
      throw error; // Re-throw the error for proper handling
    }
    }

  async createPromotionQuery(
    data: IPromotion
  ) {
    try {
      const { 
        promotion_name,
        discount,
        usage_limit,
        start_date,
        end_date
       } = data;
      const promotion = await prisma.promotion.create({
        data: {
          promotion_name,
          discount,
          usage_limit,
          start_date: new Date(start_date),
          end_date: new Date(end_date)
        }
      })

      return promotion
    } catch (error) {
      throw error
    }
  }
  }