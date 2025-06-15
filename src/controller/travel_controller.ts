import { Request, Response } from "express";
import Travel from "../models/Travel";

const TravelController = {
  index: async (req: Request, res: Response) => {
    try {
      const userId = req.query.userId; // example@example.com
      const travels = await Travel.findAll({
        where: {
          userId: userId
        }
      });

      return res.status(200).json({
        status: 200,
        message: "Travel sent successfully.",
        travels: travels
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: `Error fetching travels: ${error.message}`
      })
    }
  },
  show : async (req: Request, res: Response) => {
    try {
      const travelId = req.params.id; // id dari travel yang ingin diambil
      const travel = await Travel.findByPk(travelId);

      if (travel == null) {
        return res.status(404).json({
          status: 404,
          message: "Travel not found."
        })
      }

      return res.status(200).json({
        status: 200,
        message: "Travel sent successfully.",
        travel: travel
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: `Error fetching travel: ${error.message}`
      })
    }
  },
store: async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 400,
        message: "Image file is required."
      })
    }

    // "https://balblaba.com/public/images/aslfjskdfjka.jpg"
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const imageUrl = `${baseUrl}/public/images/${req.file.filename}`;

    const todo = await Travel.create({
      ...req.body,
      imageUrl: imageUrl,
    })

    return res.status(200).json({
      status: 200,
        message: "Travel created successfully.",
        travel: todo
    })
      } catch (error: any) {
   
      }
    },
    update: async (req: Request, res: Response) => {
        try {
            //https://balblaba.com/travel/1
            const travelId = req.params.id; //1
            const travel = await Travel.findByPk(travelId);

            if (travel == null) {
                return res.status(404).json({
                    status: 404,
                    message: "Travel not found."
                })
            }

            if (req.file) {
                // "https://balblaba.com/public/images/aslfjskdfjka.jpg"
                const baseUrl = `${req.protocol}://${req.get("host")}`;
                const imageUrl = `${baseUrl}/public/images/${req.file.filename}`;
                req.body.imageUrl = imageUrl; // update imageUrl
            }

            await travel.update(req.body)
            
            return res.status(200).json({
                status: 200,
                message: "Travel updated successfully.",
                travel: travel
            })
        } catch (error: any) { 
            return res.status(500).json({
                status: 500,
                message: `Error updating travel: ${error.message}`
            })
        }
},
  destroy: async (req: Request, res: Response) => {
    try {
      const travelId = req.params.id; // id dari travel yang ingin dihapus
      const travel = await Travel.findByPk(travelId);

      if (travel == null) {
        return res.status(404).json({
          status: 404,
          message: "Travel not found."
        })
      }

      await travel.destroy();

      return res.status(200).json({
        status: 200,
        message: "Travel deleted successfully."
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: `Error deleting travel: ${error.message}`
      })
    }
  }
}
export default TravelController;