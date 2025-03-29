var express = require('express');
var router = express.Router();
const authService = require('../services/authService');

const {createChallange,inviteUsers,getChallange,checkAnsers,getResult,getCompetitionInfo}=require('../services/challangeService')

router.use(authService.protect);

router.post('/',createChallange)
// router.post('/invite',inviteUsers)

router.get('/:id',getCompetitionInfo)
router.get('/:id/result',getResult)
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
