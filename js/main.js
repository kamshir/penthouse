document.body.onload = () => {
  // Code (No jQuery)
  const arrowUp = document.querySelector('.counter-arrow-up');
  const arrowDown = document.querySelector('.counter-arrow-down');
  const floor = document.querySelector('.counter'); // Счетчик этажей
  const floors = document.querySelector('.home-image').querySelectorAll('path'); // Все этажи на картинке
  const homeImage = document.querySelector('.home-image'); // Картинка
  let counter = 2; // Текущий этаж

  // Отображает выбранный этаж в счетчике
  function drawFloor(count = counter) {
    let draw = '';
    if (count < 10) {
      draw = '0' + count;
    } else if (count >= 10) {
      draw = count;
    }
    floor.textContent = draw;
    console.log(counter);
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

  hideFloors();
  drawFloor();
  showFloor();

  arrowUp.addEventListener('click', e => {
    if (counter < floors.length+1 && !arrowUp.classList.contains('btn-disabled')) {
      counter++;
      arrowDown.classList.remove('btn-disabled');
      hideFloors();
      drawFloor();
      showFloor();
    }
    if (counter === floors.length+1) {
      arrowUp.classList.add('btn-disabled');
    }
  })

  arrowDown.addEventListener('click', e => {
    if (counter > 2 && !arrowDown.classList.contains('btn-disabled')) {
      counter--;
      arrowUp.classList.remove('btn-disabled'); // Отключает кнопку вверх
      hideFloors();
      drawFloor();
      showFloor();
    }
    // Блокирует кнопку вниз
    if (counter == 2) {
      arrowDown.classList.add('btn-disabled');
    }
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
          if (counter === floors.length+1) {
            arrowUp.classList.add('btn-disabled');
          } else if (counter == 2) {
            arrowDown.classList.add('btn-disabled');
          }
        }
      })
    }
  })

}