The Plan
1. Database changes
Add price to Events table and create a Cart table:
Events        → add price field
Registrations → add paymentId, paymentStatus fields
Cart          → userId, eventId, addedAt

2. Backend — new APIs needed
POST /api/payments/create-order     → create Razorpay order
POST /api/payments/verify           → verify payment signature → then register
POST /api/cart                      → add event to cart
GET  /api/cart                      → get user's cart
DELETE /api/cart/:eventId           → remove from cart

3. Frontend flow
Register Now:
Click Register → Razorpay modal opens → pay → 
verify on backend → marked as registered
Cart:
Click Save → added to cart → 
user opens cart → clicks pay → same Razorpay flow
Waitlist:
Event full → Join Waitlist → 
spot opens → socket notification → 
user pays → registered

4. Razorpay setup

Free test account at razorpay.com
Get key_id and key_secret
Install: npm install razorpay on backend


Order to build:

Razorpay backend setup
Payment APIs
DB migrations
Frontend payment modal
Cart feature
Waitlist hook into payments