import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircle, Phone, Mail } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const faqCategories = [
    {
      title: 'General Questions',
      faqs: [
        {
          question: 'How does TailorDrop work?',
          answer: 'It\'s simple! Upload photos of your clothing and describe what alterations you need. Schedule a pickup time, and we\'ll collect your clothes, make the alterations, and deliver them back to you within 2-3 days.'
        },
        {
          question: 'What areas do you serve?',
          answer: 'We currently serve the San Francisco Bay Area. We\'re expanding to new cities regularly, so check back if we\'re not in your area yet!'
        },
        {
          question: 'What types of alterations do you offer?',
          answer: 'We handle all common alterations including hemming, waist adjustments, sleeve alterations, zipper repairs, dress tapering, and many custom alterations. If you\'re unsure, just ask!'
        },
        {
          question: 'How much does it cost?',
          answer: 'Our pricing is transparent and competitive. Basic alterations start at $15. You can view our full pricing table on the Pricing page. Final pricing is confirmed during pickup.'
        }
      ]
    },
    {
      title: 'Scheduling & Pickup',
      faqs: [
        {
          question: 'How does pickup work?',
          answer: 'You choose a convenient 5-hour window, and our team member will arrive during that time to collect your clothes. They\'ll take any additional measurements needed and confirm the final price.'
        },
        {
          question: 'Can I reschedule my pickup?',
          answer: 'Yes! You can reschedule up to 2 hours before your pickup window starts. Just contact us through the app or call our support line.'
        },
        {
          question: 'What if I\'m not home during pickup?',
          answer: 'We offer several options: leave clothes in a designated secure location, reschedule for a better time, or arrange pickup with a neighbor or building manager.'
        },
        {
          question: 'Do you charge for pickup and delivery?',
          answer: 'No! Pickup and delivery are completely free and included in all our alteration prices.'
        }
      ]
    },
    {
      title: 'Alterations & Quality',
      faqs: [
        {
          question: 'What if I\'m not satisfied with the alterations?',
          answer: 'We offer a 100% satisfaction guarantee. If you\'re not happy with the work, we\'ll redo it at no extra charge or provide a full refund.'
        },
        {
          question: 'How long do alterations take?',
          answer: 'Standard turnaround is 2-3 days. We also offer express next-day service and same-day rush service for an additional fee.'
        },
        {
          question: 'Can you work with expensive or designer clothing?',
          answer: 'Absolutely! Our experienced tailors work with all types of clothing, from everyday wear to high-end designer pieces and formal wear.'
        },
        {
          question: 'What if you damage my clothing?',
          answer: 'While extremely rare, if damage occurs due to our error, we\'ll either repair it at no cost or compensate you for the full value of the garment.'
        },
        {
          question: 'Do you work with all fabric types?',
          answer: 'Yes, our tailors are experienced with all fabric types including delicate materials like silk, leather\'s , wool, and synthetics. Some specialty fabrics may have additional fees.'
        }
      ]
    },
    {
      title: 'Pricing & Payment',
      faqs: [
        {
          question: 'How accurate are your online price estimates?',
          answer: 'Our online estimates are typically within 10% of the final price. The exact price is confirmed by our tailor during pickup after examining the garment.'
        },
        {
          question: 'When do I pay?',
          answer: 'You pay after pickup once the final price is confirmed. We\'ll send you a secure payment link, and you can pay by card online.'
        },
        {
          question: 'What if the final price is higher than expected?',
          answer: 'If the price is significantly different from the estimate, our tailor will explain why and get your approval before proceeding. You can always decline if you\'re not comfortable with the price.'
        },
        {
          question: 'Do you offer any discounts or promotions?',
          answer: 'Yes! We regularly offer promotions for new customers and bulk orders. Follow us on social media or sign up for our newsletter to stay updated.'
        }
      ]
    },
    {
      title: 'Account & Orders',
      faqs: [
        {
          question: 'How do I track my order?',
          answer: 'After pickup, you\'ll receive a tracking number and can monitor your order status in your account dashboard. We also send SMS updates at each stage.'
        },
        {
          question: 'Can I modify my order after pickup?',
          answer: 'Minor modifications are possible if caught early. Contact us as soon as possible after pickup. Major changes may require a new order.'
        },
        {
          question: 'What if I need to cancel my order?',
          answer: 'You can cancel anytime before pickup with no charge. After pickup, cancellation depends on whether work has begun. Contact support for specific situations.'
        },
        {
          question: 'How do I leave a review?',
          answer: 'After your order is completed, you\'ll receive an email with a link to leave a review. You can also leave reviews in your account dashboard.'
        }
      ]
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our alteration service, 
              pricing, and how TailorDrop works.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.title}</h2>
              <div className="space-y-4">
                {category.faqs.map((faq, faqIndex) => {
                  const globalIndex = categoryIndex * 100 + faqIndex; // Unique index across all categories
                  const isOpen = openFAQ === globalIndex;
                  
                  return (
                    <div
                      key={faqIndex}
                      className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFAQ(globalIndex)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                      >
                        <span className="text-lg font-medium text-gray-900 pr-4">
                          {faq.question}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-xl text-gray-600">
              Our support team is here to help you with any questions not covered above.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow duration-200">
              <div className="bg-blue-100 p-4 rounded-full w-fit mx-auto mb-6">
                <MessageCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Live Chat</h3>
              <p className="text-gray-600 mb-6">
                Get instant answers to your questions with our live chat support.
              </p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Start Chat
              </button>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow duration-200">
              <div className="bg-blue-100 p-4 rounded-full w-fit mx-auto mb-6">
                <Phone className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Phone Support</h3>
              <p className="text-gray-600 mb-6">
                Call us directly for immediate assistance with your orders.
              </p>
              <a
                href="tel:+15551234567"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 inline-block"
              >
                (555) 123-4567
              </a>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow duration-200">
              <div className="bg-blue-100 p-4 rounded-full w-fit mx-auto mb-6">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Email Support</h3>
              <p className="text-gray-600 mb-6">
                Send us an email and we'll get back to you within 24 hours.
              </p>
              <a
                href="mailto:hello@tailordrop.com"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 inline-block"
              >
                Send Email
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Questions */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-8">
              Popular Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                'How long do alterations take?',
                'What if I\'m not satisfied?',
                'Do you work with designer clothes?',
                'How much does pickup cost?',
                'Can I reschedule my appointment?',
                'What areas do you serve?'
              ].map((question, index) => (
                <div key={index} className="text-left">
                  <button className="text-blue-100 hover:text-white transition-colors duration-200 text-sm">
                    {question}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;