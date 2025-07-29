'use client'
import HeaderTwo from '@/components/Header/HeaderTwo'
import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
        <HeaderTwo/>
        <br/>
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">Last updated: July 29, 2025</p>

      <p className="mb-4">
        This Privacy Policy describes Our policies and procedures on the collection,
        use and disclosure of Your information when You use the Service and tells You
        about Your privacy rights and how the law protects You.
      </p>

      <p className="mb-4">
        We use Your Personal data to provide and improve the Service. By using the
        Service, You agree to the collection and use of information in accordance
        with this Privacy Policy.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Interpretation and Definitions</h2>
      <p className="mb-4"><strong>Account</strong>: A unique account created for You to access our Service.</p>
      <p className="mb-4"><strong>Company</strong>: Refers to Aizah Hospitality, based in Dubai, UAE.</p>
      <p className="mb-4"><strong>Cookies</strong>: Small files stored on Your device for tracking purposes.</p>
      <p className="mb-4"><strong>Service</strong>: The Website <a href="http://aizahhospitality.com" className="text-blue-600 underline">http://aizahhospitality.com</a></p>
      <p className="mb-4"><strong>You</strong>: The user of the Service.</p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Types of Data Collected</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Email address</li>
        <li>First and last name</li>
        <li>Phone number</li>
        <li>Address, City, ZIP/Postal Code</li>
        <li>Usage Data (e.g. browser, IP, duration)</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Cookies</h2>
      <p className="mb-4">
        We use Cookies and similar tracking technologies to enhance your experience.
        You can choose to disable cookies via your browser settings.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Use of Your Personal Data</h2>
      <ul className="list-disc list-inside mb-4">
        <li>To provide and maintain our Service</li>
        <li>To manage Your Account</li>
        <li>To contact You with updates or offers</li>
        <li>To analyze and improve the Service</li>
        <li>To comply with legal obligations</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Data Retention & Transfer</h2>
      <p className="mb-4">
        We retain personal data only as long as necessary. Your data may be
        transferred and processed outside your country with secure controls in place.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Your Data Rights</h2>
      <ul className="list-disc list-inside mb-4">
        <li>You can request, update or delete your data</li>
        <li>We will retain data if legally required</li>
        <li>Contact us for support regarding your data</li>
      </ul>

      {/* <h2 className="text-2xl font-semibold mt-8 mb-4">Children's Privacy</h2>
      <p className="mb-4">
        We do not knowingly collect information from anyone under the age of 13.
        If we become aware, we will delete it promptly.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to This Policy</h2>
      <p className="mb-4">
        We may update this Privacy Policy. Changes will be posted here with an updated date.
        We recommend reviewing this page periodically.
      </p> */}

      <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
      <p className="mb-4">
        If you have any questions, contact us via email at: <a href="mailto:
Aizahandaisha@gmail.com" className="text-blue-600 underline">
Aizahandaisha@gmail.com</a>
        <br />
        Or visit: <a href="http://aizahhospitality.com" className="text-blue-600 underline">http://aizahhospitality.com</a>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
