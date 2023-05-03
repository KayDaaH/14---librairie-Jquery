const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    startDate: {
      type: String,
    },
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    State: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    department: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("employee", postSchema);
