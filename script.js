document.getElementById('calculateBtn').addEventListener('click', function () {
    // Получение значений всех ресурсов
    const bolotny_kamen = parseInt(document.getElementById('bolotny_kamen').value) || 0;
    const green_plesen = parseInt(document.getElementById('green_plesen').value) || 0;
    const koren_vonyuchka = parseInt(document.getElementById('koren_vonyuchka').value) || 0;
    const srachnik = parseInt(document.getElementById('srachnik').value) || 0;
    const mednaya_provoloka = parseInt(document.getElementById('mednaya_provoloka').value) || 0;

    // Бар
    const romashka = parseInt(document.getElementById('romashka').value) || 0;
    const radioperedatchik = parseInt(document.getElementById('radioperedatchik').value) || 0;
    const rassolnik = parseInt(document.getElementById('rassolnik').value) || 0;
    const alfa_fragment = parseInt(document.getElementById('alfa_fragment').value) || 0;

    // Полесское/ПД
    const beta_fragment = parseInt(document.getElementById('beta_fragment').value) || 0;
    const durman_kamen = parseInt(document.getElementById('durman_kamen').value) || 0;
    const severny_moh = parseInt(document.getElementById('severny_moh').value) || 0;
    const ostatki_akkumulyatora = parseInt(document.getElementById('ostatki_akkumulyatora').value) || 0;

    // Север
    const gamma_fragment = parseInt(document.getElementById('gamma_fragment').value) || 0;
    const veshestvo_07270 = parseInt(document.getElementById('veshestvo_07270').value) || 0;
    const ryzhiy_paporotnik = parseInt(document.getElementById('ryzhiy_paporotnik').value) || 0;
    const psi_mayachok = parseInt(document.getElementById('psi_mayachok').value) || 0;
    const kvantovaya_batareya = parseInt(document.getElementById('kvantovaya_batareya').value) || 0;

    // Любеч-3
    const limb = parseInt(document.getElementById('limb').value) || 0;
    const gorkolistnik = parseInt(document.getElementById('gorkolistnik').value) || 0;
    const lambda_fragment = parseInt(document.getElementById('lambda_fragment').value) || 0;
    const limboplazma = parseInt(document.getElementById('limboplazma').value) || 0;
    const anomalnaya_batareya = parseInt(document.getElementById('anomalnaya_batareya').value) || 0;

    // Рассчёт общей стоимости
    let totalCoins = 0;

    // Болота
    totalCoins += bolotny_kamen * 2;
    totalCoins += green_plesen * 1;

    // Обочина
    totalCoins += koren_vonyuchka * 3;
    totalCoins += srachnik * 4;
    totalCoins += mednaya_provoloka * 4;

    // Бар
    totalCoins += romashka * 4;
    totalCoins += radioperedatchik * 4;
    totalCoins += rassolnik * 6;
    totalCoins += alfa_fragment * 21;

    // Полесское/ПД
    totalCoins += beta_fragment * 40;
    totalCoins += durman_kamen * 8;
    totalCoins += severny_moh * 5;
    totalCoins += ostatki_akkumulyatora * 7;

    // Север
    totalCoins += gamma_fragment * 66;
    totalCoins += veshestvo_07270 * 8;
    totalCoins += ryzhiy_paporotnik * 10;
    totalCoins += psi_mayachok * 7;
    totalCoins += kvantovaya_batareya * 42;

    // Любеч-3
    totalCoins += limb * 15;
    totalCoins += gorkolistnik * 12;
    totalCoins += lambda_fragment * 86;
    totalCoins += limboplazma * 200;
    totalCoins += anomalnaya_batareya * 240;

    // Отображение общей стоимости на странице
    document.getElementById('totalCoinsDisplay').innerText = 'Общая стоимость: ' + totalCoins + ' монет';
});
