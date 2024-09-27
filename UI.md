#### **1\. Login Screen**

-   **Purpose:** Allow users (both Proposal Coordinators and Contributors) to log in via KPMG's SSO.
-   **Key Elements:**
    -   SSO login button (integrated with KPMG's SSO).
    -   Error message for failed logins.
    -   Basic brand design (KPMG logo).

#### **2\. Dashboard (Proposal Coordinator)**

-   **Purpose:** Main hub for Proposal Coordinators to create, manage, and track tasks for proposals.
-   **Key Elements:**
    -   **Create New Proposal Task** button.
    -   **List of Current Tasks:** Show ongoing tasks with filters (e.g., skillset, deadline).
    -   **Task Status View:** Real-time status updates (e.g., in-progress, completed).
    -   **Contributor Responses:** Show contributors who have applied, along with their profiles.
    -   **Quick Stats:** Snapshot of tasks accepted, pending, and overdue.

#### **3\. Dashboard (Proposal Contributor)**

-   **Purpose:** Main screen for Contributors to view and apply for available tasks.
-   **Key Elements:**
    -   **Task Feed:** List of available tasks, with filters for skillset, domain, and deadlines.
    -   **Search and Filter Bar:** Allow users to search for tasks based on skills or keyword.
    -   **Task Detail View:** Show specific task details, including the task description, requirements, and deadline.
    -   **Task Status Updates:** Show tasks that have been accepted, submitted, or pending approval.

#### **4\. Task Creation (Proposal Coordinator)**

-   **Purpose:** Create new proposal-related tasks with specific skills and deadlines.
-   **Key Elements:**
    -   **Task Title:** Input field for task name.
    -   **Task Description:** Text area for more detailed instructions.
    -   **Skills Required:** Dropdown or tags for specific skills (e.g., "Data Governance").
    -   **Domain Knowledge Required:** Similar dropdown/tag system for domain expertise.
    -   **Deadline Picker:** Date and time for task completion.
    -   **Broadcast Button:** To send notifications to all eligible Contributors.

#### **5\. Task Detail Screen (Proposal Coordinator)**

-   **Purpose:** Review details of an individual task, including responses from Contributors.
-   **Key Elements:**
    -   **Task Overview:** Details of the task (description, skills, deadline).
    -   **Contributors:** List of Contributors who accepted the task and their profile info.
    -   **Status Tracking:** Indicator of task progress (in-progress, completed).
    -   **Submit Feedback Button:** Provide feedback once the task is completed.

#### **6\. Task Detail Screen (Proposal Contributor)**

-   **Purpose:** Allow Contributors to view and accept tasks.
-   **Key Elements:**
    -   **Task Overview:** Task description, skills required, and deadline.
    -   **Accept Task Button:** To confirm participation.
    -   **Upload Section:** Upload work or deliverables for the task.
    -   **Progress Tracker:** A checklist or progress indicator to track how far along the task is (optional but useful for multi-step tasks).

#### **7\. Notifications Center**

-   **Purpose:** Provide in-app notifications for new tasks, updates, and task reassignments.
-   **Key Elements:**
    -   List of real-time notifications.
    -   Clear indicators for new vs. read notifications.
    -   Quick link to tasks or contributors related to the notification.

#### **8\. User Profile Screen (Contributors)**

-   **Purpose:** Allow Contributors to manage and update their skillsets and personal details.
-   **Key Elements:**
    -   **Skill Tags:** Editable tags for skills and expertise areas.
    -   **Task History:** List of previously completed tasks and any feedback.
    -   **Profile Info:** Basic user details like name, role, department.

#### **9\. Admin/Settings Screen**

-   **Purpose:** Manage global settings and permissions.
-   **Key Elements:**
    -   **User Management:** Assign roles to new users (Proposal Coordinator or Contributor).
    -   **Task Template Library:** Pre-defined task templates for frequently used tasks (optional).



### **UI Demo Walkthrough**

Let's visualize a **step-by-step demo** of how these screens will work together:

* * * * *

#### **Step 1: Login Screen**

-   Users land on a simple login screen with the KPMG logo and a large "Sign in with SSO" button.
-   After authentication, they are directed to their respective dashboards based on role (Coordinator/Contributor).

#### **Step 2: Proposal Coordinator Dashboard**

-   Upon logging in, the Coordinator sees a clean dashboard with a **"Create Task"** button prominently displayed.
-   Below, there's a list of current tasks with real-time status updates (e.g., accepted, completed) along with task deadlines and contributor responses.

#### **Step 3: Task Creation Flow**

-   The Coordinator clicks **"Create Task"** and is brought to a simple form where they enter the task title, description, skills required, and deadline.
-   Once filled out, clicking **"Broadcast"** sends the task notification to all eligible contributors.

#### **Step 4: Proposal Contributor Dashboard**

-   When Contributors log in, they immediately see a feed of available tasks.
-   Contributors can search tasks by skills or domain and click on a task for more details.
-   After reviewing a task, they click **"Accept Task"**, after which it appears in their "My Tasks" section.

#### **Step 5: Task Detail & Submission**

-   Contributors work on the task and use the **"Upload"** section to submit their deliverables.
-   Once submitted, Coordinators receive a notification and can review the task.

#### **Step 6: Notifications**

-   A bell icon in the top-right corner notifies users of task updates. Clicking on it opens a real-time list of notifications, showing new tasks, updates on accepted tasks, or task reassignment messages.


### **Color Palette:**

-   **Primary Colors (Blues)**: Use these for headers, navigation bars, CTAs (Call to Actions), and key UI elements to maintain brand identity.
    -   **KPMG Blue (#00338D)** should dominate primary branding areas, while the **Medium Blue (#005EB8)** and **Light Blue (#0091DA)** can be used for buttons, links, or highlights.
-   **Secondary Colors**: Apply secondary colors sparingly to highlight specific sections, such as status indicators, notifications, or visual accents.
    -   **Violet (#483698)** and **Purple (#470A68)** can work well for alerts, badges, or progress bars.
    -   **Green (#00A3A1)** could be ideal for success states, confirmation messages, or positive actions.