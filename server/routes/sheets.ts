import { Router, Request, Response } from 'express';
import { getSheetData } from '../services/googleSheets';

const router = Router();

router.get('/data/:sheetName', async (req: Request, res: Response) => {
  try {
    const { sheetName } = req.params;
    const range = req.query.range as string | undefined;
    const data = await getSheetData(sheetName, range);
    res.json(data);
  } catch (error: any) {
    console.error(`Error fetching sheet "${req.params.sheetName}":`, error.message);
    res.status(500).json({ error: error.message || 'Failed to fetch sheet data' });
  }
});

export default router;
