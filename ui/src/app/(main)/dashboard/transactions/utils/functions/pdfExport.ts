import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { ITransaction } from "../../types/transaction";
import { formatDate } from "./formatDate";
import { formatCurrency } from "./formatCurrency";

interface IExportOptions {
  filename?: string;
  title?: string;
  includeStats?: boolean;
}

/**
 * Creates the ai-money logo as an HTML element
 */
function createLogo(): HTMLDivElement {
  const logoContainer = document.createElement("div");
  logoContainer.style.display = "flex";
  logoContainer.style.alignItems = "center";
  logoContainer.style.justifyContent = "flex-start";
  logoContainer.style.gap = "10px";
  logoContainer.style.marginBottom = "20px";

  // Blue circle
  const circle = document.createElement("div");
  circle.style.width = "28px";
  circle.style.height = "28px";
  circle.style.backgroundColor = "#1a48bc";
  circle.style.borderRadius = "50%";
  circle.style.flexShrink = "0";
  circle.style.display = "flex";
  circle.style.alignItems = "center";
  circle.style.justifyContent = "center";

  // Text
  const text = document.createElement("span");
  text.textContent = "ai money";
  text.style.fontSize = "16px";
  text.style.fontWeight = "bold";
  text.style.color = "#1f2937";
  text.style.lineHeight = "1";
  text.style.verticalAlign = "middle";

  logoContainer.appendChild(circle);
  logoContainer.appendChild(text);

  return logoContainer;
}

/**
 * Generates a PDF table from transaction data
 */
function generateTransactionTable(
  transactions: ITransaction[]
): HTMLTableElement {
  const table = document.createElement("table");
  table.style.width = "100%";
  table.style.borderCollapse = "collapse";
  table.style.marginTop = "20px";

  // Create header
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  headerRow.style.backgroundColor = "#f3f4f6";
  headerRow.style.borderBottom = "2px solid #d1d5db";

  const headers = [
    "Date",
    "Description",
    "Category",
    "Type",
    "Status",
    "Amount",
  ];
  headers.forEach((header) => {
    const th = document.createElement("th");
    th.textContent = header;
    th.style.padding = "12px";
    th.style.textAlign = "left";
    th.style.fontWeight = "bold";
    th.style.fontSize = "12px";
    th.style.color = "#1f2937";
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create body
  const tbody = document.createElement("tbody");
  transactions.forEach((transaction, index) => {
    const row = document.createElement("tr");
    row.style.borderBottom = "1px solid #e5e7eb";
    row.style.backgroundColor = index % 2 === 0 ? "#ffffff" : "#f9fafb";

    const cells = [
      formatDate(transaction.date),
      transaction.description || transaction.name,
      transaction.category,
      transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1),
      transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1),
      formatCurrency(transaction.amount),
    ];

    cells.forEach((cell) => {
      const td = document.createElement("td");
      td.textContent = cell;
      td.style.padding = "12px";
      td.style.fontSize = "11px";
      td.style.color = "#374151";
      row.appendChild(td);
    });

    tbody.appendChild(row);
  });
  table.appendChild(tbody);

  return table;
}

/**
 * Exports all transactions to PDF
 */
export async function exportTransactionsToPDF(
  transactions: ITransaction[],
  options: IExportOptions = {}
): Promise<void> {
  const {
    filename = `transactions-${new Date().toISOString().split("T")[0]}.pdf`,
    title = "Transaction Report",
  } = options;

  try {
    // Create a temporary container
    const container = document.createElement("div");
    container.style.padding = "20px";
    container.style.backgroundColor = "white";
    container.style.position = "absolute";
    container.style.left = "-9999px";
    container.style.width = "1200px";

    // Add logo
    const logo = createLogo();
    container.appendChild(logo);

    // Add title
    const titleElement = document.createElement("h1");
    titleElement.textContent = title;
    titleElement.style.fontSize = "24px";
    titleElement.style.fontWeight = "bold";
    titleElement.style.marginBottom = "10px";
    titleElement.style.color = "#1f2937";
    container.appendChild(titleElement);

    // Add date
    const dateElement = document.createElement("p");
    dateElement.textContent = `Generated on: ${new Date().toLocaleString()}`;
    dateElement.style.fontSize = "12px";
    dateElement.style.color = "#6b7280";
    dateElement.style.marginBottom = "20px";
    container.appendChild(dateElement);

    // Add summary stats
    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    const balance = totalIncome - totalExpenses;

    const statsDiv = document.createElement("div");
    statsDiv.style.display = "grid";
    statsDiv.style.gridTemplateColumns = "repeat(3, 1fr)";
    statsDiv.style.gap = "15px";
    statsDiv.style.marginBottom = "20px";

    const stats = [
      { label: "Total Income", value: formatCurrency(totalIncome) },
      { label: "Total Expenses", value: formatCurrency(totalExpenses) },
      { label: "Balance", value: formatCurrency(balance) },
    ];

    stats.forEach((stat) => {
      const statBox = document.createElement("div");
      statBox.style.padding = "15px";
      statBox.style.backgroundColor = "#f3f4f6";
      statBox.style.borderRadius = "8px";
      statBox.style.border = "1px solid #e5e7eb";

      const label = document.createElement("p");
      label.textContent = stat.label;
      label.style.fontSize = "12px";
      label.style.color = "#6b7280";
      label.style.marginBottom = "5px";

      const value = document.createElement("p");
      value.textContent = stat.value;
      value.style.fontSize = "18px";
      value.style.fontWeight = "bold";
      value.style.color = "#1f2937";

      statBox.appendChild(label);
      statBox.appendChild(value);
      statsDiv.appendChild(statBox);
    });
    container.appendChild(statsDiv);

    // Add table
    const table = generateTransactionTable(transactions);
    container.appendChild(table);

    // Append to body temporarily
    document.body.appendChild(container);

    // Convert to canvas
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
    });

    // Remove temporary container
    document.body.removeChild(container);

    // Create PDF
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pdfWidth - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 10;

    pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight - 20;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight - 20;
    }

    // Download PDF
    pdf.save(filename);
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("Failed to generate PDF");
  }
}

/**
 * Exports a single transaction receipt to PDF
 */
export async function exportTransactionReceiptToPDF(
  transaction: ITransaction,
  options: IExportOptions = {}
): Promise<void> {
  const {
    filename = `receipt-${transaction.id}-${
      new Date().toISOString().split("T")[0]
    }.pdf`,
    title = "Transaction Receipt",
  } = options;

  try {
    // Create a temporary container
    const container = document.createElement("div");
    container.style.padding = "40px";
    container.style.backgroundColor = "white";
    container.style.position = "absolute";
    container.style.left = "-9999px";
    container.style.width = "600px";
    container.style.fontFamily = "Arial, sans-serif";

    // Add logo
    const logo = createLogo();
    logo.style.justifyContent = "center";
    logo.style.marginBottom = "30px";
    container.appendChild(logo);

    // Add title
    const titleElement = document.createElement("h1");
    titleElement.textContent = title;
    titleElement.style.fontSize = "28px";
    titleElement.style.fontWeight = "bold";
    titleElement.style.marginBottom = "30px";
    titleElement.style.textAlign = "center";
    titleElement.style.color = "#1f2937";
    container.appendChild(titleElement);

    // Add receipt details
    const detailsDiv = document.createElement("div");
    detailsDiv.style.marginBottom = "30px";

    const details = [
      { label: "Transaction ID", value: `#${transaction.id}` },
      { label: "Date", value: formatDate(transaction.date) },
      { label: "Time", value: transaction.time },
      {
        label: "Description",
        value: transaction.description || transaction.name,
      },
      { label: "Category", value: transaction.category },
      { label: "Type", value: transaction.type.toUpperCase() },
      { label: "Status", value: transaction.status.toUpperCase() },
    ];

    details.forEach((detail) => {
      const row = document.createElement("div");
      row.style.display = "flex";
      row.style.justifyContent = "space-between";
      row.style.padding = "10px 0";
      row.style.borderBottom = "1px solid #e5e7eb";

      const label = document.createElement("span");
      label.textContent = detail.label;
      label.style.fontWeight = "bold";
      label.style.color = "#6b7280";

      const value = document.createElement("span");
      value.textContent = detail.value;
      value.style.color = "#1f2937";

      row.appendChild(label);
      row.appendChild(value);
      detailsDiv.appendChild(row);
    });
    container.appendChild(detailsDiv);

    // Add amount section
    const amountDiv = document.createElement("div");
    amountDiv.style.padding = "20px";
    amountDiv.style.backgroundColor = "#f3f4f6";
    amountDiv.style.borderRadius = "8px";
    amountDiv.style.textAlign = "center";
    amountDiv.style.marginBottom = "30px";

    const amountLabel = document.createElement("p");
    amountLabel.textContent = "Amount";
    amountLabel.style.fontSize = "14px";
    amountLabel.style.color = "#6b7280";
    amountLabel.style.marginBottom = "10px";

    const amountValue = document.createElement("p");
    amountValue.textContent = formatCurrency(transaction.amount);
    amountValue.style.fontSize = "32px";
    amountValue.style.fontWeight = "bold";
    amountValue.style.color =
      transaction.type === "income" ? "#10b981" : "#ef4444";

    amountDiv.appendChild(amountLabel);
    amountDiv.appendChild(amountValue);
    container.appendChild(amountDiv);

    // Add footer
    const footerDiv = document.createElement("div");
    footerDiv.style.textAlign = "center";
    footerDiv.style.marginTop = "40px";
    footerDiv.style.paddingTop = "20px";
    footerDiv.style.borderTop = "1px solid #e5e7eb";
    footerDiv.style.color = "#9ca3af";
    footerDiv.style.fontSize = "12px";
    footerDiv.textContent = `Generated on ${new Date().toLocaleString()}`;
    container.appendChild(footerDiv);

    // Append to body temporarily
    document.body.appendChild(container);

    // Convert to canvas
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
    });

    // Remove temporary container
    document.body.removeChild(container);

    // Create PDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const imgWidth = pdfWidth - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);

    // Download PDF
    pdf.save(filename);
  } catch (error) {
    console.error("Error generating receipt PDF:", error);
    throw new Error("Failed to generate receipt PDF");
  }
}
