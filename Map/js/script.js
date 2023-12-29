var map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -2, // Уровень минимального масштабирования
    maxZoom: 2,  // Уровень максимального масштабирования
    maxBounds: [[0, 0], [4000, 5633]]
});

var bounds = [[0, 0], [4002, 5633]]; // Размер изображения карты
L.imageOverlay('images/map.jpg', bounds).addTo(map);
map.fitBounds(bounds);
map.zoomControl.setPosition('bottomright');
map.zoomControl.remove();

document.addEventListener("DOMContentLoaded", function() {
    // Симуляция задержки загрузки
    setTimeout(function() {
        // Скрыть анимацию загрузки и отобразить основной контент
        document.querySelector(".loader-wrapper").style.display = "none";
    }, 2000); // Задержка в 2 секунды (вы можете изменить это значение)
});

document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll('.checkbox');
    
    checkboxes.forEach(function (checkbox) {
        const menuId = 'menu' + checkbox.id.slice(-1);
        const menu = document.getElementById(menuId);

        checkbox.addEventListener('change', function () {
            if (checkbox.checked) {
                menu.style.display = 'block';
                menu.addEventListener('mouseenter', showMenuHandler);
                menu.addEventListener('mouseleave', hideMenuHandler);
            } else {
                menu.style.display = 'none';
                menu.removeEventListener('mouseenter', showMenuHandler);
                menu.removeEventListener('mouseleave', hideMenuHandler);
            }
        });
    });

    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(function (menuItem) {
        menuItem.addEventListener('click', function () {
            // Implement logic to show/hide markers on the map
            // You can use a mapping library like Leaflet for this
            // Example: map.showMarker(menuItem.textContent);
        });
    });
});

function showMenuHandler() {
    const menu = this;
    menu.style.display = 'block';
}

function hideMenuHandler() {
    const menu = this;
    menu.style.display = 'none';
}

// Создание объекта иконки
var ammoIcon = L.icon({
    iconUrl: 'images/ammo.png',
    iconSize: [20, 20], // Фиксированный размер изображения маркера
    iconAnchor: [10, 10],   // Точка "якоря" маркера - при одинаковых значениях находится в центре изображения
    popupAnchor: [0, 0]   // Точка всплывающего окна маркера - также центр изображения
});

var supplyIcon = L.icon({
    iconUrl: 'images/supply.png',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, 0]
});

var barrelIcon = L.icon({
    iconUrl: 'images/barrel.png',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, 0]
});

var toolIcon = L.icon({
    iconUrl: 'images/tool.svg',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, 0]
});

var scienceIcon = L.icon({
    iconUrl: 'images/science.png',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, 0]
});

var stashIcon = L.icon({
    iconUrl: 'images/stash.png',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, 0]
});

var BDIcon = L.icon({
    iconUrl: 'images/mutants/blinddog.png',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0]
});

var PDIcon = L.icon({
    iconUrl: 'images/mutants/pseudodog.png',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0]
});

var FleshIcon = L.icon({
    iconUrl: 'images/mutants/flesh.png',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0]
});

var BoarIcon = L.icon({
    iconUrl: 'images/mutants/boar.png',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0]
});

var RatIcon = L.icon({
    iconUrl: 'images/mutants/rat.png',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0]
});

var SnorkIcon = L.icon({
    iconUrl: 'images/mutants/snork.png',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0]
});

var ZombieIcon = L.icon({
    iconUrl: 'images/mutants/zombie.png',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0]
});

var BSIcon = L.icon({
    iconUrl: 'images/mutants/bloodsucker.png',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0]
});

var SBSIcon = L.icon({
    iconUrl: 'images/mutants/strongbloodsucker.png',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0]
});

var CIcon = L.icon({
    iconUrl: 'images/mutants/chimera.png',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0]
});


var DIcon = L.icon({
    iconUrl: 'images/dealer.png',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0]
});

var FreedomIcon = L.icon({
    iconUrl: 'images/NPC/freedom.png',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0]
});

var MilitaryIcon = L.icon({
    iconUrl: 'images/NPC/military.png',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0]
});

var BanditsIcon = L.icon({
    iconUrl: 'images/NPC/Bandits.png',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0]
});

var SinsIcon = L.icon({
    iconUrl: 'images/NPC/Sin.png',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0]
});

var MercsIcon = L.icon({
    iconUrl: 'images/NPC/Mercs.png',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0]
});

var DutyIcon = L.icon({
    iconUrl: 'images/NPC/Duty.png',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0]
});

var MonolithIcon = L.icon({
    iconUrl: 'images/NPC/Monolith.png',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0]
});

var ObliteratorIcon = L.icon({
    iconUrl: 'images/NPC/Obliterator.png',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0]
});

var ZombifiedIcon = L.icon({
    iconUrl: 'images/NPC/Zombified.png',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0]
});

var WormholeIcon = L.icon({
    iconUrl: 'images/Chervo.png',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0]
});

var HearthIcon = L.icon({
    iconUrl: 'images/Orange.png',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0]
});

var CampfireIcon = L.icon({
    iconUrl: 'images/Campfire.png',
    iconSize: [24, 24],
    iconAnchor: [24, 24],
    popupAnchor: [0, 0]
});

showAmmoMenu.addEventListener('change', function(){
    if(showAmmoMenu.checked) {
        var AmmoCoordinates = [
            // Предбанник
            { coordinates: [953, 3115], description: "Координаты: -426, 69, -370" },
            { coordinates: [977, 3134], description: "Координаты: -387, 70, -418" },
            { coordinates: [852, 3010], description: "Координаты: -634, 81, -166" },
            { coordinates: [858, 3013], description: "Координаты: -629, 78, -181" },
            { coordinates: [718, 3001], description: "Координаты: -658, 78, 100" },
            { coordinates: [659, 3013], description: "Координаты: -629, 75, 219" },
            { coordinates: [1034, 3163], description: "Координаты: -330, 83, -533" },
            { coordinates: [1070, 3183], description: "Координаты: -289, 78, -603" },
            { coordinates: [1091, 3184], description: "Координаты: -287, 78, -644" },
            { coordinates: [1080, 3235], description: "Координаты: -184, 78, -626" },
            { coordinates: [1102, 3246], description: "Координаты: -164, 78, -667" },
            { coordinates: [1046, 3196], description: "Координаты: -263, 83, -554" },
            { coordinates: [1072, 3268], description: "Координаты: -119, 79, -608" },
            { coordinates: [1067, 3277], description: "Координаты: -103, 71, -597" },
            // ТЛ
            { coordinates: [1855, 3694], description: "Координаты: 732, 79, -2174" },
            { coordinates: [1805, 3678], description: "Координаты: 701, 78, -2074" },
            { coordinates: [1788, 3688], description: "Координаты: 720, 77, -2038" },
            { coordinates: [1796, 3679], description: "Координаты: 702, 77, -2057" },
            { coordinates: [1720, 3514], description: "Координаты: 375, 100, -1904" },
            { coordinates: [1579, 3471], description: "Координаты: 288, 89, -1617" },
            { coordinates: [1727, 3741], description: "Координаты: 826, 78, -1918" },
            { coordinates: [1641, 3869], description: "Координаты: 1081, 85, -1741", image: 'images/markerscr/TL/ab1.jpg', imageSize: [300, 300] },
            { coordinates: [1561, 3865], description: "Координаты: 1076, 79, -1585", image: 'images/markerscr/TL/ab2.jpg', imageSize: [300, 300] },
            { coordinates: [1498, 3939], description: "Координаты: 1223, 80, -1459" },
            { coordinates: [1479, 4076], description: "Координаты: 1496, 70, -1422" },
            { coordinates: [1464, 4026], description: "Координаты: 1396, 78, -1391" },
            { coordinates: [1444, 3612], description: "Координаты: 569, 78, -1352" },
            // Редколесье
            { coordinates: [1886, 2373], description: "Координаты: -1909, 90, -2237" },
            { coordinates: [1730, 2519], description: "Координаты: -1618, 84, -1922" },
            { coordinates: [1472, 2310], description: "Координаты: -2035, 86, -1408" },
            { coordinates: [1578, 2208], description: "Координаты: -2238, 85, -1618" },
            { coordinates: [1579, 2190], description: "Координаты: -2275, 84, -1621" },
            { coordinates: [1571, 2188], description: "Координаты: -2280, 84, -1605" },
            { coordinates: [1552, 2211], description: "Координаты: -2234, 85, -1567" },
            // ТД
            { coordinates: [2239, 4055], description: "Координаты: 1453, 79, -2941" },
            { coordinates: [2257, 4080], description: "Координаты: 1503, 79, -2976" },
            { coordinates: [2234, 4081], description: "Координаты: 1505, 88, -2934" },
            { coordinates: [2230, 4081], description: "Координаты: 1508, 91, -2924" },
            { coordinates: [2375, 4059], description: "Координаты: 1463, 78, -3214" },
            { coordinates: [2359, 4057], description: "Координаты: 1458, 78, -3183" },
            { coordinates: [2380, 3866], description: "Координаты: 1077, 78, -3225" },
            { coordinates: [2365, 3853], description: "Координаты: 1051, 85, -3195" },
            { coordinates: [2361, 3844], description: "Координаты: 1033, 86, -3186" },
            { coordinates: [2336, 3828], description: "Координаты: 1001, 78, -3136" },
            // Агропром
            { coordinates: [2200, 2346], description: "Координаты: -1961, 57, -2865", image: 'images/markerscr/Agroprom/ab1.jpg', imageSize: [300, 300] },
            { coordinates: [2224, 1984], description: "Координаты: -2689, 82, -2912" },
            { coordinates: [2199, 1978], description: "Координаты: -2697, 88, -2863" },
            { coordinates: [2190, 2006], description: "Координаты: -2644, 80, -2845" },
            { coordinates: [2189, 2024], description: "Координаты: -2608, 82, -2841" },
            { coordinates: [2207, 2020], description: "Координаты: -2614, 84, -2877" },
            { coordinates: [2222, 2036], description: "Координаты: -2582, 84, -2908" },
            { coordinates: [2142, 2155], description: "Координаты: -2345, 74, -2748" },
            { coordinates: [2145, 2160], description: "Координаты: -2336, 82, -2754" },
            { coordinates: [2126, 2160], description: "Координаты: -2335, 80, -2718" },
            { coordinates: [2023, 2098], description: "Координаты: -2459, 80, -2510" },
            // ДТ
            { coordinates: [2796, 2589], description: "Координаты: -1478, 102, -4057" },
            { coordinates: [2808, 2670], description: "Координаты: -1316, 79, -4080" },
            { coordinates: [2787, 2628], description: "Координаты: -1397, 83, -4037" },
            { coordinates: [2797, 2686], description: "Координаты: -1283, 86, -4057" },
            { coordinates: [2790, 2739], description: "Координаты: -1175, 90, -4044" },
            { coordinates: [2763, 2618], description: "Координаты: -1420, 84, -3990" },
            { coordinates: [2737, 2618], description: "Координаты: -1419, 84, -3937" },
            { coordinates: [2672, 2632], description: "Координаты: -1391, 92, -3806" },
            { coordinates: [2659, 2635], description: "Координаты: -1386, 91, -3782" },
            { coordinates: [2656, 2632], description: "Координаты: -1391, 79, -3774" },
            { coordinates: [2624, 2662], description: "Координаты: -1330, 79, -3713" },
            { coordinates: [2626, 2682], description: "Координаты: -1290, 79, -3716" },
            { coordinates: [2704, 2649], description: "Координаты: -1357, 79, -3870" },
            { coordinates: [2724, 2656], description: "Координаты: -1341, 85, -3910" },
            { coordinates: [2744, 2657], description: "Координаты: -1341, 85, -3950" },
            { coordinates: [2763, 2687], description: "Координаты: -1281, 85, -3988" },
            // Янтарь
            { coordinates: [2675, 2322], description: "Координаты: -2013, 79, -3815" },
            { coordinates: [2693, 2281], description: "Координаты: -2094, 45, -3850", image: 'images/markerscr/Amber/ab1.jpg', imageSize: [300, 300] },
            { coordinates: [2713, 2267], description: "Координаты: -2124, 40, -3888", image: 'images/markerscr/Amber/ab2.jpg', imageSize: [300, 300] },
            { coordinates: [2687, 2054], description: "Координаты: -2457, 45, -3837", image: 'images/markerscr/Amber/ab3.jpg', imageSize: [300, 300] },
            { coordinates: [2812, 2351], description: "Координаты: -1953, 89, -4089" },
            { coordinates: [2867, 2370], description: "Координаты: -1916, 89, -4198" },
            { coordinates: [2879, 2402], description: "Координаты: -1852, 90, -4222" },
            { coordinates: [2922, 2418], description: "Координаты: -1818, 89, -4307" },
            { coordinates: [2967, 2433], description: "Координаты: -1788, 89, -4397" },
            { coordinates: [2972, 2340], description: "Координаты: -1976, 82, -4406" },
            { coordinates: [2983, 2323], description: "Координаты: -2011, 77, -4429" },
            { coordinates: [2988, 2308], description: "Координаты: -2040, 77, -4439" },
            // Полесское
            { coordinates: [2991, 2787], description: "Координаты: -1080, 82, -4444" },
            { coordinates: [3036, 2774], description: "Координаты: -1105, 85, -4530" },
            { coordinates: [3123, 2808], description: "Координаты: -1037, 85, -4703" },
            { coordinates: [3358, 2606], description: "Координаты: -1442, 84, -5164" },
        ];

        AmmoGroup = L.layerGroup().addTo(map);

        for (var i = 0; i < AmmoCoordinates.length; i++) {
            (function() {
                var coordinates = AmmoCoordinates[i].coordinates;
                var description = AmmoCoordinates[i].description;
                var imageSize = AmmoCoordinates[i].imageSize;
                var image = AmmoCoordinates[i].image;

                var ammo = L.marker(coordinates, { icon: ammoIcon })
                .bindPopup("<div class='marker-description'>" + description + "</div>")
                .addTo(AmmoGroup);

                ammo.on('click', function(e) {
                    if (image) {
                        var content = "<div class='popup-content'>";
                        content += "<img src='" + image + "' width='" + imageSize[0] + "' height='" + imageSize[1] + "'<br>";
                        content += "<p class='marker-description'>" + description + "</p>";
                        content += "</div>";
                        var popup = L.popup().setContent(content);
                        e.target.bindPopup(popup).openPopup();
                    }
                });
            })();
        }
    } else {
        if (AmmoGroup) {
            map.removeLayer(AmmoGroup);
        }
    }
});

showSupplyMenu.addEventListener('change', function() {
    if (showSupplyMenu.checked) {
        // Массив с координатами маркеров
        var supplyCoordinates = [
            // Предбанник
            { coordinates: [935, 3111], description: "Координаты: -434, 70, -334" },
            { coordinates: [950, 3117], description: "Координаты: -422, 69, -364" },
            { coordinates: [855, 3011], description: "Координаты: -633, 79, -174" },
            { coordinates: [861, 3011], description: "Координаты: -633, 79, -185" },
            { coordinates: [854, 3018], description: "Координаты: -620, 81, -172" },
            { coordinates: [658, 2998], description: "Координаты: -659, 75, 220" },
            { coordinates: [658, 3006], description: "Координаты: -642, 75, 220" },
            { coordinates: [1048, 3160], description: "Координаты: -335, 100, -560" },
            { coordinates: [1069, 3170], description: "Координаты: -316, 80, -603" },
            { coordinates: [1101, 3215], description: "Координаты: -224, 83, -667" },
            { coordinates: [1079, 3214], description: "Координаты: -229, 78, -621" },
            { coordinates: [1081, 3236], description: "Координаты: -184, 80, -626" },
            { coordinates: [1048, 3198], description: "Координаты: -258, 78, -559" },
            { coordinates: [1067, 3272], description: "Координаты: -112, 79, -597" },
            { coordinates: [1067, 3275], description: "Координаты: -105, 73, -597" },
            // ТЛ
            { coordinates: [1797, 3700], description: "Координаты: 745, 77, -2056" },
            { coordinates: [1595, 3482], description: "Координаты: 312, 89, -1655" },
            { coordinates: [1528, 3880], description: "Координаты: 1104, 80, -1520" },
            { coordinates: [1619, 3878], description: "Координаты: 1099, 74, -1708", image: 'images/markerscr/TL/sb1.jpg', imageSize: [300, 300] },
            { coordinates: [1496, 3920], description: "Координаты: 1183, 79, -1455" },
            { coordinates: [1540, 3962], description: "Координаты: 1268, 77, -1543" },
            { coordinates: [1445, 3884], description: "Координаты: 1138, 87, -1352" },
            // Редколесье
            { coordinates: [1887, 2367], description: "Координаты: -1921, 89, -2237" },
            { coordinates: [1876, 2526], description: "Координаты: -1604, 90, -2215" },
            { coordinates: [1792, 2415], description: "Координаты: -1824, 82, -2047" },
            { coordinates: [1746, 2449], description: "Координаты: -1754, 84, -1955" },
            { coordinates: [1771, 2513], description: "Координаты: -1629, 85, -2007" },
            { coordinates: [1630, 2261], description: "Координаты: -2130, 82, -1725" },
            { coordinates: [1582, 2196], description: "Координаты: -2263, 81, -1627" },
            { coordinates: [1561, 2208], description: "Координаты: -2239, 85, -1585" },
            { coordinates: [1551, 2214], description: "Координаты: -2226, 85, -1565" },
            { coordinates: [1549, 2190], description: "Координаты: -2276, 84, -1562" },
            { coordinates: [1481, 2292], description: "Координаты: -2071, 89, -1427" },
            { coordinates: [1473, 2307], description: "Координаты: -2041, 85, -1409" },
            // ТД
            { coordinates: [2257, 4050], description: "Координаты: 1443, 78, -2978" },
            { coordinates: [2235, 4046], description: "Координаты: 1435, 85, -2932" },
            { coordinates: [2228, 4040], description: "Координаты: 1423, 78, -2919" },
            { coordinates: [2226, 4076], description: "Координаты: 1495, 87, -2914" },
            { coordinates: [2230, 4076], description: "Координаты: 1495, 87, -2924" },
            { coordinates: [2223, 4081], description: "Координаты: 1507, 91, -2909" },
            { coordinates: [2282, 4110], description: "Координаты: 1565, 77, -3028" },
            { coordinates: [2381, 4065], description: "Координаты: 1475, 78, -3226" },
            { coordinates: [2352, 4057], description: "Координаты: 1459, 78, -3168" },
            { coordinates: [2326, 4072], description: "Координаты: 1487, 78, -3116" },
            { coordinates: [2371, 3881], description: "Координаты: 1106, 78, -3204" },
            { coordinates: [2364, 3845], description: "Координаты: 1034, 85, -3193" },
            // Агропром
            { coordinates: [2423, 2332], description: "Координаты: -1985, 84, -3315" },
            { coordinates: [2207, 2339], description: "Координаты: -1981, 57, -2882", image: 'images/markerscr/Agroprom/sb1.jpg', imageSize: [300, 300] },
            { coordinates: [2207, 2342], description: "Координаты: -1978, 57, -2882", image: 'images/markerscr/Agroprom/sb1.jpg', imageSize: [300, 300] },
            { coordinates: [2219, 2036], description: "Координаты: -2582, 84, -2900" },
            { coordinates: [2195, 1981], description: "Координаты: -2695, 93, -2850" },
            { coordinates: [2188, 1983], description: "Координаты: -2689, 88, -2838" },
            { coordinates: [2188, 1982], description: "Координаты: -2691, 88, -2838" },
            { coordinates: [2192, 2005], description: "Координаты: -2645, 87, -2849" },
            { coordinates: [2186, 2013], description: "Координаты: -2629, 82, -2835" },
            { coordinates: [2145, 2158], description: "Координаты: -2337, 78, -2754" },
            // ДТ
            { coordinates: [2787, 2633], description: "Координаты: -1389, 84, -4037" },
            { coordinates: [2759, 2627], description: "Координаты: -1400, 90, -3981" },
            { coordinates: [2810, 2668], description: "Координаты: -1320, 79, -4084" },
            { coordinates: [2787, 2653], description: "Координаты: -1347, 80, -4038" },
            { coordinates: [2790, 2670], description: "Координаты: -1315, 86, -4043" },
            { coordinates: [2780, 2735], description: "Координаты: -1184, 79, -4022" },
            { coordinates: [2787, 2752], description: "Координаты: -1151, 79, -4037" },
            { coordinates: [2766, 2655], description: "Координаты: -1345, 80, -3995" },
            { coordinates: [2763, 2662], description: "Координаты: -1331, 80, -3989" },
            { coordinates: [2763, 2672], description: "Координаты: -1309, 86, -3988" },
            { coordinates: [2759, 2657], description: "Координаты: -1342, 80, -3982" },
            { coordinates: [2739, 2650], description: "Координаты: -1357, 86, -3942" },
            { coordinates: [2704, 2630], description: "Координаты: -1394, 85, -3870" },
            { coordinates: [2699, 2656], description: "Координаты: -1341, 80, -3861" },
            { coordinates: [2678, 2632], description: "Координаты: -1391, 92, -3821" },
            { coordinates: [2669, 2632], description: "Координаты: -1391, 79, -3801" },
            { coordinates: [2685, 2801], description: "Координаты: -1054, 79, -3832" },
            // Янтарь
            { coordinates: [2701, 2277], description: "Координаты: -2102, 46, -3866", image: 'images/markerscr/Amber/sb1.jpg', imageSize: [300, 300] },
            { coordinates: [2718, 2249], description: "Координаты: -2156, 39, -3899", image: 'images/markerscr/Amber/sb2.jpg', imageSize: [300, 300] },
            { coordinates: [2690, 2151], description: "Координаты: -2350, 39, -3838", image: 'images/markerscr/Amber/sb3.jpg', imageSize: [300, 300] },
            { coordinates: [2724, 2081], description: "Координаты: -2492, 31, -3911", image: 'images/markerscr/Amber/sb4.jpg', imageSize: [300, 300] },
            { coordinates: [2724, 2345], description: "Координаты: -1965, 79, -3911" },
            { coordinates: [2729, 2286], description: "Координаты: -2085, 80, -3920" },
            { coordinates: [2865, 2296], description: "Координаты: -2064, 90, -4195" },
            { coordinates: [2941, 2371], description: "Координаты: -1912, 90, -4345" },
            { coordinates: [2953, 2380], description: "Координаты: -1897, 89, -4369" },
            { coordinates: [2819, 2435], description: "Координаты: -1784, 89, -4101" },
            { coordinates: [2852, 2392], description: "Координаты: -1870, 99, -4168" },
            { coordinates: [2923, 2423], description: "Координаты: -1808, 93, -4310" },
            { coordinates: [2959, 2338], description: "Координаты: -1979, 77, -4381" },
            { coordinates: [2971, 2342], description: "Координаты: -1971, 74, -4405" },
            { coordinates: [3009, 2322], description: "Координаты: -2011, 77, -4482" },
            { coordinates: [3010, 2353], description: "Координаты: -1948, 78, -4483" },
            { coordinates: [3031, 2347], description: "Координаты: -1961, 78, -4524" },
            { coordinates: [3027, 2404], description: "Координаты: -1846, 88, -4517" },
            { coordinates: [3043, 2383], description: "Координаты: -1888, 86, -4551" },
            { coordinates: [3062, 2326], description: "Координаты: -2002, 76, -4588" },
            { coordinates: [3065, 2351], description: "Координаты: -1954, 81, -4594" },
            { coordinates: [2971, 2283], description: "Координаты: -2088, 76, -4406" },
            // Стройплощадка
            { coordinates: [1366, 1750], description: "Координаты: -3156, 91, -1195" },
            { coordinates: [1325, 1699], description: "Координаты: -3259, 91, -1114" },
            { coordinates: [1414, 1862], description: "Координаты: -2932, 99, -1290" },
            { coordinates: [1408, 1796], description: "Координаты: -3062, 99, -1279" },
            { coordinates: [1414, 1738], description: "Координаты: -3180, 93, -1292" },
            { coordinates: [1415, 1710], description: "Координаты: -3236, 91, -1294" },
            { coordinates: [1440, 1704], description: "Координаты: -3246, 94, -1344" },
            { coordinates: [1481, 1698], description: "Координаты: -3260, 93, -1427" },
            { coordinates: [1482, 1729], description: "Координаты: -3195, 93, -1426" },
            { coordinates: [1435, 1745], description: "Координаты: -3165, 105, -1333" },
            { coordinates: [1423, 1789], description: "Координаты: -3077, 99, -1311" },
            { coordinates: [1449, 1764], description: "Координаты: -3128, 100, -1360" },
            { coordinates: [1452, 1768], description: "Координаты: -3120, 94, -1366" },
            { coordinates: [1454, 1764], description: "Координаты: -3128, 112, -1370" },
            { coordinates: [1461, 1846], description: "Координаты: -2963, 93, -1385" },
            { coordinates: [1502, 1733], description: "Координаты: -3191, 90, -1468" },
            { coordinates: [1481, 1880], description: "Координаты: -2895, 94, -1427" },
            { coordinates: [1492, 1878], description: "Координаты: -2900, 95, -1448" },
            { coordinates: [1530, 1876], description: "Координаты: -2904, 94, -1525" },
            { coordinates: [1579, 1924], description: "Координаты: -2807, 92, -1622" },
            { coordinates: [1529, 1811], description: "Координаты: -3032, 91, -1522" },
            { coordinates: [1532, 1756], description: "Координаты: -3143, 91, -1528" },
            // Полесское
            { coordinates: [2981, 2830], description: "Координаты: -993, 83, -4424" },
            { coordinates: [2981, 2814], description: "Координаты: -1025, 84, -4424" },
            { coordinates: [2979, 2791], description: "Координаты: -1071, 83, -4417" },
            { coordinates: [2984, 2765], description: "Координаты: -1124, 100, -4428" },
            { coordinates: [3038, 2696], description: "Координаты: -1260, 81, -4535" },
            { coordinates: [3034, 2785], description: "Координаты: -1084, 82, -4526" },
            { coordinates: [3069, 2720], description: "Координаты: -1211, 86, -4595" },
            { coordinates: [3145, 2814], description: "Координаты: -1026, 79, -4744" },
            { coordinates: [3152, 2814], description: "Координаты: -1024, 74, -4755" },
            { coordinates: [3065, 2661], description: "Координаты: -1332, 76, -4585" },
            { coordinates: [3080, 2672], description: "Координаты: -1308, 76, -4618" },
            { coordinates: [3119, 2667], description: "Координаты: -1319, 81, -4694" },
            { coordinates: [3091, 2769], description: "Координаты: -1116, 93, -4639" },
            { coordinates: [3110, 2806], description: "Координаты: -1042, 97, -4676" },
            { coordinates: [3133, 2842], description: "Координаты: -969, 85, -4719" },
            { coordinates: [3129, 2855], description: "Координаты: -942, 85, -4712" },
            { coordinates: [3150, 2780], description: "Координаты: -1093, 85, -4753" },
            { coordinates: [3151, 2767], description: "Координаты: -1118, 81, -4756" },
            { coordinates: [3117, 2741], description: "Координаты: -1170, 86, -4688" },
            { coordinates: [3118, 2709], description: "Координаты: -1234, 86, -4692" },
            { coordinates: [3147, 2739], description: "Координаты: -1173, 85, -4751" },
            { coordinates: [3094, 2847], description: "Координаты: -958, 85, -4644" },
            { coordinates: [3239, 2566], description: "Координаты: -1523, 95, -4929" },
            { coordinates: [3239, 2590], description: "Координаты: -1471, 96, -4929" },
            { coordinates: [3224, 2577], description: "Координаты: -1496, 126, -4899" },
            { coordinates: [3225, 2580], description: "Координаты: -1491, 169, -4901" },
            { coordinates: [3289, 2616], description: "Координаты: -1419, 84, -5029" },
            { coordinates: [3291, 2659], description: "Координаты: -1335, 84, -5030" },
            { coordinates: [3351, 2704], description: "Координаты: -1245, 84, -5153" },
            { coordinates: [3384, 2726], description: "Координаты: -1202, 84, -5217" },
            { coordinates: [3337, 2773], description: "Координаты: -1107, 84, -5124" },
            { coordinates: [3338, 2757], description: "Координаты: -1140, 84, -5126" },
            { coordinates: [3360, 2786], description: "Координаты: -1080, 84, -5168" },
            { coordinates: [3379, 2780], description: "Координаты: -1093, 84, -5204" },
            { coordinates: [3290, 2525], description: "Координаты: -1603, 86, -5031" },
            { coordinates: [3349, 2539], description: "Координаты: -1574, 77, -5149" },
            { coordinates: [3252, 2689], description: "Координаты: -1276, 76, -4953" },
            { coordinates: [3230, 2751], description: "Координаты: -1154, 72, -4912" },
            { coordinates: [3300, 2836], description: "Координаты: -983, 78, -5050" },
            { coordinates: [3300, 2861], description: "Координаты: -930, 79, -5051" },
        ];

        // Группа маркеров
        supplyGroup = L.layerGroup().addTo(map);

        // Добавление маркера для каждой координаты
        for (var i = 0; i < supplyCoordinates.length; i++) {
            (function() {
                var coordinates = supplyCoordinates[i].coordinates;
                var description = supplyCoordinates[i].description;
                var imageSize = supplyCoordinates[i].imageSize;
                var image = supplyCoordinates[i].image;

                var supply = L.marker(coordinates, { icon: supplyIcon })
                .bindPopup("<div class='marker-description'>" + description + "</div>")  // Текст всплывающего окна (если вдруг нужно добавить нумерацию, то можно внести после текста "Ящик с патронами" след. команду: + (i + 1) + )
                .addTo(supplyGroup);
                // Добавление обработчика события нажатия для каждого маркера
            supply.on('click', function(e) {
                // При нажатии на маркер, необходимо проверить наличие изображения и добавить его в всплывающее окно
                if (image) {
                    var content = "<div class='custom-popup-content'>";
                    content += "<img src='" + image + "' width='" + imageSize[0] + "' height='" + imageSize[1] + "'<br>";
                    content += "<p class='marker-description'>" + description + "</p>";
                    content += "</div>";

                    // Создание всплывающего окна с контентом
                    var popup = L.popup().setContent(content);

                    // Показать всплывающее окно
                    e.target.bindPopup(popup).openPopup();
                }
            });
        })();
      }
    } else {
     // Удаление группы маркеров, если она существует
     if (supplyGroup) {
        map.removeLayer(supplyGroup);
        }
    }
});

showBarrelMenu.addEventListener('change', function() {
    if (showBarrelMenu.checked) {
        // Массив с координатами маркеров
        var barrelCoordinates = [
            // ТЛ
            { coordinates: [1856, 3675], description: "Координаты: 698, 79, -2170" },
            { coordinates: [1714, 3574], description: "Координаты: 493, 79, -1894" },
            { coordinates: [1774, 3948], description: "Координаты: 1240, 67, -2015" },
            { coordinates: [1669, 3931], description: "Координаты: 1212, 100, -1798", image: 'images/markerscr/TL/b1.jpg', imageSize: [300, 300] },
            { coordinates: [1649, 3955], description: "Координаты: 1250, 65, -1750", image: 'images/markerscr/TL/b2.jpg', imageSize: [300, 300] },
            { coordinates: [1667, 3898], description: "Координаты: 1139, 54, -1799", image: 'images/markerscr/TL/b3.jpg', imageSize: [300, 300] },
            { coordinates: [1526, 3860], description: "Координаты: 1064, 79, -1516" },
            { coordinates: [1489, 4080], description: "Координаты: 1504, 70, -1442" },
            { coordinates: [1427, 3762], description: "Координаты: 871, 78, -1317" },
            { coordinates: [1468, 4020], description: "Координаты: 1384, 78, -1400" },
            { coordinates: [1850, 3700], description: "Координаты: 744, 71, -2163" },
            // Редколесье
            { coordinates: [1876, 2514], description: "Координаты: -1626, 90, -2215" },
            { coordinates: [1870, 2523], description: "Координаты: -1608, 90, -2202" },
            { coordinates: [1785, 2411], description: "Координаты: -1834, 82, -2034" },
            { coordinates: [1741, 2451], description: "Координаты: -1752, 84, -1945" },
            { coordinates: [1785, 2508], description: "Координаты: -1638, 84, -2034" },
            { coordinates: [1768, 2507], description: "Координаты: -1641, 84, -1998" },
            { coordinates: [1736, 2527], description: "Координаты: -1600, 84, -1935" },
            { coordinates: [1649, 2208], description: "Координаты: -2236, 88, -1762" },
            { coordinates: [1489, 2292], description: "Координаты: -2071, 85, -1441" },
            { coordinates: [1468, 2297], description: "Координаты: -2060, 85, -1398" },
            { coordinates: [1580, 2211], description: "Координаты: -2233, 84, -1623" },
            { coordinates: [1581, 2196], description: "Координаты: -2262, 85, -1626" },
            { coordinates: [1579, 2194], description: "Координаты: -2267, 85, -1621" },
            { coordinates: [1547, 2213], description: "Координаты: -2229, 84, -1557" },
            { coordinates: [1548, 2197], description: "Координаты: -2260, 84, -1561" },
            // ТД
            { coordinates: [2235, 4052], description: "Координаты: 1450, 85, -2933" },
            { coordinates: [2270, 4075], description: "Координаты: 1495, 78, -3004" },
            { coordinates: [2268, 4081], description: "Координаты: 1506, 78, -3000" },
            { coordinates: [2224, 4061], description: "Координаты: 1468, 78, -2912" },
            { coordinates: [2222, 4052], description: "Координаты: 1449, 78, -2908" },
            { coordinates: [2262, 4102], description: "Координаты: 1546, 77, -2987" },
            { coordinates: [2375, 4063], description: "Координаты: 1469, 78, -3214" },
            { coordinates: [2357, 4087], description: "Координаты: 1519, 78, -3178" },
            { coordinates: [2338, 4101], description: "Координаты: 1547, 78, -3138" },
            { coordinates: [2345, 4078], description: "Координаты: 1500, 78, -3152" },
            { coordinates: [2346, 4077], description: "Координаты: 1498, 78, -3154" },
            { coordinates: [2366, 3883], description: "Координаты: 1111, 84, -3196" },
            { coordinates: [2372, 3854], description: "Координаты: 1053, 77, -3208" },
            { coordinates: [2360, 3845], description: "Координаты: 1034, 85, -3182" },
            { coordinates: [2357, 3840], description: "Координаты: 1026, 72, -3177" },
            { coordinates: [2325, 3832], description: "Координаты: 1008, 75, -3114" },
            // Агропром
            { coordinates: [2207, 2340], description: "Координаты: -1980, 57, -2882", image: 'images/markerscr/Agroprom/sb1.jpg', imageSize: [300, 300] },
            { coordinates: [2148, 2341], description: "Координаты: -1972, 78, -2762", image: 'images/markerscr/Agroprom/b1.jpg', imageSize: [300, 300] },
            { coordinates: [2141, 2312], description: "Координаты: -2025, 70, -2746", image: 'images/markerscr/Agroprom/b2.jpg', imageSize: [300, 300] },
            { coordinates: [2138, 2314], description: "Координаты: -2024, 70, -2742", image: 'images/markerscr/Agroprom/b3.jpg', imageSize: [300, 300] },
            { coordinates: [2374, 1983], description: "Координаты: -2689, 78, -3210" },
            { coordinates: [2230, 2029], description: "Координаты: -2596, 83, -2923" },
            { coordinates: [2188, 1978], description: "Координаты: -2699, 83, -2838" },
            { coordinates: [2128, 2160], description: "Координаты: -2336, 78, -2720" },
            { coordinates: [2125, 2160], description: "Координаты: -2336, 78, -2713" },
            { coordinates: [2097, 2164], description: "Координаты: -2327, 81, -2658" },
            { coordinates: [2024, 2065], description: "Координаты: -2525, 79, -2510" },
            { coordinates: [2011, 2056], description: "Координаты: -2543, 81, -2486" },
            { coordinates: [2233, 2016], description: "Координаты: -2624, 83, -2930" },
            // ДТ
            { coordinates: [2780, 2595], description: "Координаты: -1466, 94, -4023" },
            { coordinates: [2756, 2590], description: "Координаты: -1475, 153, -3975" },
            { coordinates: [2768, 2619], description: "Координаты: -1416, 90, -3999" },
            { coordinates: [2755, 2627], description: "Координаты: -1402, 90, -3973" },
            { coordinates: [2737, 2604], description: "Координаты: -1447, 87, -3938" },
            { coordinates: [2715, 2604], description: "Координаты: -1447, 84, -3893" },
            { coordinates: [2656, 2603], description: "Координаты: -1448, 84, -3774" },
            { coordinates: [2668, 2628], description: "Координаты: -1398, 84, -3798" },
            { coordinates: [2653, 2632], description: "Координаты: -1391, 85, -3768" },
            { coordinates: [2633, 2653], description: "Координаты: -1349, 79, -3731" },
            { coordinates: [2632, 2680], description: "Координаты: -1295, 80, -3729" },
            { coordinates: [2797, 2652], description: "Координаты: -1349, 79, -4058" },
            { coordinates: [2767, 2658], description: "Координаты: -1339, 85, -3996" },
            { coordinates: [2750, 2675], description: "Координаты: -1307, 79, -3964" },
            { coordinates: [2724, 2694], description: "Координаты: -1265, 85, -3911" },
            { coordinates: [2787, 2737], description: "Координаты: -1179, 79, -4037" },
            { coordinates: [2672, 2809], description: "Координаты: -1038, 85, -3807" },
            { coordinates: [2803, 2644], description: "Координаты: -1366, 83, -4072" },
            // Янтарь
            { coordinates: [2644, 2321], description: "Координаты: -2014, 79, -3752" },
            { coordinates: [2697, 2163], description: "Координаты: -2323, 39, -3857", image: 'images/markerscr/Amber/b1.jpg', imageSize: [300, 300] },
            { coordinates: [2692, 2027], description: "Координаты: -2599, 61, -3846", image: 'images/markerscr/Amber/b2.jpg', imageSize: [300, 300] },
            { coordinates: [2690, 2031], description: "Координаты: -2594, 61, -3843", image: 'images/markerscr/Amber/b3.jpg', imageSize: [300, 300] },
            { coordinates: [2813, 2328], description: "Координаты: -1999, 89, -4088" },
            { coordinates: [2854, 2343], description: "Координаты: -1968, 89, -4171" },
            { coordinates: [2834, 2385], description: "Координаты: -1884, 90, -4132" },
            { coordinates: [2827, 2443], description: "Координаты: -1769, 89, -4118" },
            { coordinates: [2854, 2418], description: "Координаты: -1820, 89, -4172" },
            { coordinates: [2967, 2390], description: "Координаты: -1877, 89, -4397" },
            // Стройплощадка
            { coordinates: [1439, 1703], description: "Координаты: -3248, 94, -1342" },
            { coordinates: [1444, 1707], description: "Координаты: -3241, 94, -1350" },
            { coordinates: [1509, 1712], description: "Координаты: -3230, 92, -1482" },
            { coordinates: [1462, 1722], description: "Координаты: -3212, 93, -1384" },
            { coordinates: [1459, 1726], description: "Координаты: -3203, 101, -1381" },
            { coordinates: [1456, 1742], description: "Координаты: -3169, 93, -1375" },
            { coordinates: [1424, 1774], description: "Координаты: -3107, 93, -1312" },
            { coordinates: [1443, 1858], description: "Координаты: -2940, 90, -1349" },
            { coordinates: [1440, 1764], description: "Координаты: -3127, 94, -1342" },
            { coordinates: [1454, 1763], description: "Координаты: -3128, 106, -1370" },
            { coordinates: [1454, 1802], description: "Координаты: -3051, 93, -1371" },
            { coordinates: [1488, 1787], description: "Координаты: -3082, 92, -1439" },
            { coordinates: [1496, 1759], description: "Координаты: -3138, 91, -1455" },
            { coordinates: [1469, 1827], description: "Координаты: -3000, 89, -1400" },
            { coordinates: [1512, 1796], description: "Координаты: -3062, 93, -1489" },
            // Полесское
            { coordinates: [3004, 2818], description: "Координаты: -1018, 82, -4469" },
            { coordinates: [3009, 2791], description: "Координаты: -1072, 83, -4479" },
            { coordinates: [2974, 2805], description: "Координаты: -1043, 82, -4409" },
            { coordinates: [3099, 2803], description: "Координаты: -1047, 79, -4656" },
            { coordinates: [3040, 2685], description: "Координаты: -1284, 75, -4537" },
            { coordinates: [3068, 2731], description: "Координаты: -1190, 76, -4594" },
            { coordinates: [3150, 2806], description: "Координаты: -1041, 73, -4753" },
            { coordinates: [3068, 2677], description: "Координаты: -1299, 76, -4595" },
            { coordinates: [3117, 2671], description: "Координаты: -1311, 76, -4689" },
            { coordinates: [3092, 2791], description: "Координаты: -1071, 77, -4642" },
            { coordinates: [3127, 2835], description: "Координаты: -983, 79, -4709" },
            { coordinates: [3123, 2729], description: "Координаты: -1196, 94, -4703" },
            { coordinates: [3148, 2691], description: "Координаты: -1270, 85, -4751" },
            { coordinates: [3229, 2580], description: "Координаты: -1492, 144, -4910" },
            { coordinates: [3324, 2618], description: "Координаты: -1416, 84, -5096" },
            { coordinates: [3318, 2653], description: "Координаты: -1350, 84, -5086" },
            { coordinates: [3335, 2665], description: "Координаты: -1323, 84, -5119" },
            { coordinates: [3371, 2738], description: "Координаты: -1178, 84, -5188" },
            { coordinates: [3293, 2704], description: "Координаты: -1243, 84, -5035" },
            { coordinates: [3315, 2780], description: "Координаты: -1093, 84, -5078" },
            { coordinates: [3364, 2792], description: "Координаты: -1069, 84, -5177" },
            { coordinates: [3373, 2764], description: "Координаты: -1125, 84, -5192" },
            { coordinates: [3234, 2706], description: "Координаты: -1242, 75, -4921" },
            { coordinates: [3239, 2768], description: "Координаты: -1123, 72, -4928" },
            { coordinates: [3258, 2843], description: "Координаты: -968, 72, -4970" },
            { coordinates: [3337, 2859], description: "Координаты: -935, 77, -5125" },
            // Муравейник
            { coordinates: [3014, 3222], description: "Координаты: -211, 82, -4492" },
        ];

        // Группа маркеров
        barrelGroup = L.layerGroup().addTo(map);

        // Добавление маркера для каждой координаты
        for (var i = 0; i < barrelCoordinates.length; i++) {
            (function() {
                var coordinates = barrelCoordinates[i].coordinates;
                var description = barrelCoordinates[i].description;
                var imageSize = barrelCoordinates[i].imageSize;
                var image = barrelCoordinates[i].image;

                var barrel = L.marker(coordinates, { icon: barrelIcon })
                .bindPopup("<div class='marker-description'>" + description + "</div>")  // Текст всплывающего окна (если вдруг нужно добавить нумерацию, то можно внести после текста "Ящик с патронами" след. команду: + (i + 1) + )
                .addTo(barrelGroup);
                // Добавление обработчика события нажатия для каждого маркера
            barrel.on('click', function(e) {
                // При нажатии на маркер, необходимо проверить наличие изображения и добавить его в всплывающее окно
                if (image) {
                    var content = "<div class='custom-popup-content'>";
                    content += "<img src='" + image + "' width='" + imageSize[0] + "' height='" + imageSize[1] + "'<br>";
                    content += "<p class='marker-description'>" + description + "</p>";
                    content += "</div>";

                    // Создание всплывающего окна с контентом
                    var popup = L.popup().setContent(content);

                    // Показать всплывающее окно
                    e.target.bindPopup(popup).openPopup();
                }
            });
        })();
        }
    } else {
        // Удаление группы маркеров, если она существует
        if (barrelGroup) {
        map.removeLayer(barrelGroup);
        }
    }
});

showToolMenu.addEventListener('change', function() {
    if (showToolMenu.checked) {
        // Массив с координатами маркеров
        var toolCoordinates = [
            // ТЛ
            { coordinates: [1810, 3679], description: "Координаты: 701, 84, -2083" },
            { coordinates: [1709, 3564], description: "Координаты: 471, 79, -1884" },
            { coordinates: [1743, 3726], description: "Координаты: 797, 80, -1948" },
            { coordinates: [1672, 3872], description: "Координаты: 1088, 102, -1806", image: 'images/markerscr/TL/tb1.jpg', imageSize: [300, 300] },
            { coordinates: [1635, 3881], description: "Координаты: 1108, 69, -1730", image: 'images/markerscr/TL/tb2.jpg', imageSize: [300, 300] },
            { coordinates: [1550, 3881], description: "Координаты: 1109, 79, -1564" },
            { coordinates: [1546, 3975], description: "Координаты: 1296, 77, -1556" },
            { coordinates: [1492, 4078], description: "Координаты: 1499, 79, -1447" },
            { coordinates: [1473, 4028], description: "Координаты: 1401, 79, -1410" },
            { coordinates: [1440, 4044], description: "Координаты: 1432, 92, -1346" },
            { coordinates: [1414, 3830], description: "Координаты: 1003, 79, -1292<br> Трек: Бесконечное лето - Blow with the Fires" },
            { coordinates: [1416, 3769], description: "Координаты: 884, 80, -1294" },
            { coordinates: [1479, 4010], description: "Координаты: 1366, 79, -1423" },
            { coordinates: [1678, 3528], description: "Координаты: 1366, 79, -1423" },
            // Редколесье
            { coordinates: [1742, 2509], description: "Координаты: -1637, 84, -1948" },
            { coordinates: [1572, 2190], description: "Координаты: -2279, 85, -1607" },
            { coordinates: [1562, 2216], description: "Координаты: -2223, 84, -1588" },
            { coordinates: [1552, 2192], description: "Координаты: -2270, 85, -1566" },
            // ТД
            { coordinates: [2267, 4050], description: "Координаты: 1445, 78, -2997" },
            { coordinates: [2235, 4058], description: "Координаты: 1461, 77, -2932" },
            { coordinates: [2274, 4075], description: "Координаты: 1496, 79, -3011" },
            { coordinates: [2259, 4083], description: "Координаты: 1511, 78, -2986" },
            { coordinates: [2274, 4102], description: "Координаты: 1546, 71, -3012" },
            { coordinates: [2382, 4108], description: "Координаты: 1561, 79, -3228" },
            { coordinates: [2357, 4077], description: "Координаты: 1498, 78, -3178" },
            { coordinates: [2345, 4086], description: "Координаты: 1516, 79, -3154" },
            { coordinates: [2376, 3878], description: "Координаты: 1100, 78, -3215" },
            { coordinates: [2367, 3856], description: "Координаты: 1056, 78, -3198" },
            { coordinates: [2357, 3836], description: "Координаты: 1017, 72, -3177" },
            // Агропром
            { coordinates: [2213, 2346], description: "Координаты: -1961, 57, -2888", image: 'images/markerscr/Agroprom/tb1.jpg', imageSize: [300, 300] },
            { coordinates: [2144, 2341], description: "Координаты: -1972, 71, -2751", image: 'images/markerscr/Agroprom/tb2.jpg', imageSize: [300, 300] },
            { coordinates: [2247, 2006], description: "Координаты: -2643, 82, -2957" },
            { coordinates: [2234, 2000], description: "Координаты: -2656, 82, -2930" },
            { coordinates: [2188, 2008], description: "Координаты: -2639, 83, -2838" },
            { coordinates: [2185, 2027], description: "Координаты: -2602, 83, -2832" },
            { coordinates: [2144, 2155], description: "Координаты: -2345, 79, -2751" },
            { coordinates: [2145, 2158], description: "Координаты: -2338, 83, -2754" },
            { coordinates: [2126, 2147], description: "Координаты: -2360, 79, -2714" },
            { coordinates: [2007, 2097], description: "Координаты: -2461, 80, -2478" },
            // ДТ
            { coordinates: [2783, 2592], description: "Координаты: -1470, 111, -4029" },
            { coordinates: [2778, 2588], description: "Координаты: -1480, 103, -4018" },
            { coordinates: [2749, 2627], description: "Координаты: -1401, 85, -3961" },
            { coordinates: [2707, 2626], description: "Координаты: -1404, 76, -3878" },
            { coordinates: [2642, 2609], description: "Координаты: -1436, 84, -3747" },
            { coordinates: [2804, 2739], description: "Координаты: -1177, 80, -4073" },
            { coordinates: [2757, 2764], description: "Координаты: -1127, 79, -3977" },
            { coordinates: [2752, 2681], description: "Координаты: -1292, 91, -3968" },
            { coordinates: [2724, 2649], description: "Координаты: -1357, 85, -3912" },
            { coordinates: [2666, 2640], description: "Координаты: -1374, 92, -3795" },
            { coordinates: [2661, 2640], description: "Координаты: -1374, 85, -3786" },
            // Янтарь
            { coordinates: [2704, 2327], description: "Координаты: -2001, 80, -3873" },
            { coordinates: [2712, 2261], description: "Координаты: -2133, 39, -3886", image: 'images/markerscr/Amber/tb1.jpg', imageSize: [300, 300] },
            { coordinates: [2696, 2158], description: "Координаты: -2334, 39, -3855", image: 'images/markerscr/Amber/tb2.jpg', imageSize: [300, 300] },
            { coordinates: [2719, 2112], description: "Координаты: -2429, 31, -3903", image: 'images/markerscr/Amber/tb3.jpg', imageSize: [300, 300] },
            { coordinates: [2825, 2379], description: "Координаты: -1897, 90, -4115" },
            { coordinates: [2828, 2331], description: "Координаты: -1992, 89, -4120" },
            { coordinates: [2864, 2304], description: "Координаты: -2047, 98, -4192" },
            { coordinates: [2903, 2394], description: "Координаты: -1868, 93, -4270" },
            { coordinates: [2845, 2392], description: "Координаты: -1871, 89, -4152" },
            { coordinates: [2951, 2414], description: "Координаты: -1826, 89, -4366" },
            { coordinates: [2969, 2320], description: "Координаты: -2016, 77, -4401" },
            { coordinates: [2996, 2331], description: "Координаты: -1993, 78, -4455" },
            { coordinates: [3081, 2373], description: "Координаты: -1908, 82, -4626" },
            // Стройплощадка
            { coordinates: [1346, 1944], description: "Координаты: -2766, 91, -1155" },
            { coordinates: [1358, 1931], description: "Координаты: -2794, 91, -1180" },
            { coordinates: [1367, 1907], description: "Координаты: -2841, 90, -1197" },
            { coordinates: [1393, 1913], description: "Координаты: -2829, 91, -1248" },
            { coordinates: [1403, 1942], description: "Координаты: -2771, 92, -1269" },
            { coordinates: [1445, 1943], description: "Координаты: -2769, 91, -1354" },
            { coordinates: [1449, 1934], description: "Координаты: -2786, 91, -1360" },
            { coordinates: [1491, 1889], description: "Координаты: -2878, 94, -1446" },
            { coordinates: [1500, 1877], description: "Координаты: -2902, 95, -1462" },
            { coordinates: [1521, 1874], description: "Координаты: -2908, 95, -1503" },
            { coordinates: [1346, 1822], description: "Координаты: -3011, 92, -1156" },
            { coordinates: [1370, 1750], description: "Координаты: -3155, 92, -1202" },
            { coordinates: [1324, 1684], description: "Координаты: -3286, 94, -1110" },
            { coordinates: [1335, 1689], description: "Координаты: -3276, 92, -1134" },
            { coordinates: [1339, 1701], description: "Координаты: -3252, 91, -1140" },
            { coordinates: [1346, 1695], description: "Координаты: -3265, 85, -1155" },
            { coordinates: [1368, 1669], description: "Координаты: -3316, 91, -1199" },
            { coordinates: [1396, 1692], description: "Координаты: -3271, 91, -1255" },
            { coordinates: [1407, 1878], description: "Координаты: -2898, 97, -1279" },
            { coordinates: [1407, 1880], description: "Координаты: -2895, 92, -1279" },
            { coordinates: [1413, 1870], description: "Координаты: -2915, 92, -1289" },
            { coordinates: [1412, 1861], description: "Координаты: -2932, 95, -1291" },
            { coordinates: [1448, 1865], description: "Координаты: -2925, 90, -1359" },
            { coordinates: [1486, 1839], description: "Координаты: -2978, 89, -1436" },
            { coordinates: [1492, 1837], description: "Координаты: -2981, 89, -1447" },
            { coordinates: [1479, 1800], description: "Координаты: -3054, 94, -1420" },
            { coordinates: [1477, 1793], description: "Координаты: -3069, 94, -1417" },
            { coordinates: [1418, 1807], description: "Координаты: -3041, 93, -1301" },
            { coordinates: [1423, 1792], description: "Координаты: -3075, 95, -1308" },
            { coordinates: [1408, 1800], description: "Координаты: -3054, 93, -1279" },
            { coordinates: [1412, 1794], description: "Координаты: -3067, 93, -1289" },
            { coordinates: [1412, 1785], description: "Координаты: -3086, 93, -1289" },
            { coordinates: [1409, 1757], description: "Координаты: -3142, 93, -1280" },
            { coordinates: [1408, 1746], description: "Координаты: -3163, 99, -1279" },
            { coordinates: [1408, 1741], description: "Координаты: -3173, 93, -1279" },
            { coordinates: [1419, 1746], description: "Координаты: -3163, 99, -1302" },
            { coordinates: [1421, 1734], description: "Координаты: -3187, 93, -1304" },
            { coordinates: [1441, 1775], description: "Координаты: -3104, 118, -1344" },
            { coordinates: [1444, 1779], description: "Координаты: -3094, 100, -1352" },
            { coordinates: [1444, 1774], description: "Координаты: -3106, 106, -1352" },
            { coordinates: [1451, 1780], description: "Координаты: -3094, 94, -1366" },
            { coordinates: [1452, 1775], description: "Координаты: -3104, 100, -1366" },
            { coordinates: [1456, 1730], description: "Координаты: -3193, 107, -1375" },
            { coordinates: [1472, 1722], description: "Координаты: -3212, 89, -1406" },
            { coordinates: [1413, 1693], description: "Координаты: -3269, 91, -1289" },
            { coordinates: [1413, 1696], description: "Координаты: -3264, 91, -1289" },
            { coordinates: [1418, 1701], description: "Координаты: -3252, 91, -1301" },
            { coordinates: [1456, 1687], description: "Координаты: -3283, 93, -1377" },
            { coordinates: [1490, 1703], description: "Координаты: -3250, 94, -1444" },
            { coordinates: [1547, 1732], description: "Координаты: -3192, 91, -1556" },
            { coordinates: [1539, 1737], description: "Координаты: -3180, 92, -1541" },
            { coordinates: [1544, 1749], description: "Координаты: -3159, 94, -1551" },
            { coordinates: [1543, 1753], description: "Координаты: -3148, 92, -1548" },
            { coordinates: [1542, 1767], description: "Координаты: -3122, 91, -1548" },
            { coordinates: [1558, 1762], description: "Координаты: -3132, 91, -1579" },
            { coordinates: [1563, 1774], description: "Координаты: -3108, 91, -1589" },
            { coordinates: [1565, 1786], description: "Координаты: -3083, 91, -1593" },
            { coordinates: [1558, 1804], description: "Координаты: -3048, 92, -1578" },
            { coordinates: [1558, 1815], description: "Координаты: -3024, 92, -1578" },
            { coordinates: [1546, 1775], description: "Координаты: -3106, 91, -1555" },
            { coordinates: [1546, 1781], description: "Координаты: -3092, 92, -1555" },
            { coordinates: [1533, 1780], description: "Координаты: -3096, 92, -1528" },
            { coordinates: [1532, 1781], description: "Координаты: -3094, 91, -1526" },
            { coordinates: [1521, 1783], description: "Координаты: -3090, 93, -1505" },
            { coordinates: [1533, 1797], description: "Координаты: -3060, 91, -1530" },
            { coordinates: [1540, 1807], description: "Координаты: -3042, 92, -1543" },
            { coordinates: [1532, 1820], description: "Координаты: -3016, 91, -1527" },
            { coordinates: [1539, 1830], description: "Координаты: -2995, 91, -1540" },
            // Полесское
            { coordinates: [2995, 2831], description: "Координаты: -992, 84, -4451" },
            { coordinates: [2982, 2806], description: "Координаты: -1042, 84, -4425" },
            { coordinates: [3006, 2802], description: "Координаты: -1052, 84, -4472" },
            { coordinates: [3036, 2749], description: "Координаты: -1155, 78, -4529" },
            { coordinates: [3041, 2791], description: "Координаты: -1071, 86, -4540" },
            { coordinates: [3063, 2755], description: "Координаты: -1143, 86, -4583" },
            { coordinates: [3068, 2738], description: "Координаты: -1177, 82, -4594" },
            { coordinates: [3106, 2807], description: "Координаты: -1040, 97, -4669" },
            { coordinates: [3122, 2776], description: "Координаты: -1099, 79, -4701" },
            { coordinates: [3068, 2738], description: "Координаты: -1177, 82, -4594" },
            { coordinates: [3147, 2808], description: "Координаты: -1036, 81, -4749" },
            { coordinates: [3119, 2755], description: "Координаты: -1144, 82, -4694" },
            { coordinates: [3121, 2714], description: "Координаты: -1224, 78, -4699" },
            { coordinates: [3119, 2694], description: "Координаты: -1266, 83, -4694" },
            { coordinates: [3149, 2723], description: "Координаты: -1207, 85, -4753" },
            { coordinates: [3145, 2704], description: "Координаты: -1246, 79, -4744" },
            { coordinates: [3225, 2581], description: "Координаты: -1490, 156, -4902" },
            { coordinates: [3238, 2596], description: "Координаты: -1459, 100, -4925" },
            { coordinates: [3293, 2636], description: "Координаты: -1382, 85, -5036" },
            { coordinates: [3319, 2712], description: "Координаты: -1228, 84, -5087" },
            { coordinates: [3372, 2711], description: "Координаты: -1233, 84, -5192" },
            { coordinates: [3242, 2732], description: "Координаты: -1191, 72, -4934" },
            { coordinates: [3254, 2797], description: "Координаты: -1060, 75, -4958" },
        ];

        // Группа маркеров
        toolGroup = L.layerGroup().addTo(map);

        // Добавление маркера для каждой координаты
        for (var i = 0; i < toolCoordinates.length; i++) {
            (function() {
                var coordinates = toolCoordinates[i].coordinates;
                var description = toolCoordinates[i].description;
                var imageSize = toolCoordinates[i].imageSize;
                var image = toolCoordinates[i].image;

                var tool = L.marker(coordinates, { icon: toolIcon })
                .bindPopup("<div class='marker-description'>" + description + "</div>")  // Текст всплывающего окна (если вдруг нужно добавить нумерацию, то можно внести после текста "Ящик с патронами" след. команду: + (i + 1) + )
                .addTo(toolGroup);
                // Добавление обработчика события нажатия для каждого маркера
            tool.on('click', function(e) {
                // При нажатии на маркер, необходимо проверить наличие изображения и добавить его в всплывающее окно
                if (image) {
                    var content = "<div class='custom-popup-content'>";
                    content += "<img src='" + image + "' width='" + imageSize[0] + "' height='" + imageSize[1] + "'<br>";
                    content += "<p class='marker-description'>" + description + "</p>";
                    content += "</div>";

                    // Создание всплывающего окна с контентом
                    var popup = L.popup().setContent(content);

                    // Показать всплывающее окно
                    e.target.bindPopup(popup).openPopup();
                }
            });
        })();
        }
    } else {
        // Удаление группы маркеров, если она существует
        if (toolGroup) {
        map.removeLayer(toolGroup);
        }
    }
});

showScienceMenu.addEventListener('change', function() {
    if (showScienceMenu.checked) {
        // Массив с координатами маркеров
        var scienceCoordinates = [
            // ТЛ
            { coordinates: [1695, 3607], description: "Координаты: 558, 98, -1854" },
            { coordinates: [1625, 3962], description: "Координаты: 1267, 60, -1715", image: 'images/markerscr/TL/s1.jpg', imageSize: [300, 300] },
            // Свалка
            { coordinates: [2107, 2996], description: "Координаты: -663, 73, -2680" },
            { coordinates: [2256, 3124], description: "Координаты: -406, 93, -2974" },
            // ТД
            { coordinates: [2203, 3768], description: "Координаты: 880, 81, -2871" },
            { coordinates: [2232, 3936], description: "Координаты: 1190, 79, -2928" },
            // Агропром
            { coordinates: [2359, 1981], description: "Координаты: -2693, 78, -3181" },
            { coordinates: [2011, 2064], description: "Координаты: -2528, 78, -2487" },
            // ДТ
            { coordinates: [2708, 2875], description: "Координаты: -906, 77, -3877" },
            // Янтарь
            { coordinates: [2620, 2195], description: "Координаты: -2264, 63, -3707" },
        ];

        // Группа маркеров
        scienceGroup = L.layerGroup().addTo(map);

        // Добавление маркера для каждой координаты
        for (var i = 0; i < scienceCoordinates.length; i++) {
            (function() {
                var coordinates = scienceCoordinates[i].coordinates;
                var description = scienceCoordinates[i].description;
                var imageSize = scienceCoordinates[i].imageSize;
                var image = scienceCoordinates[i].image;

                var science = L.marker(coordinates, { icon: scienceIcon })
                .bindPopup("<div class='marker-description'>" + description + "</div>")  // Текст всплывающего окна (если вдруг нужно добавить нумерацию, то можно внести после текста "Ящик с патронами" след. команду: + (i + 1) + )
                .addTo(scienceGroup);
                // Добавление обработчика события нажатия для каждого маркера
            science.on('click', function(e) {
                // При нажатии на маркер, необходимо проверить наличие изображения и добавить его в всплывающее окно
                if (image) {
                    var content = "<div class='custom-popup-content'>";
                    content += "<img src='" + image + "' width='" + imageSize[0] + "' height='" + imageSize[1] + "'<br>";
                    content += "<p class='marker-description'>" + description + "</p>";
                    content += "</div>";

                    // Создание всплывающего окна с контентом
                    var popup = L.popup().setContent(content);

                    // Показать всплывающее окно
                    e.target.bindPopup(popup).openPopup();
                }
            });
        })();
        }
    } else {
        // Удаление группы маркеров, если она существует
        if (scienceGroup) {
        map.removeLayer(scienceGroup);
        }
    }
});

showStashMenu.addEventListener('change', function() {
    if (showStashMenu.checked) {
        // Массив с координатами маркеров
        var stashCoordinates = [
            // Чернотопье
            { coordinates: [718, 3714], description: "Координаты: 773, 93, 102", image: 'images/Stashes/stashChernotope.png', imageSize: [125, 63] },
            // Предбанник
            { coordinates: [884, 3189], description: "Координаты: -278, 89, -229", image: 'images/Stashes/StashPred1.png', imageSize: [61, 61] },
            { coordinates: [750, 3295], description: "Координаты: -66, 94, 37", image: 'images/Stashes/StashPred2.png', imageSize: [188, 63] },
            { coordinates: [618, 3250], description: "Координаты: -155, 82, 301<br>Также лежит 500 RUB", image: 'images/Stashes/StashPred3.png', imageSize: [188, 63] },
            // Кордон
            { coordinates: [1639, 3271], description: "Координаты: -114, 106, -1741", image: 'images/Stashes/StashKordon1.png', imageSize: [188, 63] },
            { coordinates: [1493, 3255], description: "Координаты: -143, 79, -1447", image: 'images/Stashes/StashKordon2.png', imageSize: [126, 62] },
            { coordinates: [1349, 3050], description: "Координаты: -557, 63, -1160", image: 'images/Stashes/StashKordon3.png', imageSize: [188, 188] },
            // Топи
            { coordinates: [631, 2417], description: "Координаты: -1819, 95, 274", image: 'images/Stashes/StashTopi1.png', imageSize: [188, 188] },
            { coordinates: [786, 2122], description: "Координаты: -2412, 127, -35", image: 'images/Stashes/StashTopi2.png', imageSize: [188, 62] },
            // Агропром
            { coordinates: [2220, 2353], description: "Координаты: -1950, 77, -2904", image: 'images/Stashes/StashAgroprom.png', imageSize: [314, 126] },
            // ДТ
            { coordinates: [2717, 2661], description: "Координаты: -1331, 79, -3898", image: 'images/Stashes/StashDT.png', imageSize: [188, 125] },
            // Янтарь
            { coordinates: [2688, 2030], description: "Координаты: -2594, 61, -3840", image: 'images/Stashes/StashAmber.png', imageSize: [315, 63] },
        ];

        // Группа маркеров
        stashGroup = L.layerGroup().addTo(map);

        // Добавление маркера для каждой координаты
        for (var i = 0; i < stashCoordinates.length; i++) {
            (function() {
                var coordinates = stashCoordinates[i].coordinates;
                var description = stashCoordinates[i].description;
                var imageSize = stashCoordinates[i].imageSize;
                var image = stashCoordinates[i].image;

                var stash = L.marker(coordinates, { icon: stashIcon })
                .bindPopup("<div class='marker-description'>" + description + "</div>")  // Текст всплывающего окна (если вдруг нужно добавить нумерацию, то можно внести после текста "Ящик с патронами" след. команду: + (i + 1) + )
                .addTo(stashGroup);
                // Добавление обработчика события нажатия для каждого маркера
            stash.on('click', function(e) {
                // При нажатии на маркер, необходимо проверить наличие изображения и добавить его в всплывающее окно
                if (image) {
                    var content = "<div class='custom-popup-content'>";
                    content += "<img src='" + image + "' width='" + imageSize[0] + "' height='" + imageSize[1] + "'<br>";
                    content += "<p class='marker-description'>" + description + "</p>";
                    content += "</div>";

                    // Создание всплывающего окна с контентом
                    var popup = L.popup().setContent(content);

                    // Показать всплывающее окно
                    e.target.bindPopup(popup).openPopup();
                }
            });
        })();
        }
    } else {
        // Удаление группы маркеров, если она существует
        if (stashGroup) {
        map.removeLayer(stashGroup);
        }
    }
});

showBDMenu.addEventListener('change', function() {
    if (showBDMenu.checked) {
        // Массив с координатами маркеров
        var BDCoordinates = [
            // Чернотопье
            { coordinates: [768, 3791], description: "Слепые собаки" },
            { coordinates: [893, 3691], description: "Слепые собаки" },
            // Предбанник
            { coordinates: [662, 3353], description: "Слепые собаки" },
            { coordinates: [653, 3268], description: "Слепые собаки" },
            { coordinates: [656, 3000], description: "Слепые собаки" },
            { coordinates: [785, 3074], description: "Слепые собаки" },
            { coordinates: [853, 3129], description: "Слепые собаки" },
            { coordinates: [897, 3112], description: "Слепые собаки" },
            { coordinates: [943, 3113], description: "Слепые собаки" },
            { coordinates: [1084, 3252], description: "Слепые собаки" },
            { coordinates: [1084, 3287], description: "Слепые собаки" },
            { coordinates: [692, 2989], description: "Слепые собаки" },
            { coordinates: [1018, 3159], description: "Слепые собаки" },
            { coordinates: [1058, 3313], description: "Слепые собаки" },
            { coordinates: [568, 3258], description: "Слепые собаки" },
            // Кордон
            { coordinates: [1476, 2961], description: "Слепые собаки" },
            { coordinates: [1554, 3000], description: "Слепые собаки" },
            { coordinates: [1560, 3137], description: "Слепые собаки" },
            { coordinates: [1691, 3056], description: "Слепые собаки" },
            { coordinates: [1730, 3079], description: "Слепые собаки" },
            { coordinates: [1675, 3147], description: "Слепые собаки" },
            { coordinates: [1675, 3190], description: "Слепые собаки" },
            // Топи
            { coordinates: [1060, 2517], description: "Слепые собаки" },
            { coordinates: [1011, 2561], description: "Слепые собаки" },
            { coordinates: [1033, 2610], description: "Слепые собаки" },
            { coordinates: [840, 2484], description: "Слепые собаки" },
            { coordinates: [939, 2427], description: "Слепые собаки" },
            { coordinates: [688, 2201], description: "Слепые собаки" },
            { coordinates: [1051, 2288], description: "Слепые собаки" },
            // ТЛ
            { coordinates: [1410, 3740], description: "Слепые собаки" },
            { coordinates: [1431, 3948], description: "Слепые собаки" },
            { coordinates: [1466, 3932], description: "Слепые собаки" },
            { coordinates: [2042, 3702], description: "Слепые собаки" },
            { coordinates: [2026, 3674], description: "Слепые собаки" },
            // Свалка
            { coordinates: [2309, 2973], description: "Слепые собаки" },
            { coordinates: [2204, 3138], description: "Слепые собаки" },
            { coordinates: [2149, 3205], description: "Слепые собаки" },
            { coordinates: [2082, 2977], description: "Слепые собаки" },
            // Редколесье
            { coordinates: [1970, 2681], description: "Слепые собаки" },
            { coordinates: [1834, 2525], description: "Слепые собаки" },
            { coordinates: [1635, 2588], description: "Слепые собаки" },
            { coordinates: [1533, 2422], description: "Слепые собаки" },
            { coordinates: [1611, 2177], description: "Слепые собаки" },
            // ТД
            { coordinates: [2490, 3834], description: "Слепые собаки" },
            { coordinates: [2448, 3838], description: "Слепые собаки" },
            { coordinates: [2389, 3801], description: "Слепые собаки" },
            { coordinates: [2403, 3986], description: "Слепые собаки" },
            { coordinates: [2376, 4107], description: "Слепые собаки" },
            { coordinates: [2272, 4052], description: "Слепые собаки" },
            { coordinates: [2232, 3700], description: "Слепые собаки" },
            { coordinates: [2338, 3913], description: "Слепые собаки" },
            { coordinates: [2372, 3871], description: "Слепые собаки" },
            // Агропром
            { coordinates: [2307, 2370], description: "Слепые собаки" },
            { coordinates: [2299, 2483], description: "Слепые собаки" },
            { coordinates: [2257, 2146], description: "Слепые собаки" },
            { coordinates: [2198, 2140], description: "Слепые собаки" },
            { coordinates: [2054, 2132], description: "Слепые собаки" },
            { coordinates: [2151, 2197], description: "Слепые собаки" },
            { coordinates: [2097, 2349], description: "Слепые собаки" },
            { coordinates: [2172, 2363], description: "Слепые собаки" },
            // Бар
            { coordinates: [2643, 3022], description: "Слепые собаки" },
            { coordinates: [2584, 3107], description: "Слепые собаки" },
            { coordinates: [2531, 3118], description: "Слепые собаки" },
            // ДТ
            { coordinates: [2815, 2833], description: "Слепые собаки" },
            { coordinates: [2741, 2736], description: "Слепые собаки" },
            { coordinates: [2817, 2657], description: "Слепые собаки" },
            { coordinates: [2641, 2646], description: "Слепые собаки" },
            // Янтарь
            { coordinates: [2833, 2360], description: "Слепые собаки" },
            { coordinates: [2884, 2486], description: "Слепые собаки" },
            { coordinates: [2983, 2463], description: "Слепые собаки" },
            { coordinates: [3009, 2381], description: "Слепые собаки" },
            { coordinates: [3101, 2415], description: "Слепые собаки" },
            { coordinates: [3088, 2471], description: "Слепые собаки" },
            { coordinates: [2910, 2335], description: "Слепые собаки" },
            // Стройплощадка
            { coordinates: [1371, 1952], description: "Слепые собаки" },
            { coordinates: [1465, 1878], description: "Слепые собаки" },
            { coordinates: [1401, 1764], description: "Слепые собаки" },
            { coordinates: [1368, 1680], description: "Слепые собаки" },
            { coordinates: [1367, 1850], description: "Слепые собаки" },
            // Полесское
            { coordinates: [2976, 2890], description: "Слепые собаки" },
            { coordinates: [3053, 2709], description: "Слепые собаки" },
            { coordinates: [3104, 2706], description: "Слепые собаки" },
            { coordinates: [3102, 2774], description: "Слепые собаки" },
            { coordinates: [3019, 2638], description: "Слепые собаки" },
            { coordinates: [2986, 2814], description: "Слепые собаки" },
            { coordinates: [3110, 2855], description: "Слепые собаки" },
            { coordinates: [3190, 2575], description: "Слепые собаки" },
            { coordinates: [3386, 2812], description: "Слепые собаки" },
            { coordinates: [3249, 2646], description: "Слепые собаки" },
            { coordinates: [3357, 2760], description: "Слепые собаки" },
            { coordinates: [3180, 2868], description: "Слепые собаки" },
        ];

        // Группа маркеров
        BDGroup = L.layerGroup().addTo(map);

        // Добавление маркера для каждой координаты
        for (var i = 0; i < BDCoordinates.length; i++) {
            (function() {
                var coordinates = BDCoordinates[i].coordinates;
                var description = BDCoordinates[i].description;
                var imageSize = BDCoordinates[i].imageSize;
                var image = BDCoordinates[i].image;

                var BD = L.marker(coordinates, { icon: BDIcon })
                .bindPopup("<div class='marker-description'>" + description + "</div>")  // Текст всплывающего окна (если вдруг нужно добавить нумерацию, то можно внести после текста "Ящик с патронами" след. команду: + (i + 1) + )
                .addTo(BDGroup);
                // Добавление обработчика события нажатия для каждого маркера
            BD.on('click', function(e) {
                // При нажатии на маркер, необходимо проверить наличие изображения и добавить его в всплывающее окно
                if (image) {
                    var content = "<div class='custom-popup-content'>";
                    content += "<img src='" + image + "' width='" + imageSize[0] + "' height='" + imageSize[1] + "'<br>";
                    content += "<p class='marker-description'>" + description + "</p>";
                    content += "</div>";

                    // Создание всплывающего окна с контентом
                    var popup = L.popup().setContent(content);

                    // Показать всплывающее окно
                    e.target.bindPopup(popup).openPopup();
                }
            });
        })();
        }
    } else {
        // Удаление группы маркеров, если она существует
        if (BDGroup) {
        map.removeLayer(BDGroup);
        }
    }
});

showPDMenu.addEventListener('change', function() {
    if (showPDMenu.checked) {
        // Массив с координатами маркеров
        var PDCoordinates = [
            // Кордон
            { coordinates: [1549, 2990], description: "Псевдособаки" },
            { coordinates: [1675, 3200], description: "Псевдособаки" },
            // Топи
            { coordinates: [761, 2603], description: "Псевдособаки" },
            { coordinates: [895, 2469], description: "Псевдособаки" },
            { coordinates: [582, 2583], description: "Псевдособаки" },
            { coordinates: [682, 2187], description: "Псевдособаки" },
            { coordinates: [780, 2186], description: "Псевдособаки" },
            { coordinates: [1056, 2278], description: "Псевдособаки" },
            // ТЛ
            { coordinates: [1392, 3920], description: "Псевдособаки" },
            { coordinates: [2042, 3714], description: "Псевдособаки" },
            // Свалка
            { coordinates: [2203, 3130], description: "Псевдособаки" },
            { coordinates: [2235, 3266], description: "Псевдособаки" },
            // Редколесье
            { coordinates: [1968, 2671], description: "Псевдособаки" },
            { coordinates: [1627, 2172], description: "Псевдособаки" },
            // ТД
            { coordinates: [2495, 3618], description: "Псевдособаки" },
            { coordinates: [2333, 4087], description: "Псевдособаки" },
            { coordinates: [2377, 3871], description: "Псевдособаки" },
            // Агропром
            { coordinates: [2172, 2418], description: "Псевдособаки" },
            { coordinates: [2379, 2328], description: "Псевдособаки" },
            // Бар
            { coordinates: [2661, 3040], description: "Псевдособаки" },
            { coordinates: [2592, 3106], description: "Псевдособаки" },
            { coordinates: [2700, 2753], description: "Псевдособаки" },
            // ДТ
            { coordinates: [2740, 2733], description: "Псевдособаки" },
            // Янтарь
            { coordinates: [2831, 2363], description: "Псевдособаки" },
            { coordinates: [2913, 2331], description: "Псевдособаки" },
            // Стройплощадка
            { coordinates: [1456, 1876], description: "Псевдособаки" },
            { coordinates: [1566, 1883], description: "Псевдособаки" },
            // Полесское
            { coordinates: [3111, 2846], description: "Псевдособаки" },
            { coordinates: [3193, 2584], description: "Псевдособаки" },
        ];

        // Группа маркеров
        PDGroup = L.layerGroup().addTo(map);

        // Добавление маркера для каждой координаты
        for (var i = 0; i < PDCoordinates.length; i++) {
            (function() {
                var coordinates = PDCoordinates[i].coordinates;
                var description = PDCoordinates[i].description;
                var imageSize = PDCoordinates[i].imageSize;
                var image = PDCoordinates[i].image;

                var PD = L.marker(coordinates, { icon: PDIcon })
                .bindPopup("<div class='marker-description'>" + description + "</div>")  // Текст всплывающего окна (если вдруг нужно добавить нумерацию, то можно внести после текста "Ящик с патронами" след. команду: + (i + 1) + )
                .addTo(PDGroup);
                // Добавление обработчика события нажатия для каждого маркера
            PD.on('click', function(e) {
                // При нажатии на маркер, необходимо проверить наличие изображения и добавить его в всплывающее окно
                if (image) {
                    var content = "<div class='custom-popup-content'>";
                    content += "<img src='" + image + "' width='" + imageSize[0] + "' height='" + imageSize[1] + "'<br>";
                    content += "<p class='marker-description'>" + description + "</p>";
                    content += "</div>";

                    // Создание всплывающего окна с контентом
                    var popup = L.popup().setContent(content);

                    // Показать всплывающее окно
                    e.target.bindPopup(popup).openPopup();
                }
            });
        })();
        }
    } else {
        // Удаление группы маркеров, если она существует
        if (PDGroup) {
        map.removeLayer(PDGroup);
        }
    }
});

showFleshMenu.addEventListener('change', function() {
    if (showFleshMenu.checked) {
        // Массив с координатами маркеров
        var FleshCoordinates = [
            // Предбанник
            { coordinates: [1028, 3134], description: "Плоти" },
            { coordinates: [989, 3338], description: "Плоти" },
            // Кордон
            { coordinates: [1619, 2991], description: "Плоти" },
            // Топи
            { coordinates: [1036, 2647], description: "Плоти" },
            { coordinates: [946, 2515], description: "Плоти" },
            { coordinates: [809, 2390], description: "Плоти" },
            { coordinates: [751, 2279], description: "Плоти" },
            // ТЛ
            { coordinates: [1445, 3787], description: "Плоти" },
            { coordinates: [1511, 3965], description: "Плоти" },
            { coordinates: [1540, 4006], description: "Плоти" },
            { coordinates: [1749, 3711], description: "Плоти" },
            { coordinates: [1976, 3726], description: "Плоти" },
            // Свалка
            { coordinates: [2347, 2971], description: "Плоти" },
            { coordinates: [2082, 3121], description: "Плоти" },
            { coordinates: [2233, 3201], description: "Плоти" },
            // Редколесье
            { coordinates: [1933, 2588], description: "Плоти" },
            { coordinates: [1911, 2515], description: "Плоти" },
            { coordinates: [1789, 2499], description: "Плоти" },
            { coordinates: [1570, 2466], description: "Плоти" },
            // ТД
            { coordinates: [2519, 3827], description: "Плоти" },
            { coordinates: [2492, 3968], description: "Плоти" },
            { coordinates: [2283, 4007], description: "Плоти" },
            { coordinates: [2204, 3996], description: "Плоти" },
            { coordinates: [2310, 3725], description: "Плоти" },
            // Агропром
            { coordinates: [2393, 2406], description: "Плоти" },
            { coordinates: [2274, 2297], description: "Плоти" },
            { coordinates: [2228, 2236], description: "Плоти" },
            { coordinates: [2199, 2247], description: "Плоти" },
            { coordinates: [2137, 2055], description: "Плоти" },
            { coordinates: [2032, 2280], description: "Плоти" },
            // Бар
            { coordinates: [2549, 3154], description: "Плоти" },
            // ДТ
            { coordinates: [2655, 2827], description: "Плоти" },
            // Янтарь
            { coordinates: [2814, 2287], description: "Плоти" },
            { coordinates: [3073, 2431], description: "Плоти" },
            // Стройплощадка
            { coordinates: [1386, 1915], description: "Плоти" },
            { coordinates: [1433, 1900], description: "Плоти" },
            // Полесское
            { coordinates: [3013, 2702], description: "Плоти" },
            { coordinates: [3009, 2801], description: "Плоти" },
            { coordinates: [3192, 2854], description: "Плоти" },
            { coordinates: [3385, 2651], description: "Плоти" },
        ];

        // Группа маркеров
        FleshGroup = L.layerGroup().addTo(map);

        // Добавление маркера для каждой координаты
        for (var i = 0; i < FleshCoordinates.length; i++) {
            (function() {
                var coordinates = FleshCoordinates[i].coordinates;
                var description = FleshCoordinates[i].description;
                var imageSize = FleshCoordinates[i].imageSize;
                var image = FleshCoordinates[i].image;

                var Flesh = L.marker(coordinates, { icon: FleshIcon })
                .bindPopup("<div class='marker-description'>" + description + "</div>")  // Текст всплывающего окна (если вдруг нужно добавить нумерацию, то можно внести после текста "Ящик с патронами" след. команду: + (i + 1) + )
                .addTo(FleshGroup);
                // Добавление обработчика события нажатия для каждого маркера
            Flesh.on('click', function(e) {
                // При нажатии на маркер, необходимо проверить наличие изображения и добавить его в всплывающее окно
                if (image) {
                    var content = "<div class='custom-popup-content'>";
                    content += "<img src='" + image + "' width='" + imageSize[0] + "' height='" + imageSize[1] + "'<br>";
                    content += "<p class='marker-description'>" + description + "</p>";
                    content += "</div>";

                    // Создание всплывающего окна с контентом
                    var popup = L.popup().setContent(content);

                    // Показать всплывающее окно
                    e.target.bindPopup(popup).openPopup();
                }
            });
        })();
        }
    } else {
        // Удаление группы маркеров, если она существует
        if (FleshGroup) {
        map.removeLayer(FleshGroup);
        }
    }
});

showBoarMenu.addEventListener('change', function() {
    if (showBoarMenu.checked) {
        // Массив с координатами маркеров
        var BoarCoordinates = [
            // Предбанник
            { coordinates: [855, 3175], description: "Кабаны" },
            { coordinates: [838, 3080], description: "Кабаны" },
            { coordinates: [823, 2989], description: "Кабаны" },
            // Кордон
            { coordinates: [1389, 3031], description: "Кабаны" },
            { coordinates: [1501, 3012], description: "Кабаны" },
            { coordinates: [1564, 3214], description: "Кабаны" },
            { coordinates: [1618, 3131], description: "Кабаны" },
            { coordinates: [1754, 3132], description: "Кабаны" },
            { coordinates: [1622, 2929], description: "Кабаны" },
            // Топи
            { coordinates: [1063, 2567], description: "Кабаны" },
            { coordinates: [725, 2544], description: "Кабаны" },
            { coordinates: [884, 2234], description: "Кабаны" },
            { coordinates: [1005, 2180], description: "Кабаны" },
            // ТЛ
            { coordinates: [1497, 3816], description: "Кабаны" },
            { coordinates: [1712, 3826], description: "Кабаны" },
            // Свалка
            { coordinates: [2376, 3170], description: "Кабаны" },
            { coordinates: [2267, 3027], description: "Кабаны" },
            // Редколесье
            { coordinates: [1883, 2412], description: "Кабаны" },
            { coordinates: [1875, 2314], description: "Кабаны" },
            { coordinates: [1805, 2360], description: "Кабаны" },
            { coordinates: [1661, 2242], description: "Кабаны" },
            // ТД
            { coordinates: [2269, 3646], description: "Кабаны" },
            { coordinates: [2255, 3837], description: "Кабаны" },
            { coordinates: [2472, 4101], description: "Кабаны" },
            // Агропром
            { coordinates: [2417, 2343], description: "Кабаны" },
            { coordinates: [2385, 2473], description: "Кабаны" },
            { coordinates: [2298, 1973], description: "Кабаны" },
            { coordinates: [2257, 2104], description: "Кабаны" },
            { coordinates: [2122, 2189], description: "Кабаны" },
            { coordinates: [2070, 2132], description: "Кабаны" },
            { coordinates: [1989, 2185], description: "Кабаны" },
            { coordinates: [2099, 2411], description: "Кабаны" },
            // Янтарь
            { coordinates: [2889, 2537], description: "Кабаны" },
            { coordinates: [3054, 2292], description: "Кабаны" },
            // Полесское
            { coordinates: [3378, 2636], description: "Кабаны" },
            { coordinates: [3159, 2864], description: "Кабаны" },
            { coordinates: [3121, 2623], description: "Кабаны" },
            { coordinates: [3220, 2876], description: "Кабаны" },
        ];

        // Группа маркеров
        BoarGroup = L.layerGroup().addTo(map);

        // Добавление маркера для каждой координаты
        for (var i = 0; i < BoarCoordinates.length; i++) {
            (function() {
                var coordinates = BoarCoordinates[i].coordinates;
                var description = BoarCoordinates[i].description;
                var imageSize = BoarCoordinates[i].imageSize;
                var image = BoarCoordinates[i].image;

                var Boar = L.marker(coordinates, { icon: BoarIcon })
                .bindPopup("<div class='marker-description'>" + description + "</div>")  // Текст всплывающего окна (если вдруг нужно добавить нумерацию, то можно внести после текста "Ящик с патронами" след. команду: + (i + 1) + )
                .addTo(BoarGroup);
                // Добавление обработчика события нажатия для каждого маркера
            Boar.on('click', function(e) {
                // При нажатии на маркер, необходимо проверить наличие изображения и добавить его в всплывающее окно
                if (image) {
                    var content = "<div class='custom-popup-content'>";
                    content += "<img src='" + image + "' width='" + imageSize[0] + "' height='" + imageSize[1] + "'<br>";
                    content += "<p class='marker-description'>" + description + "</p>";
                    content += "</div>";

                    // Создание всплывающего окна с контентом
                    var popup = L.popup().setContent(content);

                    // Показать всплывающее окно
                    e.target.bindPopup(popup).openPopup();
                }
            });
        })();
        }
    } else {
        // Удаление группы маркеров, если она существует
        if (BoarGroup) {
        map.removeLayer(BoarGroup);
        }
    }
});

showRatMenu.addEventListener('change', function() {
    if (showRatMenu.checked) {
        // Массив с координатами маркеров
        var RatCoordinates = [
            // ТЛ
            { coordinates: [1641, 3880], description: "Крысы" },
            // Агропром
            { coordinates: [2241, 2311], description: "Крысы<br>Подземелья Агропрома" },
            // Стройплощадка
            { coordinates: [1458, 1730], description: "Крысы" },
        ];

        // Группа маркеров
        RatGroup = L.layerGroup().addTo(map);

        // Добавление маркера для каждой координаты
        for (var i = 0; i < RatCoordinates.length; i++) {
            (function() {
                var coordinates = RatCoordinates[i].coordinates;
                var description = RatCoordinates[i].description;
                var imageSize = RatCoordinates[i].imageSize;
                var image = RatCoordinates[i].image;

                var Rat = L.marker(coordinates, { icon: RatIcon })
                .bindPopup("<div class='marker-description'>" + description + "</div>")  // Текст всплывающего окна (если вдруг нужно добавить нумерацию, то можно внести после текста "Ящик с патронами" след. команду: + (i + 1) + )
                .addTo(RatGroup);
                // Добавление обработчика события нажатия для каждого маркера
            Rat.on('click', function(e) {
                // При нажатии на маркер, необходимо проверить наличие изображения и добавить его в всплывающее окно
                if (image) {
                    var content = "<div class='custom-popup-content'>";
                    content += "<img src='" + image + "' width='" + imageSize[0] + "' height='" + imageSize[1] + "'<br>";
                    content += "<p class='marker-description'>" + description + "</p>";
                    content += "</div>";

                    // Создание всплывающего окна с контентом
                    var popup = L.popup().setContent(content);

                    // Показать всплывающее окно
                    e.target.bindPopup(popup).openPopup();
                }
            });
        })();
        }
    } else {
        // Удаление группы маркеров, если она существует
        if (RatGroup) {
        map.removeLayer(RatGroup);
        }
    }
});

showSnorkMenu.addEventListener('change', function() {
    if (showSnorkMenu.checked) {
        // Массив с координатами маркеров
        var SnorkCoordinates = [
            // Кордон
            { coordinates: [1558, 2927], description: "Снорки<br>Лаборатория в тоннеле" },
            // Топи
            { coordinates: [875, 2605], description: "Снорки" },
            { coordinates: [766, 2536], description: "Снорки" },
            { coordinates: [748, 2380], description: "Снорки" },
            { coordinates: [833, 2363], description: "Снорки" },
            // ТЛ
            { coordinates: [1664, 3911], description: "Снорки" },
            { coordinates: [1667, 3880], description: "Снорки" },
            { coordinates: [1739, 3963], description: "Снорки" },
            // Свалка
            { coordinates: [2294, 3166], description: "Снорки" },
            // Редколесье
            { coordinates: [1884, 2471], description: "Снорки" },
            { coordinates: [1487, 2329], description: "Снорки" },
            // ТД
            { coordinates: [2268, 3752], description: "Снорки" },
            { coordinates: [2362, 4077], description: "Снорки" },
            { coordinates: [2438, 3873], description: "Снорки" },
            { coordinates: [2426, 3869], description: "Снорки" },
            { coordinates: [2438, 3838], description: "Снорки" },
            { coordinates: [2453, 3835], description: "Снорки<br>Лаборатория в пещере" },
            { coordinates: [2357, 3899], description: "Снорки" },
            { coordinates: [2356, 3879], description: "Снорки<br> Лаборатория X-18<br>-1 этаж" },
            { coordinates: [2332, 3900], description: "Снорки<br> Лаборатория X-18<br>-1 этаж" },
            { coordinates: [2325, 3899], description: "Снорки<br> Лаборатория X-18<br>-1 этаж" },
            { coordinates: [2331, 3905], description: "Снорки<br> Лаборатория X-18<br>-2 этаж" },
            // Агропром
            { coordinates: [2353, 1999], description: "Снорки" },
            { coordinates: [2350, 2142], description: "Снорки" },
            { coordinates: [2091, 2046], description: "Снорки" },
            { coordinates: [2228, 1985], description: "Снорки" },
            // ДТ
            { coordinates: [2778, 2843], description: "Снорки" },
            { coordinates: [2700, 2808], description: "Снорки" },
            { coordinates: [2726, 2690], description: "Снорки" },
            // Янтарь + Поляна
            { coordinates: [2717, 2351], description: "Снорки" },
            { coordinates: [2690, 2342], description: "Снорки" },
            { coordinates: [2696, 2374], description: "Снорки" },
            { coordinates: [2649, 2324], description: "Снорки" },
            { coordinates: [2645, 2429], description: "Снорки" },
            { coordinates: [2617, 2342], description: "Снорки" },
            { coordinates: [2640, 2143], description: "Снорки" },
            { coordinates: [2565, 1944], description: "Снорки" },
            { coordinates: [2519, 2267], description: "Снорки" },
            { coordinates: [2867, 2432], description: "Снорки" },
            { coordinates: [3052, 2261], description: "Снорки" },
            { coordinates: [2698, 2328], description: "Снорки" },
            { coordinates: [2689, 2289], description: "Снорки<br>Лаборатория X-16" },
            { coordinates: [2708, 2264], description: "Снорки<br>Лаборатория X-16" },
            { coordinates: [2703, 2144], description: "Снорки<br>Лаборатория X-16" },
            { coordinates: [2664, 2055], description: "Снорки<br>Лаборатория X-16" },
            { coordinates: [2642, 2057], description: "Снорки<br>Лаборатория X-16" },
            { coordinates: [2559, 2135], description: "Снорки" },
            // Стройплощадка
            { coordinates: [1425, 1933], description: "Снорки" },
            { coordinates: [1480, 1846], description: "Снорки" },
            { coordinates: [1570, 1922], description: "Снорки" },
            // Полесское
            { coordinates: [2996, 2742], description: "Снорки" },
            { coordinates: [3304, 2622], description: "Снорки" },
            { coordinates: [3310, 2805], description: "Снорки" },
        ];

        // Группа маркеров
        SnorkGroup = L.layerGroup().addTo(map);

        // Добавление маркера для каждой координаты
        for (var i = 0; i < SnorkCoordinates.length; i++) {
            (function() {
                var coordinates = SnorkCoordinates[i].coordinates;
                var description = SnorkCoordinates[i].description;
                var imageSize = SnorkCoordinates[i].imageSize;
                var image = SnorkCoordinates[i].image;

                var Snork = L.marker(coordinates, { icon: SnorkIcon })
                .bindPopup("<div class='marker-description'>" + description + "</div>")  // Текст всплывающего окна (если вдруг нужно добавить нумерацию, то можно внести после текста "Ящик с патронами" след. команду: + (i + 1) + )
                .addTo(SnorkGroup);
                // Добавление обработчика события нажатия для каждого маркера
            Snork.on('click', function(e) {
                // При нажатии на маркер, необходимо проверить наличие изображения и добавить его в всплывающее окно
                if (image) {
                    var content = "<div class='custom-popup-content'>";
                    content += "<img src='" + image + "' width='" + imageSize[0] + "' height='" + imageSize[1] + "'<br>";
                    content += "<p class='marker-description'>" + description + "</p>";
                    content += "</div>";

                    // Создание всплывающего окна с контентом
                    var popup = L.popup().setContent(content);

                    // Показать всплывающее окно
                    e.target.bindPopup(popup).openPopup();
                }
            });
        })();
        }
    } else {
        // Удаление группы маркеров, если она существует
        if (SnorkGroup) {
        map.removeLayer(SnorkGroup);
        }
    }
});

showZombieMenu.addEventListener('change', function() {
    if (showZombieMenu.checked) {
        // Массив с координатами маркеров
        var ZombieCoordinates = [
            // Чернотопье
            { coordinates: [756, 3513], description: "Зомби" },
            // Предбанник
            { coordinates: [1042, 3278], description: "Зомби" },
            { coordinates: [1039, 3227], description: "Зомби" },
            { coordinates: [1063, 3180], description: "Зомби" },
            { coordinates: [1093, 3195], description: "Зомби" },
            // Кордон
            { coordinates: [1561, 2946], description: "Зомби<br>Лаборатория в тоннеле" },
            { coordinates: [1473, 3327], description: "Зомби<br>Мини лаборатория в тоннеле" },
            // Топи
            { coordinates: [972, 2684], description: "Зомби<br>Находится в лаборатории" },
            { coordinates: [612, 2415], description: "Зомби" },
            { coordinates: [656, 2183], description: "Зомби" },
            // ТЛ
            { coordinates: [1627, 3937], description: "Зомби" },
            { coordinates: [1601, 3883], description: "Зомби" },
            // Редколесье
            { coordinates: [1883, 2375], description: "Зомби" },
            // ТД
            { coordinates: [2494, 3822], description: "Зомби" },
            { coordinates: [2315, 3878], description: "Зомби<br>Лаборатория X-18<br>-1 этаж" },
            { coordinates: [2347, 3899], description: "Зомби<br>Лаборатория X-18<br>-1 этаж" },
            { coordinates: [2355, 3891], description: "Зомби<br>Лаборатория X-18<br>-2 этаж" },
            { coordinates: [2272, 4066], description: "Зомби" },
            { coordinates: [2243, 4062], description: "Зомби" },
            { coordinates: [2236, 4051], description: "Зомби" },
            // Агропром
            { coordinates: [2196, 2320], description: "Зомби<br>Подземелья Агропрома" },
            { coordinates: [2224, 1982], description: "Зомби" },
            { coordinates: [2189, 2027], description: "Зомби" },
            // Янтарь
            { coordinates: [2755, 2292], description: "Зомби" },
            { coordinates: [3100, 2449], description: "Зомби" },
            { coordinates: [2705, 2220], description: "Зомби<br>Лаборатория X-16" },
            // Стройплощадка
            { coordinates: [1481, 1707], description: "Зомби" },
            { coordinates: [1528, 1806], description: "Зомби" },
            { coordinates: [1560, 1808], description: "Зомби" },
            // Полесское
            { coordinates: [2997, 2807], description: "Зомби" },
            { coordinates: [2977, 2800], description: "Зомби" },
            { coordinates: [3295, 2608], description: "Зомби" },
        ];

        // Группа маркеров
        ZombieGroup = L.layerGroup().addTo(map);

        // Добавление маркера для каждой координаты
        for (var i = 0; i < ZombieCoordinates.length; i++) {
            (function() {
                var coordinates = ZombieCoordinates[i].coordinates;
                var description = ZombieCoordinates[i].description;
                var imageSize = ZombieCoordinates[i].imageSize;
                var image = ZombieCoordinates[i].image;

                var Zombie = L.marker(coordinates, { icon: ZombieIcon })
                .bindPopup("<div class='marker-description'>" + description + "</div>")  // Текст всплывающего окна (если вдруг нужно добавить нумерацию, то можно внести после текста "Ящик с патронами" след. команду: + (i + 1) + )
                .addTo(ZombieGroup);
                // Добавление обработчика события нажатия для каждого маркера
            Zombie.on('click', function(e) {
                // При нажатии на маркер, необходимо проверить наличие изображения и добавить его в всплывающее окно
                if (image) {
                    var content = "<div class='custom-popup-content'>";
                    content += "<img src='" + image + "' width='" + imageSize[0] + "' height='" + imageSize[1] + "'<br>";
                    content += "<p class='marker-description'>" + description + "</p>";
                    content += "</div>";

                    // Создание всплывающего окна с контентом
                    var popup = L.popup().setContent(content);

                    // Показать всплывающее окно
                    e.target.bindPopup(popup).openPopup();
                }
            });
        })();
        }
    } else {
        // Удаление группы маркеров, если она существует
        if (ZombieGroup) {
        map.removeLayer(ZombieGroup);
        }
    }
});

showBSMenu.addEventListener('change', function() {
    if (showBSMenu.checked) {
        // Массив с координатами маркеров
        var BSCoordinates = [
            // Топи
            { coordinates: [968, 2677], description: "Кровосос<br>Находится в лаборатории" },
            { coordinates: [605, 2393], description: "Кровосос" },
            // ТЛ
            { coordinates: [1414, 4022], description: "Кровосос" },
            { coordinates: [1852, 3691], description: "Кровосос" },
            // Свалка
            { coordinates: [2290, 2910], description: "Кровосос" },
            // Редколесье
            { coordinates: [2043, 2599], description: "Кровосос" },
            { coordinates: [1611, 2621], description: "Кровосос" },
            { coordinates: [1806, 2345], description: "Кровосос" },
            // ТД
            { coordinates: [2362, 3857], description: "Кровосос" },
            { coordinates: [2342, 3912], description: "Кровосос<br>Лаборатория X-18<br>-1 этаж" },
            { coordinates: [2380, 4061], description: "Кровосос" },
            { coordinates: [2239, 4056], description: "Кровосос" },
            { coordinates: [2227, 4047], description: "Кровосос" },
            // Агропром
            { coordinates: [2207, 2449], description: "Кровосос" },
            { coordinates: [2205, 2257], description: "Кровосос" },
            { coordinates: [2219, 2029], description: "Кровосос" },
            // Бар
            { coordinates: [2506, 3185], description: "Кровосос" },
            // ДТ
            { coordinates: [2758, 2860], description: "Кровосос" },
            { coordinates: [2771, 2843], description: "Кровосос" },
            { coordinates: [2737, 2771], description: "Кровосос" },
            { coordinates: [2766, 2619], description: "Кровосос" },
            // Янтарь + Поляна
            { coordinates: [2640, 2379], description: "Кровосос" },
            { coordinates: [2703, 2317], description: "Кровосос" },
            { coordinates: [2554, 2027], description: "Кровосос" },
            { coordinates: [2951, 2520], description: "Кровосос" },
            { coordinates: [3081, 2369], description: "Кровосос" },
            { coordinates: [3099, 2388], description: "Кровосос" },
            { coordinates: [3121, 2421], description: "Кровосос" },
            { coordinates: [2650, 2048], description: "Кровосос<br>Лаборатория X-16" },
            // Полесское
            { coordinates: [2986, 2831], description: "Кровосос" },
            { coordinates: [3277, 2785], description: "Кровосос" },
        ];

        // Группа маркеров
        BSGroup = L.layerGroup().addTo(map);

        // Добавление маркера для каждой координаты
        for (var i = 0; i < BSCoordinates.length; i++) {
            (function() {
                var coordinates = BSCoordinates[i].coordinates;
                var description = BSCoordinates[i].description;
                var imageSize = BSCoordinates[i].imageSize;
                var image = BSCoordinates[i].image;

                var BS = L.marker(coordinates, { icon: BSIcon })
                .bindPopup("<div class='marker-description'>" + description + "</div>")  // Текст всплывающего окна (если вдруг нужно добавить нумерацию, то можно внести после текста "Ящик с патронами" след. команду: + (i + 1) + )
                .addTo(BSGroup);
                // Добавление обработчика события нажатия для каждого маркера
            BS.on('click', function(e) {
                // При нажатии на маркер, необходимо проверить наличие изображения и добавить его в всплывающее окно
                if (image) {
                    var content = "<div class='custom-popup-content'>";
                    content += "<img src='" + image + "' width='" + imageSize[0] + "' height='" + imageSize[1] + "'<br>";
                    content += "<p class='marker-description'>" + description + "</p>";
                    content += "</div>";

                    // Создание всплывающего окна с контентом
                    var popup = L.popup().setContent(content);

                    // Показать всплывающее окно
                    e.target.bindPopup(popup).openPopup();
                }
            });
        })();
        }
    } else {
        // Удаление группы маркеров, если она существует
        if (BSGroup) {
        map.removeLayer(BSGroup);
        }
    }
});

showSBSMenu.addEventListener('change', function() {
    if (showSBSMenu.checked) {
        // Массив с координатами маркеров
        var SBSCoordinates = [
            // Свалка
            { coordinates: [2242, 2873], description: "Матёрый кровосос<br>Находится в тоннеле" },
            // Редколесье
            { coordinates: [1772, 2508], description: "Матёрый кровосос" },
            // ТД
            { coordinates: [2265, 4083], description: "Матёрый кровосос" },
            { coordinates: [2432, 3834], description: "Матёрый кровосос<br>Лаборатория в пещере" },
            { coordinates: [2366, 3863], description: "Матёрый кровосос" },
            { coordinates: [2344, 3869], description: "Матёрый кровосос<br>Лаборатория X-18<br>-2 этаж" },
            // Агропром
            { coordinates: [2224, 2314], description: "Матёрый кровосос<br>Подземелья Агропрома" },
            { coordinates: [2242, 2004], description: "Матёрый кровосос" },
            { coordinates: [2275, 2239], description: "Матёрый кровосос" },
            // Янтарь
            { coordinates: [2731, 2292], description: "Матёрый кровосос" },
            { coordinates: [3072, 2406], description: "Матёрый кровосос" },
            // Стройплощадка
            { coordinates: [1520, 1797], description: "Матёрый кровосос" },
            // Полесское
            { coordinates: [3371, 2800], description: "Матёрый кровосос" },
        ];

        // Группа маркеров
        SBSGroup = L.layerGroup().addTo(map);

        // Добавление маркера для каждой координаты
        for (var i = 0; i < SBSCoordinates.length; i++) {
            (function() {
                var coordinates = SBSCoordinates[i].coordinates;
                var description = SBSCoordinates[i].description;
                var imageSize = SBSCoordinates[i].imageSize;
                var image = SBSCoordinates[i].image;

                var SBS = L.marker(coordinates, { icon: SBSIcon })
                .bindPopup("<div class='marker-description'>" + description + "</div>")  // Текст всплывающего окна (если вдруг нужно добавить нумерацию, то можно внести после текста "Ящик с патронами" след. команду: + (i + 1) + )
                .addTo(SBSGroup);
                // Добавление обработчика события нажатия для каждого маркера
            SBS.on('click', function(e) {
                // При нажатии на маркер, необходимо проверить наличие изображения и добавить его в всплывающее окно
                if (image) {
                    var content = "<div class='custom-popup-content'>";
                    content += "<img src='" + image + "' width='" + imageSize[0] + "' height='" + imageSize[1] + "'<br>";
                    content += "<p class='marker-description'>" + description + "</p>";
                    content += "</div>";

                    // Создание всплывающего окна с контентом
                    var popup = L.popup().setContent(content);

                    // Показать всплывающее окно
                    e.target.bindPopup(popup).openPopup();
                }
            });
        })();
        }
    } else {
        // Удаление группы маркеров, если она существует
        if (SBSGroup) {
        map.removeLayer(SBSGroup);
        }
    }
});

showCMenu.addEventListener('change', function() {
    if (showCMenu.checked) {
        // Массив с координатами маркеров
        var CCoordinates = [
            // Янтарь
            { coordinates: [2543, 2200], description: "Химера" },
            { coordinates: [2831, 2383], description: "Химера" },
            // Стройплощадка
            { coordinates: [1402, 1818], description: "Химера" },
            { coordinates: [1439, 1672], description: "Химера" },
            // Полесское
            { coordinates: [3316, 2706], description: "Химера" },
        ];

        // Группа маркеров
        CGroup = L.layerGroup().addTo(map);

        // Добавление маркера для каждой координаты
        for (var i = 0; i < CCoordinates.length; i++) {
            (function() {
                var coordinates = CCoordinates[i].coordinates;
                var description = CCoordinates[i].description;
                var imageSize = CCoordinates[i].imageSize;
                var image = CCoordinates[i].image;

                var C = L.marker(coordinates, { icon: CIcon })
                .bindPopup("<div class='marker-description'>" + description + "</div>")  // Текст всплывающего окна (если вдруг нужно добавить нумерацию, то можно внести после текста "Ящик с патронами" след. команду: + (i + 1) + )
                .addTo(CGroup);
                // Добавление обработчика события нажатия для каждого маркера
            C.on('click', function(e) {
                // При нажатии на маркер, необходимо проверить наличие изображения и добавить его в всплывающее окно
                if (image) {
                    var content = "<div class='custom-popup-content'>";
                    content += "<img src='" + image + "' width='" + imageSize[0] + "' height='" + imageSize[1] + "'<br>";
                    content += "<p class='marker-description'>" + description + "</p>";
                    content += "</div>";

                    // Создание всплывающего окна с контентом
                    var popup = L.popup().setContent(content);

                    // Показать всплывающее окно
                    e.target.bindPopup(popup).openPopup();
                }
            });
        })();
        }
    } else {
        // Удаление группы маркеров, если она существует
        if (CGroup) {
        map.removeLayer(CGroup);
        }
    }
});

showDMMenu.addEventListener('change', function() {
    if (showDMMenu.checked) {
        // Массив с координатами маркеров
        var DMCoordinates = [
            // ДТ
            { coordinates: [2785, 2741], description: "Появляется на третьем этаже<br>Время: 02:00 - 04:00" },
            { coordinates: [2724, 2745], description: "Появляется на верхнем ярусе крыши<br>Время: 19:00 - 21:00" },
            { coordinates: [2781, 2591], description: "Появляется на втором этаже бойлерной<br>Время: 06:00 - конец дождя" },
            { coordinates: [2767, 2620], description: "Появляется на втором этаже в крайней комнате<br>Время: 00:00 - 02:00" },
            { coordinates: [2798, 2707], description: "Время: 02:00 - 04:00" },
            { coordinates: [2768, 2704], description: "Появляется на втором этаже в коридоре<br>Время: 02:00 - 04:00" },
        ];

        // Группа маркеров
        DMGroup = L.layerGroup().addTo(map);

        // Добавление маркера для каждой координаты
        for (var i = 0; i < DMCoordinates.length; i++) {
            (function() {
                var coordinates = DMCoordinates[i].coordinates;
                var description = DMCoordinates[i].description;
                var imageSize = DMCoordinates[i].imageSize;
                var image = DMCoordinates[i].image;

                var DM = L.marker(coordinates, { icon: DIcon })
                .bindPopup("<div class='marker-description'>" + description + "</div>")  // Текст всплывающего окна (если вдруг нужно добавить нумерацию, то можно внести после текста "Ящик с патронами" след. команду: + (i + 1) + )
                .addTo(DMGroup);
                // Добавление обработчика события нажатия для каждого маркера
            DM.on('click', function(e) {
                // При нажатии на маркер, необходимо проверить наличие изображения и добавить его в всплывающее окно
                if (image) {
                    var content = "<div class='custom-popup-content'>";
                    content += "<img src='" + image + "' width='" + imageSize[0] + "' height='" + imageSize[1] + "'<br>";
                    content += "<p class='marker-description'>" + description + "</p>";
                    content += "</div>";

                    // Создание всплывающего окна с контентом
                    var popup = L.popup().setContent(content);

                    // Показать всплывающее окно
                    e.target.bindPopup(popup).openPopup();
                }
            });
        })();
        }
    } else {
        // Удаление группы маркеров, если она существует
        if (DMGroup) {
        map.removeLayer(DMGroup);
        }
    }
});

showFreedomMenu.addEventListener('change', function() {
    if (showFreedomMenu.checked) {
        // Массив с координатами маркеров
        var FreedomCoordinates = [
            // ДТ
            { coordinates: [2550, 3763], description: "Свободовцы" },
            { coordinates: [2464, 3714], description: "База Свободы" },
            { coordinates: [2351, 3604], description: "Свободовцы" },
        ];

        // Группа маркеров
        FreedomGroup = L.layerGroup().addTo(map);

        // Добавление маркера для каждой координаты
        for (var i = 0; i < FreedomCoordinates.length; i++) {
            (function() {
                var coordinates = FreedomCoordinates[i].coordinates;
                var description = FreedomCoordinates[i].description;
                var imageSize = FreedomCoordinates[i].imageSize;
                var image = FreedomCoordinates[i].image;

                var Freedom = L.marker(coordinates, { icon: FreedomIcon })
                .bindPopup("<div class='marker-description'>" + description + "</div>")  // Текст всплывающего окна (если вдруг нужно добавить нумерацию, то можно внести после текста "Ящик с патронами" след. команду: + (i + 1) + )
                .addTo(FreedomGroup);
                // Добавление обработчика события нажатия для каждого маркера
            Freedom.on('click', function(e) {
                // При нажатии на маркер, необходимо проверить наличие изображения и добавить его в всплывающее окно
                if (image) {
                    var content = "<div class='custom-popup-content'>";
                    content += "<img src='" + image + "' width='" + imageSize[0] + "' height='" + imageSize[1] + "'<br>";
                    content += "<p class='marker-description'>" + description + "</p>";
                    content += "</div>";

                    // Создание всплывающего окна с контентом
                    var popup = L.popup().setContent(content);

                    // Показать всплывающее окно
                    e.target.bindPopup(popup).openPopup();
                }
            });
        })();
        }
    } else {
        // Удаление группы маркеров, если она существует
        if (FreedomGroup) {
        map.removeLayer(FreedomGroup);
        }
    }
});

showMilitaryMenu.addEventListener('change', function() {
    if (showMilitaryMenu.checked) {
        // Массив с координатами маркеров
        var MilitaryCoordinates = [
            // Чернотопье + Предбанник + Кордон
            { coordinates: [922, 3565], description: "Военные" },
            { coordinates: [714, 3680], description: "Военные" },
            { coordinates: [634, 3611], description: "Военные" },
            { coordinates: [671, 3450], description: "Военные" },
            { coordinates: [730, 3473], description: "Военные" },
            { coordinates: [925, 3006], description: "Военные" },
            { coordinates: [1107, 3411], description: "Военные" },
            { coordinates: [1310, 2968], description: "Военный блокпост" },
        ];

        // Группа маркеров
        MilitaryGroup = L.layerGroup().addTo(map);

        // Добавление маркера для каждой координаты
        for (var i = 0; i < MilitaryCoordinates.length; i++) {
            (function() {
                var coordinates = MilitaryCoordinates[i].coordinates;
                var description = MilitaryCoordinates[i].description;
                var imageSize = MilitaryCoordinates[i].imageSize;
                var image = MilitaryCoordinates[i].image;

                var Military = L.marker(coordinates, { icon: MilitaryIcon })
                .bindPopup("<div class='marker-description'>" + description + "</div>")  // Текст всплывающего окна (если вдруг нужно добавить нумерацию, то можно внести после текста "Ящик с патронами" след. команду: + (i + 1) + )
                .addTo(MilitaryGroup);
                // Добавление обработчика события нажатия для каждого маркера
            Military.on('click', function(e) {
                // При нажатии на маркер, необходимо проверить наличие изображения и добавить его в всплывающее окно
                if (image) {
                    var content = "<div class='custom-popup-content'>";
                    content += "<img src='" + image + "' width='" + imageSize[0] + "' height='" + imageSize[1] + "'<br>";
                    content += "<p class='marker-description'>" + description + "</p>";
                    content += "</div>";

                    // Создание всплывающего окна с контентом
                    var popup = L.popup().setContent(content);

                    // Показать всплывающее окно
                    e.target.bindPopup(popup).openPopup();
                }
            });
        })();
        }
    } else {
        // Удаление группы маркеров, если она существует
        if (MilitaryGroup) {
        map.removeLayer(MilitaryGroup);
        }
    }
});

showBanditsMenu.addEventListener('change', function() {
    if (showBanditsMenu.checked) {
        // Массив с координатами маркеров
        var BanditsCoordinates = [
            // Свалка
            { coordinates: [2051, 3087], description: "Бандиты" },
            { coordinates: [2100, 3041], description: "Бандиты" },
            { coordinates: [2047, 3003], description: "Бандиты" },
            { coordinates: [2155, 3109], description: "Бандиты" },
            { coordinates: [2242, 3037], description: "Бандиты" },
            { coordinates: [2220, 3008], description: "Бандиты" },
            { coordinates: [2242, 2995], description: "Бандиты" },
            { coordinates: [2222, 2939], description: "Бандиты" },
            // Поляна
            { coordinates: [2951, 2428], description: "Бандиты" },
            { coordinates: [2956, 2330], description: "Бандиты" },
            { coordinates: [3029, 2348], description: "Бандиты" },
            // Полесское
            { coordinates: [3059, 2837], description: "Мародеры<br>Очень сильные" },
        ];

        // Группа маркеров
        BanditsGroup = L.layerGroup().addTo(map);

        // Добавление маркера для каждой координаты
        for (var i = 0; i < BanditsCoordinates.length; i++) {
            (function() {
                var coordinates = BanditsCoordinates[i].coordinates;
                var description = BanditsCoordinates[i].description;
                var imageSize = BanditsCoordinates[i].imageSize;
                var image = BanditsCoordinates[i].image;

                var Bandits = L.marker(coordinates, { icon: BanditsIcon })
                .bindPopup("<div class='marker-description'>" + description + "</div>")  // Текст всплывающего окна (если вдруг нужно добавить нумерацию, то можно внести после текста "Ящик с патронами" след. команду: + (i + 1) + )
                .addTo(BanditsGroup);
                // Добавление обработчика события нажатия для каждого маркера
            Bandits.on('click', function(e) {
                // При нажатии на маркер, необходимо проверить наличие изображения и добавить его в всплывающее окно
                if (image) {
                    var content = "<div class='custom-popup-content'>";
                    content += "<img src='" + image + "' width='" + imageSize[0] + "' height='" + imageSize[1] + "'<br>";
                    content += "<p class='marker-description'>" + description + "</p>";
                    content += "</div>";

                    // Создание всплывающего окна с контентом
                    var popup = L.popup().setContent(content);

                    // Показать всплывающее окно
                    e.target.bindPopup(popup).openPopup();
                }
            });
        })();
        }
    } else {
        // Удаление группы маркеров, если она существует
        if (BanditsGroup) {
        map.removeLayer(BanditsGroup);
        }
    }
});

showSinsMenu.addEventListener('change', function() {
    if (showSinsMenu.checked) {
        // Массив с координатами маркеров
        var SinsCoordinates = [
            // ТЛ
            { coordinates: [1729, 3741], description: "Грех" },
            { coordinates: [1743, 3726], description: "Грех" },
        ];

        // Группа маркеров
        SinsGroup = L.layerGroup().addTo(map);

        // Добавление маркера для каждой координаты
        for (var i = 0; i < SinsCoordinates.length; i++) {
            (function() {
                var coordinates = SinsCoordinates[i].coordinates;
                var description = SinsCoordinates[i].description;
                var imageSize = SinsCoordinates[i].imageSize;
                var image = SinsCoordinates[i].image;

                var Sins = L.marker(coordinates, { icon: SinsIcon })
                .bindPopup("<div class='marker-description'>" + description + "</div>")  // Текст всплывающего окна (если вдруг нужно добавить нумерацию, то можно внести после текста "Ящик с патронами" след. команду: + (i + 1) + )
                .addTo(SinsGroup);
                // Добавление обработчика события нажатия для каждого маркера
            Sins.on('click', function(e) {
                // При нажатии на маркер, необходимо проверить наличие изображения и добавить его в всплывающее окно
                if (image) {
                    var content = "<div class='custom-popup-content'>";
                    content += "<img src='" + image + "' width='" + imageSize[0] + "' height='" + imageSize[1] + "'<br>";
                    content += "<p class='marker-description'>" + description + "</p>";
                    content += "</div>";

                    // Создание всплывающего окна с контентом
                    var popup = L.popup().setContent(content);

                    // Показать всплывающее окно
                    e.target.bindPopup(popup).openPopup();
                }
            });
        })();
        }
    } else {
        // Удаление группы маркеров, если она существует
        if (SinsGroup) {
        map.removeLayer(SinsGroup);
        }
    }
});

showMercsMenu.addEventListener('change', function() {
    if (showMercsMenu.checked) {
        // Массив с координатами маркеров
        var MercsCoordinates = [
            // Редколесье
            { coordinates: [1954, 2640], description: "Наемники" },
            { coordinates: [1815, 2277], description: "База Наемников" },
            // ДТ
            { coordinates: [2666, 2654], description: "Наемники" },
        ];

        // Группа маркеров
        MercsGroup = L.layerGroup().addTo(map);

        // Добавление маркера для каждой координаты
        for (var i = 0; i < MercsCoordinates.length; i++) {
            (function() {
                var coordinates = MercsCoordinates[i].coordinates;
                var description = MercsCoordinates[i].description;
                var imageSize = MercsCoordinates[i].imageSize;
                var image = MercsCoordinates[i].image;

                var Mercs = L.marker(coordinates, { icon: MercsIcon })
                .bindPopup("<div class='marker-description'>" + description + "</div>")  // Текст всплывающего окна (если вдруг нужно добавить нумерацию, то можно внести после текста "Ящик с патронами" след. команду: + (i + 1) + )
                .addTo(MercsGroup);
                // Добавление обработчика события нажатия для каждого маркера
            Mercs.on('click', function(e) {
                // При нажатии на маркер, необходимо проверить наличие изображения и добавить его в всплывающее окно
                if (image) {
                    var content = "<div class='custom-popup-content'>";
                    content += "<img src='" + image + "' width='" + imageSize[0] + "' height='" + imageSize[1] + "'<br>";
                    content += "<p class='marker-description'>" + description + "</p>";
                    content += "</div>";

                    // Создание всплывающего окна с контентом
                    var popup = L.popup().setContent(content);

                    // Показать всплывающее окно
                    e.target.bindPopup(popup).openPopup();
                }
            });
        })();
        }
    } else {
        // Удаление группы маркеров, если она существует
        if (MercsGroup) {
        map.removeLayer(MercsGroup);
        }
    }
});

showDutyMenu.addEventListener('change', function() {
    if (showDutyMenu.checked) {
        // Массив с координатами маркеров
        var DutyCoordinates = [
            // Агропром
            { coordinates: [2234, 2526], description: "Долговцы" },
            { coordinates: [2079, 2512], description: "Долговцы" },
            { coordinates: [2120, 2285], description: "База Долга" },
        ];

        // Группа маркеров
        DutyGroup = L.layerGroup().addTo(map);

        // Добавление маркера для каждой координаты
        for (var i = 0; i < DutyCoordinates.length; i++) {
            (function() {
                var coordinates = DutyCoordinates[i].coordinates;
                var description = DutyCoordinates[i].description;
                var imageSize = DutyCoordinates[i].imageSize;
                var image = DutyCoordinates[i].image;

                var Duty = L.marker(coordinates, { icon: DutyIcon })
                .bindPopup("<div class='marker-description'>" + description + "</div>")  // Текст всплывающего окна (если вдруг нужно добавить нумерацию, то можно внести после текста "Ящик с патронами" след. команду: + (i + 1) + )
                .addTo(DutyGroup);
                // Добавление обработчика события нажатия для каждого маркера
            Duty.on('click', function(e) {
                // При нажатии на маркер, необходимо проверить наличие изображения и добавить его в всплывающее окно
                if (image) {
                    var content = "<div class='custom-popup-content'>";
                    content += "<img src='" + image + "' width='" + imageSize[0] + "' height='" + imageSize[1] + "'<br>";
                    content += "<p class='marker-description'>" + description + "</p>";
                    content += "</div>";

                    // Создание всплывающего окна с контентом
                    var popup = L.popup().setContent(content);

                    // Показать всплывающее окно
                    e.target.bindPopup(popup).openPopup();
                }
            });
        })();
        }
    } else {
        // Удаление группы маркеров, если она существует
        if (DutyGroup) {
        map.removeLayer(DutyGroup);
        }
    }
});

showMonolithMenu.addEventListener('change', function() {
    if (showMonolithMenu.checked) {
        // Массив с координатами маркеров
        var MonolithCoordinates = [
            // Поляна
            { coordinates: [2856, 2396], description: "Монолитовцы" },
            { coordinates: [2844, 2385], description: "Монолитовцы" },
            { coordinates: [2855, 2416], description: "Монолитовцы" },
        ];

        // Группа маркеров
        MonolithGroup = L.layerGroup().addTo(map);

        // Добавление маркера для каждой координаты
        for (var i = 0; i < MonolithCoordinates.length; i++) {
            (function() {
                var coordinates = MonolithCoordinates[i].coordinates;
                var description = MonolithCoordinates[i].description;
                var imageSize = MonolithCoordinates[i].imageSize;
                var image = MonolithCoordinates[i].image;

                var Monolith = L.marker(coordinates, { icon: MonolithIcon })
                .bindPopup("<div class='marker-description'>" + description + "</div>")  // Текст всплывающего окна (если вдруг нужно добавить нумерацию, то можно внести после текста "Ящик с патронами" след. команду: + (i + 1) + )
                .addTo(MonolithGroup);
                // Добавление обработчика события нажатия для каждого маркера
            Monolith.on('click', function(e) {
                // При нажатии на маркер, необходимо проверить наличие изображения и добавить его в всплывающее окно
                if (image) {
                    var content = "<div class='custom-popup-content'>";
                    content += "<img src='" + image + "' width='" + imageSize[0] + "' height='" + imageSize[1] + "'<br>";
                    content += "<p class='marker-description'>" + description + "</p>";
                    content += "</div>";

                    // Создание всплывающего окна с контентом
                    var popup = L.popup().setContent(content);

                    // Показать всплывающее окно
                    e.target.bindPopup(popup).openPopup();
                }
            });
        })();
        }
    } else {
        // Удаление группы маркеров, если она существует
        if (MonolithGroup) {
        map.removeLayer(MonolithGroup);
        }
    }
});

showObliteratorMenu.addEventListener('change', function() {
    if (showObliteratorMenu.checked) {
        // Массив с координатами маркеров
        var ObliteratorCoordinates = [
            // ДТ
            { coordinates: [2678, 2665], description: "Облитератор" },
        ];

        // Группа маркеров
        ObliteratorGroup = L.layerGroup().addTo(map);

        // Добавление маркера для каждой координаты
        for (var i = 0; i < ObliteratorCoordinates.length; i++) {
            (function() {
                var coordinates = ObliteratorCoordinates[i].coordinates;
                var description = ObliteratorCoordinates[i].description;
                var imageSize = ObliteratorCoordinates[i].imageSize;
                var image = ObliteratorCoordinates[i].image;

                var Obliterator = L.marker(coordinates, { icon: ObliteratorIcon })
                .bindPopup("<div class='marker-description'>" + description + "</div>")  // Текст всплывающего окна (если вдруг нужно добавить нумерацию, то можно внести после текста "Ящик с патронами" след. команду: + (i + 1) + )
                .addTo(ObliteratorGroup);
                // Добавление обработчика события нажатия для каждого маркера
            Obliterator.on('click', function(e) {
                // При нажатии на маркер, необходимо проверить наличие изображения и добавить его в всплывающее окно
                if (image) {
                    var content = "<div class='custom-popup-content'>";
                    content += "<img src='" + image + "' width='" + imageSize[0] + "' height='" + imageSize[1] + "'<br>";
                    content += "<p class='marker-description'>" + description + "</p>";
                    content += "</div>";

                    // Создание всплывающего окна с контентом
                    var popup = L.popup().setContent(content);

                    // Показать всплывающее окно
                    e.target.bindPopup(popup).openPopup();
                }
            });
        })();
        }
    } else {
        // Удаление группы маркеров, если она существует
        if (ObliteratorGroup) {
        map.removeLayer(ObliteratorGroup);
        }
    }
});

showZombifiedMenu.addEventListener('change', function() {
    if (showZombifiedMenu.checked) {
        // Массив с координатами маркеров
        var ZombifiedCoordinates = [
            // Кордон
            { coordinates: [1563, 2999], description: "Зомбированные<br>Лаборатория в тоннеле" },
            // Свалка
            { coordinates: [2338, 2924], description: "Зомбированные" },
            // Янтарь
            { coordinates: [2613, 2242], description: "Зомбированные" },
            { coordinates: [2686, 2371], description: "Зомбированные" },
            { coordinates: [2714, 2374], description: "Зомбированные" },
            { coordinates: [2675, 2348], description: "Зомбированные" },
            { coordinates: [2710, 2344], description: "Зомбированные" },
            { coordinates: [2688, 2332], description: "Зомбированные" },
            { coordinates: [2707, 2316], description: "Зомбированный" },
            { coordinates: [2709, 2300], description: "Зомбированный" },
            { coordinates: [2697, 2325], description: "Зомбированные" },
            { coordinates: [2568, 2116], description: "Зомбированные" },
            { coordinates: [2555, 2106], description: "Зомбированные" },
            { coordinates: [2693, 2031], description: "Зомбированный<br>Выход из лаборатории X-16" },
            { coordinates: [2698, 2307], description: "Зомбированные<br>Лаборатория X-16" },
            { coordinates: [2698, 2286], description: "Зомбированный<br>Лаборатория X-16" },
            { coordinates: [2708, 2259], description: "Зомбированные<br>Лаборатория X-16" },
            { coordinates: [2701, 2238], description: "Зомбированные<br>Лаборатория X-16" },
            { coordinates: [2697, 2208], description: "Зомбированные<br>Лаборатория X-16" },
            // Поляна
            { coordinates: [2864, 2299], description: "Зомбированные" },
        ];

        // Группа маркеров
        ZombifiedGroup = L.layerGroup().addTo(map);

        // Добавление маркера для каждой координаты
        for (var i = 0; i < ZombifiedCoordinates.length; i++) {
            (function() {
                var coordinates = ZombifiedCoordinates[i].coordinates;
                var description = ZombifiedCoordinates[i].description;
                var imageSize = ZombifiedCoordinates[i].imageSize;
                var image = ZombifiedCoordinates[i].image;

                var Zombified = L.marker(coordinates, { icon: ZombifiedIcon })
                .bindPopup("<div class='marker-description'>" + description + "</div>")  // Текст всплывающего окна (если вдруг нужно добавить нумерацию, то можно внести после текста "Ящик с патронами" след. команду: + (i + 1) + )
                .addTo(ZombifiedGroup);
                // Добавление обработчика события нажатия для каждого маркера
            Zombified.on('click', function(e) {
                // При нажатии на маркер, необходимо проверить наличие изображения и добавить его в всплывающее окно
                if (image) {
                    var content = "<div class='custom-popup-content'>";
                    content += "<img src='" + image + "' width='" + imageSize[0] + "' height='" + imageSize[1] + "'<br>";
                    content += "<p class='marker-description'>" + description + "</p>";
                    content += "</div>";

                    // Создание всплывающего окна с контентом
                    var popup = L.popup().setContent(content);

                    // Показать всплывающее окно
                    e.target.bindPopup(popup).openPopup();
                }
            });
        })();
        }
    } else {
        // Удаление группы маркеров, если она существует
        if (ZombifiedGroup) {
        map.removeLayer(ZombifiedGroup);
        }
    }
});

showWormholeMenu.addEventListener('change', function() {
    if (showWormholeMenu.checked) {
        // Массив с координатами маркеров
        var WormholeCoordinates = [
            // Кордон
            
            // Свалка

            // ТД
            { coordinates: [2259, 4073], description: "Червоточина" },
            // Янтарь
            
            // Поляна

            // Полесское
            { coordinates: [3085, 2743], description: "Червоточина" },
            { coordinates: [3337, 2633], description: "Червоточина" },
            { coordinates: [3337, 2734], description: "Червоточина" },
        ];

        // Группа маркеров
        WormholeGroup = L.layerGroup().addTo(map);

        // Добавление маркера для каждой координаты
        for (var i = 0; i < WormholeCoordinates.length; i++) {
            (function() {
                var coordinates = WormholeCoordinates[i].coordinates;
                var description = WormholeCoordinates[i].description;
                var imageSize = WormholeCoordinates[i].imageSize;
                var image = WormholeCoordinates[i].image;

                var Wormhole = L.marker(coordinates, { icon: WormholeIcon })
                .bindPopup("<div class='marker-description'>" + description + "</div>")  // Текст всплывающего окна (если вдруг нужно добавить нумерацию, то можно внести после текста "Ящик с патронами" след. команду: + (i + 1) + )
                .addTo(WormholeGroup);
                // Добавление обработчика события нажатия для каждого маркера
            Wormhole.on('click', function(e) {
                // При нажатии на маркер, необходимо проверить наличие изображения и добавить его в всплывающее окно
                if (image) {
                    var content = "<div class='custom-popup-content'>";
                    content += "<img src='" + image + "' width='" + imageSize[0] + "' height='" + imageSize[1] + "'<br>";
                    content += "<p class='marker-description'>" + description + "</p>";
                    content += "</div>";

                    // Создание всплывающего окна с контентом
                    var popup = L.popup().setContent(content);

                    // Показать всплывающее окно
                    e.target.bindPopup(popup).openPopup();
                }
            });
        })();
        }
    } else {
        // Удаление группы маркеров, если она существует
        if (WormholeGroup) {
        map.removeLayer(WormholeGroup);
        }
    }
});

showHearthMenu.addEventListener('change', function() {
    if (showHearthMenu.checked) {
        // Массив с координатами маркеров
        var HearthCoordinates = [
            // Кордон
            
            // Свалка
            
            // ТД
            { coordinates: [2353, 3868], description: "Очаг" },
            // Янтарь
            
            // Поляна

            // Полесское
            { coordinates: [2993, 2806], description: "Очаг" },
            { coordinates: [3187, 2850], description: "Очаг" },
            { coordinates: [3237, 2578], description: "Очаг" },
        ];

        // Группа маркеров
        HearthGroup = L.layerGroup().addTo(map);

        // Добавление маркера для каждой координаты
        for (var i = 0; i < HearthCoordinates.length; i++) {
            (function() {
                var coordinates = HearthCoordinates[i].coordinates;
                var description = HearthCoordinates[i].description;
                var imageSize = HearthCoordinates[i].imageSize;
                var image = HearthCoordinates[i].image;

                var Hearth = L.marker(coordinates, { icon: HearthIcon })
                .bindPopup("<div class='marker-description'>" + description + "</div>")  // Текст всплывающего окна (если вдруг нужно добавить нумерацию, то можно внести после текста "Ящик с патронами" след. команду: + (i + 1) + )
                .addTo(HearthGroup);
                // Добавление обработчика события нажатия для каждого маркера
            Hearth.on('click', function(e) {
                // При нажатии на маркер, необходимо проверить наличие изображения и добавить его в всплывающее окно
                if (image) {
                    var content = "<div class='custom-popup-content'>";
                    content += "<img src='" + image + "' width='" + imageSize[0] + "' height='" + imageSize[1] + "'<br>";
                    content += "<p class='marker-description'>" + description + "</p>";
                    content += "</div>";

                    // Создание всплывающего окна с контентом
                    var popup = L.popup().setContent(content);

                    // Показать всплывающее окно
                    e.target.bindPopup(popup).openPopup();
                }
            });
        })();
        }
    } else {
        // Удаление группы маркеров, если она существует
        if (HearthGroup) {
        map.removeLayer(HearthGroup);
        }
    }
});

showCampfireMenu.addEventListener('change', function() {
    if (showCampfireMenu.checked) {
        // Массив с координатами маркеров
        var CampfireCoordinates = [
            // Полесское
            { coordinates: [2955, 2603], description: "Костёр" },
            { coordinates: [3064, 2779], description: "Костёр" },
            { coordinates: [3151, 2779], description: "Костёр" },
            { coordinates: [3231, 2590], description: "Костёр" },
            { coordinates: [3363, 2854], description: "Горящий вертолёт" },
        ];

        // Группа маркеров
        CampfireGroup = L.layerGroup().addTo(map);

        // Добавление маркера для каждой координаты
        for (var i = 0; i < CampfireCoordinates.length; i++) {
            (function() {
                var coordinates = CampfireCoordinates[i].coordinates;
                var description = CampfireCoordinates[i].description;
                var imageSize = CampfireCoordinates[i].imageSize;
                var image = CampfireCoordinates[i].image;

                var Campfire = L.marker(coordinates, { icon: CampfireIcon })
                .bindPopup("<div class='marker-description'>" + description + "</div>")  // Текст всплывающего окна (если вдруг нужно добавить нумерацию, то можно внести после текста "Ящик с патронами" след. команду: + (i + 1) + )
                .addTo(CampfireGroup);
                // Добавление обработчика события нажатия для каждого маркера
            Campfire.on('click', function(e) {
                // При нажатии на маркер, необходимо проверить наличие изображения и добавить его в всплывающее окно
                if (image) {
                    var content = "<div class='custom-popup-content'>";
                    content += "<img src='" + image + "' width='" + imageSize[0] + "' height='" + imageSize[1] + "'<br>";
                    content += "<p class='marker-description'>" + description + "</p>";
                    content += "</div>";

                    // Создание всплывающего окна с контентом
                    var popup = L.popup().setContent(content);

                    // Показать всплывающее окно
                    e.target.bindPopup(popup).openPopup();
                }
            });
        })();
        }
    } else {
        // Удаление группы маркеров, если она существует
        if (CampfireGroup) {
        map.removeLayer(CampfireGroup);
        }
    }
});

// "Аномалии Гравитационные"
document.getElementById('showGAMenu').addEventListener('change', function() {
    toggleGravityImage();
});

// Функция для добавления/удаления изображения аномалий поверх всей карты
function toggleGravityImage() {
    if (document.getElementById('showGAMenu').checked) {
        // Добавить изображение аномалий
        gravityImageOverlay.addTo(map);
    } else {
        // Убрать изображение аномалий
        map.removeLayer(gravityImageOverlay);
    }
}

// Путь к изображению аномалий
var gravityImagePath = 'images/Gravy.png';

// Создать изображение поверх всей карты
var gravityImageBounds = [[0, 0], [4000, 5633]]; // Размеры вашего изображения области
var gravityImageOverlay = L.imageOverlay(gravityImagePath, gravityImageBounds).addTo(map);

// "Аномалии Мусорные"
document.getElementById('showTrashMenu').addEventListener('change', function() {
    toggleTrashImage();
});
function toggleTrashImage() {
    if (document.getElementById('showTrashMenu').checked) {
        trashImageOverlay.addTo(map);
    } else {
        map.removeLayer(trashImageOverlay);
    }
}
var trashImagePath = 'images/Trash.png';
var trashImageBounds = [[0, 0], [4000, 5633]]; // Размеры вашего изображения области
var trashImageOverlay = L.imageOverlay(trashImagePath, trashImageBounds).addTo(map);

// "Аномалии Термические"
document.getElementById('showTAMenu').addEventListener('change', function() {
    toggleTermoImage();
});
function toggleTermoImage() {
    if (document.getElementById('showTAMenu').checked) {
        termoImageOverlay.addTo(map);
    } else {
        map.removeLayer(termoImageOverlay);
    }
}
var termoImagePath = 'images/Termo.png';
var termoImageBounds = [[0, 0], [4000, 5633]];
var termoImageOverlay = L.imageOverlay(termoImagePath, termoImageBounds).addTo(map);

// "Аномалии Электрические"
document.getElementById('showEAMenu').addEventListener('change', function() {
    toggleElectroImage();
});
function toggleElectroImage() {
    if (document.getElementById('showEAMenu').checked) {
        electroImageOverlay.addTo(map);
    } else {
        map.removeLayer(electroImageOverlay);
    }
}
var electroImagePath = 'images/Electro.png';
var electroImageBounds = [[0, 0], [4000, 5633]]; // Размеры вашего изображения области
var electroImageOverlay = L.imageOverlay(electroImagePath, electroImageBounds).addTo(map);

// "Аномалии Химические"
document.getElementById('showBAMenu').addEventListener('change', function() {
    toggleBioImage();
});
function toggleBioImage() {
    if (document.getElementById('showBAMenu').checked) {
        bioImageOverlay.addTo(map);
    } else {
        map.removeLayer(bioImageOverlay);
    }
}
var bioImagePath = 'images/Bio.png';
var bioImageBounds = [[0, 0], [4000, 5633]]; // Размеры вашего изображения области
var bioImageOverlay = L.imageOverlay(bioImagePath, bioImageBounds).addTo(map);


function showCheckboxWithContent(checkboxId) {
    var checkbox = document.getElementById(checkboxId);

    if (checkbox) {
        checkbox.checked = true;

        // Если у чекбокса есть подпункты (например, подменю), то отобразить их
        var submenu = checkbox.nextElementSibling;
        if (submenu && submenu.classList.contains('boxes-submenu')) {
            submenu.style.display = 'block';
        }

        // Вручную вызывать обработчик события 'changes'
        var changeEvent = new Event('change');
        checkbox.dispatchEvent(changeEvent);
    }
}

// Автоматически вызывать функцию для нужных чекбоксов при загрузке страницы
window.addEventListener('load', function() {
    showCheckboxWithContent('showAmmoMenu');
    showCheckboxWithContent('showSupplyMenu');
    showCheckboxWithContent('showBarrelMenu');
    showCheckboxWithContent('showToolMenu');
    showCheckboxWithContent('showScienceMenu');
    showCheckboxWithContent('showStashMenu');
    showCheckboxWithContent('showBDMenu');
    showCheckboxWithContent('showPDMenu');
    showCheckboxWithContent('showFleshMenu');
    showCheckboxWithContent('showBoarMenu');
    showCheckboxWithContent('showRatMenu');
    showCheckboxWithContent('showSnorkMenu');
    showCheckboxWithContent('showZombieMenu');
    showCheckboxWithContent('showBSMenu');
    showCheckboxWithContent('showSBSMenu');
    showCheckboxWithContent('showCMenu');
    showCheckboxWithContent('showDMMenu');
    showCheckboxWithContent('showZombifiedMenu');
    showCheckboxWithContent('showBanditsMenu');
    showCheckboxWithContent('showMilitaryMenu');
    showCheckboxWithContent('showFreedomMenu');
    showCheckboxWithContent('showDutyMenu');
    showCheckboxWithContent('showMercsMenu');
    showCheckboxWithContent('showSinsMenu');
    showCheckboxWithContent('showMonolithMenu');
    showCheckboxWithContent('showObliteratorMenu');
    showCheckboxWithContent('showWormholeMenu');
    showCheckboxWithContent('showHearthMenu');
    showCheckboxWithContent('showCampfireMenu');
});
