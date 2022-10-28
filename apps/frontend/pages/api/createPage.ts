import { NextApiHandler } from 'next';

import { fakeDatabase } from 'libs/api/fake-database/src';

const handler: NextApiHandler = (req, res) => {
  const { slug, page } = req.body;

  try {
    fakeDatabase.createPage(slug, page);

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: true,
    });
    return;
  }
};

export default handler;
