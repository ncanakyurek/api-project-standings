import * as cheerio from 'cheerio';
import iconv from 'iconv-lite';

export async function GET(request) {
    // URL parametrelerini al
    const { searchParams } = new URL(request.url);

    // Lig pageID al
    const league = searchParams.get('league') || '198';
    const group = searchParams.get('group');

    // Sayfayı çek
    const response = await fetch(
        `https://www.tff.org/default.aspx?pageID=${league}${group ? `&grupID=${group}` : ''}`
    );

    // Buffer al
    const arrayBuffer = await response.arrayBuffer();

    // Türkçe encoding düzelt
    const html = iconv.decode(
        Buffer.from(arrayBuffer),
        'latin5'
    );

    // HTML parse et
    const $ = cheerio.load(html);

    // Takım logolarını tutacak object
    const logoMap = {};

    // Logo sayfasını çek
    const logosResponse = await fetch(
        'https://www.tff.org/default.aspx?pageID=170'
    );

    // Logo sayfasının buffer'ını al
    const logosArrayBuffer = await logosResponse.arrayBuffer();

    // Türkçe encoding düzelt
    const logosHtml = iconv.decode(
        Buffer.from(logosArrayBuffer),
        'latin5'
    );

    // Logo HTML parse et
    const logosPage = cheerio.load(logosHtml);

    // Tüm img taglerini dön
    logosPage('img').each((index, element) => {

        // Logo URL'sini al
        const logo = logosPage(element).attr('src');

        // Takım adını al
        const teamName = logosPage(element).attr('alt');

        // Eğer logo ve takım adı varsa kaydet
        if (logo && teamName) {

            // Ters slashları düzelt
            const fixedLogo = logo.replaceAll('\\', '/');

            // Takım adı -> logo eşleşmesi
            logoMap[teamName.trim()] = fixedLogo;
        }

    });

    const standings = [];

    $('.s-table tr').each((index, element) => {

        if (index === 0) return;

        const tds = $(element).find('td');

        if (tds.length > 0) {

            const team = $(tds[0]).text().trim();
            // Baştaki sıra numarasını kaldır
            const cleanTeam = team.replace(/^\d+\./, '').trim();

            const played = $(tds[1]).text().trim();

            const wins = $(tds[2]).text().trim();

            const draws = $(tds[3]).text().trim();

            const losses = $(tds[4]).text().trim();

            const average = $(tds[7]).text().trim();

            const points = $(tds[8]).text().trim();
            const rank = index;
standings.push({
    rank,
    team,

    // Takım logosu
    logo: logoMap[cleanTeam] || '',

    played,

    wins,

    draws,

    losses,

    average,

    points

});
        }

    });

    return Response.json({
        standings
    });

}