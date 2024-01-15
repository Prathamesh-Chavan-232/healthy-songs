import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsRegressor
from sklearn.metrics import r2_score, mean_squared_error
import pickle

class KNNRegressionModel:
    def __init__(self, data_path):
        self.data = pd.read_csv(data_path)
        self.X = self.data.iloc[:, :-1].values
        self.y = self.data.iloc[:, -1].values

        # Split the data into training and testing sets
        self.X_train, self.X_test, self.y_train, self.y_test = train_test_split(
            self.X, self.y, test_size=0.2, random_state=0
        )

        # Standardize the input features
        self.scaler = StandardScaler()
        self.X_train = self.scaler.fit_transform(self.X_train)
        self.X_test = self.scaler.transform(self.X_test)

        # Initialize KNeighborsRegressor
        self.regressor = KNeighborsRegressor(n_neighbors=4, metric='manhattan', p=2)

    def train_model(self):
        # Train the KNN regression model
        self.regressor.fit(self.X_train, self.y_train)

    def evaluate_model(self):
        # Make predictions on the test data
        y_pred = self.regressor.predict(self.X_test)

        # Calculate and print the R2 score
        r2 = r2_score(self.y_test, y_pred)
        print(f"R2 score: {r2:.4f}")

        # Optionally, calculate and print the mean squared error (MSE)
        mse = mean_squared_error(self.y_test, y_pred)
        print(f"Mean squared error (MSE): {mse:.4f}")

    def predict_new_data(self, new_data):
        # Predict the target value for new data
        predicted_value = self.regressor.predict(self.scaler.transform([new_data]))

        # Print the predicted value
        print(f"Predicted value: {predicted_value[0]:.4f}")

        return predicted_value[0]

    @staticmethod
    def calculate_percentage(value, max_value, min_value):
        if value < min_value or value > max_value:
            raise ValueError("Value must be within the specified range.")
        return (value - min_value) / (max_value - min_value) * 100

    def calculate_and_print_percentage(self, predicted_value):
        value = int(predicted_value)

        # Define the maximum and minimum values
        max_value = 42.00
        min_value = 36.00

        # Calculate and print the percentage
        percentage = self.calculate_percentage(value, max_value, min_value)
        print(f"Percentage of {value} is: {percentage:.2f}%")

    def save_model_as_pickle(self, filename):
        with open(filename, 'wb') as file:
            pickle.dump(self.regressor, file)
            print(f"Model saved as {filename}")


# Example usage:
# model = KNNRegressionModel("./Capstone(NEW).csv")
# model.train_model()
# model.evaluate_model()

# # Example of predicting new data
# new_data = [1, 22, 55, 61, 0.304, 0.525, 0.646, 0.0268, 0.373]
# predicted_value = model.predict_new_data(new_data)
# model.calculate_and_print_percentage(predicted_value)

# # Save the trained model as a pickle file
# model.save_model_as_pickle("knn_regression_model.pkl")
