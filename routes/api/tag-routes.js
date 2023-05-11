const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../seeds/models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagsData = await Tag.findAll({
      include: [{model: Product}]
    })
    res.status(200).json(tagsData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const singleTagData = await Tag.findByPk({
      include: [{model: Product}]
    })
    res.status(200).json(singleTagData);
    }
    catch (err) {
      res.status(500).json(err);
    }


});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((tagData) => {
      res.json(tagData);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      id: req.body.id,
      tag_names: req.body.tag_names,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedTag) => {
      res.json(updatedTag);
    })
    .catch((err) => res.json(err));
});



router.delete('/:id',async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletetag = await Tag.destroy({
      where: { id: req.params.id}
    })
    if(!deletetag){
      res.status(404).json("No tag found with id " + req.params.id)
    }
    res.json(deletetag)
  }
  catch(err) {
    res.status(500).json("Error: " + err.message)
  }
});

module.exports = router;
