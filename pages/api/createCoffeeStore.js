const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_ACCESS_TOKEN }).base(
  process.env.AIRTABLE_BASE_KEY
);

const table = base('coffee-stores');

const createCoffeeStore = async (req, res) => {
  if (req.method === 'POST') {
    const { id, name, address, neighbourhood, voting, imgUrl } = req.body;
    try {
      if (id) {
        const findCoffeeStoreRecords = await table
          .select({
            filterByFormula: `id=${id}`,
          })
          .firstPage();

        if (findCoffeeStoreRecords.length !== 0) {
          const records = findCoffeeStoreRecords.map((record) => {
            return {
              ...record.fields,
            };
          });
          res.json(records);
        } else {
          // create  record
          if (name) {
            const createRecords = await table.create([
              {
                fields: {
                  id,
                  name,
                  address,
                  neighbourhood,
                  voting,
                  imgUrl,
                },
              },
            ]);
            const records = createRecords.map((record) => {
              return {
                ...record.fields,
              };
            });
            res.json(records);
          } else {
            res.status(400);
            res.json({ message: 'Id or Name is missing' });
          }
        }
      } else {
        res.status(400);
        res.json({ message: 'Id or Name is missing' });
      }
    } catch (err) {
      console.error('Error creating or finding store', err);
      res.status(500);
      res.json({ message: 'Error creating or finding store', err });
    }
  }
};

export default createCoffeeStore;
