document.addEventListener('DOMContentLoaded', () => {
    const ordersSection = document.getElementById('orders-section');
    const dashboardSection = document.getElementById('dashboard-section');
    const dashboardLink = document.getElementById('dashboard-link');
    const ordersLink = document.getElementById('orders-link');
  
    // Event listener for Dashboard link
    dashboardLink.addEventListener('click', (e) => {
      e.preventDefault();
  
      // Hide Orders section and show Dashboard section
      ordersSection.style.display = 'none';
      dashboardSection.style.display = 'block';
  
      // Simulate traffic statistics data
      simulateTrafficData();
      renderChart();
    });
  
    // Event listener for Orders link
    ordersLink.addEventListener('click', (e) => {
      e.preventDefault();
  
      // Show Orders section and hide Dashboard section
      ordersSection.style.display = 'block';
      dashboardSection.style.display = 'none';
    });
  
    // Function to simulate traffic statistics
    function simulateTrafficData() {
      const activeUsers = document.getElementById('active-users');
      const totalVisits = document.getElementById('total-visits');
      const pageViews = document.getElementById('page-views');
  
      activeUsers.textContent = Math.floor(Math.random() * 100 + 1); // Active users (1-100)
      totalVisits.textContent = Math.floor(Math.random() * 10000 + 5000); // Total visits (5000-15000)
      pageViews.textContent = Math.floor(Math.random() * 20000 + 10000); // Page views (10000-30000)
    }
  
    // Function to render traffic chart
    function renderChart() {
      const ctx = document.getElementById('traffic-chart').getContext('2d');
      const trafficChart = new Chart(ctx, {
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
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  });
  