const express = require("express");
const router = express.Router();
const Record = require("../../models/record");
const Category = require("../../models/category");


router.get("/:category_en?", async (req, res, next) => {
  const userId = req.user._id;
  const category_en = req.params.category_en;
  try {
    let records = await Record.find({ userId })
      .populate({ path: "categoryId", model: "Category" })
      .lean();

    let category = await Category.findOne({ name_en: category_en }).lean();

    records = records.filter(
      (record) => record.categoryId.name_en === req.params.category
    );

    const total_cost = records.reduce((sum, record) => sum + record.amount, 0);

    records = records.map((record) => {
      record.date = new Date(record.date).toLocaleDateString();
      return record;
    });

    res.render("index", { records, total_cost, category });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
