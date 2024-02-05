const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tag = await Tag.findAll({
      include: [{
        model: Product,
        through: ProductTag
      }]
    });
    res.status(200).json(tag)
  } catch (err) {
    console.log(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const singleTag = await Tag.findByPk(req.params.id, {
      include: Product
    });
    res.status(200).json(singleTag)
  } catch (err) {
    console.log(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);

    res.status(201).json(newTag);
  } catch (err) {
    console.log(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.status(201).json(updateTag)
  } catch (err) {
    console.log(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const destroy = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(201).json(destroy)
  } catch (err) {
    console.log(err)
  }
});

module.exports = router;
