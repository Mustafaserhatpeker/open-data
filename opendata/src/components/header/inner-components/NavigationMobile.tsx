"use client";

import { Link } from "react-router-dom";

export default function NavigationMenu({ mobile }: { mobile?: boolean }) {
    if (mobile) {
        return (
            <div className="flex flex-col gap-3 w-full text-center">

                <Link
                    to="/datasets"
                    className="w-full py-3 rounded-md font-semibold text-sm bg-[#221A4C] text-white"
                >
                    Veri Setleri
                </Link>

                <Link
                    to="/organizations"
                    className="w-full py-3 rounded-md font-semibold text-sm bg-[#221A4C] text-white"
                >
                    Organizasyonlar
                </Link>

                <Link
                    to="/statistics"
                    className="w-full py-3 rounded-md font-semibold text-sm bg-[#221A4C] text-white"
                >
                    İstatistikler
                </Link>

                <Link
                    to="/categories"
                    className="w-full py-3 rounded-md font-semibold text-sm bg-[#221A4C] text-white"
                >
                    Kategoriler
                </Link>

                <Link
                    to="/datarequests"
                    className="w-full py-3 rounded-md font-semibold text-sm bg-[#221A4C] text-white"
                >
                    Veri İsteği
                </Link>
            </div>
        );
    }

    // Eğer yanlışlıkla desktop'ta kullanılırsa minimalist görünüm:
    return (
        <div className="flex gap-4 text-xs text-[#221A4C] font-semibold">
            <Link to="/datasets">Veri Setleri</Link>
            <Link to="/organizations">Organizasyonlar</Link>
            <Link to="/statistics">İstatistikler</Link>
            <Link to="/categories">Kategoriler</Link>
            <Link to="/datarequests">Veri İsteği</Link>
        </div>
    );
}
