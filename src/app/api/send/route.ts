import { Resend } from "resend";
import BookingConfirmationEmail from "@/components/Email/Email";
import { NextRequest } from "next/server";
import AdminBookingNotificationEmail from "@/components/Email/Admin";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, phoneNumber, guest, tourName } = await req.json();

  try {
    const { data, error } = await resend.emails.send({
      from: "info@tumainioasisadventures.co.ke",
      to: [email],
      subject: "Tour Booking Confirmation",
      react: BookingConfirmationEmail({
        name,
        email,
        tourName,
        phoneNumber,
        guest,
      }),
    });

    await resend.emails.send({
      from: "Tumaini Oasis Adventures<no-reply@tumainioasisadventures.co.ke>",
      to: ["info@tumainioasisadventures.co.ke"],
      subject: "Tour Booking Confirmation",
      react: AdminBookingNotificationEmail({
        name,
        email,
        tourName,
        phoneNumber,
        guest,
      }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
