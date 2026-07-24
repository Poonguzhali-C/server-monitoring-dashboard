const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const si = require("systeminformation");
require("dotenv").config();

const Metric = require("./models/Metric");

const app = express();

app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
    console.log(process.env.MONGO_URI);
});

app.get("/", (req, res) => {
    res.send("Server_monitoring is running");
});

app.get("/api/metrics", async (req, res) => {

    try {

        const CPU_Load = await si.currentLoad();
        const Mem = await si.mem();
        const time = await si.time();
        const os = await si.osInfo();

        const metricData = {

            cpu:CPU_Load.currentLoad.toFixed(2) + "%",
            ram:((Mem.used / Mem.total) * 100).toFixed(2) + "%",
            uptime:Math.floor(time.uptime / 3600)+ " hours",
            os:os.distro
        };
        // STORE INTO DATABASE
        const metric = new Metric(metricData);
        await metric.save();
        res.json(metricData);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });

    }

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});