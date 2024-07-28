const Order = require('../models/order.model');
const db = require('../firebaseAdmin');

const saveOrder = async (req, res) => {
  const { name, whatsapp, tableNo, items } = req.body;

  console.log('Received order data:', req.body);

  try {
    const newOrder = new Order({
      name,
      whatsapp,
      tableNo,
      items
    });

    const savedOrder = await newOrder.save();
    console.log('Order saved to database:', savedOrder);

    // Add order to Firestore
    const firestoreOrder = {
      name: savedOrder.name,
      whatsapp: savedOrder.whatsapp,
      tableNo: savedOrder.tableNo,
      items: savedOrder.items,
      createdAt: savedOrder.createdAt
    };

    await db.collection('orders').add(firestoreOrder);
    console.log('Order added to Firestore');

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

module.exports = { saveOrder };
