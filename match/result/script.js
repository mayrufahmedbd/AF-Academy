    function showTab(tab, e) {
      document.querySelectorAll('.tab-content').forEach(el => {
        el.classList.remove('active');
      });
      document.querySelectorAll('.tab-btn').forEach(el => {
        el.classList.remove('active');
      });
      document.getElementById(tab).classList.add('active');
      e.target.classList.add('active');
    }