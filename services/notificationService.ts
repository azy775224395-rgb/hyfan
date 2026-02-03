
export class NotificationService {
  private static BOT_TOKEN = "8150996686:AAEKMUphujaF2v8w0g2ZHTtlKCwSQp_jpOM";
  private static ALLOWED_CHAT_IDS = ["5662175284", "1928644268"];

  static async sendTelegramNotification(message: string) {
    try {
      const promises = this.ALLOWED_CHAT_IDS.map(chatId => 
        fetch(`https://api.telegram.org/bot${this.BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML'
          })
        })
      );
      
      await Promise.all(promises);
      console.log("Telegram notifications sent successfully");
    } catch (error) {
      console.error("Failed to send Telegram notification:", error);
    }
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

  static formatOrderMessage(details: { product: string, price: string, method: string, customer: any }) {
    const time = new Date().toLocaleString('ar-YE');
    return `💰 <b>طلب شراء جديد</b>\n\n` +
           `📦 <b>المنتج:</b> ${details.product}\n` +
           `💵 <b>السعر:</b> ${details.price}\n` +
           `💳 <b>وسيلة الدفع:</b> ${details.method}\n\n` +
           `👤 <b>العميل:</b> ${details.customer.fullName || details.customer.name}\n` +
           `📞 <b>الهاتف:</b> ${details.customer.phone || 'غير مسجل'}\n` +
           `📍 <b>المدينة:</b> ${details.customer.city || 'غير محدد'}\n` +
           `⏰ <b>الوقت:</b> ${time}`;
  }
}
