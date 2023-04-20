document.addEventListener('DOMContentLoaded', function() {
  function updateCurrentDateTime() {
    var now = new Date();
    var formattedDateTime = now.toLocaleString();
    document.getElementById('currentDateTime').textContent = formattedDateTime;
  }
  updateCurrentDateTime();
  setInterval(updateCurrentDateTime, 1000);

  const currentHour = new Date().getHours();

  const timeBlocks = document.getElementsByClassName('time-block');

  for (let i = 0; i < timeBlocks.length; i++) {
    const timeBlock = timeBlocks[i];
    const hour = parseInt(timeBlock.id.split('-')[1]);
    const textarea = timeBlock.querySelector('.description');

    if (hour < currentHour) {
      timeBlock.classList.add('past');
      timeBlock.classList.remove('present', 'future');
    } else if (hour === currentHour) {
      timeBlock.classList.add('present');
      timeBlock.classList.remove('past', 'future');
    } else {
      timeBlock.classList.add('future');
      timeBlock.classList.remove('past', 'present');
    }
  }
  
  $('.saveBtn').on('click', function() {
    const hour = $(this).parent().attr('id');
    const description = $(this).siblings('.description').val();
    localStorage.setItem(hour, description);
  });

  for (let i = 0; i < timeBlocks.length; i++) {
    const timeBlock = timeBlocks[i];
    const hour = timeBlock.id;
    const description = localStorage.getItem(hour);

    if (description) {
      timeBlock.querySelector('.description').value = description;
    }
  }

  $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));
});

