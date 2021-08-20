document.body.onload = () => {
  // Code (No jQuery)
  const arrowUp = document.querySelector('.counter-arrow-up');
  const arrowDown = document.querySelector('.counter-arrow-down');
  const floor = document.querySelector('.counter'); // Счетчик этажей
  const floors = document.querySelector('.home-image').querySelectorAll('path'); // Все этажи на картинке
  const homeImage = document.querySelector('.home-image'); // Картинка
  const btnFloors = document.querySelector('.button-primary'); // Смотреть квартиры
  const modal = document.querySelector('.modal');
  const modalCounter = document.querySelector('.modal-counter');
  let counter = 1123123; // Текущий этаж

  // Отображает выбранный этаж в счетчике
  function drawFloor(count = counter) {
    let draw = '';
    if (count < 10 && count > 1) {
      draw = '0' + count;
    } else if (count >= 10 && count < 19) {
      draw = count;
    } else {
      counter = 2;
      draw = '0' + counter;
    }
    floor.textContent = draw;
    modalCounter.textContent = draw;
  }

  // Скрывает все этажи на картинке
  function hideFloors() {
    floors.forEach(f => {
      f.classList.add('path-hide');
    })
  }

  // Показывает этаж на фотографии
  function showFloor() {
    floors[counter-2].classList.remove('path-hide');
  }

  //  Блокировка кнопок
  function blockedArrows() {
    if (counter === floors.length+1) {
      arrowUp.classList.add('btn-disabled');
    } else if (counter == 2) {
      arrowDown.classList.add('btn-disabled');
    }
  }

  // Открываем|Закрываем окно
  function toggleModal() {
    modal.classList.toggle('modal-hidden');
  }

  hideFloors();
  drawFloor();
  showFloor();
  blockedArrows();

  arrowUp.addEventListener('click', e => {
    if (counter < floors.length+1 && !arrowUp.classList.contains('btn-disabled')) {
      counter++;
      arrowDown.classList.remove('btn-disabled');
      hideFloors();
      drawFloor();
      showFloor();
    }
    blockedArrows();
  })

  arrowDown.addEventListener('click', e => {
    if (counter > 2 && !arrowDown.classList.contains('btn-disabled')) {
      counter--;
      arrowUp.classList.remove('btn-disabled'); // Отключает кнопку вверх
      hideFloors();
      drawFloor();
      showFloor();
    }
    blockedArrows();
  })

  // Меняем этаж при наведении
  homeImage.addEventListener('mouseover', e => {
    const floor = e.target;
    if (floor.closest('path')){
      arrowDown.classList.remove('btn-disabled'); // Делаем активными кнопки при наведении, кроме крайних
      arrowUp.classList.remove('btn-disabled'); //  Делаем активными кнопки при наведении, кроме крайних
      let count = 0;
      floors.forEach(f => {
        count++;
        if (f == floor){
          counter = count+1;
          hideFloors();
          drawFloor();
          showFloor();
          blockedArrows();
        }
      })
    }
  })

  // Открываем этаж при клике
  homeImage.addEventListener('click', e => {
    const floor = e.target;
    if (floor.closest('path')){
      toggleModal()
    }
  })

  btnFloors.addEventListener('click', toggleModal);

  modal.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.modal-close') || !target.closest('.modal-inner')){
      toggleModal();
    }
  });

}