import React from 'react';
import { Camera, Calendar, Scissors, Truck, CheckCircle, Clock } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: Camera,
      title: 'Upload & Describe',
      description: 'Take photos of your clothing and tell us what alterations you need',
      details: [
        'Upload clear photos of your garment',
        'Select the type of alteration needed',
        'Add any special instructions',
        'Get an instant price estimate'
      ]
    },
    {
      icon: Calendar,
      title: 'Schedule Pickup',
      description: 'Choose a convenient 5-hour window for us to collect your clothes',
      details: [
        'Select from available time slots',
        'We offer morning, afternoon, and evening windows',
        'Receive confirmation and tracking number',
        'Get SMS updates on pickup status'
      ]
    },
    {
      icon: Scissors,
      title: 'Expert Alterations',
      description: 'Our skilled tailors work on your clothes with precision and care',
      details: [
        'Professional measurements taken during pickup',
        'Before photos documented for quality control',
        'Experienced tailors handle your alterations',
        'Quality inspection before completion'
      ]
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Get your perfectly fitted clothes delivered back to your door',
      details: [
        'Standard 2-3 day turnaround',
        'Express options available',
        'After photos provided',
        'Satisfaction guarantee included'
      ]
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: 'Save Time',
      description: 'No more trips to the tailor. We handle pickup and delivery.'
    },
    {
      icon: CheckCircle,
      title: 'Quality Work',
      description: 'Professional tailors with years of experience and attention to detail.'
    },
    {
      icon: Truck,
      title: 'Convenience',
      description: 'Schedule around your life with flexible pickup and delivery windows.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How TailorDrop Works
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Getting your clothes perfectly fitted has never been easier. Our simple 4-step process 
              makes professional alterations convenient and hassle-free.
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col lg:flex-row items-center gap-12 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}>
                <div className="flex-1">
                  <div className="flex items-center mb-6">
                    <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mr-4">
                      {index + 1}
                    </div>
                    <div className="bg-blue-100 p-3 rounded-full">
                      <step.icon className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{step.title}</h2>
                  <p className="text-xl text-gray-600 mb-6">{step.description}</p>
                  <ul className="space-y-3">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center text-gray-700">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1">
                  <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-8 h-80 flex items-center justify-center">
                    <step.icon className="h-32 w-32 text-blue-600 opacity-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose TailorDrop?
            </h2>
            <p className="text-xl text-gray-600">
              We're revolutionizing the alteration experience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200">
                <div className="bg-blue-100 p-3 rounded-full w-fit mb-6">
                  <benefit.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-8">
            {[
              {
                question: 'What if I\'m not satisfied with the alterations?',
                answer: 'We offer a 100% satisfaction guarantee. If you\'re not happy with the work, we\'ll redo it at no extra charge or provide a full refund.'
              },
              {
                question: 'How accurate are the price estimates?',
                answer: 'Our online estimates are typically within 10% of the final price. Final pricing is confirmed after our tailor examines the garment during pickup.'
              },
              {
                question: 'What happens if you damage my clothing?',
                answer: 'While rare, if damage occurs due to our error, we\'ll either repair it at no cost or compensate you for the full value of the garment.'
              },
              {
                question: 'Can you handle designer or expensive clothing?',
                answer: 'Absolutely! Our tailors have experience with all types of clothing, from everyday wear to designer pieces and formal wear.'
              },
              {
                question: 'Do you offer express services?',
                answer: 'Yes, we offer express services with next-day delivery for an additional fee, subject to availability and alteration complexity.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Experience the convenience of professional alterations delivered to your door
          </p>
          <a
            href="/register"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 inline-block"
          >
            Schedule Your First Pickup
          </a>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;