import { Order, User, Earnings } from '@/shared/types';
import { DriverLocation } from './locationService';

// Initial mock data from db.json
const initialOrders: Order[] = [
  {
    id: "1",
    customerName: "Alice Johnson",
    customerPhone: "+1234567891",
    restaurantName: "Pizza Palace",
    restaurantAddress: "123 Main St, City",
    deliveryAddress: "456 Oak Ave, City",
    pickupLocation: {
      lat: 28.6139,
      lng: 77.2090,
      address: "123 Main St, City"
    },
    deliveryLocation: {
      lat: 28.7041,
      lng: 77.1025,
      address: "456 Oak Ave, City"
    },
    status: "pending",
    totalAmount: 850,
    deliveryFee: 50,
    items: [
      {
        id: "1",
        name: "Margherita Pizza",
        quantity: 2,
        price: 400
      }
    ],
    estimatedTime: 30,
    createdAt: "2024-01-15T10:00:00Z",
    notes: "Please ring the doorbell twice"
  },
  {
    id: "2",
    customerName: "Bob Smith",
    customerPhone: "+1234567892",
    restaurantName: "Burger King",
    restaurantAddress: "789 Park Rd, City",
    deliveryAddress: "321 Elm St, City",
    pickupLocation: {
      lat: 28.5355,
      lng: 77.3910,
      address: "789 Park Rd, City"
    },
    deliveryLocation: {
      lat: 28.4595,
      lng: 77.0266,
      address: "321 Elm St, City"
    },
    status: "pending",
    totalAmount: 450,
    deliveryFee: 40,
    items: [
      {
        id: "2",
        name: "Whopper Burger",
        quantity: 1,
        price: 250
      },
      {
        id: "3",
        name: "French Fries",
        quantity: 1,
        price: 160
      }
    ],
    estimatedTime: 25,
    createdAt: "2024-01-15T10:15:00Z"
  },
  {
    id: "3",
    customerName: "Charlie Brown",
    customerPhone: "+1234567893",
    restaurantName: "Sushi Express",
    restaurantAddress: "555 Food St, City",
    deliveryAddress: "888 Market Ave, City",
    pickupLocation: {
      lat: 28.4089,
      lng: 77.3178,
      address: "555 Food St, City"
    },
    deliveryLocation: {
      lat: 28.5000,
      lng: 77.4000,
      address: "888 Market Ave, City"
    },
    status: "accepted",
    totalAmount: 1200,
    deliveryFee: 60,
    items: [
      {
        id: "4",
        name: "Salmon Sushi Roll",
        quantity: 2,
        price: 600
      }
    ],
    estimatedTime: 35,
    createdAt: "2024-01-15T09:30:00Z",
    acceptedAt: "2024-01-15T09:35:00Z",
    driverId: "1"
  },
  {
    id: "4",
    customerName: "Diana Prince",
    customerPhone: "+1234567894",
    restaurantName: "Taco Bell",
    restaurantAddress: "202 Spice Lane, City",
    deliveryAddress: "909 Hero Blvd, City",
    pickupLocation: {
      lat: 28.6500,
      lng: 77.2500,
      address: "202 Spice Lane, City"
    },
    deliveryLocation: {
      lat: 28.6800,
      lng: 77.2200,
      address: "909 Hero Blvd, City"
    },
    status: "accepted",
    totalAmount: 320,
    deliveryFee: 35,
    items: [
      {
        id: "5",
        name: "Taco Supreme",
        quantity: 3,
        price: 280
      }
    ],
    estimatedTime: 20,
    createdAt: "2024-01-15T10:20:00Z",
    acceptedAt: "2024-01-15T10:22:00Z",
    driverId: "1"
  },
  {
    id: "5",
    customerName: "Eva Martinez",
    customerPhone: "+1234567895",
    restaurantName: "Pasta House",
    restaurantAddress: "345 Italy St, City",
    deliveryAddress: "678 Garden Rd, City",
    pickupLocation: {
      lat: 28.5800,
      lng: 77.1800,
      address: "345 Italy St, City"
    },
    deliveryLocation: {
      lat: 28.6200,
      lng: 77.1500,
      address: "678 Garden Rd, City"
    },
    status: "picked",
    totalAmount: 950,
    deliveryFee: 55,
    items: [
      {
        id: "6",
        name: "Carbonara Pasta",
        quantity: 1,
        price: 550
      },
      {
        id: "7",
        name: "Garlic Bread",
        quantity: 2,
        price: 200
      }
    ],
    estimatedTime: 28,
    createdAt: "2024-01-15T09:45:00Z",
    acceptedAt: "2024-01-15T09:50:00Z",
    pickedAt: "2024-01-15T10:10:00Z",
    driverId: "1"
  },
  {
    id: "6",
    customerName: "Frank Miller",
    customerPhone: "+1234567896",
    restaurantName: "Chinese Wok",
    restaurantAddress: "567 Dragon St, City",
    deliveryAddress: "234 Phoenix Ave, City",
    pickupLocation: {
      lat: 28.5500,
      lng: 77.2800,
      address: "567 Dragon St, City"
    },
    deliveryLocation: {
      lat: 28.5300,
      lng: 77.3200,
      address: "234 Phoenix Ave, City"
    },
    status: "picked",
    totalAmount: 780,
    deliveryFee: 45,
    items: [
      {
        id: "8",
        name: "Kung Pao Chicken",
        quantity: 1,
        price: 450
      },
      {
        id: "9",
        name: "Fried Rice",
        quantity: 1,
        price: 280
      }
    ],
    estimatedTime: 22,
    createdAt: "2024-01-15T09:50:00Z",
    acceptedAt: "2024-01-15T09:55:00Z",
    pickedAt: "2024-01-15T10:15:00Z",
    driverId: "1"
  },
  {
    id: "7",
    customerName: "Grace Lee",
    customerPhone: "+1234567897",
    restaurantName: "Coffee Bean",
    restaurantAddress: "890 Brew St, City",
    deliveryAddress: "111 Office Park, City",
    pickupLocation: {
      lat: 28.6300,
      lng: 77.2300,
      address: "890 Brew St, City"
    },
    deliveryLocation: {
      lat: 28.6400,
      lng: 77.2400,
      address: "111 Office Park, City"
    },
    status: "delivered",
    totalAmount: 250,
    deliveryFee: 30,
    items: [
      {
        id: "10",
        name: "Cappuccino",
        quantity: 2,
        price: 150
      },
      {
        id: "11",
        name: "Croissant",
        quantity: 2,
        price: 100
      }
    ],
    estimatedTime: 15,
    createdAt: "2024-01-15T08:30:00Z",
    acceptedAt: "2024-01-15T08:32:00Z",
    pickedAt: "2024-01-15T08:42:00Z",
    deliveredAt: "2024-01-15T08:55:00Z",
    driverId: "1"
  },
  {
    id: "8",
    customerName: "Henry Wilson",
    customerPhone: "+1234567898",
    restaurantName: "BBQ Nation",
    restaurantAddress: "432 Grill Road, City",
    deliveryAddress: "765 Family Lane, City",
    pickupLocation: {
      lat: 28.5700,
      lng: 77.3500,
      address: "432 Grill Road, City"
    },
    deliveryLocation: {
      lat: 28.5400,
      lng: 77.3800,
      address: "765 Family Lane, City"
    },
    status: "delivered",
    totalAmount: 1850,
    deliveryFee: 70,
    items: [
      {
        id: "12",
        name: "BBQ Platter",
        quantity: 1,
        price: 1200
      },
      {
        id: "13",
        name: "Grilled Chicken",
        quantity: 1,
        price: 550
      }
    ],
    estimatedTime: 40,
    createdAt: "2024-01-15T08:00:00Z",
    acceptedAt: "2024-01-15T08:05:00Z",
    pickedAt: "2024-01-15T08:30:00Z",
    deliveredAt: "2024-01-15T09:05:00Z",
    driverId: "1"
  },
  {
    id: "9",
    customerName: "Ivy Chen",
    customerPhone: "+1234567899",
    restaurantName: "Thai Spice",
    restaurantAddress: "123 Bangkok St, City",
    deliveryAddress: "456 Temple Ave, City",
    pickupLocation: {
      lat: 28.6100,
      lng: 77.2700,
      address: "123 Bangkok St, City"
    },
    deliveryLocation: {
      lat: 28.6400,
      lng: 77.3000,
      address: "456 Temple Ave, City"
    },
    status: "pending",
    totalAmount: 680,
    deliveryFee: 45,
    items: [
      {
        id: "14",
        name: "Pad Thai",
        quantity: 1,
        price: 400
      },
      {
        id: "15",
        name: "Tom Yum Soup",
        quantity: 1,
        price: 250
      }
    ],
    estimatedTime: 30,
    createdAt: "2024-01-15T10:25:00Z",
    notes: "Extra spicy please"
  },
  {
    id: "10",
    customerName: "Jack Turner",
    customerPhone: "+1234567800",
    restaurantName: "Mediterranean Delight",
    restaurantAddress: "789 Olive St, City",
    deliveryAddress: "321 Harbor View, City",
    pickupLocation: {
      lat: 28.5900,
      lng: 77.1900,
      address: "789 Olive St, City"
    },
    deliveryLocation: {
      lat: 28.5600,
      lng: 77.1600,
      address: "321 Harbor View, City"
    },
    status: "pending",
    totalAmount: 1100,
    deliveryFee: 60,
    items: [
      {
        id: "16",
        name: "Lamb Kebab",
        quantity: 2,
        price: 700
      },
      {
        id: "17",
        name: "Hummus Platter",
        quantity: 1,
        price: 350
      }
    ],
    estimatedTime: 32,
    createdAt: "2024-01-15T10:28:00Z"
  },
  {
    id: "11",
    customerName: "Karen White",
    customerPhone: "+1234567801",
    restaurantName: "Subway",
    restaurantAddress: "111 Sandwich Ave, City",
    deliveryAddress: "222 Health St, City",
    pickupLocation: {
      lat: 28.6000,
      lng: 77.2000,
      address: "111 Sandwich Ave, City"
    },
    deliveryLocation: {
      lat: 28.6100,
      lng: 77.2100,
      address: "222 Health St, City"
    },
    status: "pending",
    totalAmount: 380,
    deliveryFee: 35,
    items: [
      {
        id: "18",
        name: "Italian BMT Sub",
        quantity: 1,
        price: 250
      },
      {
        id: "19",
        name: "Cookie Pack",
        quantity: 1,
        price: 95
      }
    ],
    estimatedTime: 18,
    createdAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "12",
    customerName: "Liam O'Connor",
    customerPhone: "+1234567802",
    restaurantName: "KFC",
    restaurantAddress: "333 Chicken Rd, City",
    deliveryAddress: "444 Spice Lane, City",
    pickupLocation: {
      lat: 28.5600,
      lng: 77.2400,
      address: "333 Chicken Rd, City"
    },
    deliveryLocation: {
      lat: 28.5500,
      lng: 77.2500,
      address: "444 Spice Lane, City"
    },
    status: "pending",
    totalAmount: 650,
    deliveryFee: 40,
    items: [
      {
        id: "20",
        name: "Bucket Meal",
        quantity: 1,
        price: 450
      },
      {
        id: "21",
        name: "Coleslaw",
        quantity: 2,
        price: 160
      }
    ],
    estimatedTime: 25,
    createdAt: "2024-01-15T10:32:00Z",
    notes: "Extra hot sauce"
  },
  {
    id: "13",
    customerName: "Maya Patel",
    customerPhone: "+1234567803",
    restaurantName: "Domino's Pizza",
    restaurantAddress: "555 Slice St, City",
    deliveryAddress: "666 Party Ave, City",
    pickupLocation: {
      lat: 28.6200,
      lng: 77.2600,
      address: "555 Slice St, City"
    },
    deliveryLocation: {
      lat: 28.6300,
      lng: 77.2700,
      address: "666 Party Ave, City"
    },
    status: "accepted",
    totalAmount: 1200,
    deliveryFee: 50,
    items: [
      {
        id: "22",
        name: "Pepperoni Pizza",
        quantity: 2,
        price: 800
      },
      {
        id: "23",
        name: "Garlic Bread",
        quantity: 2,
        price: 350
      }
    ],
    estimatedTime: 30,
    createdAt: "2024-01-15T10:05:00Z",
    acceptedAt: "2024-01-15T10:08:00Z",
    driverId: "1"
  },
  {
    id: "14",
    customerName: "Noah Kim",
    customerPhone: "+1234567804",
    restaurantName: "McDonald's",
    restaurantAddress: "777 Golden Arch, City",
    deliveryAddress: "888 Happy Meal St, City",
    pickupLocation: {
      lat: 28.5800,
      lng: 77.2200,
      address: "777 Golden Arch, City"
    },
    deliveryLocation: {
      lat: 28.5900,
      lng: 77.2300,
      address: "888 Happy Meal St, City"
    },
    status: "accepted",
    totalAmount: 520,
    deliveryFee: 38,
    items: [
      {
        id: "24",
        name: "Big Mac Combo",
        quantity: 2,
        price: 480
      }
    ],
    estimatedTime: 20,
    createdAt: "2024-01-15T10:10:00Z",
    acceptedAt: "2024-01-15T10:12:00Z",
    driverId: "1"
  },
  {
    id: "15",
    customerName: "Olivia Brown",
    customerPhone: "+1234567805",
    restaurantName: "Starbucks",
    restaurantAddress: "999 Coffee Blvd, City",
    deliveryAddress: "1010 Latte Lane, City",
    pickupLocation: {
      lat: 28.6400,
      lng: 77.2500,
      address: "999 Coffee Blvd, City"
    },
    deliveryLocation: {
      lat: 28.6500,
      lng: 77.2600,
      address: "1010 Latte Lane, City"
    },
    status: "picked",
    totalAmount: 450,
    deliveryFee: 32,
    items: [
      {
        id: "25",
        name: "Caramel Macchiato",
        quantity: 2,
        price: 300
      },
      {
        id: "26",
        name: "Blueberry Muffin",
        quantity: 2,
        price: 118
      }
    ],
    estimatedTime: 15,
    createdAt: "2024-01-15T09:55:00Z",
    acceptedAt: "2024-01-15T09:58:00Z",
    pickedAt: "2024-01-15T10:12:00Z",
    driverId: "1"
  },
  {
    id: "16",
    customerName: "Paul Anderson",
    customerPhone: "+1234567806",
    restaurantName: "Pizza Hut",
    restaurantAddress: "1212 Pan St, City",
    deliveryAddress: "1313 Crust Ave, City",
    pickupLocation: {
      lat: 28.5700,
      lng: 77.2900,
      address: "1212 Pan St, City"
    },
    deliveryLocation: {
      lat: 28.5600,
      lng: 77.3000,
      address: "1313 Crust Ave, City"
    },
    status: "picked",
    totalAmount: 980,
    deliveryFee: 48,
    items: [
      {
        id: "27",
        name: "Supreme Pizza",
        quantity: 1,
        price: 650
      },
      {
        id: "28",
        name: "Wings",
        quantity: 1,
        price: 282
      }
    ],
    estimatedTime: 28,
    createdAt: "2024-01-15T09:40:00Z",
    acceptedAt: "2024-01-15T09:43:00Z",
    pickedAt: "2024-01-15T10:05:00Z",
    driverId: "1"
  },
  {
    id: "17",
    customerName: "Quinn Taylor",
    customerPhone: "+1234567807",
    restaurantName: "Dunkin' Donuts",
    restaurantAddress: "1414 Donut Circle, City",
    deliveryAddress: "1515 Sugar Rd, City",
    pickupLocation: {
      lat: 28.6100,
      lng: 77.2100,
      address: "1414 Donut Circle, City"
    },
    deliveryLocation: {
      lat: 28.6000,
      lng: 77.2000,
      address: "1515 Sugar Rd, City"
    },
    status: "delivered",
    totalAmount: 320,
    deliveryFee: 30,
    items: [
      {
        id: "29",
        name: "Donut Box (12 pcs)",
        quantity: 1,
        price: 200
      },
      {
        id: "30",
        name: "Coffee (Large)",
        quantity: 2,
        price: 90
      }
    ],
    estimatedTime: 12,
    createdAt: "2024-01-15T08:15:00Z",
    acceptedAt: "2024-01-15T08:17:00Z",
    pickedAt: "2024-01-15T08:25:00Z",
    deliveredAt: "2024-01-15T08:35:00Z",
    driverId: "1"
  },
  {
    id: "18",
    customerName: "Rachel Green",
    customerPhone: "+1234567808",
    restaurantName: "Chipotle",
    restaurantAddress: "1616 Burrito Way, City",
    deliveryAddress: "1717 Bowl St, City",
    pickupLocation: {
      lat: 28.5900,
      lng: 77.2700,
      address: "1616 Burrito Way, City"
    },
    deliveryLocation: {
      lat: 28.5800,
      lng: 77.2800,
      address: "1717 Bowl St, City"
    },
    status: "delivered",
    totalAmount: 750,
    deliveryFee: 42,
    items: [
      {
        id: "31",
        name: "Burrito Bowl",
        quantity: 2,
        price: 600
      },
      {
        id: "32",
        name: "Chips & Guac",
        quantity: 1,
        price: 108
      }
    ],
    estimatedTime: 22,
    createdAt: "2024-01-15T08:20:00Z",
    acceptedAt: "2024-01-15T08:22:00Z",
    pickedAt: "2024-01-15T08:35:00Z",
    deliveredAt: "2024-01-15T08:55:00Z",
    driverId: "1"
  },
  {
    id: "19",
    customerName: "Sam Wilson",
    customerPhone: "+1234567809",
    restaurantName: "Wendy's",
    restaurantAddress: "1818 Square Burger, City",
    deliveryAddress: "1919 Fresh Ave, City",
    pickupLocation: {
      lat: 28.5500,
      lng: 77.2600,
      address: "1818 Square Burger, City"
    },
    deliveryLocation: {
      lat: 28.5400,
      lng: 77.2700,
      address: "1919 Fresh Ave, City"
    },
    status: "delivered",
    totalAmount: 580,
    deliveryFee: 36,
    items: [
      {
        id: "33",
        name: "Baconator Combo",
        quantity: 1,
        price: 420
      },
      {
        id: "34",
        name: "Frosty",
        quantity: 1,
        price: 124
      }
    ],
    estimatedTime: 20,
    createdAt: "2024-01-15T07:45:00Z",
    acceptedAt: "2024-01-15T07:47:00Z",
    pickedAt: "2024-01-15T08:00:00Z",
    deliveredAt: "2024-01-15T08:18:00Z",
    driverId: "1"
  },
  {
    id: "20",
    customerName: "Tina Chen",
    customerPhone: "+1234567810",
    restaurantName: "Panera Bread",
    restaurantAddress: "2020 Bread St, City",
    deliveryAddress: "2121 Soup Ave, City",
    pickupLocation: {
      lat: 28.6300,
      lng: 77.2400,
      address: "2020 Bread St, City"
    },
    deliveryLocation: {
      lat: 28.6400,
      lng: 77.2500,
      address: "2121 Soup Ave, City"
    },
    status: "delivered",
    totalAmount: 680,
    deliveryFee: 40,
    items: [
      {
        id: "35",
        name: "Turkey Sandwich",
        quantity: 1,
        price: 450
      },
      {
        id: "36",
        name: "Broccoli Cheddar Soup",
        quantity: 1,
        price: 190
      }
    ],
    estimatedTime: 18,
    createdAt: "2024-01-15T07:30:00Z",
    acceptedAt: "2024-01-15T07:32:00Z",
    pickedAt: "2024-01-15T07:45:00Z",
    deliveredAt: "2024-01-15T08:00:00Z",
    driverId: "1"
  }
];

const initialEarnings: Earnings[] = [
  {
    id: "1",
    date: "2024-01-15",
    totalEarnings: 425,
    deliveryCount: 10,
    orders: []
  },
  {
    id: "2",
    date: "2024-01-14",
    totalEarnings: 520,
    deliveryCount: 12,
    orders: []
  },
  {
    id: "3",
    date: "2024-01-13",
    totalEarnings: 480,
    deliveryCount: 11,
    orders: []
  },
  {
    id: "4",
    date: "2024-01-12",
    totalEarnings: 380,
    deliveryCount: 9,
    orders: []
  },
  {
    id: "5",
    date: "2024-01-11",
    totalEarnings: 450,
    deliveryCount: 10,
    orders: []
  },
  {
    id: "6",
    date: "2024-01-10",
    totalEarnings: 360,
    deliveryCount: 8,
    orders: []
  },
  {
    id: "7",
    date: "2024-01-09",
    totalEarnings: 420,
    deliveryCount: 9,
    orders: []
  },
  {
    id: "8",
    date: "2024-01-08",
    totalEarnings: 390,
    deliveryCount: 8,
    orders: []
  },
  {
    id: "9",
    date: "2024-01-07",
    totalEarnings: 510,
    deliveryCount: 12,
    orders: []
  },
  {
    id: "10",
    date: "2024-01-06",
    totalEarnings: 440,
    deliveryCount: 10,
    orders: []
  },
  {
    id: "11",
    date: "2024-01-05",
    totalEarnings: 370,
    deliveryCount: 8,
    orders: []
  },
  {
    id: "12",
    date: "2024-01-04",
    totalEarnings: 460,
    deliveryCount: 11,
    orders: []
  },
  {
    id: "13",
    date: "2024-01-03",
    totalEarnings: 400,
    deliveryCount: 9,
    orders: []
  },
  {
    id: "14",
    date: "2024-01-02",
    totalEarnings: 350,
    deliveryCount: 7,
    orders: []
  },
  {
    id: "15",
    date: "2024-01-01",
    totalEarnings: 290,
    deliveryCount: 6,
    orders: []
  }
];

const initialUser: User = {
  id: "1",
  name: "John Driver",
  email: "driver@example.com",
  phone: "+1234567890",
  vehicleType: "Bike",
  vehicleNumber: "DL-01-AB-1234",
  isOnline: true,
  avatar: null
};

// In-memory stores (mutable)
export const mockOrders: Order[] = [...initialOrders];
export const mockEarnings: Earnings[] = [...initialEarnings];
export const mockUser: User = { ...initialUser };
export const driverLocationStore = new Map<string, DriverLocation>();

// Initialize default driver location
driverLocationStore.set("1", {
  driverId: "1",
  lat: 28.6139,
  lng: 77.2090,
  accuracy: 10,
  heading: 45,
  speed: 0,
  timestamp: new Date().toISOString()
});

// Order mutation functions
export const orderData = {
  getOrders: (status?: string): Order[] => {
    if (status) {
      return mockOrders.filter(order => order.status === status);
    }
    return [...mockOrders];
  },

  getOrder: (id: string): Order | undefined => {
    return mockOrders.find(order => order.id === id);
  },

  acceptOrder: (id: string, driverId: string = "1"): Order => {
    const order = mockOrders.find(o => o.id === id);
    if (!order) {
      throw new Error(`Order with id ${id} not found`);
    }
    order.status = "accepted";
    order.driverId = driverId;
    order.acceptedAt = new Date().toISOString();
    return { ...order };
  },

  rejectOrder: (id: string): Order => {
    const order = mockOrders.find(o => o.id === id);
    if (!order) {
      throw new Error(`Order with id ${id} not found`);
    }
    order.status = "cancelled";
    return { ...order };
  },

  updateOrderStatus: (id: string, status: Order['status']): Order => {
    const order = mockOrders.find(o => o.id === id);
    if (!order) {
      throw new Error(`Order with id ${id} not found`);
    }
    order.status = status;
    const now = new Date().toISOString();
    if (status === "picked" && !order.pickedAt) {
      order.pickedAt = now;
    } else if (status === "delivered" && !order.deliveredAt) {
      order.deliveredAt = now;
    }
    return { ...order };
  }
};

// Earnings functions
export const earningsData = {
  getEarnings: (): Earnings[] => {
    return [...mockEarnings];
  },

  getEarningsSummary: () => {
    const totalEarnings = mockEarnings.reduce((sum, e) => sum + e.totalEarnings, 0);
    const totalDeliveries = mockEarnings.reduce((sum, e) => sum + e.deliveryCount, 0);
    const averageEarnings = totalDeliveries > 0 ? totalEarnings / totalDeliveries : 0;
    return {
      totalEarnings,
      totalDeliveries,
      averageEarnings
    };
  }
};

// Profile functions
export const profileData = {
  getProfile: (): User => {
    return { ...mockUser };
  },

  updateProfile: (updates: Partial<User>): User => {
    Object.assign(mockUser, updates);
    return { ...mockUser };
  }
};

// Location functions
export const locationData = {
  updateDriverLocation: (driverId: string, location: Omit<DriverLocation, 'driverId' | 'timestamp'>): DriverLocation => {
    const locationData: DriverLocation = {
      driverId,
      ...location,
      timestamp: new Date().toISOString()
    };
    driverLocationStore.set(driverId, locationData);
    return locationData;
  },

  getDriverLocation: (driverId: string): DriverLocation => {
    const location = driverLocationStore.get(driverId);
    if (location) {
      return location;
    }
    // Return default location if not found
    return {
      driverId,
      lat: 28.6139,
      lng: 77.2090,
      accuracy: 10,
      heading: null,
      speed: null,
      timestamp: new Date().toISOString()
    };
  },

  getOrderLocation: (orderId: string): DriverLocation | null => {
    // Find the order to get the driver ID
    const order = mockOrders.find(o => o.id === orderId);
    if (!order || !order.driverId) {
      return null;
    }
    return locationData.getDriverLocation(order.driverId);
  }
};

// Auth functions
export const authData = {
  getUserByEmail: (email: string): User & { password?: string } | undefined => {
    if (email === mockUser.email) {
      return { ...mockUser, password: "password123" };
    }
    return undefined;
  },

  createUser: (userData: Partial<User> & { email: string; password: string }): User => {
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name || "",
      email: userData.email,
      phone: userData.phone || "",
      vehicleType: userData.vehicleType,
      vehicleNumber: userData.vehicleNumber,
      isOnline: false,
      avatar: userData.avatar
    };
    // In a real app, we'd store this, but for mock we just return it
    return newUser;
  }
};

