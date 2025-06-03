db = db.getSiblingDB('vacays');

// Create collections
db.createCollection('users');
db.createCollection('hotels');
db.createCollection('bookings');

// Create sample users
db.users.insertMany([
  {
    _id: ObjectId("60d0fe4f5311236168a109ca"),
    email: "admin@example.com",
    password: "$2a$10$GQx9eXlnLdJKSjXnSMEWB.uOt7/bGxKGM0YDlCQ7Xc7lKVJ.WGYyS", // "password123"
    firstName: "Admin",
    lastName: "User",
    isAdmin: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: ObjectId("60d0fe4f5311236168a109cb"),
    email: "user@example.com",
    password: "$2a$10$GQx9eXlnLdJKSjXnSMEWB.uOt7/bGxKGM0YDlCQ7Xc7lKVJ.WGYyS", // "password123"
    firstName: "Regular",
    lastName: "User",
    isAdmin: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Create sample hotels
db.hotels.insertMany([
  {
    _id: ObjectId("60d0fe4f5311236168a109cc"),
    userId: ObjectId("60d0fe4f5311236168a109ca"),
    name: "Beach Resort",
    city: "Miami",
    country: "USA",
    description: "Beautiful beachfront resort with stunning views",
    type: "Resort",
    adultCount: 2,
    childCount: 2,
    facilities: ["Pool", "Spa", "Gym", "WiFi", "Parking"],
    pricePerNight: 199.99,
    starRating: 4.5,
    imageUrls: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg"
    ],
    bookings: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: ObjectId("60d0fe4f5311236168a109cd"),
    userId: ObjectId("60d0fe4f5311236168a109ca"),
    name: "Mountain Cabin",
    city: "Aspen",
    country: "USA",
    description: "Cozy cabin in the mountains with fireplace",
    type: "Cabin",
    adultCount: 4,
    childCount: 2,
    facilities: ["Fireplace", "WiFi", "Kitchen", "Parking"],
    pricePerNight: 149.99,
    starRating: 4.2,
    imageUrls: [
      "https://example.com/image3.jpg",
      "https://example.com/image4.jpg"
    ],
    bookings: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Create indexes for better performance
db.users.createIndex({ email: 1 }, { unique: true });
db.hotels.createIndex({ city: 1 });
db.hotels.createIndex({ country: 1 });
db.hotels.createIndex({ pricePerNight: 1 });
db.hotels.createIndex({ starRating: 1 });
db.bookings.createIndex({ userId: 1 });
db.bookings.createIndex({ hotelId: 1 }); 