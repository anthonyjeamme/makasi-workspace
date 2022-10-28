import { NextApiHandler } from 'next';

import { fakeDatabase } from 'libs/api/fake-database/src';

const handler: NextApiHandler = (req, res) => {
  const page = req.body.page;

  if (!page) return res.status(500).json({ error: true });

  try {
    fakeDatabase.updatePage(page);
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: true });
  }
};

export default handler;
