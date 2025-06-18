import React, { useState } from 'react';
import { Check, Zap, Clock } from 'lucide-react';

const Pricing: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('pants');

  const categories = [
    { id: 'pants', name: 'Pants & Jeans' },
    { id: 'shirts', name: 'Shirts & Tops' },
    { id: 'dresses', name: 'Dresses & Skirts' },
    { id: 'suits', name: 'Suits & Jackets' },
    { id: 'other', name: 'Other Items' }
  ];

  const pricing = {
    pants: [
      { service: 'Hem (no cuff)', price: 15, description: 'Basic hemming without cuff' },
      { service: 'Hem (with cuff)', price: 18, description: 'Hemming with original cuff' },
      { service: 'Waist adjustment (in/out)', price: 25, description: 'Take in or let out waist up to 2 inches' },
      { service: 'Waist adjustment (major)', price: 35, description: 'Major waist alterations over 2 inches' },
      { service: 'Taper legs', price: 22, description: 'Narrow leg opening for better fit' },
      { service: 'Zipper replacement', price: 28, description: 'Replace broken or damaged zipper' },
      { service: 'Seat adjustment', price: 30, description: 'Adjust seat area for comfort' }
    ],
    shirts: [
      { service: 'Shorten sleeves', price: 18, description: 'Hem shirt sleeves to proper length' },
      { service: 'Take in sides', price: 22, description: 'Tailor shirt sides for better fit' },
      { service: 'Shorten length', price: 16, description: 'Adjust shirt length' },
      { service: 'Adjust shoulders', price: 35, description: 'Shoulder adjustments (complex alteration)' },
      { service: 'Replace buttons', price: 12, description: 'Replace missing or damaged buttons' },
      { service: 'Repair collar', price: 20, description: 'Fix or reinforce collar area' }
    ],
    dresses: [
      { service: 'Hem dress', price: 20, description: 'Adjust dress length' },
      { service: 'Take in/let out sides', price: 28, description: 'Adjust dress width' },
      { service: 'Adjust straps', price: 15, description: 'Shorten or lengthen straps' },
      { service: 'Bustle addition', price: 45, description: 'Add bustle for formal dresses' },
      { service: 'Zipper replacement', price: 32, description: 'Replace dress zipper' },
      { service: 'Add cups/bra', price: 25, description: 'Built-in bra support' }
    ],
    suits: [
      { service: 'Jacket sleeve shortening', price: 25, description: 'Adjust jacket sleeve length' },
      { service: 'Jacket body adjustment', price: 40, description: 'Take in jacket body' },
      { service: 'Pants hem & side adjustment', price: 35, description: 'Complete pants tailoring' },
      { service: 'Vest adjustment', price: 30, description: 'Tailor vest fit' },
      { service: 'Full suit package', price: 85, description: 'Complete suit alteration package' }
    ],
    other: [
      { service: 'Curtain hemming', price: 15, description: 'Per panel curtain hemming' },
      { service: 'Pillow cover', price: 20, description: 'Custom pillow covers' },
      { service: 'Minor repairs', price: 10, description: 'Small tears, loose seams' },
      { service: 'Custom consultation', price: 0, description: 'Free consultation for unique alterations' }
    ]
  };

  const expressPricing = [
    { name: 'Standard', time: '2-3 days', multiplier: 1, popular: true },
    { name: 'Express', time: 'Next day', multiplier: 1.5, popular: false },
    { name: 'Rush', time: 'Same day', multiplier: 2, popular: false }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              No hidden fees, no surprises. Get professional alterations at affordable prices 
              with pickup and delivery included.
            </p>
            <div className="bg-white rounded-lg p-6 inline-block shadow-lg">
              <div className="flex items-center justify-center space-x-4">
                <Check className="h-6 w-6 text-green-500" />
                <span className="text-lg font-semibold text-gray-900">Free pickup & delivery included</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tables */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 mx-2 mb-4 rounded-lg font-semibold transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Pricing Table */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-blue-600 px-8 py-6">
              <h2 className="text-2xl font-bold text-white">
                {categories.find(c => c.id === selectedCategory)?.name} Pricing
              </h2>
            </div>
            <div className="p-8">
              <div className="grid gap-6">
                {pricing[selectedCategory as keyof typeof pricing].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.service}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-blue-600">
                        ${item.price}
                        {item.price === 0 && <span className="text-sm text-gray-500 ml-1">FREE</span>}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Express Options */}
          <div className="mt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Delivery Options</h2>
              <p className="text-xl text-gray-600">Choose the turnaround time that works for you</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {expressPricing.map((option, index) => (
                <div key={index} className={`relative bg-white rounded-2xl shadow-lg overflow-hidden ${
                  option.popular ? 'ring-2 ring-blue-500' : ''
                }`}>
                  {option.popular && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-b-lg text-sm font-semibold">
                      Most Popular
                    </div>
                  )}
                  <div className="p-8 text-center">
                    <div className="bg-blue-100 p-4 rounded-full w-fit mx-auto mb-6">
                      {option.name === 'Standard' && <Clock className="h-8 w-8 text-blue-600" />}
                      {option.name === 'Express' && <Zap className="h-8 w-8 text-blue-600" />}
                      {option.name === 'Rush' && <Zap className="h-8 w-8 text-orange-600" />}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{option.name}</h3>
                    <p className="text-gray-600 mb-6">{option.time} delivery</p>
                    <div className="text-3xl font-bold text-blue-600 mb-6">
                      {option.multiplier === 1 ? 'Base Price' : `${option.multiplier}x`}
                    </div>
                    <p className="text-sm text-gray-500">
                      {option.multiplier === 1 
                        ? 'Standard pricing applies'
                        : `${((option.multiplier - 1) * 100)}% additional fee`
                      }
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-16 bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Important Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">What's Included</h4>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    Free pickup and delivery
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    Professional measurements
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    Before and after photos
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    Quality guarantee
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Please Note</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Prices are estimates; final pricing confirmed at pickup</li>
                  <li>• Complex alterations may require additional consultation</li>
                  <li>• Rush orders subject to availability</li>
                  <li>• Some specialty fabrics may incur additional fees</li>
                </ul>
              </div>
            </div>
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
            Get professional alterations with transparent pricing and convenient service
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

export default Pricing;