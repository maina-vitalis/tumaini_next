import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface BookingEmailProps {
  name: string;
  email: string;
  phoneNumber: string;
  tourName?: string;
  guest: number;
}

export const BookingConfirmationEmail = ({
  name,
  email,
  guest,
  phoneNumber,
  tourName,
}: BookingEmailProps) => (
  <Html>
    <Head />
    <Preview>
      Thank you for booking with us! Here&apos;s your booking confirmation.
    </Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Logo Section */}
        <Img
          src={
            "https://res.cloudinary.com/dl0w5seja/image/upload/v1732795518/tumaini_hikers_bg-01_i58ayo.png"
          }
          alt="Company Logo"
          style={logo}
        />
        {/* Greeting */}
        <Text style={title}>Hi {name},</Text>
        {/* Booking Message */}
        <Text style={paragraph}>
          Thank you for booking with us! We’re thrilled to have you join us for
          {tourName ? ` the "${tourName}" tour` : " your selected tour"}. Below
          is a summary of your booking:
        </Text>
        <Section style={detailsContainer}>
          <Text style={detailsTitle}>Booking Details</Text>
          <Hr style={hr} />
          <Text style={details}>
            <strong>Name:</strong> {name}
          </Text>
          <Text style={details}>
            <strong>Email:</strong> {email}
          </Text>
          {tourName && (
            <Text style={details}>
              <strong>Tour Name:</strong> {tourName}
            </Text>
          )}
          <Text style={details}>
            <strong>Phone Number:</strong> {phoneNumber}
          </Text>
          <Text style={details}>
            <strong>Persons Attending:</strong> {guest}
          </Text>
        </Section>
        {/* Call-to-Action */}
        <Section style={btnContainer}>
          <Button style={button} href="https://tumainioasisadventures.co.ke">
            Back to the site
          </Button>
        </Section>
        {/* Footer */}
        <Hr style={hr} />
        <Text style={footer}>
          If you have any questions or need to make changes to your booking,
          feel free to reach out to us. We’re here to help!
        </Text>
        <Text style={footer}>
          Best regards,
          <br />
          The Tumaini Oasis Adventures Team
        </Text>
      </Container>
    </Body>
  </Html>
);

export default BookingConfirmationEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 24px",
  maxWidth: "600px",
  border: `1px solid #eeeeee`,
  borderRadius: "8px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
};

const logo = {
  width: "120px",
  height: "auto",
  margin: "0 auto 24px",
};

const title = {
  fontSize: "20px",
  color: "#31B44C",
  fontWeight: "bold" as const,
  textAlign: "center" as const,
  marginBottom: "16px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#333333",
  marginBottom: "24px",
  textAlign: "center" as const,
};

const detailsContainer = {
  backgroundColor: "#f9f9f9",
  padding: "16px",
  borderRadius: "8px",
  marginBottom: "24px",
};

const detailsTitle = {
  fontSize: "18px",
  color: "#EE6D3D",
  fontWeight: "bold" as const,
  marginBottom: "8px",
};

const details = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#555555",
  marginBottom: "8px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#31B44C",
  borderRadius: "4px",
  color: "#ffffff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
};

const hr = {
  borderColor: "#eeeeee",
  margin: "16px 0",
};

const footer = {
  fontSize: "12px",
  lineHeight: "18px",
  color: "#888888",
  textAlign: "center" as const,
};
