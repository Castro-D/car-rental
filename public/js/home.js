const $deleteButtons = document.querySelectorAll('#deleteButton');

$deleteButtons.forEach(($deleteButton) => {
  $deleteButton.addEventListener('click', () => {
    const result = confirm('Are you sure you want to delete?');
    if (result) {
      fetch(`/car/delete/${$deleteButton.dataset.id}`);
      alert('Deleted');
      window.location.reload();
    } else {
      alert('cancelled');
    }
  });
});
