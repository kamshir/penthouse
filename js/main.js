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
  const flatList = document.querySelector('.flat-list');
  const modalImage = document.querySelector('.modal-image'); // Картинка в модальном окне
  const paths = modalImage.querySelectorAll('path');
  let counter = 2; // Текущий этаж

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

  // Рисуем квартиры
  function drawFlats() {
    $.getJSON("db.json", function(data) {
        flatList.innerHTML = '';
        for (let i = 0; i < data.length; i++) {
          const item = document.createElement('li');
          item.classList.add('flat-item');
          const link = document.createElement('a');
          link.href = '#';
          link.setAttribute("flatID", data[i].number);
          link.classList.add('flat-link');
          link.textContent = `кв. ${data[i].number + counter*10}, ${data[i].apartaments} комн. ${data[i].square} кв. м.`;
          item.appendChild(link);
          flatList.appendChild(item);
        }
    });
  }

  // Присваиваем id квартирам
  function setIDs() {
    const flats = modalImage.querySelectorAll('path');
    flats.forEach((el, i) => {
      el.setAttribute('flatid', flats.length - i);
    });
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

  // Скрываем квартиры
  function hideFlats() {
    modalImage.querySelectorAll('path').forEach(p => p.classList.add('flat-hidden'));
  }

  // Показать нужную квартиру
  function showFlat(id) {
    paths[paths.length - id].classList.remove('flat-hidden');
  }

  // Скрываем описание квартир
  function hideAparts() {
    flatList.querySelectorAll('.flat-link').forEach(el => el.classList.remove('apart-chose'));
  }

  // Показываем описание нужной квартиры
  function showApart(el) {
    el.classList.add('apart-chose');
  }

  hideFloors();
  hideFlats();
  hideAparts();
  drawFloor();
  showFloor();
  blockedArrows();
  drawFlats();

  arrowUp.addEventListener('click', e => {
    if (counter < floors.length+1 && !arrowUp.classList.contains('btn-disabled')) {
      counter++;
      arrowDown.classList.remove('btn-disabled');
      hideFloors();
      drawFloor();
      showFloor();
      blockedArrows();
      drawFlats();
      setIDs();
    }
  })

  arrowDown.addEventListener('click', e => {
    if (counter > 2 && !arrowDown.classList.contains('btn-disabled')) {
      counter--;
      arrowUp.classList.remove('btn-disabled'); // Отключает кнопку вверх
      hideFloors();
      drawFloor();
      showFloor();
      blockedArrows();
      drawFlats();
      setIDs();
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
          blockedArrows();
          drawFlats();
          setIDs();
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

  btnFloors.addEventListener('click', e => {
    drawFlats();
    setIDs();
    toggleModal();
  });

  modal.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.modal-close') || !target.closest('.modal-inner')){
      toggleModal();
    }
  });

  flatList.addEventListener('mouseover', e => {
    const target = e.target;
    if (target.closest('.flat-link')){
      hideFlats();
      showFlat(target.getAttribute('flatid'));
    }
  });

  flatList.addEventListener('mouseout', e => {
    const target = e.target;
    if (target.closest('.flat-link')){
      hideFlats();
    }
  });

  modalImage.addEventListener('mouseover', e => {
    const target = e.target;
    if (target.closest('path')){
      showFlat(target.getAttribute('flatid'))
      flatList.querySelectorAll('.flat-link').forEach(el => {
        if (el.getAttribute('flatid') == target.getAttribute('flatid')){
          hideAparts();
          showApart(el);
        }
      })
    }
  });

  modalImage.addEventListener('mouseout', e => {
    const target = e.target;
    if (target.closest('path')){
      hideFlats();
      hideAparts();
    }
  });

}