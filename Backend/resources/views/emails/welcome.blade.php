<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Welcome to Nexa ERP</title>
</head>
<body style="font-family: Arial, sans-serif; background: #f9f9f9; color: #222;">
    <div style="max-width: 600px; margin: 40px auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px #0001; padding: 32px;">
        <h2 style="color: #3b82f6;">Welcome to Nexa ERP!</h2>
        <p>Hi {{ $user->name }},</p>
        <p>Thank you for registering your business <strong>{{ $shop->business_name }}</strong> with Nexa ERP.</p>
        <p>Your account is now active. You can log in and start managing your shop, products, and team.</p>
        <p>If you need any help, just reply to this email or contact our support team.</p>
        <br>
        <p>Best regards,<br>Nexa ERP Team</p>
    </div>
</body>
</html>
