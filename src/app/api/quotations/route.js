import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Quotation from '@/models/Quotation';
import nodemailer from 'nodemailer';

// Helper to create SMTP Transporter
function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587');
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass || user.includes('your_email') || pass.includes('your_app_password')) {
    console.warn('SMTP environment variables are not configured. Skipping email delivery.');
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports
    auth: { user, pass },
  });
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const {
      firstName,
      lastName,
      company,
      email,
      phone,
      country,
      website,
      source,
      productTypes,
      fabrics,
      productDesc,
      moq,
      colorways,
      styles,
      timeline,
      budget,
      sizes,
      printMethods,
      assets,
      techPack,
      packaging,
      notes,
      attachments // Cloudinary file URLs
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !moq) {
      return NextResponse.json({ error: 'Missing required contact or quotation fields' }, { status: 400 });
    }

    const fullName = `${firstName} ${lastName}`.trim();

    // Map fields into detail notes
    const formattedNotes = [
      `Fabric Preference: ${fabrics && fabrics.length > 0 ? fabrics.join(', ') : 'None selected'}`,
      `Colorways: ${colorways || '—'}`,
      `Styles/SKUs: ${styles || '—'}`,
      `Budget Range: ${budget || '—'}`,
      `Sizes: ${sizes && sizes.length > 0 ? sizes.join(', ') : 'None specified'}`,
      `Printing Methods: ${printMethods && printMethods.length > 0 ? printMethods.join(', ') : 'None specified'}`,
      `Brand Assets: ${assets || '—'}`,
      `Tech Pack Status: ${techPack || '—'}`,
      `Packaging: ${packaging && packaging.length > 0 ? packaging.join(', ') : 'Standard'}`,
      `Special Instructions: ${notes || 'None'}`
    ].join('\n');

    // Create the Quotation entry
    const quotation = await Quotation.create({
      name: fullName,
      companyName: company || '',
      email: email.toLowerCase(),
      phone: phone || '',
      message: productDesc || 'No product description provided.',
      attachments: attachments || [],
      items: [
        {
          productName: productTypes && productTypes.length > 0 ? productTypes.join(' & ') : 'Custom Apparel',
          quantity: parseInt(moq.replace(/[^0-9]/g, '')) || 50,
          notes: formattedNotes
        }
      ],
      status: 'pending'
    });

    // Handle Email Notifications
    try {
      const transporter = getTransporter();
      if (transporter) {
        const fromEmail = process.env.SMTP_FROM || `"Safson Wear" <inquiries@fastapparel.com>`;
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@fastapparel.com';

        // 1. Send HTML confirmation to the Client
        const clientMailOptions = {
          from: fromEmail,
          to: email.toLowerCase(),
          subject: 'Quotation Request Received - Safson Wear',
          html: `
            <div style="font-family: 'Inter', sans-serif; background-color: #fafafa; padding: 40px 20px; color: #111;">
              <div style="max-width: 600px; margin: 0 auto; bg-color: #ffffff; background: #ffffff; border-radius: 12px; border: 1px solid #e5e5e5; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
                <!-- Black Header Banner -->
                <div style="background-color: #000000; padding: 30px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 900; letter-spacing: 4px; text-transform: uppercase;">Safson Wear</h1>
                  <p style="color: #a3a3a3; margin: 5px 0 0 0; font-size: 9px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;">OEM Custom Apparel Manufacturers</p>
                </div>

                <!-- Main Content -->
                <div style="padding: 40px 30px;">
                  <h2 style="font-size: 18px; font-weight: 900; text-transform: uppercase; margin: 0 0 15px 0; letter-spacing: -0.5px;">RFQ Submission Confirmed</h2>
                  <p style="font-size: 13px; color: #404040; line-height: 1.6; font-weight: 300;">
                    Thank you for contacting Safson Wear. We have received your detailed manufacturing brief. Our B2B technical team is reviewing your specifications (including sizing templates, fabric weight preferences, and custom artwork vectors) and will send a formal production quote within <strong>12 business hours</strong>.
                  </p>

                  <!-- Details Panel -->
                  <div style="margin: 30px 0; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">
                    <div style="background-color: #f5f5f5; padding: 10px 15px; border-bottom: 1px solid #e5e5e5;">
                      <span style="font-size: 9px; font-weight: 800; text-transform: uppercase; color: #737373; letter-spacing: 1px;">Brief Details</span>
                    </div>
                    <table style="width: 100%; font-size: 12px; border-collapse: collapse;">
                      <tr style="border-bottom: 1px solid #f5f5f5;">
                        <td style="padding: 12px 15px; font-weight: 700; color: #737373; width: 140px; text-transform: uppercase; font-size: 9px; letter-spacing: 0.5px;">Company</td>
                        <td style="padding: 12px 15px; color: #171717; font-weight: 600;">${company}</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #f5f5f5;">
                        <td style="padding: 12px 15px; font-weight: 700; color: #737373; text-transform: uppercase; font-size: 9px; letter-spacing: 0.5px;">Product Lines</td>
                        <td style="padding: 12px 15px; color: #171717; font-weight: 600;">${productTypes && productTypes.length > 0 ? productTypes.join(', ') : 'Custom Apparel'}</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #f5f5f5;">
                        <td style="padding: 12px 15px; font-weight: 700; color: #737373; text-transform: uppercase; font-size: 9px; letter-spacing: 0.5px;">Min Order Qty</td>
                        <td style="padding: 12px 15px; color: #171717; font-weight: 600;">${moq} Units</td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 15px; font-weight: 700; color: #737373; text-transform: uppercase; font-size: 9px; letter-spacing: 0.5px;">Required Delivery</td>
                        <td style="padding: 12px 15px; color: #171717; font-weight: 600;">${timeline}</td>
                      </tr>
                    </table>
                  </div>

                  ${attachments && attachments.length > 0 ? `
                    <!-- Attachments block -->
                    <div style="margin: 20px 0;">
                      <span style="font-size: 9px; font-weight: 800; text-transform: uppercase; color: #737373; letter-spacing: 1px; display: block; mb: 10px;">Uploaded Tech Packs / Artwork</span>
                      <ul style="padding-left: 20px; font-size: 12px; color: #111;">
                        ${attachments.map((url, i) => `<li><a href="${url}" style="color: #000; font-weight: 600; text-decoration: underline;" target="_blank">Design File ${i + 1}</a></li>`).join('')}
                      </ul>
                    </div>
                  ` : ''}

                  <div style="border-top: 1px solid #e5e5e5; padding-top: 25px; margin-top: 30px; font-size: 11px; color: #737373; line-height: 1.5; font-weight: 300;">
                    Have questions in the meantime? You can directly reply to this email to speak with our dedicated customer support desk.
                  </div>
                </div>

                <!-- Footer block -->
                <div style="background-color: #fafafa; border-top: 1px solid #e5e5e5; padding: 20px; text-align: center; font-size: 10px; color: #a3a3a3;">
                  &copy; ${new Date().getFullYear()} Safson Wear. All rights reserved. Sialkot, Pakistan.
                </div>
              </div>
            </div>
          `
        };

        // 2. Send Alert HTML to the Admin
        const adminMailOptions = {
          from: fromEmail,
          to: adminEmail,
          subject: `New RFQ Inquiry - ${company} (${fullName})`,
          html: `
            <div style="font-family: 'Inter', sans-serif; background-color: #fafafa; padding: 40px 20px; color: #111;">
              <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e5e5e5; overflow: hidden;">
                <div style="background-color: #b91c1c; padding: 25px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 18px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase;">New Inquiry Lead Received</h1>
                </div>

                <div style="padding: 40px 30px;">
                  <h2 style="font-size: 16px; font-weight: 800; text-transform: uppercase; margin: 0 0 20px 0;">Lead Contact Information</h2>
                  <table style="width: 100%; font-size: 12px; border-collapse: collapse; margin-bottom: 30px;">
                    <tr style="border-bottom: 1px solid #f5f5f5;"><td style="padding: 10px 0; font-weight: 700; color: #737373; width: 120px;">Client Name</td><td style="padding: 10px 0; color: #111; font-weight: 600;">${fullName}</td></tr>
                    <tr style="border-bottom: 1px solid #f5f5f5;"><td style="padding: 10px 0; font-weight: 700; color: #737373;">Company</td><td style="padding: 10px 0; color: #111; font-weight: 600;">${company}</td></tr>
                    <tr style="border-bottom: 1px solid #f5f5f5;"><td style="padding: 10px 0; font-weight: 700; color: #737373;">Email</td><td style="padding: 10px 0; color: #111; font-weight: 600;"><a href="mailto:${email}">${email}</a></td></tr>
                    <tr style="border-bottom: 1px solid #f5f5f5;"><td style="padding: 10px 0; font-weight: 700; color: #737373;">Phone</td><td style="padding: 10px 0; color: #111; font-weight: 600;">${phone}</td></tr>
                    <tr style="border-bottom: 1px solid #f5f5f5;"><td style="padding: 10px 0; font-weight: 700; color: #737373;">Country</td><td style="padding: 10px 0; color: #111; font-weight: 600;">${country || '—'}</td></tr>
                    <tr style="border-bottom: 1px solid #f5f5f5;"><td style="padding: 10px 0; font-weight: 700; color: #737373;">Website</td><td style="padding: 10px 0; color: #111; font-weight: 600;">${website || '—'}</td></tr>
                    <tr><td style="padding: 10px 0; font-weight: 700; color: #737373;">Traffic Source</td><td style="padding: 10px 0; color: #111; font-weight: 600;">${source || '—'}</td></tr>
                  </table>

                  <h2 style="font-size: 14px; font-weight: 800; text-transform: uppercase; margin: 0 0 10px 0;">Garment Description</h2>
                  <div style="background-color: #f5f5f5; padding: 15px; border-radius: 6px; font-size: 12px; color: #404040; line-height: 1.6; margin-bottom: 30px;">
                    ${productDesc || 'No product description provided.'}
                  </div>

                  <h2 style="font-size: 14px; font-weight: 800; text-transform: uppercase; margin: 0 0 15px 0;">Technical Specifications</h2>
                  <pre style="background-color: #fafafa; border: 1px solid #e5e5e5; padding: 15px; border-radius: 6px; font-size: 11px; font-family: monospace; color: #111; line-height: 1.5; white-space: pre-wrap; margin-bottom: 30px;">${formattedNotes}</pre>

                  ${attachments && attachments.length > 0 ? `
                    <h2 style="font-size: 14px; font-weight: 800; text-transform: uppercase; margin: 0 0 10px 0;">Design Files Attached</h2>
                    <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 15px; border-radius: 6px; margin-bottom: 30px;">
                      <ul style="padding-left: 20px; font-size: 12px; color: #166534; margin: 0;">
                        ${attachments.map((url, i) => `<li><a href="${url}" style="color: #14532d; font-weight: 700;" target="_blank">Download Design File ${i + 1}</a></li>`).join('')}
                      </ul>
                    </div>
                  ` : ''}

                  <div style="text-align: center; margin-top: 30px;">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin/quotations" style="display: inline-block; background-color: #000000; color: #ffffff; padding: 12px 25px; border-radius: 6px; font-size: 11px; font-weight: 700; text-transform: uppercase; text-decoration: none; letter-spacing: 1px;">Open In Admin Panel</a>
                  </div>
                </div>
              </div>
            </div>
          `
        };

        // Execute mail transfers concurrently
        await Promise.all([
          transporter.sendMail(clientMailOptions),
          transporter.sendMail(adminMailOptions)
        ]);
      }
    } catch (emailError) {
      console.error('SMTP email notification failed, but quotation record was successfully saved:', emailError);
    }

    return NextResponse.json({ success: true, quotationId: quotation._id });
  } catch (error) {
    console.error('Quotation POST error:', error);
    return NextResponse.json({ error: 'Failed to submit quotation request' }, { status: 500 });
  }
}
