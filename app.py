from flask import Flask, render_template, request, redirect, url_for
import os
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np

app = Flask(__name__)

# Load the pre-trained CNN model
model = load_model('model.h5')

# Define class labels for prediction (e.g., cancerous, non-cancerous)
CLASS_LABELS = ['Non-Cancerous', 'Cancerous']

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return redirect(request.url)
    
    file = request.files['file']
    if file.filename == '':
        return redirect(request.url)
    
    if file:
        # Save the file locally
        filepath = os.path.join('uploads', file.filename)
        file.save(filepath)
        
        # Preprocess the image for model prediction
        img = image.load_img(filepath, target_size=(150, 150))
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0) / 255.0
        
        # Predict the class
        prediction = model.predict(img_array)
        class_idx = np.argmax(prediction, axis=1)[0]
        result = CLASS_LABELS[class_idx]
        
        return render_template('index.html', result=result)
    
if __name__ == '__main__':
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    app.run(debug=True)
