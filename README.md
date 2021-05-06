# The Invisible Centaur

## Общая информация
Данный проект является переработкой и доработкой шаблоннго решения, предоставленного организаторми хакатона "Игры разумов".

## Визуальные изменения
В целях улучшения пользовательского опыта была изменена цветовая схема - желтый с оранжевым были заменены на бирюзовый. Для этого были переписаны 2 библиотеки, отвечающие за отрисовку игровой доски. 

* [react-goban](https://github.com/SSH-KK/react-goban)
* [svgoban](https://github.com/SSH-KK/svgoban)

Также был доработан интерфейс для взаимодействия с новыми и уже существующими функциями

![main_1](https://github.com/SSH-KK/goHackathon/blob/media/main_1.png?raw=true)

![main_2](https://github.com/SSH-KK/goHackathon/blob/media/main_2.png?raw=true)

## Функции и Подсказки

### Probability map
---
Во время игры бывает нужно проверить, на какие территории в большей степени претендует игрок. При нажатии на кнопку "T" в верхнем левом меню на поле отображаются квадраты соответствующего игроку цвета. Размер отображает вероятность того, что эта территория отойдет именно этому игроку.

![probability_map_1](https://github.com/SSH-KK/goHackathon/blob/media/probability_map_1.png?raw=true)

### Game progressbar
---
Прогресс Бар это еще один элемент интерфейса, который помогает оценить обстановку на поле. Он в процентном соотношении показывает какой игрок захватил больше территорий. Рядом с ним отображается количество камней на доске каждого цвета.

![progressbar_1](https://github.com/SSH-KK/goHackathon/blob/media/progressbar_1.png?raw=true)

### Akami helper
---
Бывает, что, отвлекаясь на другую часть поля, игрок забывает о том, что у одной из его групп камней осталось всего одно дыхание. Чтобы не забыть об аками, по нажатию на кнопку "D" активируется подсветка таких групп. А если своим ходом игрок не исправляет ситуацию, то игра выведет диалоговое окно для подтверждения его решения, но только если ход был совершен недалеко от аками.

![akami_helper_1](https://github.com/SSH-KK/goHackathon/blob/media/akami_helper_1.png?raw=true)

![akami_helper_2](https://github.com/SSH-KK/goHackathon/blob/media/akami_helper_2.png?raw=true)

### Leela integration
---
Однако, настоящую мощь предоставляет интеграция с Leela-Zero, которая может подсказать игроку выход из сложной ситуации. Конкретно, она может помочь с выбором лучшего хода, построить тепловую карту поля. А в сложных ситуациях сама предложит ход.

![leela_integration_1](https://github.com/SSH-KK/goHackathon/blob/media/leela_integration_1.png?raw=true)

![leela_integration_2](https://github.com/SSH-KK/goHackathon/blob/media/leela_integration_2.png?raw=true)

![leela_integration_3](https://github.com/SSH-KK/goHackathon/blob/media/leela_integration_3.png?raw=true)

![leela_integration_4](https://github.com/SSH-KK/goHackathon/blob/media/leela_integration_4.png?raw=true)

![leela_integration_5](https://github.com/SSH-KK/goHackathon/blob/media/leela_integration_5.png?raw=true)

### Should pass
---
Ещё более впечатляющих результатов можно добиться объединив Лиилу и библиотеку deadstones. Так была создана подсказка "стоит ли пасовать". Она помогает оценить насколько большими будут потери территорий если спасовать сейчас.

![pass_helper_1](https://github.com/SSH-KK/goHackathon/blob/media/pass_helper_1.png?raw=true)