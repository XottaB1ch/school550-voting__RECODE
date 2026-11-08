import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

type PROPS = {
    onReturn: () => void;
    status: "vote_success" | "vote_error";
    message?: string;
    title?: string;
};

export default function VotingEnd({ onReturn, status, message, title }: PROPS) {
    const isSuccess = status === "vote_success";

    return (
        <Card className="w-[90vw] max-w-200 bg-white rounded-3xl shadow-2xl">
            <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl md:text-3xl font-bold text-slate-800">
                    {title || (isSuccess ? "Голосование завершено" : "Ошибка голосования")}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6 p-6 md:p-8">
                <div className={`w-full p-5 rounded-2xl text-center font-semibold text-white shadow-md flex flex-col items-center gap-3 transition-all duration-300 
                ${isSuccess ? "bg-linear-to-r from-emerald-500 to-emerald-600 shadow-emerald-500/30" : "bg-linear-to-r from-red-500 to-rose-600 shadow-red-500/30"}`}>
                    {isSuccess ? <CheckCircle className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
                    <p className="text-lg md:text-xl leading-relaxed max-h-none">
                        {isSuccess ? "Ваш голос успешно учтён!" : (message || "Произошла непредвиденная ошибка. Попробуйте ещё раз.")}
                    </p>
                </div>
                <Button onClick={onReturn} className="w-full h-14 text-lg font-semibold rounded-2xl bg-linear-to-r from-blue-600 to-blue-500 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                    Вернуться к началу
                </Button>
            </CardContent>
        </Card>
    );
}