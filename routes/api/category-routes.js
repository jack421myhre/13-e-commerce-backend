const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpointcategories
router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const singleCategory = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!singleCategory) {
      res.status(404).json({ message: 'No category found with that ID.' });
      return;
    }

    res.status(200).json(singleCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const newCategory = req.body.category_name;
    const categoryUpdate = await Category.update({ category_name: newCategory }, {
      where: {
        id: req.params.id,
      },
    });

    if (!categoryUpdate) {
      res.status(404).json({ message: 'No category found with that ID.' });
      return;
    }

    res.status(200).json(categoryUpdate);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const targetCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!targetCategory) {
      res.status(404).json({ message: 'No category found with that ID.' });
      return;
    }

    res.status(200).json(targetCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
