import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import numpy as np

class DemandCollapseClassifier:
    def __init__(self):
        # Using a lightweight pre-trained multilingual model for code-switching (Hindi/English)
        self.model_name = "google/muril-base-cased"
        self.tokenizer = AutoTokenizer.from_pretrained(self.model_name)
        # 5 Classes as per README: platform_outage, civil_event, restaurant_strike, festival_holiday, unknown
        self.model = AutoModelForSequenceClassification.from_pretrained(self.model_name, num_labels=5)
        
        self.labels = ["platform_outage", "civil_event", "restaurant_strike", "festival_holiday", "unknown"]

    def classify_event(self, text_headlines: list) -> dict:
        """
        Takes recent news headlines/tweets when an LSTM demand collapse is triggered.
        Returns the most probable cause.
        """
        if not text_headlines:
            return {"cause": "unknown", "confidence": 1.0}

        combined_text = " . ".join(text_headlines)
        inputs = self.tokenizer(combined_text, return_tensors="pt", truncation=True, max_length=512)
        
        with torch.no_grad():
            outputs = self.model(**inputs)
            probabilities = torch.nn.functional.softmax(outputs.logits, dim=-1).squeeze().numpy()
            
        top_class_idx = np.argmax(probabilities)
        confidence = probabilities[top_class_idx]
        
        # If confidence is too low, default to unknown
        if confidence < 0.60:
            return {"cause": "unknown", "confidence": float(confidence)}
            
        return {
            "cause": self.labels[top_class_idx],
            "confidence": float(confidence)
        }