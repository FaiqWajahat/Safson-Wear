import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { requireAdmin, errorResponse } from '@/lib/adminAuth';
import Quotation from '@/models/Quotation';
import Product from '@/models/Product'; // populated references schema

const QUOTATION_STATUSES = ['pending', 'reviewed', 'responded', 'completed'];

export async function GET(req) {
  try {
    requireAdmin(req);
    await connectDB();
    const quotations = await Quotation.find()
      .populate({
        path: 'items.product',
        model: Product,
      })
      .sort({ createdAt: -1 })
      .lean();
      
    return NextResponse.json({ success: true, quotations });
  } catch (error) {
    console.error('Quotations GET error:', error);
    return errorResponse(error, 'Failed to fetch quotations');
  }
}

export async function PUT(req) {
  try {
    requireAdmin(req);
    await connectDB();
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'ID and status are required' }, { status: 400 });
    }

    if (!QUOTATION_STATUSES.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const quotation = await Quotation.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!quotation) {
      return NextResponse.json({ error: 'Quotation not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, quotation });
  } catch (error) {
    console.error('Quotation PUT error:', error);
    return errorResponse(error, 'Failed to update quotation');
  }
}

export async function DELETE(req) {
  try {
    requireAdmin(req);
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const quotation = await Quotation.findByIdAndDelete(id);
    if (!quotation) {
      return NextResponse.json({ error: 'Quotation not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Quotation deleted successfully' });
  } catch (error) {
    console.error('Quotation DELETE error:', error);
    return errorResponse(error, 'Failed to delete quotation');
  }
}
