import Sweet from '../models/Sweet.js';

export const addSweet = async (req, res) => {
  const { name, category, price, quantity } = req.body;
  const sweet = await Sweet.create({ name, category, price, quantity });
  res.status(201).json(sweet);
};

export const getSweets = async (req, res) => {
  const sweets = await Sweet.find({});
  res.json(sweets);
};

export const searchSweets = async (req, res) => {
  const { name, category, minPrice, maxPrice } = req.query;

  const query = {};

  if (name) {
    query.name = { $regex: name, $options: 'i' };
  }
  if (category) {
    query.category = { $regex: category, $options: 'i' };
  }
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) {
      query.price.$gte = Number(minPrice); // gte = greater than or equal
    }
    if (maxPrice) {
      query.price.$lte = Number(maxPrice); // lte = less than or equal
    }
  }

  const sweets = await Sweet.find(query);
  res.json(sweets);
};

export const updateSweet = async (req, res) => {
  const { name, category, price, quantity } = req.body;
  const sweet = await Sweet.findById(req.params.id);

  if (sweet) {
    sweet.name = name || sweet.name;
    sweet.category = category || sweet.category;
    sweet.price = price || sweet.price;
    sweet.quantity = quantity || sweet.quantity;
    const updatedSweet = await sweet.save();
    res.json(updatedSweet);
  } else {
    res.status(404).json({ message: 'Sweet not found' });
  }
};

export const deleteSweet = async (req, res) => {
  const sweet = await Sweet.findById(req.params.id);

  if (sweet) {
    await sweet.deleteOne();
    res.json({ message: 'Sweet removed' });
  } else {
    res.status(404).json({ message: 'Sweet not found' });
  }
};


export const purchaseSweet = async (req, res) => {
  const sweet = await Sweet.findById(req.params.id);

  if (sweet) {
    if (sweet.quantity > 0) {
      sweet.quantity -= 1;
      await sweet.save();
      res.json(sweet);
    } else {
      res.status(400).json({ message: 'Sweet is out of stock' });
    }
  } else {
    res.status(404).json({ message: 'Sweet not found' });
  }
};

export const restockSweet = async (req, res) => {
  const { amount } = req.body;
  const sweet = await Sweet.findById(req.params.id);

  if (sweet) {
    sweet.quantity += Number(amount);
    await sweet.save();
    res.json(sweet);
  } else {
    res.status(404).json({ message: 'Sweet not found' });
  }
};