import { NextApiHandler } from 'next';

import { fakeDatabase } from 'libs/api/fake-database/src';

const handler: NextApiHandler = (req, res) => {
  try {
    const pages = fakeDatabase.getAllPages();

    if (!pages) {
      res.status(404).json({
        notFound: true,
      });
      return;
    }

    res.status(200).json({ pages });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      notFound: true,
    });
    return;
  }
};

export default handler;
