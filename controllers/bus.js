import busQueries from '../models/busQuery';


const busController = {};


busController.getAllBus = async (req, res) => {
   try {
      if (!req.body.is_admin) {
         return res.json({ error: 'only admin can view all user' });
      }

      const trip = await busQueries.findBuses();

      if (!trip) {
         return res.json({ msg: 'Trips not found' });
      }

      return res.status(200).json({
         status: 'success',
         data: trip
      });
   } catch (error) {
      return res.status(400).json({
         status: 'error',
         error: `Internal server error ${error.message}`
      });
   }
};


busController.createNewBus = async (req, res) => {
   const {
      user_id,
      numberplate,
      manufacturer,
      model,
      year,
      capacity
   } = req.body;


   try {
      if (!req.body.is_admin) {
         return res.json({ error: 'only admin can create a Bus' });
      }


      const existingNumberPlate = await busQueries.findPlateNumber(numberplate);
      if (existingNumberPlate) {
      return res.status(400).json({
            error: 'number plate Already Exists'
         });
      }


      const newBus = await busQueries.createNewBus(user_id, numberplate, manufacturer, model, year, capacity);

      const payload = {
         id: newBus.id,
         owner: req.body.user_id,
         number_plate: newBus.numberplate,
         manufacturer: newBus.manufacturer,
         model: newBus.model,
         year: newBus.year,
         capacity: newBus.capacity

      };

      return res.status(200).json({
         status: 'success',
         data: payload,
         message: 'Bus was successfully created'
      });
   } catch (error) {
      // return res.status(500).json({ status: 'error', error: 'Internal server error' });
      console.log(error);
   }
};

export default busController;
