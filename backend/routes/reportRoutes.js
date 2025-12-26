import express from 'express';
import { getDb } from '../firebase.js';
import { sendConfirmationEmail } from '../email.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { email, city, pincode, category, description, coordinates } = req.body;

    if (!email || !category || !description) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const referenceId = generateReferenceId();
    const payload = {
      referenceId,
      email,
      city: city || '',
      pincode: pincode || '',
      category,
      description,
      coordinates: coordinates || null,
      status: 'Submitted',
      createdAt: new Date(),
    };

    const db = getDb();
    await db.collection('issues').doc(referenceId).set(payload);
    await sendConfirmationEmail(email, payload);

    res.json({ referenceId });
  } catch (err) {
    console.error('[report] Failed to submit issue', err);
    res.status(500).json({ error: 'Unable to submit issue right now.' });
  }
});

function generateReferenceId() {
  const random = Math.floor(Math.random() * 900000) + 100000;
  return `CIT-${Date.now().toString().slice(-4)}${random}`;
}

export default router;
