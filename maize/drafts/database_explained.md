# Database Structure Explained

This document explains the database schema for the Maize Yield Management System backend. Each table, its fields, and their relationships are described in plain English, including how they help achieve the goals of the application.

---

## 1. users

**Purpose:** Stores login and authentication information for all users (farmers, admins, etc.).

| Field                  | Type        | Description                                    |
| ---------------------- | ----------- | ---------------------------------------------- |
| id                     | BIGINT (PK) | Unique user ID, auto-incremented.              |
| name                   | VARCHAR     | User's full name.                              |
| email                  | VARCHAR     | User's email address (unique, used for login). |
| email_verified_at      | TIMESTAMP   | When the email was verified.                   |
| password               | VARCHAR     | Hashed password for authentication.            |
| remember_token         | VARCHAR     | Token for 'remember me' sessions.              |
| created_at, updated_at | TIMESTAMP   | Timestamps for record creation and updates.    |

**How it helps:**

-   Central to authentication and authorization. Every person who logs in is a user.
-   Other roles (like Farmer) are linked to users for secure access.

---

## 2. farmers

**Purpose:** Stores detailed profiles for each farmer using the system.

| Field                  | Type         | Description                                                      |
| ---------------------- | ------------ | ---------------------------------------------------------------- |
| farmer_id              | UUID (PK)    | Unique identifier for each farmer.                               |
| user_id                | BIGINT (FK)  | Links to the users table (who can log in as this farmer).        |
| name                   | VARCHAR(100) | Farmer's full name.                                              |
| email                  | VARCHAR(150) | Farmer's contact email (may duplicate user email for reference). |
| phone                  | VARCHAR(20)  | Farmer's phone number.                                           |
| region                 | VARCHAR(100) | Administrative region or zone.                                   |
| registered_at          | TIMESTAMP    | When the farmer signed up.                                       |
| created_at, updated_at | TIMESTAMP    | Timestamps for record creation and updates.                      |

**How it helps:**

-   Represents the real-world farmer, storing their contact and location info.
-   Linked to a user for authentication, so only the right person can access their data.
-   Enables personalized recommendations and field management.

---

## 3. fields

**Purpose:** Represents individual maize plots owned by farmers.

| Field                  | Type         | Description                                     |
| ---------------------- | ------------ | ----------------------------------------------- |
| field_id               | UUID (PK)    | Unique identifier for each field/plot.          |
| farmer_id              | UUID (FK)    | Links to the farmer who owns this field.        |
| name                   | VARCHAR(100) | Name or code for the plot (e.g., "North Plot"). |
| area_ha                | DECIMAL(6,2) | Area of the field in hectares.                  |
| soil_type              | VARCHAR(50)  | Soil type (e.g., loam, clay, sandy).            |
| latitude               | DECIMAL(9,6) | GPS latitude coordinate.                        |
| longitude              | DECIMAL(9,6) | GPS longitude coordinate.                       |
| created_at, updated_at | TIMESTAMP    | Timestamps for record creation and updates.     |

**How it helps:**

-   Allows tracking of multiple plots per farmer.
-   Stores essential info for AI predictions and recommendations (area, soil, location).

---

## 4. sensors

**Purpose:** Catalogs IoT devices deployed on each field.

| Field                  | Type        | Description                                            |
| ---------------------- | ----------- | ------------------------------------------------------ |
| sensor_id              | UUID (PK)   | Unique identifier for each sensor.                     |
| field_id               | UUID (FK)   | Links to the field where the sensor is installed.      |
| sensor_type            | VARCHAR(50) | Type of sensor (soil_moisture, temperature, humidity). |
| installation_date      | DATE        | When the sensor was installed.                         |
| status                 | VARCHAR(20) | Sensor status (active, maintenance, retired).          |
| created_at, updated_at | TIMESTAMP   | Timestamps for record creation and updates.            |

**How it helps:**

-   Enables the system to track which sensors are in which fields.
-   Sensor type and status help with maintenance and data quality.

---

## 5. sensor_readings

**Purpose:** Stores time-series data from each IoT sensor.

| Field                  | Type         | Description                                       |
| ---------------------- | ------------ | ------------------------------------------------- |
| reading_id             | BIGSERIAL PK | Unique, auto-incremented ID for each reading.     |
| sensor_id              | UUID (FK)    | Links to the sensor that took the reading.        |
| timestamp              | TIMESTAMP    | When the reading was taken.                       |
| value                  | FLOAT        | The measured value (units depend on sensor type). |
| created_at, updated_at | TIMESTAMP    | Timestamps for record creation and updates.       |

**How it helps:**

-   Stores all sensor data for analysis, AI, and recommendations.
-   Timestamp and sensor_id allow for time-range queries and field-level aggregation.

---

## 6. yield_predictions

**Purpose:** Stores AI model outputs for each field and season.

| Field                  | Type         | Description                                      |
| ---------------------- | ------------ | ------------------------------------------------ |
| prediction_id          | BIGSERIAL PK | Unique, auto-incremented ID for each prediction. |
| field_id               | UUID (FK)    | Links to the field being predicted.              |
| model_version          | VARCHAR(50)  | Version of the AI model used.                    |
| prediction_date        | DATE         | Date when the prediction was generated.          |
| predicted_yield_t_ha   | DECIMAL(8,3) | Forecast yield in tonnes per hectare.            |
| created_at, updated_at | TIMESTAMP    | Timestamps for record creation and updates.      |

**How it helps:**

-   Allows tracking of yield forecasts over time and by model version.
-   Supports field-level decision making and historical analysis.

---

## 7. recommendations

**Purpose:** Stores data-driven advice for farmers based on sensor data and predictions.

| Field                  | Type         | Description                                           |
| ---------------------- | ------------ | ----------------------------------------------------- |
| rec_id                 | BIGSERIAL PK | Unique, auto-incremented ID for each recommendation.  |
| field_id               | UUID (FK)    | Links to the field the recommendation is for.         |
| recommendation_date    | DATE         | When the recommendation was issued.                   |
| recommendation_type    | VARCHAR(50)  | Type of advice (e.g., irrigation, fertilizer_timing). |
| message                | TEXT         | Human-readable guidance for the farmer.               |
| created_at, updated_at | TIMESTAMP    | Timestamps for record creation and updates.           |

**How it helps:**

-   Delivers actionable insights to farmers, improving outcomes.
-   Tied to fields for context and tracking.

---

## 8. historical_yields

**Purpose:** Archives past yields for model training and validation.

| Field                  | Type         | Description                                    |
| ---------------------- | ------------ | ---------------------------------------------- |
| hist_id                | BIGSERIAL PK | Unique, auto-incremented ID for each record.   |
| region_or_field        | VARCHAR(100) | Region name or field_id (for flexibility).     |
| year                   | INT          | Year of the yield record.                      |
| yield_t_ha             | DECIMAL(8,3) | Recorded yield in tonnes per hectare.          |
| source                 | VARCHAR(100) | Data origin (e.g., government report, survey). |
| created_at, updated_at | TIMESTAMP    | Timestamps for record creation and updates.    |

**How it helps:**

-   Provides historical data for AI model training and benchmarking.
-   Can be used for both regional and field-level analysis.

---

## Relationships Overview

-   **users** 1–1 **farmers**: Each user can have one farmer profile (for login and personalized access).
-   **farmers** 1–\* **fields**: Each farmer can own multiple fields.
-   **fields** 1–\* **sensors**: Each field can have multiple sensors.
-   **sensors** 1–\* **sensor_readings**: Each sensor can have many readings.
-   **fields** 1–\* **yield_predictions**: Each field can have multiple yield predictions.
-   **fields** 1–\* **recommendations**: Each field can have multiple recommendations.

## How This Structure Supports the App

-   **User authentication** is handled by the users table, with farmers linked for role-based access.
-   **Farmers** manage their own fields, sensors, and receive personalized recommendations.
-   **Fields** are the core unit for tracking crop data, predictions, and advice.
-   **Sensors and readings** enable real-time and historical monitoring of field conditions.
-   **Yield predictions** and **recommendations** leverage all this data to help farmers make better decisions.
-   **Historical yields** support AI model improvement and benchmarking.

This structure ensures data integrity, supports all app features, and is flexible for future growth.
