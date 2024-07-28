const Order = require('../models/order.model');

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
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

module.exports = { saveOrder };
