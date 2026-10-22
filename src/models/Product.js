import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Please provide a product slug'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    sku: {
      type: String,
      default: 'PROD-2425',
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a product description'],
    },
    images: {
      type: [String],
      default: [],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Please select a main category'],
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      default: null,
    },
    minOrderQuantity: {
      type: Number,
      default: 50,
    },
    origin: {
      type: String,
      default: 'Sialkot, PK',
    },
    specifications: {
      gsm: { type: String, default: '300' },
      material: { type: String, default: '100% Cotton' },
      weight: { type: String, default: '300 GSM' },
      sizing: { type: String, default: 'XS - 2XL' },
      customization: { type: String, default: 'Embroidery, Screen Printing, Puff Print' },
      origin: { type: String, default: 'Sialkot, PK' },
    },
    tieredPricing: {
      sample: {
        price: { type: Number, default: 40 },
        range: { type: String, default: '1-19' },
      },
      lowVolume: {
        price: { type: Number, default: 30 },
        range: { type: String, default: '20-49' },
      },
      midVolume: {
        price: { type: Number, default: 20 },
        range: { type: String, default: '50-199' },
      },
      highVolume: {
        price: { type: Number, default: 14.99 },
        range: { type: String, default: '200+' },
      },
    },
    colors: [
      {
        name: { type: String, default: 'Burgundy' },
        hex:  { type: String, default: '#6B1D2F' },
        image:{ type: String, default: '/active-wear.png' },
      },
    ],
    placements: [
      {
        id:       { type: String },
        label:    { type: String },
        surcharge:{ type: Number, default: 0 },
      },
    ],
    techniques: [
      {
        id:       { type: String },
        label:    { type: String },
        surcharge:{ type: Number, default: 0 },
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['active', 'draft', 'archive'],
      default: 'active',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);

