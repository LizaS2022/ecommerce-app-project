const router = require('express').Router();
const { Category, Product } = require('../../seeds/models');

// The `/api/categories` endpoint

router.get('/',async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    // find all library cards and perform a JOIN to include all associated Readers
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id',async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

  try {
    const categorySingleData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categorySingleData ) {
      res.status(404).json({ message: 'No library card found with that id!' });
      return;
    }

    res.status(200).json(categorySingleData );
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
    .then((categoryData) => {
      res.json(categoryData);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      id: req.body.id,
      category_name: req.body.category_name,
    },
    {
      
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedCategory) => {
      res.json(updatedCategory);
    })
    .catch((err) => res.json(err));
});

router.delete('/:id', async (req, res) => {
 // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deleteCategory) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;
