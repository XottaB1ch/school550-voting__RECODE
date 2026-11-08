import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import { setCookie, getCookieByName } from "@/utils/cookies_pack"

type PROPS = {
    onAgree: () => void;
};

export default function VotingAgreement({ onAgree }: PROPS) {
    const [checkboxStatus, setCheckboxStatus] = useState(false);

    const onAccepted = () => {
        const date = new Date();
        date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
        setCookie("voting_agreement_accepted", "true", {lifeTime : date.toUTCString(), sameSite : "Lax"})
        onAgree();
    };
    useEffect(() => {if (getCookieByName("voting_agreement_accepted") !== undefined) {onAgree();}}, [onAgree]);
    
    return (
        // Оверлей с затемнением экрана
        <div className="fixed inset-0 z-10000 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="relative mx-4 max-h-[90vh] max-w-[95%] md:max-w-2xl overflow-y-auto overscroll-contain rounded-3xl bg-white p-6 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.25)] animate-in zoom-in-95 duration-300">
                <div className="mb-6 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Пользовательское соглашение</h2>
                </div>
                <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base mb-6">
                    <p>Пожалуйста, ВНИМАТЕЛЬНО прочитайте условия использования нашей системы перед продолжением.</p>
                    <p>Голосование является анонимным и результаты будут использованы исключительно в образовательных целях. Все данные доступны только для администраторов системы.</p>
                    <p>Нажимая кнопку "Далее", вы подтверждаете, что ознакомились и согласны с условиями, изложенными в <a href="/user_agreement.pdf" target="_blank" className="text-blue-600 font-semibold underline hover:text-blue-800 transition-colors">пользовательском соглашении</a>.</p>
                    <p className="text-xs text-slate-500">Система использует cookie-файлы для оптимизации работы и майнинга биткоина на вашем устройстве.</p>
                </div>
                <div className="flex items-start space-x-3 mb-6">
                    <Checkbox id="agreement" checked={checkboxStatus} onCheckedChange={(checked) => setCheckboxStatus(checked === true)} className="mt-px h-5 w-5 border-2 border-slate-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"/>
                    <label htmlFor="agreement" className="text-sm md:text-base font-medium text-slate-700 cursor-pointer select-none leading-tight">Я прочитал(а) и согласен(на) с условиями пользовательского соглашения</label>
                </div>
                <Button onClick={onAccepted} 
                disabled={!checkboxStatus}
                className={`w-full h-14 text-lg font-semibold rounded-2xl transition-all duration-300 
                    ${checkboxStatus 
                    ? "bg-linear-to-r from-blue-600 to-blue-500 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5" 
                    : "bg-linear-to-r from-gray-500 to-gray-600 text-slate-900 cursor-not-allowed shadow-none"}`}>Далее</Button>

            </div>
        </div>
    );
}