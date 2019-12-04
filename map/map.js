 $(function () {

            var polygonOptions = {
                strokeColor: '#1679e7',
                fillColor: '#a2c9d8',
                interactivityModel: 'default#transparent',
                strokeWidth: 4,
                opacity: 0.7
            };
        
            var canvasOptions = {
                strokeStyle: '#1679e7',
                lineWidth: 4,
                opacity: 0.7
            };
        
        
            ymaps.ready(['Map', 'Polygon']).then(function () {
                var map = new ymaps.Map('map', {
                    center: [59.91807704072416, 30.30557799999997],
                    zoom: 12
                });
                map.behaviors.disable('scrollZoom');
                var polygon = null;
        
                if ($("input[name=in_poligon]").val() != '') {
                    var point = $("input[name=in_poligon]").val();
                    point = point.split(',');
        
                    var point_array = [];
                    point.forEach(element => {
                        el = element.split('_')
                        point_array.push([el[1], el[0]]);
                    });
        
                    // Создаем многоугольник, используя класс GeoObject.
                    var myGeoObject = new ymaps.GeoObject({
                        // Описываем геометрию геообъекта.
                        geometry: {
                            // Тип геометрии - "Многоугольник".
                            type: "Polygon",
                            // Указываем координаты вершин многоугольника.
                            coordinates: [point_array],
                            // Задаем правило заливки внутренних контуров по алгоритму "nonZero".
                            fillRule: "nonZero"
                        },
                        // Описываем свойства геообъекта.
                        properties: {
                            // Содержимое балуна.
                            balloonContent: "Многоугольник"
                        }
                    }, {
                        // Описываем опции геообъекта.
                        // Цвет заливки.
                        fillColor: '#a2c9d8',
                        // Цвет обводки.
                        strokeColor: '#1679e7',
                        // Общая прозрачность (как для заливки, так и для обводки).
                        opacity: 0.7,
                        // Ширина обводки.
                        strokeWidth: 4
                        // Стиль обводки.
                    });
        
                    // Добавляем многоугольник на карту.
                    map.geoObjects.add(myGeoObject);
                }
        
                var drawButton = document.querySelector('#draw_line');
        
                drawButton.onclick = function () {
                    drawButton.disabled = true;
        
                    drawLineOverMap(map)
                        .then(function (coordinates) {
                            // Переводим координаты из 0..1 в географические.
                            var bounds = map.getBounds();
                            coordinates = coordinates.map(function (x) {
                                return [
                                    // Широта (latitude).
                                    // Y переворачивается, т.к. на canvas'е он направлен вниз.
                                    bounds[0][0] + (1 - x[1]) * (bounds[1][0] - bounds[0][0]),
                                    // Долгота (longitude).
                                    bounds[0][1] + x[0] * (bounds[1][1] - bounds[0][1]),
                                ];
                            });
        
                            // Тут надо симплифицировать линию.
                            // Для простоты я оставляю только каждую третью координату.
                            coordinates = coordinates.filter(function (_, index) {
                                return index % 3 === 0;
                            });
        
                            // Удаляем старый полигон.
                            if (polygon) {
                                map.geoObjects.remove(polygon);
        
                            }
        
                            // Создаем новый полигон
                            polygon = new ymaps.Polygon([coordinates], {}, polygonOptions);
                            map.geoObjects.add(polygon);
        
                            drawButton.disabled = false;
                
                            // На этом этапе переменная coordinates содержит координаты всех точек фигуры
                            $(".mapMenu button").removeClass("active");
                        });
                };
            });
        
            function drawLineOverMap(map) {
                var canvas = document.querySelector('#draw-canvas');
                var ctx2d = canvas.getContext('2d');
                var drawing = false;
                var coordinates = [];
        
                // Задаем размеры канвасу как у карты.
                var rect = map.container.getParentElement().getBoundingClientRect();
                canvas.style.width = rect.width + 'px';
                canvas.style.height = rect.height + 'px';
                canvas.width = rect.width;
                canvas.height = rect.height;
        
                // Применяем стили.
                ctx2d.strokeStyle = canvasOptions.strokeStyle;
                ctx2d.lineWidth = canvasOptions.lineWidth;
                canvas.style.opacity = canvasOptions.opacity;
        
                ctx2d.clearRect(0, 0, canvas.width, canvas.height);
        
                // Показываем канвас. Он будет сверху карты из-за position: absolute.
                canvas.style.display = 'block';
        
                canvas.onmousedown = function (e) {
                    // При нажатии мыши запоминаем, что мы начали рисовать и координаты.
                    drawing = true;
                    coordinates.push([e.offsetX, e.offsetY]);
                };
        
                canvas.onmousemove = function (e) {
                    // При движении мыши запоминаем координаты и рисуем линию.
                    if (drawing) {
                        var last = coordinates[coordinates.length - 1];
                        ctx2d.beginPath();
                        ctx2d.moveTo(last[0], last[1]);
                        ctx2d.lineTo(e.offsetX, e.offsetY);
                        ctx2d.stroke();
        
                        coordinates.push([e.offsetX, e.offsetY]);
                    }
                };
        
                return new Promise(function (resolve) {
                    // При отпускании мыши запоминаем координаты и скрываем канвас.
                    canvas.onmouseup = function (e) {
                        coordinates.push([e.offsetX, e.offsetY]);
                        canvas.style.display = 'none';
                        drawing = false;
        
                        coordinates = coordinates.map(function (x) {
                            return [x[0] / canvas.width, x[1] / canvas.height];
                        });
        
                        resolve(coordinates);
                    };
                });
            }
        
            $(".mapMenu button").on('click', function () {
                $(".mapMenu button").removeClass("active");
                $(this).addClass("active");
            });
        });