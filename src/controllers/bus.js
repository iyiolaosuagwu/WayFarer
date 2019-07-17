import busQueries from '../models/busQuery';

// validator
import validateBusInput from '../validation/bus';

const busController = {};

// @route    GET api/bus
// @desc     get all bus
// @access   Private
busController.getAllBus = async (req, res) => {
   try {
      if (!req.body.is_admin) {
         return res.json({ error: 'only admin can view all user' });
      }

      const bus = await busQueries.findBuses();

      if (!bus.length) {
         return res.json({ error: 'Buses not found' });
      }

      return res.status(200).json({
         status: 'success',
         data: bus
      });
   } catch (error) {
      return res.status(500).json({
         status: 'error',
         error: 'oops! something went wrong went wrong'
      });
   }
};

// @route    POST api/trip
// @desc     Create a new bus
// @access   Private
busController.createNewBus = async (req, res) => {

   const { errors, isValid } = validateBusInput(req.body);

   // Check Validation
   if (!isValid) return res.status(400).json(errors);

   const {
      user_id,
      numberplate,
      manufacturer,
      model,
      year,
      capacity,
      maxseat
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

      const newBus = await busQueries.createNewBus(user_id, numberplate, manufacturer, model, year, capacity, maxseat);

      const payload = {
         id: newBus.id,
         owner: req.body.user_id,
         number_plate: newBus.numberplate,
         manufacturer: newBus.manufacturer,
         model: newBus.model,
         year: newBus.year,
         capacity: newBus.capacity,
         max_seat: newBus.max_seat
      };

      return res.status(200).json({
         status: 'success',
         data: payload,
         message: 'Bus was successfully created'
      });
   } catch (error) {
      return res.status(500).json({ status: 'error', error: 'oops! something went wrong went wrong' });
   }
};

export default busController;
