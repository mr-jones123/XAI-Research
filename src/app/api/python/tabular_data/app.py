
from sklearn.datasets import load_iris
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import lime
import lime.lime_tabular

# Load the Iris dataset
iris = load_iris()
X = iris.data
y = iris.target
feature_names = iris.feature_names
class_names = iris.target_names

# Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a RandomForestClassifier
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Create a LIME explainer
explainer = lime.lime_tabular.LimeTabularExplainer(
    training_data=X_train,
    feature_names=feature_names,
    class_names=class_names,
    mode='classification'
)

# Select a specific instance from the test set
instance = X_test[0]
print(f"Instance: {instance}")

# Get the model's prediction for the instance
prediction = model.predict([instance])
probability = model.predict_proba([instance])
print(f"Predicted class: {class_names[prediction[0]]}")
print(f"Prediction probabilities: {probability[0]}")

# Explain the prediction using LIME
exp = explainer.explain_instance(instance, model.predict_proba, num_features=4)

# Print the explanation
print(exp.as_list())

# Visualize the explanation
exp.show_in_notebook(show_table=True, show_all=False)