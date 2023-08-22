// mongoose allow to make schema
// make db alone is schemaless

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const options = {
  timeZone: "Asia/Kolkata", // Indian Standard Time (IST)
  hour12: false, // Use 24-hour time format
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    deadlineTime: {
      type: String,
      required: true,
    },
    deadlineDate: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
    date: {
      type: String,
    },
    user_id: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
