import { NextApiHandler } from 'next';
import fs from 'fs';

const handler: NextApiHandler = (req, res) => {
  try {
    fs.writeFileSync(
      'database/sitemap.json',
      JSON.stringify({
        pages: {},
      }),
      'utf-8'
    );

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
