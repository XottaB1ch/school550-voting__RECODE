export function get_right_plural_word_form(count: number, singleForm: string, secondForm: string, pluralForm: string): string{
    if (!Number.isInteger(count)) { return secondForm }

    const lastDigit = count%10;
    const twoLastDigits = count%100;

    if (twoLastDigits != 11 && lastDigit == 1){ return singleForm }
    if (lastDigit >= 2 && lastDigit <= 4 && (twoLastDigits <= 12 || twoLastDigits >= 14)) { return secondForm }
    return pluralForm
}