import { NextApiHandler } from 'next';

import { fakeDatabase } from 'libs/api/fake-database/src';

const handler: NextApiHandler = (req, res) => {
  const { slug } = req.body;

  try {
    const page = fakeDatabase.getPage(slug);

    if (!page) {
      res.status(404).json({
        notFound: true,
      });
      return;
    }

    res.status(200).json({ page });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      notFound: true,
    });
    return;
  }
};

export default handler;
