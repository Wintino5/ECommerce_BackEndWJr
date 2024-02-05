const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: Product
    });

    if (!categories) {
      return res.status(404).json({
        message: 'Cannot get categories'
      })
    }
    res.status(200).json(categories)

  } catch (err) {
    console.log(err)
  }
});

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: Product,
    });

    if (!category) {
      return res.status(404).json({
        message: 'Category not found'
      });
    }
    res.status(200).json(category)
  } catch (err) {
    console.log(err)
  } 
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);

  res.status(201).json(newCategory);
  } catch (err) {
    console.log(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const category = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.status(201).json(category)
  } catch (error) {
    console.log(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const destroy = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(201).json(destroy);
  } catch (error) {
    console.log(err)
  }
});

module.exports = router;
