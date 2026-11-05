import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const students = [
    { id: 1, name: "Иванов", surname: "Иван", class: "11А" },
    { id: 2, name: "Петрова", surname: "Анна" , class: "10Б" },
    { id: 3, name: "Сидоров", surname: "Алексей" , class: "11В" },
    { id: 4, name: "Козлова", surname: "Мария" , class: "9А" },
    { id: 5, name: "Новиков", surname: "Дмитрий" , class: "10А" },
];
type Student ={
    id: number;
    class: string;
    secondary_name: string;
    primary_name: string;
    has_password: boolean;
};
type Team = {
    id: number;
    name: string;
    class: string;
};
type Props = {
    onSuccess: () => void;
    onError: () => void;
};

export default function VotingForm({ onSuccess, onError }: Props){
    const [searchText, setSearchText] = useState("");
    const filteredStudents = students.filter(
        student => `${student.name.toLowerCase()} ${student.surname.toLowerCase()}`.includes(searchText.toLowerCase())
    );



    return(
        <Card className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl">
            <CardHeader>
                <CardTitle>Пример страницы для голосования</CardTitle>
            </CardHeader>
            <CardContent>
                <Input value = {searchText} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}/>
                <p className="mt-4 text-slate-600">Вы ввели: {searchText}</p>
                {
                <div>
                    {filteredStudents.map(student => (
                                <div key={student.id} className="p-3 bg-slate-50 rounded-lg flex justify-between items-center">
                                  <span className="font-medium">{`${student.name} ${student.surname}`}</span>
                                  <span className="text-sm text-slate-500">{student.class}</span>
                                </div>
                            )
                        )
                    }
                </div>
                }


                <Button onClick={onSuccess}>Проголосовать (Успех)</Button>
                <Button onClick={onError}>Проголосовать (Не успех)</Button>
            </CardContent>
        </Card>
    )
}