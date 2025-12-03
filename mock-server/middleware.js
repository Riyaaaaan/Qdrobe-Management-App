// In-memory store for driver locations (persists during server session)
const driverLocationStore = new Map();

module.exports = (req, res, next) => {
  // CORS headers
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  // JWT token simulation for auth endpoints
  if (req.path.startsWith('/auth/login') && req.method === 'POST') {
    const { email, password } = req.body;
    // Simple mock authentication
    if (email === 'driver@example.com' && password === 'password123') {
      const mockToken = 'mock-jwt-token-' + Date.now();
      const mockRefreshToken = 'mock-refresh-token-' + Date.now();
      
      return res.json({
        token: mockToken,
        refreshToken: mockRefreshToken,
        user: {
          id: '1',
          name: 'John Driver',
          email: 'driver@example.com',
          phone: '+1234567890',
          vehicleType: 'Bike',
          vehicleNumber: 'DL-01-AB-1234',
          isOnline: true,
        }
      });
    } else {
      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }
  }

  if (req.path.startsWith('/auth/register') && req.method === 'POST') {
    const mockToken = 'mock-jwt-token-' + Date.now();
    const mockRefreshToken = 'mock-refresh-token-' + Date.now();
    
    return res.json({
      token: mockToken,
      refreshToken: mockRefreshToken,
      user: {
        id: Date.now().toString(),
        ...req.body,
        isOnline: false,
      }
    });
  }

  // Handle location endpoints
  if (req.path === '/location/driver' && req.method === 'POST') {
    const { lat, lng, accuracy, heading, speed } = req.body;
    const driverId = '1'; // In real app, get from JWT token
    
    const locationData = {
      driverId,
      lat,
      lng,
      accuracy: accuracy || 10,
      heading: heading || null,
      speed: speed || null,
      timestamp: new Date().toISOString(),
    };
    
    driverLocationStore.set(driverId, locationData);
    
    return res.json(locationData);
  }

  if (req.path.match(/^\/location\/driver\/(.+)$/) && req.method === 'GET') {
    const driverId = req.path.split('/')[3];
    const location = driverLocationStore.get(driverId);
    
    if (location) {
      return res.json(location);
    } else {
      // Return default location if not found
      return res.json({
        driverId,
        lat: 28.6139,
        lng: 77.2090,
        accuracy: 10,
        heading: null,
        speed: null,
        timestamp: new Date().toISOString(),
      });
    }
  }

  if (req.path.match(/^\/location\/order\/(.+)$/) && req.method === 'GET') {
    const orderId = req.path.split('/')[3];
    // In real app, look up which driver is assigned to this order
    // For mock, assume driver ID is '1'
    const driverId = '1';
    const location = driverLocationStore.get(driverId);
    
    if (location) {
      return res.json(location);
    } else {
      // Return null if no location found
      return res.json(null);
    }
  }

  // Mock JWT verification for protected routes
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    // In real app, verify JWT here
    // For mock, just allow if token exists
    req.user = { id: '1' };
  } else if (!req.path.startsWith('/auth/')) {
    // Protect non-auth routes
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }

  next();
};



