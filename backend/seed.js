const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Resource = require('./models/Resource');
dotenv.config();
const sampleResources = [
  {
    resourceName: "Sony 4K Projector",
    category: "Electronics",
    location: "Block A - Room 101",
    description: "High definition 4K projector for presentations and seminars. HDMI cable included.",
    condition: "Good",
    availability: "Available"
  },
  {
    resourceName: "Main Seminar Hall",
    category: "Venue",
    location: "Block B - Ground Floor",
    description: "Large air-conditioned hall with a seating capacity of 200 people. Includes stage and sound system.",
    condition: "Good",
    availability: "Available"
  },
  {
    resourceName: "Nikon DSLR Camera",
    category: "Photography",
    location: "Media Lab - Block C",
    description: "Nikon D7500 with 18-140mm lens. Great for college event coverage.",
    condition: "Average",
    availability: "Available"
  },
  {
    resourceName: "JBL Wireless Microphones (Pair)",
    category: "Audio",
    location: "Store Room - Block B",
    description: "Two wireless microphones with a receiver. Battery life up to 6 hours.",
    condition: "Good",
    availability: "Available"
  },
  {
    resourceName: "Cricket Kit",
    category: "Sports",
    location: "Sports Complex",
    description: "Full cricket kit including 2 bats, pads, gloves, helmets, and a season ball.",
    condition: "Poor",
    availability: "Available"
  },
  {
    resourceName: "Advanced Computer Lab",
    category: "Lab",
    location: "Block A - 3rd Floor",
    description: "Lab with 30 high-end PCs (i7, 16GB RAM, RTX 3060). For workshops and coding competitions.",
    condition: "Good",
    availability: "Available"
  }
];
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected for seeding...');
    await Resource.deleteMany({}); // clear existing
    await Resource.insertMany(sampleResources);
    console.log('Sample resources added successfully!');
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
