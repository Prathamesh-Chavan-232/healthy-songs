import numpy as np
import pandas

# Define ranges for each feature
age_range = (19, 41)
weight_range = (40, 95)
eeg_time_diff_range = (30, 90)
bpm_time_diff_range = (
    eeg_time_diff_range[0] + 30, eeg_time_diff_range[1] + 45)

# Define functions to generate random values for each feature


def generate_age():
    return np.random.randint(*age_range)


def generate_weight():
    return np.random.randint(*weight_range)


def generate_eeg_time_diff():
    return np.random.randint(*eeg_time_diff_range)


def generate_bpm_time_diff(eeg_time_diff, age):
    # Adjust bpm_time_diff based on the weight
    return eeg_time_diff + np.random.uniform(0, 15) + 0.1 * age + 0.2 * weight
    # return eeg_time_diff + np.random.randint(30, 46)


# Generate random genders
genders = np.random.choice(["Male", "Female"], size=15000)

# Generate data
data = []
for gender in genders:
    age = generate_age()
    weight = generate_weight()
    eeg_time_diff = generate_eeg_time_diff()
    bpm_time_diff = generate_bpm_time_diff(eeg_time_diff, age).__round__()

    data.append([gender, age, weight, bpm_time_diff, eeg_time_diff])

# Convert data to numpy array
data = np.array(data)
dataframe_array = pandas.DataFrame(data)
dataframe_array.to_csv('output.csv')

# Print data
# print(data)
