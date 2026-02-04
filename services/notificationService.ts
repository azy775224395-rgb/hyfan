
export class NotificationService {
  private static BOT_TOKEN = "8150996686:AAEKMUphujaF2v8w0g2ZHTtlKCwSQp_jpOM";
  private static ALLOWED_CHAT_IDS = ["5662175284", "1928644268"];

  static async sendTelegramNotification(message: string, photoBase64?: string | null) {
    try {
      const promises = this.ALLOWED_CHAT_IDS.map(async (chatId) => {
        if (photoBase64) {
          const fetchRes = await fetch(photoBase64);
          const blob = await fetchRes.blob();
          
          const formData = new FormData();
          formData.append('chat_id', chatId);
          formData.append('photo', blob, 'receipt.jpg');
          formData.append('caption', message);
          formData.append('parse_mode', 'HTML');

          return fetch(`https://api.telegram.org/bot${this.BOT_TOKEN}/sendPhoto`, {
            method: 'POST',
            body: formData
          });
        } else {
          return fetch(`https://api.telegram.org/bot${this.BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: message,
              parse_mode: 'HTML'
            })
          });
        }
      });
      
      await Promise.all(promises);
    } catch (error) {
      console.error("Failed to send Telegram notification:", error);
    }
  }

  static formatAiChatMessage(userMsg: string, aiMsg: string) {
    const time = new Date().toLocaleString('ar-YE');
    return `🤖 <b>استفسار ذكي جديد</b>\n\n` +
           `👤 <b>المستخدم:</b> ${userMsg}\n\n` +
           `💡 <b>رد المهندس:</b>\n${aiMsg}\n\n` +
           `⏰ <b>الوقت:</b> ${time}`;
  }

  static formatLoginMessage(user: any) {
    const time = new Date().toLocaleString('ar-YE');
    return `🚨 <b>إشعار دخول جديد</b>\n\n` +
           `👤 <b>الاسم:</b> ${user.name}\n` +
           `📧 <b>البريد:</b> ${user.email}\n` +
           `🔗 <b>المزود:</b> ${user.provider || 'بريد إلكتروني'}\n` +
           `⏰ <b>الوقت:</b> ${time}`;
  }

  static formatReviewMessage(review: any) {
    const time = new Date().toLocaleString('ar-YE');
    const stars = "⭐".repeat(review.rating);
    return `📝 <b>تقييم جديد للمتجر</b>\n\n` +
           `👤 <b>الاسم:</b> ${review.name}\n` +
           `⭐ <b>التقييم:</b> ${stars}\n` +
           `💬 <b>التعليق:</b> ${review.comment}\n` +
           `⏰ <b>الوقت:</b> ${time}`;
  }

  static formatOrderMessage(details: { product: string, price: string, method: string, customer: any, productUrl?: string }) {
    const time = new Date().toLocaleString('ar-YE');
    let msg = `💰 <b>طلب شراء جديد</b>\n\n` +
           `📦 <b>المنتج:</b> ${details.product}\n` +
           `💵 <b>السعر:</b> ${details.price}\n` +
           `💳 <b>وسيلة الدفع:</b> ${details.method}\n\n` +
           `👤 <b>الاسم:</b> ${details.customer.fullName || details.customer.name}\n` +
           `📞 <b>الهاتف:</b> ${details.customer.phone || 'غير مسجل'}\n` +
           `📍 <b>المدينة:</b> ${details.customer.city || 'غير محدد'}\n` +
           `🏠 <b>العنوان:</b> ${details.customer.address || 'غير محدد'}\n`;

    if (details.productUrl) {
      msg += `🔗 <b>رابط المنتج:</b> ${details.productUrl}\n`;
    }

    msg += `\n⏰ <b>الوقت:</b> ${time}`;
    return msg;
  }
}
