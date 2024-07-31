const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({ include: [{ model: Product }] });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: 'oops, try again'});
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk(req.params.id, { include: [{ model: Product}] });
    if (!category) {
      res.status(404).json({ message: 'oops, try again'});
      return;
    }
  }
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(500).json({ message: 'oops, try again' });
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategory = await Category.update(req.body, { 
      where: { 
        id: req.params.id
      } 
    });
    
    if (!updatedCategory) {
      res.status(404).json({ message: 'oops, try again' });
    }
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({ 
      where: {
        id: req.params.id
      },
    });
    if (!deleteCategory) {
      res.status(404).json({ message: 'oops, try again' });
    }
  }
});

module.exports = router;
