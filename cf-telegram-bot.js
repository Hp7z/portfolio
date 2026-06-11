const BOT_TOKEN = '8920240879:AAE8wYL01BJZyxUBhpu5nhyEzXfOLNZp8WI';
const BOT_PASSWORD = 'stormglass78';
const BOT_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;
const MAX_FAILED_ATTEMPTS = 3;
const blacklisted = new Set();
const failedAttempts = new Map();
const authorizedUsers = new Map();
let ownerChatId = null;

async function telegramRequest(method, payload) {
  const response = await fetch(`${BOT_API_URL}/${method}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  return response.json();
}

async function sendTelegramMessage(chatId, text) {
  return telegramRequest('sendMessage', {
    chat_id: chatId,
    text,
    parse_mode: 'HTML'
  });
}

function getTargetChatId() {
  if (ownerChatId) return ownerChatId;
  const first = authorizedUsers.keys().next();
  return first.done ? null : first.value;
}

function formatUserName(message) {
  const from = message.from || {};
  return [from.first_name, from.last_name].filter(Boolean).join(' ') || `@${from.username || 'unknown'}`;
}

async function handleTelegramWebhook(request) {
  const body = await request.json();
  const message = body.message || body.channel_post;
  if (!message || !message.chat) {
    return new Response('No message', { status: 400 });
  }
  const chatId = message.chat.id;
  const text = (message.text || '').trim();

  if (blacklisted.has(chatId)) {
    await sendTelegramMessage(chatId, 'Вы заблокированы.');
    return new Response('Blocked', { status: 200 });
  }

  if (text.toLowerCase().startsWith('/login')) {
    const parts = text.split(' ');
    const password = parts.slice(1).join(' ').trim();
    if (password === BOT_PASSWORD) {
      authorizedUsers.set(chatId, true);
      ownerChatId = chatId;
      failedAttempts.delete(chatId);
      await sendTelegramMessage(chatId, 'Авторизация прошла успешно. Теперь вы будете получать заявки из формы обратной связи.');
      return new Response('Ok', { status: 200 });
    }
    const currentFail = (failedAttempts.get(chatId) || 0) + 1;
    failedAttempts.set(chatId, currentFail);
    if (currentFail >= MAX_FAILED_ATTEMPTS) {
      blacklisted.add(chatId);
      await sendTelegramMessage(chatId, 'Вы заблокированы после 3 неверных попыток.');
      return new Response('Blocked', { status: 200 });
    }
    await sendTelegramMessage(chatId, `Неверный пароль. Осталось попыток: ${MAX_FAILED_ATTEMPTS - currentFail}.`);
    return new Response('Unauthorized', { status: 200 });
  }

  if (text.toLowerCase().startsWith('/status')) {
    const status = authorizedUsers.has(chatId) ? 'Вы авторизованы.' : 'Вы не авторизованы. Используйте /login <пароль>.';
    await sendTelegramMessage(chatId, status);
    return new Response('Ok', { status: 200 });
  }

  if (authorizedUsers.has(chatId)) {
    await sendTelegramMessage(chatId, 'Вы уже авторизованы. Заявки будут приходить на этот чат.');
    return new Response('Ok', { status: 200 });
  }

  await sendTelegramMessage(chatId, 'Этот бот принимает только пароль. Чтобы авторизоваться, отправьте /login <пароль>.');
  return new Response('Ok', { status: 200 });
}

async function handleFormSubmit(request) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }
  const payload = await request.json().catch(() => null);
  if (!payload || !Array.isArray(payload.services)) {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid payload' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
  const targetChat = getTargetChatId();
  if (!targetChat) {
    return new Response(JSON.stringify({ ok: false, error: 'Owner chat not available. Please authorize the bot with /login first.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }

  const currency = payload.lang === 'en' ? '$' : '₽';
  const title = 'Новая заявка из формы обратной связи';
  const lines = [
    `<b>${title}</b>`,
    `<b>Имя:</b> ${payload.name || '-'}`,
    `<b>Телефон:</b> ${payload.phone || '-'}`,
    `<b>Почта:</b> ${payload.email || '-'}`,
    `<b>Удобный способ связи:</b> ${payload.preferredContact || '-'}`,
    `<b>Метод:</b> ${payload.method || '-'}`,
    `<b>Сумма:</b> ${payload.total || '-'} ${currency}`,
    `<b>Услуги:</b>`
  ];
  if (payload.services.length) {
    payload.services.forEach(service => lines.push(`• ${service}`));
  } else {
    lines.push('- Не выбраны услуги -');
  }
  if (payload.contactData) {
    lines.push(`<b>Контакты:</b> ${payload.contactData.email || '-'} | ${payload.contactData.vkUrl || '-'} | ${payload.contactData.telegramUrl || '-'} `);
  }

  await sendTelegramMessage(targetChat, lines.join('\n'));
  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === '/webhook') {
      return handleTelegramWebhook(request);
    }
    if (url.pathname === '/submit') {
      return handleFormSubmit(request);
    }
    return new Response('Telegram Cloudflare bot is running.', { status: 200 });
  }
};
