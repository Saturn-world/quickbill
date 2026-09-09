// QuickBill – Invoice Generator
let lineItems = [
  { id: 1, description: "Website Design", quantity: 1, rate: 1200 },
  { id: 2, description: "SEO Optimization", quantity: 5, rate: 150 }
];

const currencySymbols = {
  USD: "$", EUR: "€", GBP: "£", ZAR: "R", CAD: "C$"
};

function formatMoney(amount, currency = "USD") {
  const symbol = currencySymbols[currency] || "$";
  return `${symbol}${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

function renderLineItems() {
  const container = document.getElementById("lineItems");
  container.innerHTML = lineItems.map((item, index) => `
    <div class="flex gap-2 items-start" data-id="${item.id}">
      <div class="flex-1">
        <input type="text" value="${item.description}" placeholder="Description"
          class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          oninput="updateItem(${item.id}, 'description', this.value)">
      </div>
      <div class="w-20">
        <input type="number" value="${item.quantity}" min="0" step="1" placeholder="Qty"
          class="w-full rounded-lg border border-slate-300 px-2 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          oninput="updateItem(${item.id}, 'quantity', parseFloat(this.value) || 0)">
      </div>
      <div class="w-28">
        <input type="number" value="${item.rate}" min="0" step="0.01" placeholder="Rate"
          class="w-full rounded-lg border border-slate-300 px-2 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          oninput="updateItem(${item.id}, 'rate', parseFloat(this.value) || 0)">
      </div>
      <button onclick="removeLineItem(${item.id})" class="p-2 text-slate-400 hover:text-red-500 transition" title="Remove">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  `).join("");
}

function addLineItem() {
  const newId = lineItems.length ? Math.max(...lineItems.map(i => i.id)) + 1 : 1;
  lineItems.push({ id: newId, description: "", quantity: 1, rate: 0 });
  renderLineItems();
  updatePreview();
}

function removeLineItem(id) {
  if (lineItems.length <= 1) return;
  lineItems = lineItems.filter(i => i.id !== id);
  renderLineItems();
  updatePreview();
}

function updateItem(id, field, value) {
  const item = lineItems.find(i => i.id === id);
  if (item) {
    item[field] = value;
    updatePreview();
  }
}

function calculateTotals() {
  const subtotal = lineItems.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
  const taxRate = parseFloat(document.getElementById("taxRate").value) || 0;
  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax;
  return { subtotal, tax, total, taxRate };
}

function updatePreview() {
  const businessName = document.getElementById("businessName").value || "Your Business";
  const businessEmail = document.getElementById("businessEmail").value;
  const businessAddress = document.getElementById("businessAddress").value;
  const clientName = document.getElementById("clientName").value || "Client";
  const clientEmail = document.getElementById("clientEmail").value;
  const clientAddress = document.getElementById("clientAddress").value;
  const invoiceNumber = document.getElementById("invoiceNumber").value || "INV-001";
  const invoiceDate = document.getElementById("invoiceDate").value || new Date().toISOString().slice(0, 10);
  const notes = document.getElementById("notes").value;
  const currency = document.getElementById("currency").value;
  const { subtotal, tax, total, taxRate } = calculateTotals();

  const rows = lineItems.map(item => {
    const amount = item.quantity * item.rate;
    return `
      <tr class="border-b border-slate-100">
        <td class="py-3 pr-4 text-sm">${item.description || "—"}</td>
        <td class="py-3 px-2 text-sm text-center">${item.quantity}</td>
        <td class="py-3 px-2 text-sm text-right">${formatMoney(item.rate, currency)}</td>
        <td class="py-3 pl-2 text-sm text-right font-medium">${formatMoney(amount, currency)}</td>
      </tr>
    `;
  }).join("");

  document.getElementById("invoice-preview").innerHTML = `
    <div class="p-8 md:p-10 bg-white relative">
      <!-- Watermark for free plan -->
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04] select-none">
        <span class="text-6xl font-black tracking-widest rotate-[-25deg]">QUICKBILL FREE</span>
      </div>

      <div class="flex justify-between items-start mb-10">
        <div>
          <h1 class="text-2xl font-bold text-slate-900">${businessName}</h1>
          <p class="text-sm text-slate-500 mt-1">${businessEmail}</p>
          <p class="text-sm text-slate-500">${businessAddress}</p>
        </div>
        <div class="text-right">
          <div class="text-3xl font-bold text-indigo-600 tracking-tight">INVOICE</div>
          <p class="text-sm text-slate-500 mt-1">#${invoiceNumber}</p>
          <p class="text-sm text-slate-500">Date: ${invoiceDate}</p>
        </div>
      </div>

      <div class="mb-8">
        <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Bill To</p>
        <p class="font-semibold text-slate-900">${clientName}</p>
        <p class="text-sm text-slate-500">${clientEmail}</p>
        <p class="text-sm text-slate-500">${clientAddress}</p>
      </div>

      <table class="w-full mb-8">
        <thead>
          <tr class="border-b-2 border-slate-200 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <th class="pb-3 pr-4">Description</th>
            <th class="pb-3 px-2 text-center">Qty</th>
            <th class="pb-3 px-2 text-right">Rate</th>
            <th class="pb-3 pl-2 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>

      <div class="flex justify-end">
        <div class="w-56 space-y-2 text-sm">
          <div class="flex justify-between">
            <span class="text-slate-500">Subtotal</span>
            <span class="font-medium">${formatMoney(subtotal, currency)}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-500">Tax (${taxRate}%)</span>
            <span class="font-medium">${formatMoney(tax, currency)}</span>
          </div>
          <div class="flex justify-between text-base font-bold border-t border-slate-200 pt-2 mt-2">
            <span>Total</span>
            <span class="text-indigo-600">${formatMoney(total, currency)}</span>
          </div>
        </div>
      </div>

      ${notes ? `
        <div class="mt-10 pt-6 border-t border-slate-100">
          <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Notes</p>
          <p class="text-sm text-slate-600 whitespace-pre-line">${notes}</p>
        </div>
      ` : ""}

      <div class="mt-12 text-center text-xs text-slate-400">
        Generated with QuickBill • Remove watermark by upgrading to Pro
      </div>
    </div>
  `;
}

async function downloadPDF() {
  const element = document.getElementById("invoice-preview");
  const { jsPDF } = window.jspdf;

  // Show loading state
  const btn = event.currentTarget;
  const original = btn.innerHTML;
  btn.innerHTML = `<svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Generating...`;
  btn.disabled = true;

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff"
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    const invoiceNumber = document.getElementById("invoiceNumber").value || "invoice";
    pdf.save(`${invoiceNumber}.pdf`);
  } catch (err) {
    console.error(err);
    alert("Could not generate PDF. Try again or use browser Print (Ctrl/Cmd + P).");
  } finally {
    btn.innerHTML = original;
    btn.disabled = false;
  }
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  // Set today's date
  document.getElementById("invoiceDate").value = new Date().toISOString().slice(0, 10);
  renderLineItems();
  updatePreview();
});
