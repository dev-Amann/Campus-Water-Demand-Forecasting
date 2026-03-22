import traceback
import sys

try:
    import model
    print("Calling predict_single()...")
    pred = model.predict_single(25.0, 0.0, 5000, 0, 1, 1)
    print("Prediction:", pred)
    
except Exception as e:
    print("Exception occurred:")
    traceback.print_exc()
    sys.exit(1)
