import { NextApiHandler } from 'next';

import { fakeDatabase } from 'libs/api/fake-database/src';

const handler: NextApiHandler = (req, res) => {
  const { slug } = req.body;

  try {
    fakeDatabase.deletePage(slug);
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
