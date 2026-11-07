'use client';

import React, { useState } from 'react';
import { FileText, ChevronRight, ArrowUp, Scale, CheckCircle2 } from 'lucide-react';

interface TermSection {
  id: number;
  title: string;
  postulates: string[];
}

const TERMS_SECTIONS: TermSection[] = [
  {
    id: 1,
    title: '1. Introduction and Acceptance',
    postulates: [
      'Welcome to Arghyya. This website, www.arghyya.com (the "Website"), is owned and operated by Arghyya, having its registered office at Delhi, India ("Arghyya , SLAY EVERYDAY").',
      'These Terms & Conditions ("Terms") govern your access to and use of the Website and any purchase of 925 sterling silver, anti-tarnish jewellery, and related fine jewellery accessories ("Products") from us.',
      'By browsing the Website, creating an account, subscribing to our newsletter or placing an order, you confirm that you have read, understood and agreed to these Terms, along with our Privacy Policy, Shipping Policy and Return, Exchange & Refund Policy, which form part of this agreement. If you do not agree, please do not use the Website.',
      'This document is an electronic record under the Information Technology Act, 2000 and the rules made under it. It does not require any physical or digital signature.'
    ]
  },
  {
    id: 2,
    title: '2. Eligibility',
    postulates: [
      'You must be at least 18 years old and capable of entering into a legally binding contract under the Indian Contract Act, 1872 to place an order.',
      'If you are under 18, you may use the Website only under the supervision of a parent or legal guardian, who will be responsible for any purchase made.',
      'You agree that the information you provide (name, address, phone number, email) is accurate, complete and current.'
    ]
  },
  {
    id: 3,
    title: '3. Your Account',
    postulates: [
      'You may browse without an account, but some features (order tracking, saved addresses, wishlist) need you to sign in.',
      'You are responsible for keeping your login details confidential and for all activity under your account. Please tell us immediately at care.arghya@gmail.com OR CONTACT - +918882827148 if you suspect unauthorised use.',
      'We may suspend or close accounts that provide false information, misuse offers, or breach these Terms.'
    ]
  },
  {
    id: 4,
    title: '4. Products, Colours and Craft Variations',
    postulates: [
      'Colour: Product photos are taken under studio lighting. Actual colour may differ slightly depending on your screen settings.',
      'Materials and craft: Our collections feature genuine 925 sterling silver and high-grade anti-tarnish alloys with protective electroplating. Handcrafted details, stone settings, and polish may display slight artisanal variations which are natural hallmarks of authentic jewellery craftsmanship.',
      'Dimensions and styling: Please refer to chain lengths, pendant measurements, and specifications provided on each product page before ordering.',
      'Availability: All Products are subject to availability. We may discontinue any Product at any time.',
      'Descriptions: We try to keep descriptions, images and specifications error-free, but we do not guarantee that they are complete or free from typographical mistakes.'
    ]
  },
  {
    id: 5,
    title: '5. Pricing and Payment',
    postulates: [
      'All prices are in Indian Rupees (INR) and if any, are shown at checkout.',
      'We may change prices at any time without notice. The price applicable to your order is the one displayed when you place it.',
      'If a Product is listed at an obviously wrong price because of a technical or typographical error, we may cancel the order and refund any amount paid.',
      'Payment methods: UPI, credit/debit cards, net banking, wallets and Cash on Delivery, where available. Payments are processed by RAZORPAY. We do not store your full card details.',
      'Cash on Delivery: available for pincodes and order values shown at checkout. A COD handling fee of [₹X] may apply.',
      'If payment fails but money is debited, the amount is normally reversed by your bank or the gateway within 5 to 7 working days. Please contact us if it is not.'
    ]
  },
  {
    id: 6,
    title: '6. Order Acceptance and Cancellation',
    postulates: [
      'Placing an order is an offer to buy. A contract is formed only when we send an order confirmation to your email or phone.',
      'We may refuse or cancel an order for reasons including stock unavailability, pricing errors, suspected fraud, an unserviceable address or failed verification. In that case, any amount paid will be refunded to the original payment method.',
      'Cancellation by you: You may cancel an order before it is dispatched by writing to care.arghya@gmail.com or calling +91-8882827148 with your order number. Once dispatched, the order cannot be cancelled, but you may use our return process where eligible.'
    ]
  },
  {
    id: 7,
    title: '7. Shipping and Delivery',
    postulates: [
      'FREE SHIPPING across India.',
      'Estimated delivery timelines are shown at checkout and are indicative only. Delays may occur because of courier issues, weather, festivals, strikes or other circumstances beyond our control.',
      'Risk in the Products passes to you on delivery. Please check the parcel on receipt and tell us within 48 hours if it is damaged or tampered with. We recommend recording an unboxing video as evidence for damage or missing-item claims.',
      'If delivery fails because of an incorrect address, unreachable phone number or refusal to accept, we may charge return shipping costs and re-shipping fees.'
    ]
  },
  {
    id: 8,
    title: '8. Returns, Exchanges and Refunds',
    postulates: [
      'Eligibility for return or exchange: Request within 48 hours of delivery.',
      'The Product must be unused, unwashed, unaltered, with all original tags, packaging and invoice intact, and free from perfume, makeup, deodorant, food or pet stains.',
      'Not eligible: sale or clearance items marked "final sale", customised or made-to-order pieces, altered items, innerwear/accessories/masks (hygiene reasons), gift cards, and items returned after the window.',
      'For jewellery items, returns are accepted only if the security seal, jewellery tags, and protective boxes remain untampered and unworn.',
      'Damaged, defective or wrong product: Report within 48 hours of delivery with clear photos/video and your order number. If confirmed, we will offer a replacement, exchange or full refund, and we will bear the pickup cost.',
      'Refunds: Refunds are processed to the original payment method within 7 to 10 working days after we receive and inspect the returned item. For COD orders, refunds are made by bank transfer/UPI to details you provide, or as store credit.',
      'COD fees are non-refundable unless the return is due to our error.',
      'Store credit, where offered, is valid for 6 to 12 months.'
    ]
  },
  {
    id: 9,
    title: '9. Discounts, Offers and Promotions',
    postulates: [
      'Coupon codes and promotional offers are valid only for the stated period and cannot be combined unless expressly stated.',
      'We may withdraw or modify any offer at any time. Abuse of offers (multiple accounts, fake orders, reselling) may lead to cancellation of orders and account suspension.',
      'Promotional or "sale" prices may change the return eligibility described in Section 8.'
    ]
  },
  {
    id: 10,
    title: '10. Intellectual Property',
    postulates: [
      'All content on the Website, including the Arghyya name, logo, taglines (including "Slay Everyday"), designs, patterns, prints, photographs, videos, text, graphics and layout, is owned by or licensed to us and protected under Indian and international laws on copyright, trademarks and designs.',
      'You may view and print content for personal, non-commercial use only. You must not copy, reproduce, modify, distribute, scrape, republish or use our content, designs or images for commercial purposes (including reselling, replicating our designs or listing them on other platforms) without our prior written permission.',
      'Any unauthorised use may result in legal action, including claims for damages.'
    ]
  },
  {
    id: 11,
    title: '11. Acceptable Use',
    postulates: [
      'You agree not to use the Website for any unlawful or fraudulent purpose.',
      'You agree not to attempt to hack, disrupt, overload or gain unauthorised access to the Website or its systems.',
      'You agree not to introduce viruses, bots, scrapers or other harmful code.',
      'You agree not to impersonate any person or provide false details.',
      'You agree not to place orders for resale or commercial purposes without our written consent.',
      'You agree not to post content that is defamatory, obscene, hateful, infringing or otherwise unlawful.'
    ]
  },
  {
    id: 12,
    title: '12. Reviews, Photos and User Content',
    postulates: [
      'If you submit reviews, photos, videos, comments or tag us on social media, you grant Arghyya a non-exclusive, worldwide, royalty-free, perpetual licence to use, display, reproduce and share that content for marketing and promotional purposes, with credit to your handle where reasonable.',
      'You confirm that you own or have the rights to the content and that it does not infringe anyone’s rights. We may remove any content at our discretion.'
    ]
  },
  {
    id: 13,
    title: '13. Privacy and Data Protection',
    postulates: [
      'We collect and use your personal information as described in our Privacy Policy, in accordance with the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023 (as applicable).',
      'By using the Website, you consent to the collection and use of your information for processing orders, delivery, customer support, fraud prevention, and (where you opt in) marketing.'
    ]
  },
  {
    id: 14,
    title: '14. Communications and Newsletter',
    postulates: [
      'By providing your phone number or email, you agree that we may contact you by SMS, WhatsApp, email or calls regarding your orders, deliveries and support.',
      'Marketing messages (such as collection launches, private previews and offers) are sent only if you opt in, and you can unsubscribe at any time using the link in the message or by writing to us.'
    ]
  },
  {
    id: 15,
    title: '15. Disclaimer of Warranties',
    postulates: [
      'The Website and Products are provided on an "as is" and "as available" basis. To the fullest extent permitted by law, we disclaim all warranties not expressly stated in these Terms.',
      'We do not guarantee that the Website will be uninterrupted, secure or error-free. Nothing in these Terms limits your rights under the Consumer Protection Act, 2019.'
    ]
  },
  {
    id: 16,
    title: '16. Limitation of Liability',
    postulates: [
      'To the maximum extent permitted by law, Arghyya, its directors, employees, partners and affiliates will not be liable for any indirect, incidental, special or consequential losses arising from your use of the Website or Products.',
      'Our total liability for any claim relating to an order is limited to the amount you paid for that order.'
    ]
  },
  {
    id: 17,
    title: '17. Indemnity',
    postulates: [
      'You agree to indemnify and hold harmless Arghyya and its team from any claims, losses, damages or expenses (including reasonable legal fees) arising from your breach of these Terms, your misuse of the Website, or your violation of any law or third-party right.'
    ]
  },
  {
    id: 18,
    title: '18. Force Majeure',
    postulates: [
      'We are not liable for any delay or failure in performance caused by events beyond our reasonable control, including natural disasters, epidemics, government orders, lockdowns, strikes, courier or supplier disruptions, power or internet failures, or cyber attacks.'
    ]
  },
  {
    id: 19,
    title: '19. Governing Law and Dispute Resolution',
    postulates: [
      'These Terms are governed by the laws of India.',
      'We encourage you to contact us first so we can resolve any issue amicably.',
      'Any dispute that cannot be resolved informally will be subject to the exclusive jurisdiction of the courts at Delhi, India.'
    ]
  },
  {
    id: 20,
    title: '20. Grievance Officer',
    postulates: [
      'In line with the Consumer Protection (E-Commerce) Rules, 2020 and the Information Technology (Intermediary Guidelines) Rules, 2021, complaints may be sent to:',
      'Name: MOHNISH KUMAR GAUR',
      'Designation: CO-FOUNDER',
      'Email: care.arghya@gmail.com',
      'Phone: +91-8882827148',
      'Address: New Delhi, INDIA',
      'Working hours: Mon to Sat, 10:00 AM to 6:00 PM IST',
      'We will acknowledge complaints within 48 hours and aim to resolve them within one month of receipt.'
    ]
  },
  {
    id: 21,
    title: '21. Seller and Business Information',
    postulates: [
      'Legal name: Arghya',
      'Registered address: New Delhi, INDIA',
      'Country of origin of Products: India'
    ]
  },
  {
    id: 22,
    title: '22. Changes to These Terms',
    postulates: [
      'We may update these Terms from time to time. The updated version will be posted on this page with a new "Last updated" date.',
      'Continued use of the Website after changes means you accept the revised Terms. Orders are governed by the Terms in force at the time you placed them.'
    ]
  },
  {
    id: 23,
    title: '23. General',
    postulates: [
      'Severability: If any provision is held invalid, the rest remain in force.',
      'No waiver: Our failure to enforce any right is not a waiver of that right.',
      'Entire agreement: These Terms, together with our Privacy, Shipping and Return policies, are the entire agreement between you and Arghyya regarding the Website and Products.',
      'Assignment: We may assign our rights under these Terms; you may not without our written consent.'
    ]
  },
  {
    id: 24,
    title: '24. Contact Us',
    postulates: [
      'Arghya',
      'Email: care.arghya@gmail.com',
      'Phone / WhatsApp: +91-8882827148 , +91-7290999906 , +91-9310622289',
      'Website: www.arghyya.com',
      'Instagram: @arghyyaofficial'
    ]
  }
];

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState<number>(1);

  const scrollToSection = (id: number) => {
    setActiveSection(id);
    const element = document.getElementById(`section-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      {/* Hero Header Section (No Particle Background) */}
      <section className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-black dark:text-white text-xs font-bold uppercase tracking-widest shadow-sm">
            <Scale size={14} className="text-black dark:text-white" />
            <span>Legal Agreement</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-wide text-black dark:text-white">
            TERMS &amp; CONDITIONS
          </h1>

          <p className="text-xs sm:text-sm font-semibold tracking-wider text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto uppercase">
            Arghyya | www.arghyya.com &bull; Last updated: 30 September 2026
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Sidebar Index Jumps (Desktop) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-28 space-y-3 p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm backdrop-blur-md max-h-[calc(100vh-140px)] overflow-y-auto custom-scrollbar">
            <div className="flex items-center gap-2 pb-3 border-b border-neutral-200 dark:border-neutral-800">
              <FileText size={18} className="text-black dark:text-white" />
              <span className="font-serif font-bold text-sm text-black dark:text-white tracking-wider uppercase">
                Sections Index
              </span>
            </div>
            <nav className="space-y-1">
              {TERMS_SECTIONS.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`w-full flex items-center justify-between text-left px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    activeSection === sec.id
                      ? 'bg-black text-white dark:bg-white dark:text-black font-bold shadow-sm'
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800'
                  }`}
                >
                  <span className="truncate pr-2">{sec.title}</span>
                  <ChevronRight size={14} className="flex-shrink-0 opacity-70" />
                </button>
              ))}
            </nav>
          </aside>

          {/* Right Postulates List - Static Display (No typo/typing animation) */}
          <main className="lg:col-span-8 space-y-6">
            {TERMS_SECTIONS.map((sec) => (
              <div
                key={sec.id}
                id={`section-${sec.id}`}
                className="p-6 sm:p-8 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all space-y-4 scroll-mt-28"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 flex items-center justify-center text-black dark:text-white font-bold text-xs flex-shrink-0 mt-0.5">
                    {sec.id}
                  </div>
                  <h2 className="font-serif text-lg sm:text-xl font-bold text-black dark:text-white tracking-wide">
                    {sec.title}
                  </h2>
                </div>

                <div className="pl-0 sm:pl-11 space-y-3 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200">
                  {sec.postulates.map((postulate, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2.5">
                      <CheckCircle2 size={14} className="text-black dark:text-white mt-1 flex-shrink-0" />
                      <div className="flex-1 leading-relaxed">
                        {postulate}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Back to top button */}
            <div className="flex justify-center pt-6">
              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-widest shadow-md hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
              >
                <ArrowUp size={16} />
                Back to Top
              </button>
            </div>
          </main>

        </div>
      </div>
    </div>
  );
}
