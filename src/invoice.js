'use strict';

// Demo stand-in for a PDF renderer. It returns a small buffer after a short,
// variable delay, the way a real renderer would.
function renderInvoice(order) {
  const renderMs = 5 + Math.random() * 25;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Buffer.from(`%PDF-1.7\nInvoice ${order.id}\nTotal ${order.totalCents}\n`));
    }, renderMs);
  });
}

module.exports = { renderInvoice };
