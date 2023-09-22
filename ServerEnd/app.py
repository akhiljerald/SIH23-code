import os
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import stripe
import json

app = Flask(__name__)
stripe.api_key = 'YOUR-STRIPE-API-KEY'

# Create a storage folder for uploaded images
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

payment_ids = []

@app.route('/payments/intent', methods=['POST'])
def create_payment_intent():
    try:
        data = request.get_json()
        amount = data['amount']
        currency = 'inr'

        # Create a PaymentIntent with the specified amount
        payment_intent = stripe.PaymentIntent.create(
            amount=amount,
            currency=currency
        )

        # Push the payment ID into the array
        payment_ids.append(payment_intent.id)

        # Update JSON file with payment IDs
        update_payment_ids_json()

        # Return the secret and Payment ID
        return jsonify({
            'paymentIntent': payment_intent.client_secret,
            'Paymentid': payment_intent.id
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/payments/refund', methods=['POST'])
def refund_payment():
    try:
        data = request.get_json()
        payment_intent_id = data['payment_intent']

        # Create a refund for the specified PaymentIntent
        refund = stripe.Refund.create(
            payment_intent=payment_intent_id,
            amount=2000  # Amount to refund, in the smallest currency unit (e.g., cents)
        )

        # Return the refund object
        return jsonify({'refund': refund})

    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/taggedImage', methods=['POST'])
def upload_tagged_image():
    try:
        if 'image' not in request.files:
            return jsonify({'message': 'No file uploaded'}), 400

        uploaded_file = request.files['image']
        if uploaded_file.filename == '':
            return jsonify({'message': 'No selected file'}), 400

        # Securely save the uploaded image
        filename = secure_filename(uploaded_file.filename)
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        uploaded_file.save(file_path)

        # Access location data from the request JSON
        data = request.get_json()
        latitude = data['latitude']
        longitude = data['longitude']

        # Process the image and location data as needed
        # Example: Store the location data in a database
        # Example: Process the image buffer or save it to a file

        return jsonify({'message': 'Image and location data uploaded successfully'})

    except Exception as e:
        print('Error uploading image:', str(e))
        return jsonify({'message': 'Failed to upload image and location data'}), 500

def update_payment_ids_json():
    with open('paymentIds.json', 'w') as json_file:
        json.dump(payment_ids, json_file)

if __name__ == '__main__':
    app.run(host='YOUR-IP', port=3000)