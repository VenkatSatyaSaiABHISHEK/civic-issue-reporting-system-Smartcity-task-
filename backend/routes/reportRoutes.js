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
    
    console.log('[report] Queuing confirmation email to:', email);
    // Send email in background (don't wait for it)
    sendConfirmationEmail(email, payload).catch(err => {
      console.error('[report] Background email error:', err.message);
    });

    console.log('[report] Issue submitted successfully:', referenceId);
    res.json({ referenceId });
  } catch (err) {
    const errorMsg = err.message || 'Unknown error';
    const errorCode = err.code || 'UNKNOWN';
    console.error('[report] Error Code:', errorCode);
    console.error('[report] Error Message:', errorMsg);
    console.error('[report] Full Error:', err);
    
    // Return more specific error messages
    let userMessage = 'Unable to submit issue right now.';
    if (errorMsg.includes('PERMISSION_DENIED') || errorMsg.includes('permission')) {
      userMessage = 'Firebase permission error. Check credentials on server.';
    } else if (errorMsg.includes('UNKNOWN')) {
      userMessage = 'Firebase connection issue. Please try again.';
    }
    
    res.status(500).json({ error: userMessage });
  }
});

function generateReferenceId() {
  const random = Math.floor(Math.random() * 900000) + 100000;
  return `CIT-${Date.now().toString().slice(-4)}${random}`;
}

export default router;
