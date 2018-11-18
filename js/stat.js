'use strict';

window.renderStatistics = function (ctx, names, times) {
  // Константы
  var WIDTH_FIELD = 420;
  var HEIGHT_FIELD = 270;
  var START_X = 100;
  var START_Y = 10;
  var RADIUS = 20;
  var BAR_WIDTH = 40;
  var HISTOGRAM_HEIGHT = 150;
  var COLUMN_WIDTH = 45;
  var COLUMN_MARGIN = 55;
  var LINE_HEIGHT = 20;
  // Переменные
  // Объект Поле
  var fieldFront = {
    x1: START_X,
    y1: START_Y,
    x2: START_X + WIDTH_FIELD,
    y2: START_Y + HEIGHT_FIELD,
    radius: RADIUS
  };
  // Объект Тень поля
  var fieldShadow = {};
  // Объект Столбик гистограммы
  var histogram = {
    height: HISTOGRAM_HEIGHT,
    step: function () {
      return HISTOGRAM_HEIGHT / Math.max.apply(null, times);
    },
    barWidth: BAR_WIDTH,
    indent: COLUMN_WIDTH + COLUMN_MARGIN,
    initialX: START_X + 40,
    initialY: function () {
      return HISTOGRAM_HEIGHT + 80;
    },
    lineHeight: LINE_HEIGHT
  };

  // Функции
  // Создание объекта тени
  var fieldShadowValue = function (fieldObject, valueOffsetX, valueOffsetY) {
    fieldShadow.x1 = fieldObject.x1 + valueOffsetX;
    fieldShadow.y1 = fieldObject.y1 + valueOffsetY;
    fieldShadow.x2 = fieldObject.x2 + valueOffsetX;
    fieldShadow.y2 = fieldObject.y2 + valueOffsetY;
    fieldShadow.radius = fieldObject.radius;
  };
  // Рисуем объект поля или тени
  var fieldDrow = function (field, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(field.x1, field.y1 + field.radius);
    ctx.quadraticCurveTo(field.x1, field.y1, field.x1 + field.radius, field.y1);
    ctx.bezierCurveTo(field.x1 + field.radius, field.y1 + field.radius, field.x2 - field.radius, field.y1 + field.radius, field.x2 - field.radius, field.y1);
    ctx.quadraticCurveTo(field.x2, field.y1, field.x2, field.y1 + field.radius);
    ctx.bezierCurveTo(field.x2 - field.radius, field.y1 + field.radius, field.x2 - field.radius, field.y2 - field.radius, field.x2, field.y2 - field.radius);
    ctx.quadraticCurveTo(field.x2, field.y2, field.x2 - field.radius, field.y2);
    ctx.bezierCurveTo(field.x2 - field.radius, field.y2 - field.radius, field.x1 + field.radius, field.y2 - field.radius, field.x1 + field.radius, field.y2);
    ctx.quadraticCurveTo(field.x1, field.y2, field.x1, field.y2 - field.radius);
    ctx.bezierCurveTo(field.x1 + field.radius, field.y2 - field.radius, field.x1 + field.radius, field.y1 + field.radius, field.x1, field.y1 + field.radius);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  };
  // Получение случайного значения
  var getRandomValue = function (minValue, maxValue) {
    return Math.random() * (maxValue - minValue) + minValue;
  };
  // Рисуем столбик гистограммы и подпись под ней
  var histogramDrow = function (elem, i) {
    ctx.fillStyle = (names[i] === 'Вы') ? 'red' : 'rgb(' + getRandomValue(0, 255) + ', ' + getRandomValue(0, 255) + ', ' + getRandomValue(0, 255) + ')';
    ctx.fillRect(histogram.initialX + histogram.indent * i, histogram.initialY(), histogram.barWidth, -elem * histogram.step());
    ctx.fillText(names[i], histogram.initialX + histogram.indent * i, histogram.initialY() + histogram.lineHeight);
  };

  // Реализация
  fieldShadowValue(fieldFront, 10, 10);
  fieldDrow(fieldShadow, 'rgba(0, 0, 0, 0.7)');
  fieldDrow(fieldFront, '#fff');
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура! Вы победили!', 140, 40);
  ctx.fillText('Список результатов:', 140, 65);
  times.forEach(histogramDrow);
};
