const mongoose = require("mongoose");

const mytaskSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        taskDate: {
            type: String,
            required: true,
        },

        user: {
            //can use according to the requirements
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
          },
    },

    {
        timestamps: false,
    }
);

const MyTask = mongoose.model("MyTask", mytaskSchema);

module.exports = MyTask;