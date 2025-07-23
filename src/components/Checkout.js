import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, CreditCard, CheckCircle, Clock, Truck } from 'lucide-react';
import { usePlasmid } from '../context/PlasmidContext';

const Checkout = () => {
  const { plasmids, selectedPlasmids, newDesign, showNewDesign } = usePlasmid();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    quantity: 1,
    urgency: 'standard',
    format: 'dna',
    notes: ''
  });

  const selectedPlasmidData = plasmids.filter(p => selectedPlasmids.includes(p.id));
  const itemsToOrder = [...selectedPlasmidData, ...(showNewDesign && newDesign ? [newDesign] : [])];

  const pricing = {
    standard: { dna: 250, glycerol: 180 },
    expedited: { dna: 350, glycerol: 260 },
    urgent: { dna: 500, glycerol: 380 }
  };

  const calculateTotal = () => {
    const basePrice = pricing[orderDetails.urgency][orderDetails.format];
    return itemsToOrder.length * basePrice * orderDetails.quantity;
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
  };

  if (itemsToOrder.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg border border-gray-200 p-6"
    >
      <AnimatePresence mode="wait">
        {!orderPlaced ? (
          <motion.div
            key="checkout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Header */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-bio-primary bg-opacity-10 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-bio-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-bio-dark">Order Summary</h3>
                <p className="text-gray-600">Review and place your order</p>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-bio-dark mb-3">
                Items ({itemsToOrder.length})
              </h4>
              <div className="space-y-3">
                {itemsToOrder.map((item, index) => (
                  <motion.div
                    key={item.id || item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-bio-light rounded-lg flex items-center justify-center">
                        <span className="text-bio-primary font-mono text-sm">
                          {item.name?.slice(-3) || 'NEW'}
                        </span>
                      </div>
                      <div>
                        <h5 className="font-medium text-bio-dark">
                          {item.name || item.id}
                        </h5>
                        <p className="text-sm text-gray-600">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-bio-dark">
                        ${pricing[orderDetails.urgency][orderDetails.format]}
                      </p>
                      <p className="text-xs text-gray-500">per unit</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Order Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-bio-dark mb-2">
                  Quantity
                </label>
                <select
                  value={orderDetails.quantity}
                  onChange={(e) => setOrderDetails(prev => ({ ...prev, quantity: parseInt(e.target.value) }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bio-primary focus:border-transparent"
                >
                  {[1, 2, 3, 4, 5, 10].map(qty => (
                    <option key={qty} value={qty}>{qty}</option>
                  ))}
                </select>
              </div>

              {/* Format */}
              <div>
                <label className="block text-sm font-medium text-bio-dark mb-2">
                  Format
                </label>
                <select
                  value={orderDetails.format}
                  onChange={(e) => setOrderDetails(prev => ({ ...prev, format: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bio-primary focus:border-transparent"
                >
                  <option value="dna">Purified DNA</option>
                  <option value="glycerol">Glycerol Stock</option>
                </select>
              </div>
            </div>

            {/* Urgency */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-bio-dark mb-3">
                Delivery Timeline
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { value: 'standard', label: 'Standard', time: '7-10 days', multiplier: 1 },
                  { value: 'expedited', label: 'Expedited', time: '3-5 days', multiplier: 1.4 },
                  { value: 'urgent', label: 'Urgent', time: '1-2 days', multiplier: 2 }
                ].map(option => (
                  <motion.div
                    key={option.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setOrderDetails(prev => ({ ...prev, urgency: option.value }))}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      orderDetails.urgency === option.value
                        ? 'border-bio-primary bg-bio-light'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <h5 className="font-semibold text-bio-dark">{option.label}</h5>
                      <p className="text-sm text-gray-600 mb-2">{option.time}</p>
                      <p className="text-lg font-bold text-bio-primary">
                        +{Math.round((option.multiplier - 1) * 100)}%
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Special Instructions */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-bio-dark mb-2">
                Special Instructions (Optional)
              </label>
              <textarea
                value={orderDetails.notes}
                onChange={(e) => setOrderDetails(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Any special handling or delivery instructions..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bio-primary focus:border-transparent"
                rows="3"
              />
            </div>

            {/* Order Total */}
            <div className="bg-gradient-to-r from-bio-light to-blue-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between text-lg font-semibold text-bio-dark">
                <span>Total</span>
                <span>${calculateTotal().toLocaleString()}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {itemsToOrder.length} item{itemsToOrder.length > 1 ? 's' : ''} × {orderDetails.quantity} unit{orderDetails.quantity > 1 ? 's' : ''} each
              </p>
            </div>

            {/* Place Order Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePlaceOrder}
              className="w-full flex items-center justify-center space-x-2 py-4 bg-bio-primary text-white font-semibold rounded-lg hover:bg-opacity-90 transition-colors"
            >
              <CreditCard className="w-5 h-5" />
              <span>Place Order</span>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="confirmation"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <h3 className="text-2xl font-bold text-bio-dark mb-2">Order Placed Successfully!</h3>
            <p className="text-gray-600 mb-6">
              Your plasmid order has been received and is being processed.
            </p>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>Order Confirmed</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-600">
                  <Clock className="w-4 h-4" />
                  <span>In Production</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Truck className="w-4 h-4" />
                  <span>Delivery</span>
                </div>
              </div>
            </div>

            <div className="text-left bg-white border border-gray-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-bio-dark mb-2">Order Details</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Order ID:</span>
                  <span className="ml-2 font-mono">#PL-{Date.now().toString().slice(-6)}</span>
                </div>
                <div>
                  <span className="text-gray-600">Timeline:</span>
                  <span className="ml-2 capitalize">{orderDetails.urgency}</span>
                </div>
                <div>
                  <span className="text-gray-600">Items:</span>
                  <span className="ml-2">{itemsToOrder.length}</span>
                </div>
                <div>
                  <span className="text-gray-600">Total:</span>
                  <span className="ml-2 font-semibold">${calculateTotal().toLocaleString()}</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600">
              You will receive email updates about your order progress.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Checkout; 