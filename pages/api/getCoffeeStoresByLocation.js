import { fetchCoffeeStores } from '../../lib/coffee-stores';

const getCoffeeStoresByLocation = async (req, res) => {
  try {
    const { latLong, limit } = req.query;
    const response = await fetchCoffeeStores(latLong, limit);
    res.status(200);
    res.json(response);
    // res.json({ req });
  } catch (err) {
    console.log('There is an error', err);
    res.status(500);
    res.json({ message: 'Oh no! Something went wrong', err });
  }

  //return
};

export default getCoffeeStoresByLocation;
//53.2734,-7.77832031
