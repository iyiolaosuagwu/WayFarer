import busQueries from '../models/busQuery';
// import userQueries from '../models/userQuery';

const busController = {};


busController.createBus = async (req, res) => {
   const {
      busId, numberPlate, manufacturer, model, year, capacity
   } = req.body;
   try {
      const newBus = await busQueries.createNewBus(
         busId, numberPlate, manufacturer, model, year, capacity
      );
      return res.status(201).json({
         status: 'success',
         message: 'Bus was successfully created',
         data: newBus
      });
   } catch (error) {
      res.status(500).json({
      status: 'error',
      error: 'Internal server error'
   });
   }
};

export default busController;
