import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Camera, Calendar, FileText, DollarSign, Upload, X } from 'lucide-react';

const Request: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    clothingType: '',
    alterationType: '',
    customInstructions: '',
    photos: [] as File[],
    pickupDate: '',
    pickupTime: '',
    expressService: false
  });
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  const clothingTypes = [
    'Pants/Jeans',
    'Shirt/Blouse',
    'Dress',
    'Suit Jacket',
    'Skirt',
    'Shorts',
    'Other'
  ];

  const alterationTypes = {
    'Pants/Jeans': ['Hem', 'Waist Adjustment', 'Taper Legs', 'Zipper Repair', 'Seat Adjustment'],
    'Shirt/Blouse': ['Shorten Sleeves', 'Take in Sides', 'Shorten Length', 'Adjust Shoulders'],
    'Dress': ['Hem', 'Take in/Let out', 'Adjust Straps', 'Zipper Repair', 'Add Cups'],
    'Suit Jacket': ['Sleeve Shortening', 'Body Adjustment', 'Shoulder Adjustment'],
    'Skirt': ['Hem', 'Waist Adjustment', 'Take in Sides'],
    'Shorts': ['Hem', 'Waist Adjustment', 'Taper'],
    'Other': ['Custom Alteration - Describe in instructions']
  };

  const pricingEstimates = {
    'Hem': 15,
    'Waist Adjustment': 25,
    'Taper Legs': 22,
    'Zipper Repair': 28,
    'Shorten Sleeves': 18,
    'Take in Sides': 22,
    'Take in/Let out': 28,
    'Adjust Straps': 15,
    'Custom Alteration - Describe in instructions': 25
  };

  const timeSlots = [
    '9:00 AM - 2:00 PM',
    '10:00 AM - 3:00 PM',
    '11:00 AM - 4:00 PM',
    '12:00 PM - 5:00 PM',
    '1:00 PM - 6:00 PM',
    '2:00 PM - 7:00 PM'
  ];

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
      
      // Update price estimate
      if (name === 'alterationType') {
        const basePrice = pricingEstimates[value as keyof typeof pricingEstimates] || 25;
        setEstimatedPrice(basePrice);
      }
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData({ ...formData, photos: [...formData.photos, ...files] });
  };

  const removePhoto = (index: number) => {
    const newPhotos = formData.photos.filter((_, i) => i !== index);
    setFormData({ ...formData, photos: newPhotos });
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the request to your backend
    console.log('Alteration request submitted:', formData);
    navigate('/orders');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-fit mx-auto mb-4">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Describe Your Alteration</h2>
              <p className="text-gray-600">Tell us what clothing item you need altered and what type of alteration you need</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type of Clothing *
                </label>
                <select
                  name="clothingType"
                  value={formData.clothingType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select clothing type</option>
                  {clothingTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {formData.clothingType && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type of Alteration *
                  </label>
                  <select
                    name="alterationType"
                    value={formData.alterationType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select alteration type</option>
                    {alterationTypes[formData.clothingType as keyof typeof alterationTypes]?.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Instructions
                </label>
                <textarea
                  name="customInstructions"
                  value={formData.customInstructions}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Any specific details or preferences for your alteration..."
                />
              </div>

              {estimatedPrice > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-800 font-medium">Estimated Price:</span>
                    <span className="text-2xl font-bold text-blue-600">${estimatedPrice}</span>
                  </div>
                  <p className="text-blue-600 text-sm mt-1">Final price confirmed at pickup</p>
                </div>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-fit mx-auto mb-4">
                <Camera className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Photos</h2>
              <p className="text-gray-600">Upload clear photos of your garment to help our tailors understand your needs</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Photos of Your Garment *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors duration-200">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">
                    Upload photos of the front, back, and any specific areas that need alteration
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors duration-200"
                  >
                    Choose Photos
                  </label>
                </div>
              </div>

              {formData.photos.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Uploaded Photos ({formData.photos.length})</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {formData.photos.map((photo, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-200"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 mb-2">Photo Tips:</h4>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Take photos in good lighting</li>
                  <li>• Include full garment and close-ups of alteration areas</li>
                  <li>• Show any fit issues clearly</li>
                  <li>• Include care labels if visible</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-fit mx-auto mb-4">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Schedule Pickup</h2>
              <p className="text-gray-600">Choose a convenient 5-hour window for us to collect your clothes</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pickup Date *
                </label>
                <input
                  type="date"
                  name="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pickup Time Window *
                </label>
                <select
                  name="pickupTime"
                  value={formData.pickupTime}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select time window</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="expressService"
                  name="expressService"
                  checked={formData.expressService}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="expressService" className="text-sm text-gray-700">
                  Express Service (+50% fee) - Next day delivery
                </label>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">What to expect at pickup:</h4>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Our team member will arrive within your selected window</li>
                  <li>• We'll take final measurements if needed</li>
                  <li>• Confirm alteration details and final pricing</li>
                  <li>• Provide you with a tracking number</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-fit mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & Confirm</h2>
              <p className="text-gray-600">Review your alteration request before submitting</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-900">Clothing Type</h3>
                  <p className="text-gray-600">{formData.clothingType}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Alteration Type</h3>
                  <p className="text-gray-600">{formData.alterationType}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Pickup Date</h3>
                  <p className="text-gray-600">{formData.pickupDate}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Pickup Time</h3>
                  <p className="text-gray-600">{formData.pickupTime}</p>
                </div>
              </div>

              {formData.customInstructions && (
                <div>
                  <h3 className="font-medium text-gray-900">Special Instructions</h3>
                  <p className="text-gray-600">{formData.customInstructions}</p>
                </div>
              )}

              <div>
                <h3 className="font-medium text-gray-900">Photos Uploaded</h3>
                <p className="text-gray-600">{formData.photos.length} photos</p>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-900">Estimated Total:</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-blue-600">
                      ${formData.expressService ? Math.ceil(estimatedPrice * 1.5) : estimatedPrice}
                    </span>
                    {formData.expressService && (
                      <p className="text-sm text-orange-600">Express service included</p>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-1">Final price confirmed at pickup</p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 text-sm">
                <strong>Please note:</strong> Final pricing will be confirmed by our tailor during pickup. 
                You'll only be charged after you approve the final price.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step <= currentStep
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`h-1 w-24 mx-4 ${
                    step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Details</span>
            <span>Photos</span>
            <span>Schedule</span>
            <span>Review</span>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit}>
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  Previous
                </button>
              )}
              <div className="ml-auto">
                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={
                      (currentStep === 1 && (!formData.clothingType || !formData.alterationType)) ||
                      (currentStep === 2 && formData.photos.length === 0) ||
                      (currentStep === 3 && (!formData.pickupDate || !formData.pickupTime))
                    }
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-8 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
                  >
                    Submit Request
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Request;