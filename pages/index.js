import FAQItem from "container/faq-item";
import Layout from "container/layout";

const IndexPage = () => (
  <Layout title="2FA Authenticator" header>
    <section className="my-14">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-extrabold text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-indigo-300 to-blue-500">
          Two-Factor Authentication
          <span className="sm:block">Time based OTP (TOPT)</span>
        </h1>

        <p className="max-w-xl mx-auto mt-4 sm:leading-relaxed sm:text-xl">
          Two Factor Authentication (2FA or TFA) is the technical term for the
          process of requiring a user to verify their identity in two unique
          ways before they are granted access to the system.
        </p>
      </div>
    </section>

    <div className="max-w-3xl mx-auto space-y-4">
      <FAQItem
        summary="What is Two-Factor Authentication?"
        details="Two-Factor Authentication (2FA) is an extra layer of security used to make sure that people trying to gain access to an online account are who they say they are. First, a user will enter their username and a password. Then, instead of immediately gaining access, they will be required to provide another piece of information."
      />

      <FAQItem
        summary="What is Time based OTP?"
        details="Time-based One-Time Password (TOTP) is a single-use passcode typically used for authenticating users. The user is assigned a TOPT generator delivered as a hardware key fob or software token. The generator implements an algorithm that computes a one-time passcode using a secret shared with the authentication server and the current time – hence the name time-based OTP. The passcode is displayed to the user and is valid for a limited duration. Once expired, the passcode is no longer valid. The user enters a valid passcode into a login form, typically together with his username and regular password."
      />

      <FAQItem
        summary="What is Time-based one-time password?"
        details="Time-based one-time password (TOTP) is a computer algorithm that generates a one-time password (OTP) that uses the current time as a source of uniqueness. As an extension of the HMAC-based one-time password algorithm (HOTP), it has been adopted as Internet Engineering Task Force (IETF) standard RFC 6238."
      />

      <FAQItem
        summary="What is a QR code?"
        details="QR code (an initialism for quick response code) is a type of matrix barcode (or two-dimensional barcode) invented in 1994 by the Japanese automotive company Denso Wave. A barcode is a machine-readable optical label that can contain information about the item to which it is attached. In practice, QR codes often contain data for a locator, identifier, or tracker that points to a website or application. ."
      />

      <FAQItem
        summary="What are the types of Two-Factor Authentications?"
        details={[
          "Let’s have a peek at look popular websites and applications are implementing 2FA these days.",
          "Email-based 2FA",
          "SMS-based 2FA",
          "Software token/TOTP based 2FA",
          "Bio-metrics based 2FA",
          "As a Push Notification",
          "Hardware Token-based 2FA",
        ]}
      />

      <FAQItem
        summary="What are the application with 2FA?"
        details={[
          "An application that uses 2FA",
          "Google Authenticator",
          "Microsoft Authenticator",
          "Twilio Authy",
          "FreeOTP",
          "2FA Authenticator",
        ]}
      />
    </div>
  </Layout>
);

export default IndexPage;
