'use strict';

// Demo stand-in for the email provider's API. It just waits a few
// milliseconds, the way a real network call would.
function sendReceiptEmail(order) {
  const latencyMs = 5 + Math.random() * 10;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ to: order.email, subject: `Your receipt for order ${order.id}`, queued: true });
    }, latencyMs);
  });
}

module.exports = { sendReceiptEmail };
