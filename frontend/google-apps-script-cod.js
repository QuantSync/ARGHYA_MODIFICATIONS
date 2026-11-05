/**
 * =========================================================================
 * Google Apps Script for Arghya Modifications — Cash On Delivery (COD) Orders
 * =========================================================================
 *
 * HOW TO SETUP (Takes 2 minutes):
 * -------------------------------------------------------------------------
 * 1. Open Google Sheets (https://sheets.new)
 *    Name the sheet: "Arghya Modifications - COD Orders"
 *
 * 2. In Google Sheets top menu, click:
 *    Extensions  ->  Apps Script
 *
 * 3. Delete ANY default code inside Code.gs, and PASTE THIS ENTIRE SCRIPT.
 *
 * 4. (Optional Test):
 *    Select "testDoPost" from the function dropdown at the top and click "Run".
 *    Grant permissions when asked. Go back to your Google Sheet — you will see
 *    a sample order successfully added! Delete that test row if you want.
 *
 * 5. Deploy as Web App:
 *    - Click the blue "Deploy" button (top right) -> "New deployment"
 *    - Next to "Select type", click the gear icon ⚙️ -> Choose "Web app"
 *    - Description: "Arghya COD Webhook"
 *    - Execute as: "Me" (your email)
 *    - Who has access: "Anyone" (⚠️ CRITICAL: Must be "Anyone", NOT "Only myself")
 *    - Click "Deploy" -> Authorize access with your Google account -> Click "Advanced" -> "Go to ... (unsafe)" -> "Allow"
 *
 * 6. Copy the "Web app URL" (starts with https://script.google.com/macros/s/.../exec)
 *
 * 7. In your Next.js project:
 *    Open `frontend/.env.local` and add:
 *    GOOGLE_SHEET_COD_URL="https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"
 *
 *    (Restart the Next.js dev server if running so it picks up the .env variable)
 * =========================================================================
 */

// Exact 12-Column Headers requested for Google Sheets
var DEFAULT_HEADERS = [
  "Name",
  "City / District",
  "State",
  "Pincode",
  "Timestamp",
  "Product Name",
  "Order ID",
  "Email",
  "Phone Number",
  "Block / Colony / Locality",
  "House / Flat",
  "Total Amount"
];

/**
 * Handles incoming POST requests from Next.js backend API (/api/cod-order)
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 10 seconds for concurrent requests so no orders get dropped
  try {
    lock.waitLock(10000);
  } catch (lockErr) {
    // Continue even if lock timed out
  }

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parse JSON payload safely
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter && Object.keys(e.parameter).length > 0) {
      data = e.parameter;
    } else {
      // Default fallback sample for manual execution inside Apps Script Editor
      data = {
        name: "Test Customer",
        city: "Kolkata",
        state: "West Bengal",
        pincode: "700001",
        productName: "Blossom Floral Printed Kurti",
        orderId: "ARG-COD-TEST",
        email: "care.arghya@gmail.com",
        phone: "9876543210",
        locality: "Salt Lake Sector 5",
        houseFlat: "Flat 4B, Tower 2",
        amount: "Rs 419 + Rs 25 = Rs 444",
        totalAmount: 444
      };
    }

    // Auto-initialize header row with bold formatting if sheet is fresh/empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(DEFAULT_HEADERS);
      var headerRange = sheet.getRange(1, 1, 1, DEFAULT_HEADERS.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#2A0A10");
      headerRange.setFontColor("#FFFFFF");
      headerRange.setHorizontalAlignment("center");
      sheet.setFrozenRows(1);
    }

    // Read current headers from Row 1
    var lastCol = Math.max(sheet.getLastColumn(), DEFAULT_HEADERS.length);
    var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];

    // Timestamp formatted in Indian Standard Time (IST)
    var istTimestamp = Utilities.formatDate(
      new Date(),
      "Asia/Kolkata",
      "dd/MM/yyyy, hh:mm:ss a"
    );

    // Format amount text nicely (e.g. "Rs 419 + Rs 25 = Rs 444")
    var amountFormatted = data.amount || data.amountText;
    if (!amountFormatted) {
      if (data.basePrice && data.deliveryCharge && data.totalAmount) {
        amountFormatted = "Rs " + data.basePrice + " + Rs " + data.deliveryCharge + " = Rs " + data.totalAmount;
      } else if (data.totalAmount) {
        var base = Number(data.totalAmount) - 25;
        amountFormatted = "Rs " + base + " + Rs 25 = Rs " + data.totalAmount;
      } else {
        amountFormatted = "Rs 419 + Rs 25 = Rs 444";
      }
    }

    // Format product name (include size if available)
    var prodName = data.productName || "Blossom Floral Printed Kurti";
    if (data.size && data.size !== "Free Size" && !prodName.includes(data.size)) {
      prodName += " (Size: " + data.size + ")";
    }

    // Build the row array aligned to headers
    var row = [];
    for (var i = 0; i < headers.length; i++) {
      var h = headers[i] ? headers[i].toString().trim().toLowerCase() : "";

      if (h === "name" || h.includes("customer")) {
        row.push(data.name || "");
      } else if (h.includes("city") || h.includes("district")) {
        row.push(data.city || "");
      } else if (h.includes("state")) {
        row.push(data.state || "");
      } else if (h.includes("pincode") || h.includes("pin") || h.includes("postal") || h.includes("zip")) {
        // Prepend single quote so Google Sheets preserves leading zeros as text
        row.push("'" + (data.pincode || ""));
      } else if (h.includes("timestamp") || h.includes("time") || h.includes("date")) {
        row.push(istTimestamp);
      } else if (h.includes("product")) {
        row.push(prodName);
      } else if (h.includes("order id") || h === "order_id" || h === "orderid") {
        row.push(data.orderId || "");
      } else if (h.includes("email")) {
        row.push(data.email || "N/A");
      } else if (h.includes("phone") || h.includes("mobile") || h.includes("contact")) {
        // Prepend single quote so Google Sheets treats it as text and doesn't convert to exponential
        row.push("'" + (data.phone || ""));
      } else if (h.includes("block") || h.includes("colony") || h.includes("locality")) {
        row.push(data.locality || "");
      } else if (h.includes("house") || h.includes("flat") || h.includes("building") || h.includes("address")) {
        row.push(data.houseFlat || "");
      } else if (h.includes("amount") || h.includes("price") || h.includes("total")) {
        row.push(amountFormatted);
      } else {
        // Any extra custom columns
        row.push("");
      }
    }

    // Append the order row to the spreadsheet
    sheet.appendRow(row);

    // Auto-fit column widths for readability on initial orders
    if (sheet.getLastRow() <= 5) {
      for (var col = 1; col <= Math.min(headers.length, 12); col++) {
        sheet.autoResizeColumn(col);
      }
    }

    return ContentService
      .createTextOutput(JSON.stringify({
        status: "success",
        orderId: data.orderId || "",
        timestamp: istTimestamp,
        message: "Order saved successfully in Google Sheets"
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "error",
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    try {
      lock.releaseLock();
    } catch (e) {
      // Lock already released
    }
  }
}

/**
 * Handles GET requests (for browser test or uptime check)
 */
function doGet(e) {
  return ContentService
    .createTextOutput("✅ Arghya COD Webhook is ACTIVE and READY to accept orders.")
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Test function: Run this directly in Google Apps Script editor
 * to verify that writing to the active sheet works without any errors.
 */
function testDoPost() {
  var testPayload = {
    postData: {
      contents: JSON.stringify({
        orderId: "ARG-COD-TEST-" + Math.floor(1000 + Math.random() * 9000),
        name: "Test Customer (Arghya)",
        phone: "9876543210",
        email: "care.arghya@gmail.com",
        houseFlat: "Flat 302, Royal Residency",
        locality: "MG Road, Sector 4",
        city: "Kolkata",
        state: "West Bengal",
        pincode: "700001",
        productName: "Blossom Floral Printed Kurti",
        size: "Free Size",
        basePrice: 419,
        deliveryCharge: 25,
        totalAmount: 444,
        amount: "Rs 419 + Rs 25 = Rs 444"
      })
    }
  };

  var res = doPost(testPayload);
  Logger.log("Result: " + res.getContent());
}
