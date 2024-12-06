document.addEventListener('DOMContentLoaded', () => {
  const articlesSection = document.getElementById('articles-section');
  const dashboardSection = document.getElementById('dashboard-section');
  const dashboardLink = document.getElementById('dashboard-link');
  const articlesLink = document.getElementById('articles-link');
  const customersLink = document.getElementById('customers-link');
  const logoutBtn = document.getElementById('logout-btn');
  const articlesTableBody = document.getElementById('articles-table-body');

  // Event listener for Dashboard link
  dashboardLink.addEventListener('click', (e) => {
    e.preventDefault();
    articlesSection.style.display = 'none';
    dashboardSection.style.display = 'block';

    simulateTrafficData();
    renderChart();
  });

  // Event listener for Articles link
  articlesLink.addEventListener('click', (e) => {
    e.preventDefault();
    articlesSection.style.display = 'block';
    dashboardSection.style.display = 'none';
  });

  // Event listener for Customers link
  customersLink.addEventListener('click', (e) => {
    e.preventDefault();
    alert("Customers section clicked! You can add functionality here.");
  });

  // Logout functionality
  logoutBtn.addEventListener('click', () => {
    window.location.href = '../login.html'; // Redirect to login.html
  });

  // Remove user data (row) on '×' button click
  articlesTableBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
      const row = e.target.closest('tr');
      row.remove();
    }
  });

  // Simulated traffic stats
  function simulateTrafficData() {
    const activeUsers = document.getElementById('active-users');
    const totalVisits = document.getElementById('total-visits');
    const pageViews = document.getElementById('page-views');

    activeUsers.textContent = Math.floor(Math.random() * 100 + 1);
    totalVisits.textContent = Math.floor(Math.random() * 10000 + 5000);
    pageViews.textContent = Math.floor(Math.random() * 20000 + 10000);
  }

  // Render chart
  function renderChart() {
    const ctx = document.getElementById('traffic-chart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [{
          label: 'Visits',
          data: [1200, 1500, 1800, 2000, 2500, 3000, 3200],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
});
