import express from 'express';
import { OAuth2Client } from 'google-auth-library';

const router = express.Router();
const clientId = process.env.GOOGLE_CLIENT_ID;
const oauthClient = clientId ? new OAuth2Client(clientId) : null;

if (!clientId) {
  console.warn('[auth] Missing GOOGLE_CLIENT_ID; Google login will fail.');
}

router.post('/google', async (req, res) => {
  try {
    const { credential } = req.body;
    if (!credential) {
      return res.status(400).json({ error: 'Credential is required.' });
    }
    if (!oauthClient) {
      return res.status(500).json({ error: 'OAuth not configured.' });
    }

    const ticket = await oauthClient.verifyIdToken({ idToken: credential, audience: clientId });
    const payload = ticket.getPayload();

    if (!payload?.email) {
      return res.status(400).json({ error: 'Email not available from Google token.' });
    }

    res.json({ email: payload.email, name: payload.name });
  } catch (err) {
    console.error('[auth] Failed to verify Google token', err);
    res.status(401).json({ error: 'Invalid Google credential.' });
  }
});

export default router;
