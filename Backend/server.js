const express = require("express");
const cors = require("cors");
const multer = require("multer");
const XLSX = require("xlsx");

const app = express();

app.use(cors());
app.use(express.json());

let uploadedData = [];

// Multer Storage

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Upload Route

app.post("/upload", upload.single("file"), (req, res) => {
  try {
    const workbook = XLSX.readFile(req.file.path);

    const sheetName = workbook.SheetNames[0];

    const sheet = workbook.Sheets[sheetName];

    uploadedData = XLSX.utils.sheet_to_json(sheet);

    console.log("Uploaded Data:");
    console.log(uploadedData);

    res.json({
      success: true,
      rows: uploadedData.length,
      data: uploadedData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get Data

app.get("/data", (req, res) => {
  res.json(uploadedData);
});

// Question Route

app.post("/question", (req, res) => {
  const { question } = req.body;

  const q = question.toLowerCase();

  // Total Sales

  if (q.includes("total sales")) {
    const total = uploadedData.reduce(
      (sum, row) => sum + Number(row.sales || 0),
      0
    );

    return res.json({
      answer: `Total Sales = ₹${total}`,
    });
  }

  // Top Customer

  if (
    q.includes("top customer") ||
    q.includes("top customers")
  ) {
    const top = uploadedData.reduce((prev, current) =>
      Number(prev.sales) > Number(current.sales)
        ? prev
        : current
    );

    return res.json({
      answer: `Top Customer = ${top.customer}`,
    });
  }

  // Outstanding Invoices

  if (q.includes("outstanding invoices")) {
    const unpaid = uploadedData
      .filter(
        (item) =>
          item.status &&
          item.status.toLowerCase() === "unpaid"
      )
      .map((item) => item.customer);

    return res.json({
      answer:
        unpaid.length > 0
          ? `Outstanding Customers: ${unpaid.join(", ")}`
          : "No outstanding invoices found",
    });
  }

  // Monthly Trends

if (q.includes("monthly trends")) {
  const total = uploadedData.reduce(
    (sum, row) => sum + Number(row.sales || 0),
    0
  );

  return res.json({
    answer: `Current uploaded sales total ₹${total}. Monthly trend feature can be extended when date columns are available.`,
  });
}

  // Default Response

  return res.json({
    answer:
      "Supported questions: Total Sales, Top Customer, Outstanding Invoices, Monthly Trends",
  });
});

// Server Start

app.listen(5000, () => {
  console.log("Server Running On Port 5000");
});