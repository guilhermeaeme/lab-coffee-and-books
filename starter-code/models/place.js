const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const placeSchema = new Schema({
  name: String,
  type: { type: String, enum: ['cooffe shop', 'bookstore'] },
  address: String,
  location: { type: { type: String }, coordinates: [Number] }
},
{
  timestamps: true
});

placeSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Place', placeSchema);
