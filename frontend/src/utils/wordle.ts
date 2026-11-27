export function get_right_plural_word_form(
  count: number,
  singleForm: string, //Слово в Именительном падеже, Ед. Числе. (Пример: Команда)
  secondForm: string, //Слово в Родительном падеже, Ед. Числе. (Пример: Команды)
  pluralForm: string, //Слово в Родительном падеже, Мн. Числе. (Пример: Команд)
): string {
  if (!Number.isInteger(count)) {
    return secondForm;
  }
  const absoluteCount = Math.abs(count);
  const lastDigit = absoluteCount % 10;
  const twoLastDigits = absoluteCount % 100;

  if (twoLastDigits >= 11 && twoLastDigits <= 19) {
    return pluralForm;
  }
  if (lastDigit === 1) {
    return singleForm;
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return secondForm;
  }
  return pluralForm;
}
