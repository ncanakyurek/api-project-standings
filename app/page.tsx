'use client';

import { useEffect, useState } from 'react';

export default function Home() {

    // Puan durumu state'i
    const [standings, setStandings] = useState<any[]>([]);
    const [league, setLeague] = useState('198');
    const [leagueName, setLeagueName] = useState('Trendyol Süper Lig');
    const [group, setGroup] = useState('3319');

    // Sayfa açılınca çalışır
    useEffect(() => {
        async function getStandings() {
            try {
                const response = await fetch(`/api/standings?league=${league}&group=${group}`);
                const data = await response.json();
                setStandings(data.standings);
            } catch (error) {
                console.error('API Hatası:', error);
            }
        }
        getStandings();
    }, [league, group]);

    return (

        <div className="w-full p-2 sm:p-4 bg-linear-to-b from-gray-50 via-gray-100 to-gray-200 flex flex-col items-center">

            <div className="w-full max-w-sm">
                <div
                    className="rounded-2xl shadow-xl p-3 bg-linear-to-b from-cyan-700 to-teal-400 text-white text-center bg-cover bg-center bg-no-repeat relative overflow-hidden"
                    
                >
                   <span className="absolute bottom-4 left-0 text-5xl z-0">
                       🇹🇷
                   </span>
                   <span className="relative z-10 text-xs sm:text-sm tracking-none font-semibold">
                       2025 - 2026 Sezonu Puan Durumu
                   </span>
                   <span className="absolute right-0 text-9xl opacity-10 z-0">
                       ⚽
                   </span>
                   <div className="mt-3 flex flex-col items-center gap-2">
                        <select
                            onChange={(e) => {
                                setLeague(e.target.value);
                                setLeagueName(e.target.options[e.target.selectedIndex].text);
                            }}
                            className="bg-white/30 border border-white/30 text-black text-xs sm:text-sm px-1 py-1 rounded-xl outline-none backdrop-blur-sm"
                        >
                            <option value="198" className="text-black text-xs">Trendyol Süper Lig</option>
                            <option value="598" className="text-black text-xs">Ziraat Türkiye Kupası</option>
                            <option value="142" className="text-black text-xs">Trendyol 1. Lig</option>
                            <option value="976" className="text-black text-xs">TFF 2. Lig</option>
                            <option value="971" className="text-black text-xs">TFF 3. Lig</option>
                            <option value="1596" className="text-black text-xs">Bölgesel Amatör Lig</option>
                        </select>
                       
                    {league === '598' && (
                        <div className="flex items-center justify-center gap-2 py-1">
                            <span className="text-white text-[9px] font-bold tracking-wide">
                                GRUP
                            </span>
                            <button
                                onClick={() => setGroup('3319')}
                                className={`px-2 py-1 rounded-full text-[10px] sm:text-[11px] transition-colors ${group === '3319'
                                        ? 'bg-black text-white font-bold'
                                        : 'bg-black/20 text-white font-bold'
                                    }`}
                            >
                                A
                            </button>
                            <button
                                onClick={() => setGroup('3320')}
                                className={`px-2 py-1 rounded-full text-[10px] sm:text-[11px] transition-colors ${group === '3320'
                                        ?'bg-black text-white font-bold'
                                        : 'bg-black/20 text-white font-bold'
                                    }`}
                            >
                                B
                            </button>
                            <button
                                onClick={() => setGroup('3321')}
                                className={`px-2 py-1 rounded-full text-[10px] sm:text-[11px] transition-colors ${group === '3321'
                                        ?'bg-black text-white font-bold'
                                        : 'bg-black/20 text-white font-bold'
                                    }`}
                            >
                                C
                            </button>
                        </div>
                    )}
                    </div>
                    
                </div>
            </div>

            <div className="w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-200 bg-white">
                <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
                    <table className="w-full text-[10px] sm:text-[12px]">
                        <thead>
                            <tr className="bg-linear-to-b from-teal-400 to-cyan-700 text-white sticky top-0 z-10 shadow-sm">
                                <th className="w-[8%] p-1 sm:p-2 text-center"></th>
                                <th className="w-[40%] p-1 sm:p-2 pl-3 text-left">TAKIMLAR</th>
                                <th className="w-[8%] p-1 sm:p-2 pr-3 text-center">O</th>
                                <th className="w-[8%] p-1 sm:p-2 pr-4 text-center">G</th>
                                <th className="w-[8%] p-1 sm:p-2 pr-4 text-center">B</th>
                                <th className="w-[8%] p-1 sm:p-2 pr-4 text-center">M</th>
                                <th className="w-[9%] p-1 sm:p-2 pr-5 text-center">AV</th>
                                <th className="w-[15%] p-1 sm:p-2 pr-6 text-center">P</th>
                            </tr>
                        </thead>
                    </table>

                    <div className="max-h-105 overflow-y-auto overflow-x-hidden">
                        <table className="w-full text-[10px] sm:text-[12px]">
                            <tbody>
                                {standings.map((team: any, index: number) => (
                                    <tr
                                        key={index}
                                        className={`
                                            transition-colors duration-200 border-b border-gray-200
                                            ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                                            hover:bg-blue-50
                                        `}
                                    >
                                        <td
                                            className={`
                                                w-[8%] p-1 sm:p-2 text-center font-bold text-gray-700

                                                ${index === 0 ? 'border-l-4 border-orange-500' : ''}
                                                ${index === 1 ? 'border-l-4 border-orange-300' : ''}
                                                ${index === 2 ? 'border-l-4 border-blue-500' : ''}
                                                ${index === 3 ? 'border-l-4 border-sky-300' : ''}
                                                ${index >= standings.length - 4 ? 'border-l-4 border-rose-500' : ''}
                                            `}
                                        >
                                            {team.rank}
                                        </td>
                                        <td className="w-[40%] p-1 sm:p-2 text-gray-800">
                                            <div className="flex items-center gap-2">
                                                {team.logo ? (
                                                    <img
                                                        src={team.logo}
                                                        alt={`${team.team} logosu`}
                                                        className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                                                    />
                                                ) : (
                                                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-300 rounded-full"></div>
                                                )}
                                                <span className="text-[9px] sm:text-[10px] leading-tight">
                                                    {team.team
                                                        .replace(/^\d+\./, '')
                                                        .replace('A.Ş.', '')
                                                        .replace('FUTBOL KULÜBÜ', '')
                                                        .replace('SPOR KULÜBÜ', '')
                                                        .replace('MISIRLI.COM.TR', '')
                                                        .replace('NATURA DÜNYASI', '')
                                                        .replace('CORENDON', '')
                                                        .replace('ZECORNER', '')
                                                        .replace('HESAP.COM', '')
                                                        .replace('TÜMOSAN', '')
                                                        .replace('ÇAYKUR', '')
                                                        .replace('RAMS', '')
                                                        .replace('EMRE GÖKDEMİR İNŞAAT', '')
                                                        .replace('ATKO GRUP', '')
                                                        .replace('FAALİYETLER', '')
                                                        .replace('FK', '')
                                                        .replace('ÖZBELSAN', '')  
                                                         .replace('ÖZBEYLİ', '')
                                                          .replace('SMS GRUP', '')
                                                          .replace('ALAGÖZ HOLDİNG', '')
                                                          .replace('İMAJ ALTYAPI', '')
                                                          .replace('EMİNEVİM', '')
                                                          .replace('FUTBOL', '')
                                                          .replace('ATAKAŞ', '')
                                                            .replace('ANKARA KEÇİÖRENGÜCÜ', 'KEÇİÖRENGÜCÜ')
                                                            .replace('AKEDAŞ KAHRAMANMARAŞ İSTİKLAL', 'K.MARAŞ')
                                                            .replace('KUZEYBORU 68', '')
                                                            .replace('BELEDİYE', '')
                                                            .replace("GRANNY'S WAFFLES", '')
                                                            .replace('TURKISH OIL YENİ', '')
                                                            .replace('ARKENT', '')
                                                            .replace('BEL.Sİ', '')
                                                            .replace('İDMANYURDU', 'İ.Y')
                                                            .replace('YENİ', '')
                                                            .replace('KCT', '')
                                                            .replace('1969', '')
                                                            .replace('DEMİRSPOR', 'DEMİR')
                                                            .replace('Sİ ', '')
                                                            .replace('ISBAŞ', '')
                                                            .replace('İSHAKLI', '')
                                                            .replace('KARALAR İNŞAAT', '')
                                                            .replace('KÜÇÜKÇEKMECE ', 'K. ')
                                                            .replace('1947', '')
                                                            .replace(' ENERJİ', '')
                                                            .replace('SPOR  KULÜBÜ','SK')
                                                            .replace('İSMAİL','İ.')
                                                            .replace('', '')
                                                            . replace('SERHAT', '')
                                                            .replace('  SPOR', '')

 

                                                        .trim()}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="w-[8%] p-1 sm:p-2 text-center text-gray-600">
                                            {team.played}
                                        </td>
                                        <td className="w-[8%] p-1 sm:p-2 text-center text-gray-600">
                                            {team.wins}
                                        </td>
                                        <td className="w-[8%] p-1 sm:p-2 text-center text-gray-600">
                                            {team.draws}
                                        </td>
                                        <td className="w-[8%] p-1 sm:p-2 text-center text-gray-600">
                                            {team.losses}
                                        </td>
                                        <td className="w-[10%] p-1 sm:p-2 text-center text-gray-600">
                                            {team.average}
                                        </td>
                                        <td className="w-[10%] p-1 sm:p-2 text-center font-bold text-xs text-slate-700">
                                            {team.points}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                </div>
                
            </div>
            <div className="flex flex-wrap font-semibold justify-center not-only-of-type:text-[9px] sm:text-[11px] mt-1 sm:mt-2">
                        
                        <div className="flex items-center gap-1 px-2 py-2 rounded-full">
                            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                          ŞL
                        </div>
                        <div className="flex items-center gap-1 px-2 py-2 rounded-full">
                            <div className="w-2 h-2 rounded-full bg-orange-300"></div>
                            ŞL Öneleme
                        </div>
                        <div className="flex items-center gap-1 px-2 py-2 rounded-full">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            UEFA AL
                        </div>
                        <div className="flex items-center gap-1 x-2 py-2 rounded-full">
                            <div className="w-2 h-2 rounded-full bg-sky-300"></div>
                            KL Öneleme
                        </div>
                        <div className="flex items-center gap-1 px-2 py-2 rounded-full">
                            <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                            Düşme Hattı
                        </div>
                    </div>
        </div>
    );
}