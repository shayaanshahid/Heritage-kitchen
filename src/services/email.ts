import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendReservationApprovalEmail(email: string, details: any) {
  try {
    await resend.emails.send({
      from: 'Heritage Kitchen <noreply@heritagekitchen.be>',
      to: email,
      subject: 'Reservation Confirmed - Heritage Kitchen',
      html: `
        <div style="font-family: serif; color: #1A1A1A; padding: 40px; border: 1px solid #C5A059;">
          <h1 style="color: #C5A059;">Reservation Confirmed</h1>
          <p>Dear ${details.name},</p>
          <p>We are delighted to confirm your reservation at Heritage Kitchen.</p>
          <div style="background-color: #F9F6F0; padding: 20px; margin: 20px 0;">
            <p><strong>Date:</strong> ${details.date}</p>
            <p><strong>Time:</strong> ${details.time}</p>
            <p><strong>Guests:</strong> ${details.guests}</p>
          </div>
          <p><strong>Address:</strong> Koloniënstraat 6, 1000 Brussels, Belgium</p>
          <p>If you need to change or cancel your reservation, please call us at +32 2 123 45 67.</p>
          <p>We look forward to welcoming you.</p>
          <hr style="border: none; border-top: 1px solid #C5A059; margin-top: 40px;" />
          <p style="font-size: 12px; color: #666;">&copy; Heritage Kitchen Brussels</p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Failed to send email:', error);
  }
}

export async function sendReservationRejectionEmail(email: string, details: any) {
  try {
    await resend.emails.send({
      from: 'Heritage Kitchen <noreply@heritagekitchen.be>',
      to: email,
      subject: 'Update on your Reservation - Heritage Kitchen',
      html: `
        <div style="font-family: serif; color: #1A1A1A; padding: 40px; border: 1px solid #C5A059;">
          <h1 style="color: #1A1A1A;">Reservation Update</h1>
          <p>Dear ${details.name},</p>
          <p>Thank you for your interest in dining with us.</p>
          <p>Regrettably, we are unable to accommodate your reservation for ${details.date} at ${details.time} as we are fully committed at that time.</p>
          <p>We hope to welcome you another time soon. Feel free to check other availability on our website.</p>
          <hr style="border: none; border-top: 1px solid #C5A059; margin-top: 40px;" />
          <p style="font-size: 12px; color: #666;">&copy; Heritage Kitchen Brussels</p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Failed to send email:', error);
  }
}
