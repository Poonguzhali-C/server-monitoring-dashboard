const mongoose = require("mongoose");

const metricSchema = new mongoose.Schema({

    cpu: String,

    ram: String,

    uptime: String,

    os:String,

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model(
    "Metric",
    metricSchema
);