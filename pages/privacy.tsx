import type { NextPage } from 'next'
import Head from 'next/head'
import { Container } from '../components/ui/atoms/Container'

const Privacy: NextPage = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy - UK Student Loan Repayment Calculator</title>
        <meta
          name="description"
          content="Privacy policy for the UK Student Loan Repayment Calculator - we protect your privacy and don't store personal data."
        />
      </Head>
      <Container>
        <div className="prose max-w-none">
          <h1 className="mb-6 text-3xl font-bold text-gray-900">Privacy Policy</h1>
          
          <p className="mb-6 text-sm text-gray-600">
            <strong>Last updated:</strong> {new Date().toLocaleDateString('en-GB', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>

          <h2 className="mb-4 text-2xl font-semibold text-gray-900">Introduction</h2>
          <p className="mb-4">
            This privacy policy explains how the Student Loan Repayment Calculator 
            (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) handles your information when you use our website 
            at <a href="https://www.studentloanrepaymentcalc.co.uk" className="text-sky-700 hover:underline">
            https://www.studentloanrepaymentcalc.co.uk</a> (the &quot;Service&quot;).
          </p>
          <p className="mb-6">
            We are committed to protecting your privacy and ensuring transparency about 
            our data practices in accordance with UK data protection legislation, 
            including the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
          </p>

          <h2 className="mb-4 text-2xl font-semibold text-gray-900">Data Controller</h2>
          <p className="mb-6">
            The data controller for your personal data is Ben Scobie. 
            You can contact us at: <a href="https://www.benscobie.com" className="text-sky-700 hover:underline">
            https://www.benscobie.com</a>
          </p>

          <h2 className="mb-4 text-2xl font-semibold text-gray-900">What Information We Collect</h2>
          <p className="mb-4">
            <strong>Personal Information:</strong> We do not collect, store, or retain any personal 
            information about you. The Student Loan Repayment Calculator operates entirely without 
            requiring personal data.
          </p>
          <p className="mb-4">
            <strong>Calculation Data:</strong> When you use our calculator, the financial information 
            you enter (such as loan amounts, salary figures, and repayment details) is:
          </p>
          <ul className="mb-4 ml-4 list-inside list-disc">
            <li>Sent securely to our server for calculation purposes only</li>
            <li>Processed to generate your loan repayment projections</li>
            <li>Not stored, saved, or retained in any way after the calculation is complete</li>
            <li>Not linked to your identity or any personal identifiers</li>
          </ul>

          <h2 className="mb-4 text-2xl font-semibold text-gray-900">Analytics and Tracking</h2>
          <p className="mb-4">
            We use a self-hosted instance of Umami analytics to understand how our website is used. 
            This analytics solution:
          </p>
          <ul className="mb-4 ml-4 list-inside list-disc">
            <li>Is privacy-friendly and complies with GDPR</li>
            <li>Does not use cookies</li>
            <li>Does not track you across websites</li>
            <li>Does not collect personal information</li>
            <li>Only collects anonymised usage statistics such as page views and general location data</li>
          </ul>
          <p className="mb-6">
            You can learn more about Umami&apos;s privacy practices at: 
            <a href="https://umami.is/docs/collect-data" className="ml-1 text-sky-700 hover:underline">
            https://umami.is/docs/collect-data</a>
          </p>

          <h2 className="mb-4 text-2xl font-semibold text-gray-900">How We Use Your Information</h2>
          <p className="mb-4">The limited data we process is used solely to:</p>
          <ul className="mb-6 ml-4 list-inside list-disc">
            <li>Perform loan repayment calculations that you request</li>
            <li>Provide you with accurate repayment projections</li>
            <li>Improve our website through anonymised analytics</li>
          </ul>

          <h2 className="mb-4 text-2xl font-semibold text-gray-900">Data Sharing</h2>
          <p className="mb-6">
            We do not share, sell, rent, or trade your information with any third parties. 
            Since we don&apos;t store personal data, there is no personal information to share.
          </p>

          <h2 className="mb-4 text-2xl font-semibold text-gray-900">Data Security</h2>
          <p className="mb-6">
            We implement appropriate technical and organisational measures to protect any data 
            transmitted to our servers during calculations. All data transmission occurs over 
            secure HTTPS connections, and calculation data is processed in memory only and 
            discarded immediately after use.
          </p>

          <h2 className="mb-4 text-2xl font-semibold text-gray-900">Children&apos;s Privacy</h2>
          <p className="mb-6">
            Our Service is not aimed at children under 16 years of age. We do not knowingly 
            collect personal information from children under 16. If you are a parent or guardian 
            and believe your child has used our Service, please contact us.
          </p>

          <h2 className="mb-4 text-2xl font-semibold text-gray-900">Your Rights</h2>
          <p className="mb-4">
            Under UK data protection law, you have rights including:
          </p>
          <ul className="mb-4 ml-4 list-inside list-disc">
            <li><strong>Right to be informed:</strong> This privacy policy provides that information</li>
            <li><strong>Right of access:</strong> Since we don&apos;t store personal data, there is no data to access</li>
            <li><strong>Right to rectification:</strong> Not applicable as we don&apos;t store personal data</li>
            <li><strong>Right to erasure:</strong> Not applicable as we don&apos;t store personal data</li>
            <li><strong>Right to restrict processing:</strong> You can simply stop using our Service</li>
            <li><strong>Right to data portability:</strong> Not applicable as we don&apos;t store personal data</li>
            <li><strong>Right to object:</strong> You can stop using our Service at any time</li>
          </ul>
          <p className="mb-6">
            Since we operate without storing personal data, most traditional data protection 
            rights are not applicable to our Service.
          </p>

          <h2 className="mb-4 text-2xl font-semibold text-gray-900">Legal Basis for Processing</h2>
          <p className="mb-6">
            Where we do process data (calculation inputs), our legal basis is legitimate interests 
            - specifically, our legitimate interest in providing you with accurate loan repayment 
            calculations that you have requested.
          </p>

          <h2 className="mb-4 text-2xl font-semibold text-gray-900">Changes to This Privacy Policy</h2>
          <p className="mb-6">
            We may update this privacy policy from time to time. Any changes will be posted on 
            this page with an updated &quot;Last updated&quot; date. We recommend reviewing this policy 
            periodically for any changes.
          </p>

          <h2 className="mb-4 text-2xl font-semibold text-gray-900">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this privacy policy or our data practices, please contact us:
          </p>
          <ul className="mb-6 ml-4 list-inside list-disc">
            <li>
              Through our website: <a href="https://www.benscobie.com" className="text-sky-700 hover:underline">
              https://www.benscobie.com</a>
            </li>
            <li>
              Via our feedback form: <a href="https://forms.gle/FWqyT5SUgumSKJG46" className="text-sky-700 hover:underline">
              https://forms.gle/FWqyT5SUgumSKJG46</a>
            </li>
          </ul>

          <h2 className="mb-4 text-2xl font-semibold text-gray-900">Complaints</h2>
          <p className="mb-6">
            If you believe we have not handled your personal data properly, you have the right 
            to complain to the Information Commissioner&apos;s Office (ICO). You can contact the ICO 
            at <a href="https://ico.org.uk" className="text-sky-700 hover:underline">https://ico.org.uk</a> 
            or call their helpline on 0303 123 1113.
          </p>
        </div>
      </Container>
    </>
  )
}

export default Privacy