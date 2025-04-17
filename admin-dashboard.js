document.addEventListener("DOMContentLoaded", function () {
  // Sample data
  const users = [
    {
      id: 1,
      name: "أحمد محمد",
      email: "ahmed@example.com",
      role: "طالب",
      status: "نشط",
    },
    {
      id: 2,
      name: "سارة علي",
      email: "sara@example.com",
      role: "مدرب",
      status: "نشط",
    },
    {
      id: 3,
      name: "محمد خالد",
      email: "mohamed@example.com",
      role: "طالب",
      status: "غير نشط",
    },
    {
      id: 4,
      name: "فاطمة أحمد",
      email: "fatima@example.com",
      role: "مدرب",
      status: "نشط",
    },
    {
      id: 5,
      name: "عمر حسن",
      email: "omar@example.com",
      role: "طالب",
      status: "نشط",
    },
  ];

  const courses = [
    {
      id: 1,
      title: "أساسيات البرمجة بلغة جافا",
      instructor: "سارة علي",
      students: 45,
      status: "معتمد",
    },
    {
      id: 2,
      title: "تطوير تطبيقات الويب",
      instructor: "فاطمة أحمد",
      students: 32,
      status: "قيد المراجعة",
    },
    {
      id: 3,
      title: "الذكاء الاصطناعي للمبتدئين",
      instructor: "سارة علي",
      students: 28,
      status: "معتمد",
    },
    {
      id: 4,
      title: "تصميم واجهات المستخدم",
      instructor: "محمد خالد",
      students: 15,
      status: "قيد المراجعة",
    },
    {
      id: 5,
      title: "قواعد البيانات المتقدمة",
      instructor: "فاطمة أحمد",
      students: 22,
      status: "معتمد",
    },
  ];

  // Populate users table
  const usersTableBody = document.getElementById("usersTableBody");
  users.forEach((user) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.role}</td>
          <td><span class="status-badge ${
            user.status === "نشط" ? "status-active" : "status-inactive"
          }">${user.status}</span></td>
          <td>
              <div class="action-buttons">
                  <button class="action-btn view-btn" data-id="${
                    user.id
                  }"><i class="fas fa-eye"></i></button>
                  <button class="action-btn edit-btn" data-id="${
                    user.id
                  }"><i class="fas fa-edit"></i></button>
                  <button class="action-btn delete-btn" data-id="${
                    user.id
                  }"><i class="fas fa-trash"></i></button>
              </div>
          </td>
      `;
    usersTableBody.appendChild(row);
  });

  // Populate courses table
  const coursesTableBody = document.getElementById("coursesTableBody");
  courses.forEach((course) => {
    const row = document.createElement("tr");
    let statusClass = "";
    if (course.status === "معتمد") statusClass = "status-approved";
    else if (course.status === "قيد المراجعة") statusClass = "status-pending";
    else if (course.status === "مرفوض") statusClass = "status-rejected";

    row.innerHTML = `
          <td>${course.title}</td>
          <td>${course.instructor}</td>
          <td>${course.students}</td>
          <td><span class="status-badge ${statusClass}">${
      course.status
    }</span></td>
          <td>
              <div class="action-buttons">
                  <button class="action-btn view-btn" data-id="${
                    course.id
                  }"><i class="fas fa-eye"></i></button>
                  ${
                    course.status === "قيد المراجعة"
                      ? `
                      <button class="action-btn approve-btn" data-id="${course.id}"><i class="fas fa-check"></i></button>
                      <button class="action-btn reject-btn" data-id="${course.id}"><i class="fas fa-times"></i></button>
                  `
                      : `
                      <button class="action-btn edit-btn" data-id="${course.id}"><i class="fas fa-edit"></i></button>
                  `
                  }
              </div>
          </td>
      `;
    coursesTableBody.appendChild(row);
  });

  // Initialize charts
  initializeCharts();

  // Modal functionality
  const addUserModal = document.getElementById("addUserModal");
  const addUserBtn = document.getElementById("addUserBtn");
  const closeModal = document.querySelector(".close-modal");
  const cancelBtn = document.querySelector(".cancel-btn");
  const addUserForm = document.getElementById("addUserForm");

  addUserBtn.addEventListener("click", () => {
    addUserModal.style.display = "flex";
  });

  closeModal.addEventListener("click", () => {
    addUserModal.style.display = "none";
  });

  cancelBtn.addEventListener("click", () => {
    addUserModal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === addUserModal) {
      addUserModal.style.display = "none";
    }
  });

  addUserForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("userName").value;
    const email = document.getElementById("userEmail").value;
    const password = document.getElementById("userPassword").value;
    const role = document.getElementById("userRole").value;

    // Here you would typically send this data to your API
    console.log("Adding new user:", { name, email, password, role });

    // For demo purposes, add to the table
    const newUser = {
      id: users.length + 1,
      name,
      email,
      role:
        role === "student" ? "طالب" : role === "instructor" ? "مدرب" : "مشرف",
      status: "نشط",
    };

    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${newUser.name}</td>
          <td>${newUser.email}</td>
          <td>${newUser.role}</td>
          <td><span class="status-badge status-active">${newUser.status}</span></td>
          <td>
              <div class="action-buttons">
                  <button class="action-btn view-btn" data-id="${newUser.id}"><i class="fas fa-eye"></i></button>
                  <button class="action-btn edit-btn" data-id="${newUser.id}"><i class="fas fa-edit"></i></button>
                  <button class="action-btn delete-btn" data-id="${newUser.id}"><i class="fas fa-trash"></i></button>
              </div>
          </td>
      `;
    usersTableBody.appendChild(row);

    // Reset form and close modal
    addUserForm.reset();
    addUserModal.style.display = "none";
  });

  // Course status filter
  const courseStatusFilter = document.getElementById("courseStatusFilter");
  courseStatusFilter.addEventListener("change", () => {
    const selectedStatus = courseStatusFilter.value;
    const rows = coursesTableBody.querySelectorAll("tr");

    rows.forEach((row) => {
      const statusCell = row.querySelector("td:nth-child(4)");
      const status = statusCell.textContent.trim();

      if (
        selectedStatus === "all" ||
        status === getArabicStatus(selectedStatus)
      ) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  });

  function getArabicStatus(status) {
    switch (status) {
      case "approved":
        return "معتمد";
      case "pending":
        return "قيد المراجعة";
      case "rejected":
        return "مرفوض";
      default:
        return "";
    }
  }

  // Initialize action buttons
  initializeActionButtons();
});

function initializeCharts() {
  // User Analytics Chart
  const userCtx = document
    .getElementById("userAnalyticsChart")
    .getContext("2d");
  const userChart = new Chart(userCtx, {
    type: "line",
    data: {
      labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو"],
      datasets: [
        {
          label: "عدد المستخدمين الجدد",
          data: [30, 45, 60, 70, 85, 100],
          backgroundColor: "rgba(23, 0, 255, 0.1)",
          borderColor: "#1700FF",
          borderWidth: 2,
          tension: 0.4,
          pointBackgroundColor: "#1700FF",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
          pointRadius: 5,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: "rgba(0, 0, 0, 0.05)",
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    },
  });

  // Course Analytics Chart
  const courseCtx = document
    .getElementById("courseAnalyticsChart")
    .getContext("2d");
  const courseChart = new Chart(courseCtx, {
    type: "doughnut",
    data: {
      labels: ["البرمجة", "التصميم", "التسويق", "اللغات", "الأعمال"],
      datasets: [
        {
          data: [40, 25, 15, 10, 10],
          backgroundColor: [
            "#1700FF",
            "#00C49F",
            "#FFBB28",
            "#FF8042",
            "#0088FE",
          ],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            padding: 20,
            font: {
              family: "Tajawal",
            },
          },
        },
      },
      cutout: "70%",
    },
  });
}

function initializeActionButtons() {
  // View User
  document.querySelectorAll(".view-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      alert(`عرض بيانات المستخدم/الدورة رقم ${id}`);
      // Here you would typically fetch user details and show them
    });
  });

  // Edit User
  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      alert(`تعديل بيانات المستخدم/الدورة رقم ${id}`);
      // Here you would typically open a modal with user data for editing
    });
  });

  // Delete User
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      if (confirm(`هل أنت متأكد من حذف المستخدم/الدورة رقم ${id}؟`)) {
        // Here you would typically send a delete request to your API
        this.closest("tr").remove();
      }
    });
  });

  // Approve Course
  document.querySelectorAll(".approve-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      if (confirm(`هل تريد اعتماد الدورة رقم ${id}؟`)) {
        // Here you would typically send an approval request to your API
        const statusBadge = this.closest("tr").querySelector(".status-badge");
        statusBadge.textContent = "معتمد";
        statusBadge.className = "status-badge status-approved";

        // Update action buttons
        const actionButtons = this.closest(".action-buttons");
        actionButtons.innerHTML = `
                  <button class="action-btn view-btn" data-id="${id}"><i class="fas fa-eye"></i></button>
                  <button class="action-btn edit-btn" data-id="${id}"><i class="fas fa-edit"></i></button>
              `;

        // Reinitialize action buttons
        initializeActionButtons();
      }
    });
  });

  // Reject Course
  document.querySelectorAll(".reject-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      const reason = prompt(`أدخل سبب رفض الدورة رقم ${id}:`);

      if (reason) {
        // Here you would typically send a rejection request to your API
        const statusBadge = this.closest("tr").querySelector(".status-badge");
        statusBadge.textContent = "مرفوض";
        statusBadge.className = "status-badge status-rejected";

        // Update action buttons
        const actionButtons = this.closest(".action-buttons");
        actionButtons.innerHTML = `
                  <button class="action-btn view-btn" data-id="${id}"><i class="fas fa-eye"></i></button>
                  <button class="action-btn edit-btn" data-id="${id}"><i class="fas fa-edit"></i></button>
              `;

        // Reinitialize action buttons
        initializeActionButtons();
      }
    });
  });
}
