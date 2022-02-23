const express = require("express");
const { getmyTasks, createMyTask, getMyTaskById, updateMyTask, deleteMyTask } = require("../Controller/mytaskController");
const { protect } = require("../MiddleWare/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getmyTasks);
router.route("/createtask").post(protect, createMyTask);
router.route("/:id")
        .get(getMyTaskById)
        .put(protect, updateMyTask)
        .delete(protect, deleteMyTask);

module.exports = router;