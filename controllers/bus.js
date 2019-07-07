import busQueries from '../models/busQuery';

const busController = {};

busController.getAllBus = async (req, res) => {
   try {
      const bus = await busQueries.findAllBuss();

      if (!bus) {
         return res.json({ msg: 'Buss not found' });
      }

      return res.status(200).json({
         status: 'success',
         data: bus
      });
   } catch (error) {
      return res.status(400).json({
         status: 'error',
         data: []
      });
   }
};

export default busController;
