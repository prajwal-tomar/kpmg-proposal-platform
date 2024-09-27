**Project Proposal Coordination Platform**
==========================================

### **TL;DR:**

A web-based platform that enables KPMG's Proposal Coordinators to efficiently delegate proposal-building tasks to a broad pool of eligible employees (Proposal Contributors). The tool aims to democratize the opportunity distribution process, avoid task bottlenecks, and ensure diverse involvement by automating task assignment and communication.

### **Problem Statement:**

Preparing project proposals for prospective clients is a high-frequency, time-sensitive task at KPMG, with timelines ranging from a few days to a week. Currently, forming a team, assigning tasks, and coordinating efforts for these proposals is manual and inconsistent, leading to a concentration of these opportunities among a few employees. The proposed web-based application will democratize the process, allowing for broader participation by streamlining task assignment, broadcasting, and tracking responses.

### **Goals:**

#### **Business Goals:**

-   **Increase proposal creation efficiency:** Reduce the time and effort required to coordinate tasks and form teams.
-   **Broaden team participation:** Ensure a more equitable distribution of opportunities for employees to contribute to proposals.
-   **Enhance proposal quality:** Leverage a wider pool of talent with diverse skills, knowledge, and experience.
-   **Improve tracking:** Enable better visibility for Proposal Coordinators into task fulfillment progress and contributor responses.

#### **User Goals:**

-   **Proposal Coordinators** will be able to quickly broadcast tasks based on required skills, domain knowledge, and deadlines to a broader pool of Proposal Contributors.
-   **Proposal Contributors** will have better visibility into available tasks and can opt in based on their skills, interest, and capacity.
-   **Both users** will benefit from reduced manual overhead, a simplified UI, and automated notifications.

#### **Non-Goals:**

-   Email notifications will not be included.
-   The tool is not designed to handle external client-facing interactions or proposal submission; it is strictly for internal task coordination.

### **User Stories:**

#### 1\. **Proposal Coordinator User Story:**

-   As a Proposal Coordinator, I want to post detailed proposal-building tasks (e.g., research, case studies, design) that specify required skills, so I can broadcast these opportunities to a wide range of contributors and receive quality responses quickly.

#### 2\. **Proposal Contributor User Story:**

-   As a Proposal Contributor, I want to view all available tasks in real-time, filter them by skillset or domain, and select tasks I have time and expertise for, so I can contribute to more proposals and showcase my skills.

### **Key Features:**

#### **For Proposal Coordinator:**

-   **Task Creation:** Define proposal tasks with specific skill requirements, domain expertise, and deadlines. For example, "Research open-source Data Governance tools," or "Design the look and feel of a Data Governance slide."
-   **Broadcast Tasks:** Instantly send task broadcasts to all eligible Proposal Contributors.
-   **View Responses:** Monitor who accepts tasks, their skills, and task status (in-progress, completed).

#### **For Proposal Contributor:**

-   **Task Dashboard:** View available tasks in real-time, sorted by skillset, domain, and deadline.
-   **Task Acceptance:** Opt into tasks based on interest, skills, and availability.
-   **Task Submission:** Upload completed work directly through the app.

#### **Other Functionalities:**

-   **In-App Notifications:** Real-time updates for task assignments and progress. Notifications might include when a task is available or when a Proposal Coordinator updates the task.
-   **Search and Filter Tasks:** Contributors can search or filter tasks based on their skill set, domain, or availability.
-   **Collaboration Tools:** Allow Proposal Contributors to collaborate with others on a task when necessary.
-   **Task Reassignment:** If a task is not completed on time, it can be reassigned to another Contributor.

### **Additional Features to Consider:**

-   **Skill Profile:** Contributors could have profiles listing their key skills and areas of expertise, making it easier for Coordinators to match tasks to the right person.
-   **Task Feedback:** Allow Proposal Coordinators to leave feedback on the quality of work for each task submitted. This could be a simple rating system or a brief comment.
-   **Task History and Analytics:** A dashboard for Proposal Coordinators showing task completion rates, average time to accept a task, and task quality metrics. This would help fine-tune task creation.
-   **Proposal Archive:** A searchable archive of completed proposals, with anonymized data that can be referenced for future proposals. This would reduce redundant work.
-   **Leaderboard/Recognition:** Create a gamified system to reward contributors for participation, potentially offering small incentives for high engagement.

### **User Experience Flow:**

1.  **Proposal Coordinator:**

    -   Logs in and navigates to the "Create Proposal Task" section.
    -   Inputs task details, skills needed, and the deadline.
    -   Clicks "Broadcast" to send it out to all Contributors.
    -   Tracks responses and selects the best-suited candidates.
    -   Reviews submitted work within the platform and marks tasks as "completed."
    
2.  **Proposal Contributor:**

    -   Logs in and views the "Available Tasks" dashboard.
    -   Filters tasks based on their skills and interests.
    -   Selects a task and confirms acceptance.
    -   Completes the task and uploads deliverables before the deadline.
    -   Optionally receives feedback on the task from the Coordinator.

### **Success Metrics:**

-   **Task Distribution:** Increase in the number of distinct contributors participating in proposal development by 30% within the first quarter.
-   **Task Acceptance Time:** Reduction in average time from task broadcast to acceptance by 50%.
-   **Proposal Quality Ratings:** An increase in proposal quality as measured by internal reviews or client feedback (specific metrics to be defined).
-   **Contributor Satisfaction:** Track satisfaction ratings from Proposal Contributors on ease of use, fair distribution of tasks, and engagement.

### **Technical Considerations:**

-   **Authentication & Roles:** Use KPMG's SSO for employee authentication. Ensure appropriate role-based access (Coordinators vs. Contributors).
-   **Task Management Backend:** Implement a task management system with real-time updates and notifications.
-   **Scalability:** Ensure the app can scale to handle hundreds of concurrent users posting and accepting tasks during peak proposal seasons.
-   **Security:** Proposals and tasks must remain confidential, so ensure encrypted storage and data transmission.

### **Milestones & Sequencing:**

1.  **Week 1-2:** Requirements Gathering and Design.
2.  **Week 3-5:** Backend Development (Task Management System, Role-based Access).
3.  **Week 6-8:** Frontend Development (Proposal Coordinator and Contributor UI, Notification System).
4.  **Week 9-11:** User Testing and QA.
5.  **Week 12:** Launch MVP.