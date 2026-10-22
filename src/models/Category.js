import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a category name'],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Please provide a category slug'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      default: null,
    },
    image: {
      type: String, // URL to category image
      default: '',
    },
    sortOrder: {
      type: Number, // Lower numbers are listed first in menus and on the products page
      default: 100,
    },
    heroHeading: {
      type: String,
      default: '',
    },
    heroSubheading: {
      type: String,
      default: '',
    },
    heroBgImage: {
      type: String,
      default: '',
    },
    heroBgVideo: {
      type: String,
      default: '',
    },
    heroImage1: {
      type: String,
      default: '',
    },
    heroImage2: {
      type: String,
      default: '',
    },
    heroImage3: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);
