document.getElementById('applicationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Форма отправлена!');
    this.reset();
});