import Header from "@/components/header";
import Footer from "@/components/footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-16">
          <div className="prose lg:prose-xl mx-auto">
            <h1>Privacy Policy</h1>
            <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>

            <h2>1. Introduction</h2>
            <p>
              Legal Draft AI (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting
              your privacy. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you use our service.
            </p>

            <h2>2. Information We Collect</h2>
            <p>
              We may collect personal information that you voluntarily provide to
              us when you register an account, use our services, or contact us.
              This may include your name, email address, and any data you input to generate documents.
            </p>

            <h2>3. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul>
                <li>Provide, operate, and maintain our services.</li>
                <li>Improve, personalize, and expand our services.</li>
                <li>Understand and analyze how you use our services.</li>
                <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes.</li>
                <li>Process your transactions.</li>
                <li>Find and prevent fraud.</li>
            </ul>

            <h2>4. Sharing Your Information</h2>
            <p>
              We do not share your personal information with third parties except
              as described in this Privacy Policy. We may share information with
              vendors, service providers, and consultants who need access to such
              information to carry out work on our behalf.
            </p>

            <h2>5. Data Security</h2>
            <p>
              We use administrative, technical, and physical security measures to
              help protect your personal information. While we have taken
              reasonable steps to secure the personal information you provide to
              us, please be aware that despite our efforts, no security measures
              are perfect or impenetrable.
            </p>

            <h2>6. Your Data Protection Rights</h2>
            <p>
              Depending on your location, you may have the following rights
              regarding your personal information: the right to access, the right
              to rectification, the right to erasure, the right to restrict
              processing, the right to object to processing, and the right to
              data portability.
            </p>

            <h2>7. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page.
            </p>

            <h2>8. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
