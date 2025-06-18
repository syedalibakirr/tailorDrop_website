import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Package, Clock, Scissors, Truck, CheckCircle, Eye, MessageCircle } from 'lucide-react';

const Orders: React.FC = () => {
  const { user } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  // Mock orders data - in a real app, this would come from your backend
  const orders = [
    {
      id: 'ORD-001',
      clothingType: 'Dress Pants',
      alterationType: 'Hem + Waist Adjustment',
      status: 'in_alteration',
      createdAt: '2025-01-12',
      estimatedCompletion: '2025-01-15',
      finalPrice: 40,
      photos: [
        'https://images.pexels.com/photos/1148960/pexels-photo-1148960.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/1038000/pexels-photo-1038000.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      trackingNumber: 'TD-2025-001'
    },
    {
      id: 'ORD-002',
      clothingType: 'Shirt',
      alterationType: 'Shorten Sleeves',
      status: 'completed',
      createdAt: '2025-01-08',
      estimatedCompletion: '2025-01-11',
      finalPrice: 18,
      photos: [
        'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      trackingNumber: 'TD-2025-002'
    },
    {
      id: 'ORD-003',
      clothingType: 'Jeans',
      alterationType: 'Hem',
      status: 'pending_pickup',
      createdAt: '2025-01-13',
      estimatedCompletion: '2025-01-16',
      finalPrice: 15,
      photos: [
        'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      trackingNumber: 'TD-2025-003'
    }
  ];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending_pickup':
        return {
          icon: Clock,
          color: 'text-yellow-600 bg-yellow-100',
          label: 'Pending Pickup',
          description: 'Waiting for scheduled pickup'
        };
      case 'in_alteration':
        return {
          icon: Scissors,
          color: 'text-blue-600 bg-blue-100',
          label: 'In Alteration',
          description: 'Being worked on by our tailors'
        };
      case 'out_for_delivery':
        return {
          icon: Truck,
          color: 'text-purple-600 bg-purple-100',
          label: 'Out for Delivery',
          description: 'On the way back to you'
        };
      case 'completed':
        return {
          icon: CheckCircle,
          color: 'text-green-600 bg-green-100',
          label: 'Completed',
          description: 'Successfully delivered'
        };
      default:
        return {
          icon: Package,
          color: 'text-gray-600 bg-gray-100',
          label: 'Unknown',
          description: 'Status unknown'
        };
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Sign In</h2>
          <p className="text-gray-600">You need to be signed in to view your orders.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600 mt-2">Track your alteration requests and view order history</p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Orders Yet</h2>
            <p className="text-gray-600 mb-6">You haven't placed any alteration requests yet.</p>
            <a
              href="/request"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 inline-block"
            >
              Request Your First Alteration
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Orders List */}
            <div className="lg:col-span-2 space-y-6">
              {orders.map((order) => {
                const statusInfo = getStatusInfo(order.status);
                const StatusIcon = statusInfo.icon;
                
                return (
                  <div
                    key={order.id}
                    className={`bg-white rounded-2xl shadow-sm border-2 transition-all duration-200 cursor-pointer ${
                      selectedOrder === order.id
                        ? 'border-blue-500 shadow-lg'
                        : 'border-transparent hover:shadow-md'
                    }`}
                    onClick={() => setSelectedOrder(order.id)}
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {order.clothingType}
                          </h3>
                          <p className="text-gray-600">{order.alterationType}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full flex items-center space-x-2 ${statusInfo.color}`}>
                          <StatusIcon className="h-4 w-4" />
                          <span className="text-sm font-medium">{statusInfo.label}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Order ID</p>
                          <p className="font-medium text-gray-900">{order.id}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Created</p>
                          <p className="font-medium text-gray-900">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Est. Completion</p>
                          <p className="font-medium text-gray-900">
                            {new Date(order.estimatedCompletion).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Price</p>
                          <p className="font-medium text-gray-900">${order.finalPrice}</p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <p className="text-sm text-gray-600">{statusInfo.description}</p>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>View Details</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Details Panel */}
            <div className="lg:col-span-1">
              {selectedOrder ? (
                <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
                  {(() => {
                    const order = orders.find(o => o.id === selectedOrder);
                    if (!order) return null;
                    
                    const statusInfo = getStatusInfo(order.status);
                    const StatusIcon = statusInfo.icon;

                    return (
                      <>
                        <div className="text-center mb-6">
                          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${statusInfo.color} mb-4`}>
                            <StatusIcon className="h-8 w-8" />
                          </div>
                          <h2 className="text-xl font-bold text-gray-900">{order.clothingType}</h2>
                          <p className="text-gray-600">{order.alterationType}</p>
                        </div>

                        <div className="space-y-4 mb-6">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Tracking Number:</span>
                            <span className="font-medium text-gray-900">{order.trackingNumber}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Status:</span>
                            <span className="font-medium text-gray-900">{statusInfo.label}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Final Price:</span>
                            <span className="font-medium text-gray-900">${order.finalPrice}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Est. Completion:</span>
                            <span className="font-medium text-gray-900">
                              {new Date(order.estimatedCompletion).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        {order.photos.length > 0 && (
                          <div className="mb-6">
                            <h3 className="font-medium text-gray-900 mb-3">Photos</h3>
                            <div className="grid grid-cols-2 gap-2">
                              {order.photos.map((photo, index) => (
                                <img
                                  key={index}
                                  src={photo}
                                  alt={`Order ${order.id} photo ${index + 1}`}
                                  className="w-full h-24 object-cover rounded-lg"
                                />
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="space-y-3">
                          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2">
                            <MessageCircle className="h-4 w-4" />
                            <span>Contact Support</span>
                          </button>
                          
                          {order.status === 'completed' && (
                            <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                              Leave Review
                            </button>
                          )}
                        </div>
                      </>
                    );
                  })()}
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
                  <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">Select an order to view details</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;