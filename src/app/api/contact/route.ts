import { NextResponse } from 'next/server';
import { Resend } from 'resend';

type ContactPayload = {
  firstName?: string;
  lastName?: string;
  services?: string[];
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as ContactPayload;
  const { firstName, lastName, services, email, phone, company, message } = body;
  const name = [firstName, lastName].filter(Boolean).join(' ') || body.name;

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.error('Contact form is not configured: missing RESEND_API_KEY, CONTACT_TO_EMAIL, or CONTACT_FROM_EMAIL.');
    return NextResponse.json({ error: 'Contact form is not configured.' }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `New enquiry from ${name}${company ? ` (${company})` : ''}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      company ? `Company: ${company}` : null,
      services?.length ? `Services: ${services.join(', ')}` : null,
      '',
      message,
    ].filter(Boolean).join('\n'),
  });

  if (error) {
    console.error('Failed to send contact email:', error);
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
