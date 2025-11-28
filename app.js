require("dotenv").config(); 
const express = require("express");
const cors = require("cors");
const http = require("http");
const axios = require("axios");
const cron = require("node-cron");

const userRoutes = require("./routes/userRoutes");
const allHeadRoutes = require("./routes/allHeadRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const master = require("./routes/masterHeadWise");
const { closeAllPools } = require("./config/db");

const app = express();

// Handle aborted requests gracefully
app.use((req, res, next) => {
  req.on('aborted', () => {
    console.warn('Request aborted by client:', req.method, req.url);
  });
  next();
});

app.use(cors());
// Limit body size to prevent memory issues
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));



console.log("Database connection initialization initiated in db.js");

app.use("/api/user", userRoutes);
app.use("/api/allhead", allHeadRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/master", master);

app.post("/api/data", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and Email are required" });
  }
  res.status(201).json({
    message: "Data received successfully",
    data: { name, email },
  });
});

// Health check route for Railway
app.get("/", (req, res) => {
  res.status(200).send("SGHITECH Backend Running - Single DB Pool Version");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

const apiEndpoints = [
  'https://Sghitech.up.railway.app/api/budget/BudgetMasterNABARD',
  'https://Sghitech.up.railway.app/api/budget/BudgetMaster2515',
  'https://Sghitech.up.railway.app/api/budget/BudgetMasterMP',
  'https://Sghitech.up.railway.app/api/budget/BudgetMasterMLA',
  'https://Sghitech.up.railway.app/api/budget/BudgetMasterGAT_FBC',
  'https://Sghitech.up.railway.app/api/budget/BudgetMasterGAT_D',
  'https://Sghitech.up.railway.app/api/budget/BudgetMasterGAT_A',
  'https://Sghitech.up.railway.app/api/budget/BudgetMasterDPDC',
  'https://Sghitech.up.railway.app/api/budget/BudgetMasterDepositFund',
  'https://Sghitech.up.railway.app/api/budget/BudgetMasterCRF',
  'https://Sghitech.up.railway.app/api/budget/BudgetMasterBuilding',
  'https://Sghitech.up.railway.app/api/budget/BudgetMasterAunty',
  'https://Sghitech.up.railway.app/api/budget/BudgetMasterRoad'
];

app.post('/aggregate', async (req, res) => {
  try {
    const { office, position } = req.body;

    if (!office || !position) {
      return res
        .status(400)
        .json({ success: false, message: "Office and position parameters are required" });
    }

    const requests = apiEndpoints.map(endpoint => 
      axios.post(endpoint, { office, position })
    );

    const responses = await Promise.all(requests);

    // Initialize result structure by Head Name
    const headResults = {};
    
    // Map to convert Hindi status to English column names
    const statusMap = {
      "पूर्ण": "Completed",
      "प्रगतीत": "Inprogress",
      "निविदा स्तर": "Tender Stage",
      "अनुमान स्तर": "Estimated Stage",
      "सुरु न झालेले": "Not Started"
      // Add other status mappings as needed
    };

    // Process each response
    responses.forEach(response => {
      if (response.data && response.data.success && Array.isArray(response.data.data)) {
        // Extract the head name from the endpoint URL
        const endpointUrl = response.config.url;
        const headNameMatch = endpointUrl.match(/BudgetMaster([^/]+)$/);
        let headName = headNameMatch ? headNameMatch[1] : "Unknown";
        
        // Clean up head name
        if (headName === "Aunty") headName = "Annuity";
        if (headName === "2515") headName = "SH & DOR";
        
        if (!headResults[headName]) {
          headResults[headName] = {
            "Head Name": headName,
            "Completed": 0,
            "Incomplete": 0,
            "Inprogress": 0,
            "Tender Stage": 0,
            "Estimated Stage": 0,
            "Not Started": 0,
            "No Status": 0,
            "No.of.works": 0,
            "Estimated Cost 2022-2023": 0,
            "T.S Cost 2022-2023": 0,
            "Budget Provision 2022-2023": 0,
            "Expenditure 2022-2023": 0
          };
        }
        
        response.data.data.forEach(item => {
          const status = item["Work Status"] || "Unknown";
          const englishStatus = statusMap[status] || "No Status";
          const totalWorks = Number(item["Total Work"] || 0);
        
          // Increment the appropriate status column
          if (headResults[headName][englishStatus] !== undefined) {
            headResults[headName][englishStatus] += totalWorks;
          }
        
          // Add to total number of works
          headResults[headName]["No.of.works"] += totalWorks;
        
          // Add financial data (already assumed to be total for that status group)
          headResults[headName]["Estimated Cost 2022-2023"] += Number(item["Estimated Cost"] || 0);
          headResults[headName]["T.S Cost 2022-2023"] += Number(item["T.S Cost"] || 0);
          headResults[headName]["Budget Provision 2022-2023"] += Number(item["Budget Provision 2023-2024"] || 0);
          headResults[headName]["Expenditure 2022-2023"] += Number(item["Expenditure 2023-2024"] || 0);
        });
      }
    });

    // Calculate totals row
    const totalRow = {
      "Head Name": "Total",
      "Completed": 0,
      "Incomplete": 0,
      "Inprogress": 0,
      "Tender Stage": 0,
      "Estimated Stage": 0,
      "Not Started": 0,
      "No Status": 0,
      "No.of.works": 0,
      "Estimated Cost 2022-2023": 0,
      "T.S Cost 2022-2023": 0,
      "Budget Provision 2022-2023": 0,
      "Expenditure 2022-2023": 0
    };

    // Convert to array and format numbers
    const resultArray = Object.values(headResults).map(item => {
      // Add to total row
      Object.keys(totalRow).forEach(key => {
        if (key !== "Head Name") {
          totalRow[key] += item[key] || 0;
        }
      });
      
      // Format the financial values
      return {
        ...item,
        "Estimated Cost 2022-2023": parseFloat(item["Estimated Cost 2022-2023"].toFixed(2)),
        "T.S Cost 2022-2023": parseFloat(item["T.S Cost 2022-2023"].toFixed(2)),
        "Budget Provision 2022-2023": parseFloat(item["Budget Provision 2022-2023"].toFixed(2)),
        "Expenditure 2022-2023": parseFloat(item["Expenditure 2022-2023"].toFixed(2))
      };
    });
    
    // Format the totals row financial values
    Object.keys(totalRow).forEach(key => {
      if (key.includes("Cost") || key.includes("Provision") || key.includes("Expenditure")) {
        totalRow[key] = parseFloat(totalRow[key].toFixed(2));
      }
    });
    
    // Add total row to the result
    resultArray.push(totalRow);

    res.json({
      success: true,
      data: resultArray
    });

  } catch (error) {
    console.error('Error aggregating API data:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to aggregate API data',
      error: error.message
    });
  }
});

// Schedule daily notification at 1:15 PM IST
cron.schedule('00 07 * * *', async () => {
  console.log('Running daily notification check at 1:15 PM IST...');
  
  const offices = [
    'P_W_Circle_Akola'
  ];

  for (const office of offices) {
    try {
      console.log(`Checking notifications for office: ${office}`);
      
      // Call CircleNotificationBtnToday to send today's notifications
      const response = await axios.post('https://Sghitech.up.railway.app/api/budget/CircleNotificationBtnMonth', {
        office: office
      });
      
      console.log(`Notifications sent for ${office}:`, response.data.data?.length || 0, 'messages');
    } catch (error) {
      console.error(`Failed to send notifications for ${office}:`, error.message);
    }
  }
}, {
  timezone: "Asia/Kolkata"
});

console.log('Daily notification scheduler initialized for 1:15 PM IST');

app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "404 - Route Not Found" });
});

app.use((err, req, res, next) => {
  console.error("Global Error:", err.stack);
  const errorMessage =
    process.env.NODE_ENV === "production"
      ? "An internal server error occurred."
      : err.message;
  res
    .status(500)
    .json({
      success: false,
      message: "Something went wrong!",
      error: errorMessage,
    });
});

const PORT = process.env.PORT || 3001;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

server.on("error", (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof PORT === "string" ? "Pipe " + PORT : "Port " + PORT;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
});

// Global error handlers for uncaught exceptions and unhandled rejections
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // Don't exit immediately, let the process manager handle it
  // But log it for debugging
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Log but don't crash - let the app continue running
});

// Graceful shutdown handling for SIGTERM
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  
  // Stop accepting new connections
  server.close(() => {
    console.log('HTTP server closed');
    
    // Close all database connections
    closeAllPools()
      .then(() => {
        console.log('Graceful shutdown completed');
        process.exit(0);
      })
      .catch((err) => {
        console.error('Error closing database pools:', err);
        process.exit(1);
      });
  });
  
  // Force close after 10 seconds if graceful shutdown doesn't complete
  setTimeout(() => {
    console.error('Forced shutdown after timeout');
    process.exit(1);
  }, 10000);
});
