const express = require("express");
const axios = require("axios");

const app = express();
const port = 5000;

app.get("/house", async (req, res) => {
  try {
    let allData = [];

    for (let pageIndex = 1; pageIndex <= 111; pageIndex++) {
      const apiUrl = `https://backend.120ddp.xyz/api/search/houses/address-title?app_version=2.0&&page_index=${pageIndex}`;
      const response = await axios.get(apiUrl);

      if (!response.data || response.data.length === 0) {
        break;
      }

      allData = allData.concat(response.data);
    }

    return res.json(allData);
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Lắng nghe cổng
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
