const GOOGLE_CLIENT_ID = '401713212611-0gvsieb6l915pejddavg5bv49r7c5s7v.apps.googleusercontent.com';
const API_BASE = window.location.origin;

const state = {
  email: '',
  category: '',
  location: null,
  signedIn: false,
  currentStep: 1,
  image: null,
  mapInstance: null,
  mapMarker: null,
};

const categories = [
  { label: 'Street Light Problem', icon: '💡' },
  { label: 'Waste Management', icon: '🗑️' },
  { label: 'Road Damage', icon: '🛣️' },
  { label: 'Water Supply', icon: '🚰' },
  { label: 'Drainage Issue', icon: '🌧️' },
  { label: 'Other Civic Issues', icon: '🏙️' },
];

const emailInput = document.getElementById('email');
const cityInput = document.getElementById('city');
const pincodeInput = document.getElementById('pincode');
const descriptionInput = document.getElementById('description');
const categoryGrid = document.getElementById('categoryGrid');
const submitBtn = document.getElementById('submitBtn');
const issueForm = document.getElementById('issueForm');
const toast = document.getElementById('toast');
const refIdEl = document.getElementById('refId');
const selectLocationBtn = document.getElementById('selectLocationBtn');
const skipGeolocationBtn = document.getElementById('skipGeolocationBtn');
const locationStatus = document.getElementById('locationStatus');
const mapFrame = document.getElementById('mapFrame');
const mapPickerSection = document.getElementById('mapPickerSection');
const mapLoadingOverlay = document.getElementById('mapLoadingOverlay');
const streetInput = document.getElementById('streetInput');
const streetDropdown = document.getElementById('streetDropdown');
const mapHint = document.getElementById('mapHint');
let streetOptions = [];

const reportAnotherBtn = document.getElementById('reportAnotherBtn');
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');
const themeToggle = document.getElementById('themeToggle');
const fileUploadArea = document.getElementById('fileUploadArea');
const issueImage = document.getElementById('issueImage');
const imagePreview = document.getElementById('imagePreview');

// THEME TOGGLE
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
  }
}

function toggleTheme() {
  const isLight = document.body.classList.toggle('light-theme');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// INTERACTIVE MAP (SWIGGY-STYLE)
function initInteractiveMap() {
  if (state.mapInstance) return;
  
  const mapContainer = document.getElementById('interactiveMap');
  state.mapInstance = L.map(mapContainer).setView([16.5, 80.5], 13);
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
  }).addTo(state.mapInstance);
  
  state.mapInstance.on('click', onMapClick);
}

function skipGeolocation() {
  // Hide loading overlay and show map for manual selection
  mapLoadingOverlay.style.display = 'none';
  locationStatus.textContent = 'Select your location manually on the map';
  showToast('Geolocation skipped. Click on map to select location.');
}

function toggleMapPicker() {
  const isVisible = mapPickerSection.style.display === 'block';
  
  if (!isVisible) {
    // Show map
    mapPickerSection.style.display = 'block';
    mapLoadingOverlay.style.display = 'flex';
    selectLocationBtn.textContent = 'Hide Map';
    selectLocationBtn.classList.add('active');
    locationStatus.textContent = 'Loading map and detecting your location...';
    
    // Initialize map if not already done
    setTimeout(() => {
      if (!state.mapInstance) {
        initInteractiveMap();
      }
      
      // Trigger map resize to fix display issues
      state.mapInstance.invalidateSize();
      
      // Detect user's current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            console.log('Location detected:', latitude, longitude);
            
            // Hide loading overlay
            mapLoadingOverlay.style.display = 'none';
            
            // Center map on user location
            state.mapInstance.setView([latitude, longitude], 16);
            
            // Remove old marker if exists
            if (state.mapMarker) {
              state.mapInstance.removeLayer(state.mapMarker);
            }
            
            // Add marker at current location (blue)
            state.mapMarker = L.marker([latitude, longitude], {
              icon: L.icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
              })
            }).addTo(state.mapInstance);
            
            state.mapMarker.bindPopup('📍 Your Current Location<br>' + latitude.toFixed(4) + ', ' + longitude.toFixed(4)).openPopup();
            
            locationStatus.textContent = `📍 Your location detected (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`;
            showToast('✓ Your location found! Click map to select issue location.');
            
            // Auto-fill city/pincode for current location
            reverseGeocode(latitude, longitude);
          },
          (error) => {
            console.error('Geolocation error code:', error.code);
            console.error('Geolocation error message:', error.message);
            console.log('Error details for debugging:', {
              code: error.code,
              message: error.message,
              codeName: error.code === 1 ? 'PERMISSION_DENIED' : error.code === 2 ? 'POSITION_UNAVAILABLE' : error.code === 3 ? 'TIMEOUT' : 'UNKNOWN'
            });
            
            // Hide loading overlay even on error
            mapLoadingOverlay.style.display = 'none';
            
            locationStatus.textContent = '⚠️ Unable to detect location (Error: ' + error.code + '). Click map to select.';
            
            let errorMsg = 'Geolocation Error (Code ' + error.code + '): ';

            if (error.code === 1) {
              errorMsg += 'Permission denied. Please enable location access in browser settings.';
            } else if (error.code === 2) {
              errorMsg += 'Location unavailable. Check your GPS/internet.';
            } else if (error.code === 3) {
              errorMsg += 'Location request timed out. Try again.';
            }
            showToast(errorMsg);
            
            // Fallback: use default map center
            state.mapInstance.setView([16.5, 80.5], 13);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          }
        );
      } else {
        mapLoadingOverlay.style.display = 'none';
        locationStatus.textContent = '⚠️ Geolocation not supported. Click map to select.';
        showToast('Your browser does not support geolocation.');
      }
    }, 100);
  } else {
    // Hide map
    mapPickerSection.style.display = 'none';
    mapLoadingOverlay.style.display = 'none';
    selectLocationBtn.textContent = '📍 Select Location on Map';
    selectLocationBtn.classList.remove('active');
  }
}

function onMapClick(e) {
  const { lat, lng } = e.latlng;
  state.location = { lat, lng };
  
  // Remove old marker
  if (state.mapMarker) {
    state.mapInstance.removeLayer(state.mapMarker);
  }
  
  // Add new marker
  state.mapMarker = L.marker([lat, lng]).addTo(state.mapInstance);
  state.mapMarker.bindPopup(`<strong>Selected Location</strong><br>${lat.toFixed(4)}, ${lng.toFixed(4)}`).openPopup();
  
  locationStatus.textContent = `Selected (${lat.toFixed(3)}, ${lng.toFixed(3)})`;
  
  // Update preview map on Step 2
  renderMap(lat, lng);
  mapHint.textContent = `📍 Location selected`;
  
  reverseGeocode(lat, lng);
  submitBtn.disabled = false;
}

// IMAGE UPLOAD
function initImageUpload() {
  fileUploadArea.addEventListener('click', () => issueImage.click());
  
  fileUploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    fileUploadArea.style.borderColor = 'var(--accent)';
  });
  
  fileUploadArea.addEventListener('dragleave', () => {
    fileUploadArea.style.borderColor = 'rgba(255, 255, 255, 0.1)';
  });
  
  fileUploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    fileUploadArea.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleImageUpload(files[0]);
    }
  });
  
  issueImage.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      handleImageUpload(e.target.files[0]);
    }
  });
}

function handleImageUpload(file) {
  if (file.size > 2 * 1024 * 1024) {
    showToast('Image must be less than 2MB. Compressing...');
    compressImage(file);
    return;
  }
  
  const reader = new FileReader();
  reader.onload = (e) => {
    state.image = e.target.result;
    displayImagePreview(file.name);
    showToast('Image uploaded successfully');
  };
  reader.readAsDataURL(file);
}

function compressImage(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      
      // Reduce size
      if (width > 800) {
        height = (height * 800) / width;
        width = 800;
      }
      
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      
      // Compress to JPEG
      state.image = canvas.toDataURL('image/jpeg', 0.7);
      displayImagePreview(file.name);
      showToast('Image compressed and uploaded');
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function displayImagePreview(fileName) {
  imagePreview.innerHTML = `
    <div class="image-preview-item">
      <img src="${state.image}" alt="Issue preview" />
      <button class="remove-btn" type="button" onclick="removeImage()">×</button>
    </div>
  `;
}

function removeImage() {
  state.image = null;
  issueImage.value = '';
  imagePreview.innerHTML = '';
  showToast('Image removed');
}

// STEP MANAGEMENT
function showStep(stepNumber) {
  [step1, step2, step3].forEach(step => step.classList.remove('active'));
  [step1, step2, step3].forEach(step => step.setAttribute('aria-hidden', 'true'));
  
  const stepEl = document.getElementById(`step${stepNumber}`);
  if (stepEl) {
    stepEl.classList.add('active');
    stepEl.setAttribute('aria-hidden', 'false');
  }
  
  state.currentStep = stepNumber;
  updateProgressIndicator(stepNumber);
  
  // Initialize map when entering Step 2
  if (stepNumber === 2 && !state.mapInstance) {
    setTimeout(initInteractiveMap, 100);
  }
}

function updateProgressIndicator(stepNumber) {
  const progressSteps = document.querySelectorAll('.progress-step');
  const progressLines = document.querySelectorAll('.progress-line');
  
  progressSteps.forEach((step, idx) => {
    const stepNum = idx + 1;
    step.classList.remove('active', 'completed');
    
    if (stepNum === stepNumber) {
      step.classList.add('active');
    } else if (stepNum < stepNumber) {
      step.classList.add('completed');
    }
  });
  
  progressLines.forEach((line, idx) => {
    line.classList.remove('active');
    if (idx + 1 < stepNumber) {
      line.classList.add('active');
    }
  });
}

function initGoogle() {
  if (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID.startsWith('<')) {
    showToast('Configure GOOGLE_CLIENT_ID to enable Google Login.');
    return;
  }

  window.google?.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: handleGoogleCredential,
  });
  window.google?.accounts.id.renderButton(document.getElementById('googleSignIn'), {
    theme: 'outline',
    size: 'large',
    shape: 'pill',
    text: 'continue_with',
  });
}

async function handleGoogleCredential(response) {
  try {
    const res = await fetch(`${API_BASE}/api/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential: response.credential }),
    });

    if (!res.ok) throw new Error('Unable to verify Google credential.');
    const data = await res.json();
    state.email = data.email;
    state.signedIn = true;
    emailInput.value = state.email;
    emailInput.setAttribute('readonly', true);
    submitBtn.disabled = false;
    showToast(`Signed in as ${state.email}`);
    showStep(2); // Move to Step 2 after successful login
  } catch (err) {
    console.error(err);
    showToast('Google sign-in failed. Please retry.');
  }
}

function renderCategories() {
  categoryGrid.innerHTML = '';
  categories.forEach((c) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'category-card';
    card.innerHTML = `<div class="category-icon">${c.icon}</div><div>${c.label}</div>`;
    card.addEventListener('click', () => {
      state.category = c.label;
      Array.from(categoryGrid.children).forEach((el) => el.classList.remove('active'));
      card.classList.add('active');
      submitBtn.disabled = false;
    });
    categoryGrid.appendChild(card);
  });
}

function canSubmit() {
  return Boolean(
    state.signedIn &&
      state.category &&
      descriptionInput.value.trim().length >= 10 &&
      emailInput.value &&
      cityInput.value.trim() &&
      pincodeInput.value.trim()
  );
}

function wireValidation() {
  [descriptionInput, cityInput, pincodeInput].forEach((field) => {
    field.addEventListener('input', () => {
      // Button is always enabled, but we'll show errors on submit
      submitBtn.disabled = false;
    });
  });
}

async function handleSubmit(evt) {
  evt.preventDefault();
  
  // Validate all required fields
  if (!state.signedIn) {
    showToast('❌ Please sign in first');
    return;
  }
  
  if (!state.category) {
    showToast('❌ Please select an issue category');
    return;
  }
  
  if (!emailInput.value.trim()) {
    showToast('❌ Email is required');
    return;
  }
  
  if (!cityInput.value.trim()) {
    showToast('❌ Please enter a city');
    return;
  }
  
  if (!pincodeInput.value.trim()) {
    showToast('❌ Please enter a pincode');
    return;
  }
  
  if (descriptionInput.value.trim().length < 10) {
    showToast('❌ Description must be at least 10 characters');
    return;
  }

  setLoading(true);
  try {
    // Get street from input
    const street = streetInput.value.trim();
    
    const payload = {
      email: emailInput.value,
      city: cityInput.value.trim(),
      pincode: pincodeInput.value.trim(),
      street: street,
      category: state.category,
      description: descriptionInput.value.trim(),
      coordinates: state.location,
      image: state.image || null,
    };

    const res = await fetch(`${API_BASE}/api/report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error('Submission failed');
    const data = await res.json();
    refIdEl.textContent = data.referenceId;
    showStep(3); // Move to Step 3 confirmation
    showToast('Issue submitted successfully!');
  } catch (err) {
    console.error(err);
    showToast('Could not submit issue. Please try again.');
  } finally {
    setLoading(false);
  }
}

function setLoading(isLoading) {
  if (isLoading) {
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
  } else {
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
}



async function reverseGeocode(lat, lng) {
  try {
    mapHint.textContent = 'Fetching location details…';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    
    const res = await fetch(`${API_BASE}/api/geocode/reverse`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lat, lng }),
      signal: controller.signal,
    });
    clearTimeout(timeout);
    
    if (!res.ok) throw new Error('Geocode failed');
    const data = await res.json();
    
    console.log('[frontend] Geocode response:', data.address);
    
    // Extract address components from OpenStreetMap
    const addr = data.address || {};
    const city = addr.city || addr.town || addr.village || '';
    const postcode = addr.postcode || '';
    const road = addr.road || addr.street || '';
    const suburb = addr.suburb || addr.neighbourhood || '';
    const hamlet = addr.hamlet || '';
    const village = addr.village || '';
    const county = addr.county || addr.district || '';
    
    // Fill city and pincode
    if (city) {
      cityInput.value = city;
      console.log('[frontend] Set city:', city);
    }
    if (postcode) {
      pincodeInput.value = postcode;
      console.log('[frontend] Set postcode:', postcode);
    }
    
    // Build street options from all available address components
    const streetSet = new Set(); // Use Set to avoid duplicates
    
    if (road) streetSet.add(road);
    if (suburb && suburb !== city) streetSet.add(suburb);
    if (hamlet && hamlet !== city) streetSet.add(hamlet);
    if (village && village !== city && village !== road) streetSet.add(village);
    if (county && county !== city) streetSet.add(county);
    
    // Store options globally for autocomplete
    streetOptions = Array.from(streetSet).filter(s => s && s.trim());
    
    console.log('[frontend] Street options found:', streetOptions);
    
    // Clear and populate autocomplete dropdown
    streetDropdown.innerHTML = '';
    if (streetOptions.length === 0) {
      const item = document.createElement('div');
      item.style.cssText = 'padding: 10px; color: #999; text-align: center;';
      item.textContent = 'No streets found - type manually';
      streetDropdown.appendChild(item);
    } else {
      streetOptions.forEach(opt => {
        const item = document.createElement('div');
        item.style.cssText = 'padding: 10px 12px; cursor: pointer; color: #333; border-bottom: 1px solid #eee; transition: background 0.2s;';
        item.textContent = opt;
        item.onmouseover = () => item.style.background = '#f0f0f0';
        item.onmouseout = () => item.style.background = 'transparent';
        item.onclick = () => {
          streetInput.value = opt;
          streetDropdown.style.display = 'none';
        };
        streetDropdown.appendChild(item);
      });
    }
    
    // Update preview map on Step 2
    renderMap(lat, lng);
    
    mapHint.textContent = 'Location captured. You can edit if needed.';
    submitBtn.disabled = false;
  } catch (err) {
    console.error('[geocode]', err.message);
    mapHint.textContent = 'Unable to auto-detect city/pincode. Please fill manually.';
    showToast('Location detected but auto-fill unavailable. Enter city & pincode manually.');
  }
}

function renderMap(lat, lng) {
  const bbox = [lng - 0.01, lat - 0.01, lng + 0.01, lat + 0.01].join(',');
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
  mapFrame.innerHTML = `<iframe src="${src}" loading="lazy"></iframe>`;
}

function setupReportAnother() {
  reportAnotherBtn.addEventListener('click', () => {
    // Reset form
    issueForm.reset();
    state.category = '';
    state.location = null;
    state.image = null;
    Array.from(categoryGrid.children).forEach((el) => el.classList.remove('active'));
    submitBtn.disabled = false;
    mapFrame.innerHTML = '<div class="map-placeholder"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg><span>Map preview will appear here</span></div>';
    mapHint.textContent = 'Location preview will appear once access is granted.';
    locationStatus.textContent = 'Awaiting permission…';
    imagePreview.innerHTML = '';
    issueImage.value = '';
    showStep(2); // Back to Step 2
  });
}

// Autocomplete handler for street input
streetInput?.addEventListener?.('input', (e) => {
  const query = e.target.value.toLowerCase().trim();
  
  // Filter options based on input
  const filtered = streetOptions.filter(opt => 
    opt.toLowerCase().includes(query)
  );
  
  // Show dropdown if there are matches or if field is not empty
  if (query.length > 0 || (filtered.length > 0 && !query)) {
    streetDropdown.innerHTML = '';
    
    if (filtered.length === 0) {
      const item = document.createElement('div');
      item.style.cssText = 'padding: 10px; color: #999; text-align: center;';
      item.textContent = 'No matches found';
      streetDropdown.appendChild(item);
    } else {
      filtered.forEach(opt => {
        const item = document.createElement('div');
        item.style.cssText = 'padding: 10px 12px; cursor: pointer; color: #333; border-bottom: 1px solid #eee; transition: background 0.2s;';
        item.textContent = opt;
        item.onmouseover = () => item.style.background = '#f0f0f0';
        item.onmouseout = () => item.style.background = 'transparent';
        item.onclick = () => {
          streetInput.value = opt;
          streetDropdown.style.display = 'none';
        };
        streetDropdown.appendChild(item);
      });
    }
    
    streetDropdown.style.display = 'block';
  } else {
    streetDropdown.style.display = 'none';
  }
});

// Show dropdown on focus
streetInput?.addEventListener?.('focus', () => {
  if (streetOptions.length > 0) {
    streetDropdown.style.display = 'block';
  }
});

// Hide dropdown on blur (with delay to allow click)
streetInput?.addEventListener?.('blur', () => {
  setTimeout(() => {
    streetDropdown.style.display = 'none';
  }, 200);
});

// Hide dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (e.target !== streetInput && e.target !== streetDropdown) {
    streetDropdown.style.display = 'none';
  }
});

// Auto-fill city and street when pincode is entered
pincodeInput?.addEventListener?.('blur', async (e) => {
  const pincode = e.target.value.trim();
  const messageEl = document.getElementById('pincodeMessage');
  
  // Clear previous message
  messageEl.className = 'form-message';
  messageEl.textContent = '';
  
  if (!pincode) {
    return; // Empty is ok, just skip
  }
  
  // Validate pincode format
  if (pincode.length < 5 || pincode.length > 6) {
    messageEl.className = 'form-message error';
    messageEl.textContent = '⚠️ Pincode must be 5-6 digits';
    console.log('[pincode] Invalid pincode length:', pincode);
    return;
  }

  if (!/^\d+$/.test(pincode)) {
    messageEl.className = 'form-message error';
    messageEl.textContent = '⚠️ Pincode must contain only numbers';
    console.log('[pincode] Non-numeric pincode:', pincode);
    return;
  }

  try {
    // Show loading message
    messageEl.className = 'form-message loading';
    messageEl.textContent = 'Searching for location...';
    console.log('[pincode] Searching for:', pincode);
    
    const response = await fetch(`${API_BASE}/api/geocode/search-pincode`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pincode }),
    });

    console.log('[pincode] Response status:', response.status);
    
    if (!response.ok) {
      const error = await response.text();
      console.log('[pincode] Error response:', error);
      messageEl.className = 'form-message error';
      messageEl.textContent = '❌ Pincode not found. Please check and try again';
      return;
    }

    const data = await response.json();
    console.log('[pincode] Full Result:', JSON.stringify(data, null, 2));

    // Check if valid location data
    if (!data.city || !data.lat || !data.lon) {
      messageEl.className = 'form-message error';
      messageEl.textContent = '❌ Invalid pincode for this location';
      console.log('[pincode] Invalid data returned:', data);
      return;
    }

    // Auto-fill city
    if (data.city) {
      cityInput.value = data.city;
      console.log('[pincode] City filled:', data.city);
    }

    // Auto-fill area options
    if (data.areas && data.areas.length > 0) {
      streetOptions = data.areas;
      console.log('[pincode] Area options available:', data.areas);
      
      // Populate dropdown with options
      streetDropdown.innerHTML = data.areas
        .map(area => `<li data-value="${area}" style="padding: 10px 12px; cursor: pointer; border-bottom: 1px solid #eee;">${area}</li>`)
        .join('');
      
      // Add click handlers to dropdown items
      streetDropdown.querySelectorAll('li').forEach(item => {
        item.addEventListener('click', () => {
          streetInput.value = item.getAttribute('data-value');
          streetDropdown.style.display = 'none';
        });
      });
      
      streetDropdown.style.display = 'block';
      console.log('[pincode] Dropdown populated with', data.areas.length, 'options');
    } else {
      console.warn('[pincode] No areas returned from API, allowing free text input:', data.areas);
      // Allow users to type their own area
      streetOptions = [];
      streetDropdown.innerHTML = '<li style="padding: 10px 12px; color: #999; text-align: center; font-size: 0.9em;">Type to enter area manually (optional)</li>';
      streetDropdown.style.display = 'block';
      streetInput.placeholder = 'Type your area/locality...';
    }

    // Show success message
    messageEl.className = 'form-message success';
    messageEl.textContent = `✓ Location found: ${data.city}`;
    console.log('[pincode] Success:', data.city);

    // Update map if it exists
    if (data.lat && data.lon) {
      console.log('[pincode] Location found:', data.lat, data.lon);
      
      if (state.mapInstance) {
        const lat = parseFloat(data.lat);
        const lng = parseFloat(data.lon);
        
        state.mapInstance.setView([lat, lng], 13);
        
        if (state.mapMarker) {
          state.mapMarker.remove();
        }
        
        state.mapMarker = L.marker([lat, lng])
          .addTo(state.mapInstance)
          .bindPopup(`<b>${data.city}</b><br>Pincode: ${pincode}`);
        
        state.location = { lat, lng };
        
        // Update preview map on Step 2
        renderMap(lat, lng);
        mapHint.textContent = `📍 Location: ${data.city}`;
        
        console.log('[pincode] Map updated');
      } else {
        console.log('[pincode] Map not initialized yet');
      }
    }
  } catch (err) {
    console.error('[pincode] Fetch error:', err);
  }
});

function init() {
  initTheme();
  themeToggle.addEventListener('click', toggleTheme);
  initImageUpload();
  showStep(1); // Start at Step 1 (login)
  renderCategories();
  wireValidation();
  selectLocationBtn.addEventListener('click', toggleMapPicker);
  skipGeolocationBtn.addEventListener('click', skipGeolocation);
  issueForm.addEventListener('submit', handleSubmit);
  setupReportAnother();
  initGoogle();
}

window.onload = init;
