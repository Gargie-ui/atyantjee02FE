export const WHATSAPP_NUMBER = '917286857290';

export function getWhatsAppLink(planName = '', customMessage = '') {
  let message = customMessage;
  
  if (!message) {
    message = `Hi Atyant, I need help with college and branch decision.\n`;
    if (planName) {
      message += `I am interested in the ${planName}.\n\n`;
    }
    message += `My exam:\n`;
    message += `My rank/percentile:\n`;
    message += `My preferred branch:\n`;
    message += `My main confusion:\n`;
  }

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}
