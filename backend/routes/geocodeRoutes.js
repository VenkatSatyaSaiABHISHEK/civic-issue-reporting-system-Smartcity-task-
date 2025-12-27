import express from 'express';

const router = express.Router();

// Reverse geocoding - get address from coordinates
router.post('/reverse', async (req, res) => {
  try {
    const { lat, lng } = req.body;
    if (!lat || !lng) {
      return res.status(400).json({ error: 'lat and lng are required' });
    }

    // Get detailed address information with all details
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1&accept-language=en`;
    const response = await fetch(url, {
      headers: { 'User-Agent': 'CivicIssueReporting/1.0' },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Geocoding failed' });
    }

    const data = await response.json();
    
    console.log('[geocode] Full address data:', JSON.stringify(data.address, null, 2));
    
    res.json(data);
  } catch (err) {
    console.error('[geocode] Error:', err);
    res.status(500).json({ error: 'Geocoding service unavailable' });
  }
});

// Search by postcode - get city and address from pincode
router.post('/search-pincode', async (req, res) => {
  try {
    const { pincode } = req.body;
    if (!pincode) {
      return res.status(400).json({ error: 'pincode is required' });
    }

    // Search for postcode using Nominatim
    const url = `https://nominatim.openstreetmap.org/search?format=json&postalcode=${pincode}&country=in&limit=1&addressdetails=1`;
    const response = await fetch(url, {
      headers: { 'User-Agent': 'CivicIssueReporting/1.0' },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Search failed' });
    }

    const data = await response.json();
    
    if (!data || data.length === 0) {
      console.log('[pincode-search] No results found for:', pincode);
      return res.status(404).json({ error: 'Pincode not found' });
    }

    const result = data[0];
    const address = result.address || {};
    
    console.log('[pincode-search] Result for', pincode, ':', JSON.stringify(address, null, 2));
    
    // Extract city and area/locality information (better for Indian context)
    const city = address.city || address.county || address.village || address.town || 'Unknown';
    const areas = [
      address.suburb,
      address.locality,
      address.neighbourhood,
      address.hamlet,
      address.village,
      address.road,
    ].filter(Boolean);
    
    // Remove duplicates
    const uniqueAreas = [...new Set(areas)];

    res.json({
      city,
      pincode,
      areas: uniqueAreas,
      lat: result.lat,
      lon: result.lon,
      full_address: result.display_name,
    });
  } catch (err) {
    console.error('[pincode-search] Error:', err);
    res.status(500).json({ error: 'Search service unavailable' });
  }
});

export default router;
