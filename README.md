Habit Tracker with Analytics

This Habit Tracker application helps users monitor and manage their daily habits while providing insights through streak tracking and predictive analysis.

Features:

	•	Add, update, delete habits: Users can easily manage their daily habits by adding, updating their status, and deleting them.
	•	Streak tracking: The app tracks the number of consecutive days a habit is completed, helping users stay motivated.
	•	Habit completion visualization: A calendar interface allows users to see which days they have completed their habits.
	•	Predictive analysis: Using historical habit data, the app provides optimal times for habit completion to increase consistency.

Technologies Used:

	•	Node.js: For building the server-side logic.
	•	Express.js: Web framework for building the REST API and serving the front-end.
	•	PostgreSQL: Database for storing habit data, using Sequelize as an ORM for easy data manipulation.
	•	Sequelize: ORM for working with the PostgreSQL database.
	•	FullCalendar: JavaScript library for displaying the calendar visualization.
	•	REST API: The app exposes API endpoints to create, update, delete, and retrieve habits. Additionally, it provides analytics and predictions via dedicated API routes.

APIs:

	•	Habit Management API:
	•	POST /api/habits - Add a new habit.
	•	GET /api/habits - Retrieve all habits.
	•	PUT /api/habits/:id/status - Update the status of a habit (completed, skipped, pending).
	•	DELETE /api/habits/:id - Delete a habit.
	•	Predictive Analysis API:
	•	GET /api/habits/prediction - Provides the best time to complete habits based on past completion times.

Future Enhancements:

	•	Improve predictive analysis algorithm using machine learning.
	•	Add notifications to remind users to complete their habits.
	•	Allow users to categorize habits and filter them based on various criteria.
