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

    const plainOrder = savedOrder.toObject();
    plainOrder.items = plainOrder.items.map(item => {
      const plainItem = item.toObject ? item.toObject() : item;
      delete plainItem._id;
      return plainItem;
    });
    delete plainOrder._id;

    console.log('Adding order to Firestore:', plainOrder);

    await db.collection('orders').add(plainOrder);
    console.log('Order added to Firestore');

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

module.exports = { saveOrder };
