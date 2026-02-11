import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, phone, service, message } = req.body;

    // Validate required fields
    if (!name || !email || !service) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Format the service name
    const serviceNames = {
        'consultation': '1-to-1 Consultation - €70',
        'workshop': 'Team Workshop - €170'
    };

    try {
        const result = await resend.emails.send({
            from: 'NG Performance Psychology <onboarding@resend.dev>',
            to: 'neil@ngperformancepsychology.com',
            replyTo: email,
            subject: `New Booking Request: ${serviceNames[service] || service}`,
            html: `
                <h2>New Booking Request</h2>
                <p><strong>From:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                <p><strong>Service:</strong> ${serviceNames[service] || service}</p>
                <hr>
                <h3>Message:</h3>
                <p>${message || 'No message provided'}</p>
            `
        });

        console.log('Resend response:', result);
        return res.status(200).json({ success: true, message: 'Email sent successfully', id: result?.id });
    } catch (error) {
        console.error('Resend error:', error);
        return res.status(500).json({ error: 'Failed to send email' });
    }
}
