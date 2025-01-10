# Expense Tracker Application

The Expense Tracker Application is a user-friendly web application designed to help users manage their budgets and track expenses effectively. With features like category-specific budgets, expense tracking, data visualization, and a responsive design, users can gain insights into their financial activities. The app also provides light and dark modes for an enhanced user experience.

## Live Demo
[Expense Tracker Application](https://expense-tracker-ecru-six.vercel.app)

## Backend Repository
[Backend Code](https://github.com/ragibBarket317/expense-tracker-backend)

---

## Core Functionalities

1. **Landing Page**
   - A welcoming page featuring a "Get Started" button.
   - Redirects to the dashboard and opens a modal for creating a new budget.

2. **Dashboard Overview**
   - Displays total budgets, expenses, and the number of budgets.
   - Visualizes category budget limits using a bar chart.
   - Highlights the latest expenses for quick reference.

3. **Budget Management**
   - Create, edit, and delete budgets for specific categories.
   - Budgets are listed and summarized on the dashboard.

4. **Expense Tracking**
   - Log expenses under a selected budget category with details like purpose, amount, and date.
   - Edit or delete expenses individually.
   - View expenses for a specific category in a tabular format.

5. **Expense Summary**
   - Monthly expense summary with tooltips on category hover.

6. **Light and Dark Mode**
   - Toggle between light and dark themes for better accessibility.

7. **Responsive Design**
   - Fully responsive for desktops, tablets, and mobile devices.

8. **Notifications**
   - Success and error messages using `react-hot-toast`.

9. **Loading States**
   - Loading spinner during API requests for enhanced UX.

10. **Global State Management**
    - Redux is used for efficient budget and expense management and for theme switching.

11. **Data Deletion**
    - Delete all expenses under a specific category along with the budget.

---

## How to Use the Application

1. **Getting Started**
   - Open the app and click the "Get Started" button.
   - Create your first budget using the prompted model.

2. **Creating a Budget**
   - Enter a category name and budget amount in the modal.
   - Save the budget by clicking "Create Budget."

3. **Adding Expenses**
   - Select a budget category from the list or dashboard.
   - Log an expense by providing purpose, amount, and date.

4. **Editing Budgets or Expenses**
   - Edit details using the "Edit" icon next to a budget or expense.

5. **Deleting Data**
   - Delete individual expenses or entire budgets using delete buttons.

6. **Viewing Insights**
   - Explore the dashboard for budget summaries, expense details, and visual charts.

7. **Switching Themes**
   - Use the theme switcher to toggle between light and dark modes.

---

## Technologies Used

### Frontend
- React.js
- Next.js (for server-side rendering and routing)
- Redux Toolkit (for state management)
- CSS Modules (for styling)
- Recharts (for data visualization)

### Backend
- Node.js
- Express.js
- MongoDB (database)
- Mongoose (ODM)

### Others
- Axios (for API requests)
- React Hot Toast (for notifications)

---

## Backend API Routes

### Budgets (Limits)
- `GET /api/limits`: Fetch all budgets.
- `POST /api/limits`: Create a new budget.
- `PUT /api/limits/:id`: Update a specific budget.
- `DELETE /api/limits/:id`: Delete a specific budget.

### Expenses
- `GET /api/expenses`: Fetch all expenses.
- `POST /api/expenses`: Add a new expense.
- `PUT /api/expenses/:id`: Update a specific expense.
- `DELETE /api/expenses/:id`: Delete a specific expense.

### Categories (Combined Deletion)
- `DELETE /api/categories/:id`: Delete all expenses and the budget for a specific category.
