'use client';

import { useEffect, useState } from 'react';

export default function Home() {

    // Puan durumu state'i
    const [standings, setStandings] = useState([]);

    // Sayfa açılınca çalışır
    useEffect(() => {

        // Backend API'ye istek gönder
        fetch('/api/standings')

        // JSON'a çevir
        .then(response => response.json())

        // State'e kaydet
        .then(data => {
            setStandings(data.standings);
        });

    }, []);

    return (

        <div className="w-full p-2 sm:p-4 bg-gradient-to-b from-gray-50 via-white to-gray-100 flex flex-col items-center">

            <div className="w-full max-w-sm mb-3">
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl shadow-xl p-3 sm:p-4 text-white text-center border border-white/20">
                    <span className="text-sm sm:text-base tracking-none font-semibold">2025 - 2026 Sezonu</span>
                    <h1 className="text-2xl sm:text-4xl tracking-none font-extrabold leading-tight">
                        Trendyol Süper Lig
                    </h1>
                    <h2 className="text-sm sm:text-xl tracking-none font-bold mt-1 sm:mt-2">
                        Puan Cetveli
                    </h2>
                    <div className="flex flex-wrap justify-center gap-1 sm:gap-2 text-[9px] sm:text-[11px] mt-2 sm:mt-3">
                        <div className="flex items-center gap-2 bg-white/20 px-2 py-1 rounded-full">
                            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                          ŞL
                        </div>
                        <div className="flex items-center gap-2 bg-white/20 px-2 py-1 rounded-full">
                            <div className="w-2 h-2 rounded-full bg-orange-300"></div>
                            ŞL Ön E.
                        </div>
                        <div className="flex items-center gap-2 bg-white/20 px-2 py-1 rounded-full">
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                            AvL
                        </div>
                        <div className="flex items-center gap-2 bg-white/20 px-2 py-1 rounded-full">
                            <div className="w-2 h-2 rounded-full bg-emerald-300"></div>
                            KL
                        </div>
                        <div className="flex items-center gap-2 bg-white/20 px-2 py-1 rounded-full">
                            <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                            Düşme
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden">
                <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
                    <table className="w-full text-[10px] sm:text-[12px]">
                        <thead>
                            <tr className="bg-gradient-to-r from-teal-500 to-teal-600 text-white sticky top-0 z-10 shadow-sm">
                                <th className="w-[%8] p-1 sm:p-2 text-center">#</th>
                                <th className="w-[40%] p-1 sm:p-2 pl-3 text-left">TAKIMLAR</th>
                                <th className="w-[8%] p-1 sm:p-2 pr-4 text-center">O</th>
                                <th className="w-[8%] p-1 sm:p-2 pr-4 text-center">G</th>
                                <th className="w-[8%] p-1 sm:p-2 pr-4 text-center">B</th>
                                <th className="w-[8%] p-1 sm:p-2 pr-4 text-center">M</th>
                                <th className="w-[%8] p-1 sm:p-2 pr-4 text-center">AV</th>
                                <th className="w-[14%] p-1 sm:p-2 pr-4 text-center">P</th>
                            </tr>
                        </thead>
                    </table>

                    <div className="max-h-90 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                        <table className="w-full text-[10px] sm:text-[12px]">
                            <tbody>
                                {standings.map((team, index) => (
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
                                                ${index === 2 ? 'border-l-4 border-emerald-500' : ''}
                                                ${index === 3 ? 'border-l-4 border-emerald-300' : ''}
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
        </div>
    );
}