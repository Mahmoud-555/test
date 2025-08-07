var express = require('express');
var router = express.Router();
const authService = require('../services/authService');

const {createTest,getTest,checkAnsers}=require('../services/testService')

router.use(authService.protect);

router.post('/',createTest)
router.get('/:id',getTest)
router.post('/:id',checkAnsers)










async function getRandomQuestions(categoryLimits) {
  const results = {};

  for (const [categoryId, limit] of Object.entries(categoryLimits)) {
      // استرجاع المنتجات المرتبطة بالـ categoryId
      const products = await Product.aggregate([
          { $match: { categoryId: mongoose.Types.ObjectId(categoryId) } },
          { $sample: { size: limit } } // اختيار عدد عشوائي من المنتجات حسب limit
      ]);

      results[categoryId] = products;
  }

  return results;
}


  module.exports = router;
