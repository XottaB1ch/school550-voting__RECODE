import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type PROPS = {
    onActivated: () => void;
};

export default function VotingDisabled({ onActivated }: PROPS){
    return(
        //Логика с onActivated: сервер сообщает о том что "Йоу, мы активны" и вызываеться этот метод
        <Card className="w-full max-w-200 shadow-[0_10px_30px_rgba(0,0,0,0.25)] border-0 rounded-3xl overflow-hidden">
            <CardHeader className="text-center pb-0 pt-8 px-6 md:px-8">
                <CardTitle className="text-[1.6rem] font-semibold text-slate-800 leading-[1.4]">ГОЛОСОВАНИЕ НЕ ДОСТУПНО</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6 p-6 md:p-8">
                <div className="flex flex-col items-center bg-slate-50 rounded-2xl p-6 w-full border-2 border-dashed border-blue-500">
                    <h1 className="text-blue-600 text-xl font-semibold mb-3 text-center">ТУТ МОГЛА БЫТЬ ВАША РЕКЛАМА</h1>
                    <div className="text-slate-600 text-[clamp(0.875rem,2.5vw,1.125rem)] leading-relaxed text-center space-y-1.5 w-full">
                        <p>Для размещения рекламы свяжитесь с администратором.</p>
                        <p>Почта: <span className="font-medium text-slate-700">admin@school550-voting.ru</span></p>
                        <p>Телефон: <span className="font-medium text-slate-700">+7(951)670-65-43</span></p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}