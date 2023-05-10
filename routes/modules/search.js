const express = require("express");
const router = express.Router();
const Record = require("../../models/record");

router.get("/:category?", async (req, res, next) => {
  const userId = req.user._id;

  try {
    let records = await Record.find({ userId })
      .populate({ path: "categoryId", model: "Category" })
      .lean();

    records = records.filter(
      (record) => record.categoryId.name_en === req.params.category
    );
    const total_cost = records.reduce((sum, record) => sum + record.amount, 0);

    records = records.map((record) => {
      record.date = new Date(record.date).toLocaleDateString();
      return record;
    });

    res.render("index", { records, total_cost });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
