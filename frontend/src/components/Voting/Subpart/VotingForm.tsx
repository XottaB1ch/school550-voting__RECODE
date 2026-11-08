import { useState, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

type STUDENTS ={
    id: number;
    class: string;
    secondary_name: string;
    primary_name: string;
    has_password: boolean;
};
type TEAMS = {
    id: number;
    name: string;
    class: string;
};

const students: STUDENTS[] = [
    { id: 1, class: "11А", secondary_name: "Иванов", primary_name: "Иван", has_password: true},
    { id: 2, class: "10Б", secondary_name: "Петрова", primary_name: "Анна", has_password: false},
    { id: 3, class: "11В", secondary_name: "Сидоров", primary_name: "Алексей", has_password: false},
    { id: 4, class: "9А", secondary_name: "Козлова", primary_name: "Мария", has_password: true},
    { id: 5, class: "10А", secondary_name: "Новиков", primary_name: "Дмитрий", has_password: false},
];
const teams: TEAMS[] = [
    {id: 1, name: "Группа 3", class: "67Ц"},
    {id: 2, name: "Группа 1", class: "12А"},
    {id: 3, name: "Группа 3", class: "68Ц"},
    {id: 4, name: "Группа 3", class: "67X"},
    {id: 5, name: "Группа 4", class: "228Г"},
    {id: 6, name: "Группа 2", class: "15Б"},
];
const sortedTeams: TEAMS[] = teams.toSorted((a, b) =>{
    return a.class.localeCompare(b.class, "ru", {numeric: true});}
);

type Props = {
    onSuccess: () => void;
    onError: () => void;
};

export default function VotingForm({ onSuccess, onError }: Props){
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTeamIds, setSelectedTeamIds] = useState<Set<number>>(new Set());
    const filteredStudents = students.filter(
        student => `${student.primary_name.toLowerCase()} ${student.secondary_name.toLowerCase()}`.includes(searchQuery.toLowerCase())
    );
    const onTeamClicked = useCallback((teamId: number) => {
            setSelectedTeamIds((prevSet) => {
                const newSet = new Set(prevSet);
                newSet.has(teamId) ? newSet.delete(teamId) : newSet.add(teamId);
                return newSet;
            });
    }, [])

    return(
        <Card className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl">
            <CardHeader>
                <CardTitle>Пример страницы для голосования</CardTitle>
            </CardHeader>
            <CardContent>
                <Input placeholder = "Начните вводить ФИО ученика..." value = {searchQuery} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                onClick={() => setSearchQuery("")}/>

                {//Аналог team-container
                <div>
                    {sortedTeams.map(team => {
                        const isSelected = selectedTeamIds.has(team.id);
                        return(
                            <div key={team.id} className="p-3 bg-slate-50 rounded-lg flex justify-between items-center" onClick={() => onTeamClicked(team.id)}>
                                <span className="font-medium">{`${team.name} ${team.class}`}</span>
                                <span className="text-sm text-slate-500">{team.class}</span>
                            </div>
                        );
                    })}
                </div>
                }


                <Button onClick={onSuccess}>Проголосовать (Успех)</Button>
                <Button onClick={onError}>Проголосовать (Не успех)</Button>
            </CardContent>
        </Card>
    )
}