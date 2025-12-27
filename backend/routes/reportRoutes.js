import express from 'express';
import { getDb } from '../firebase.js';
import { sendConfirmationEmail } from '../email.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { email, city, pincode, street, category, description, coordinates, image } = req.body;

    console.log('[report] Received payload:', { email, city, pincode, street, category, coordinates });

    if (!email || !category || !description) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const referenceId = generateReferenceId();
    const payload = {
      referenceId,
      email,
      city: city || '',
      pincode: pincode || '',
      street: street || '',
      category,
      description,
      coordinates: coordinates || null,
      image: image || null,
      status: 'Submitted',
      createdAt: new Date(),
    };

    console.log('[report] Saving to Firestore:', referenceId);
    const db = getDb();
    await db.collection('issues').doc(referenceId).set(payload);
    
    console.log('[report] Sending confirmation email to:', email);
    await sendConfirmationEmail(email, payload);

    console.log('[report] Issue submitted successfully:', referenceId);
    res.json({ referenceId });
  } catch (err) {
    console.error('[report] Failed to submit issue:', err.message, err.stack);
    res.status(500).json({ error: 'Unable to submit issue right now.' });
  }
});

function generateReferenceId() {
  const random = Math.floor(Math.random() * 900000) + 100000;
  return `CIT-${Date.now().toString().slice(-4)}${random}`;
}

export default router;
