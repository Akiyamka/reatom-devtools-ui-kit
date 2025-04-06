export function Select({ options }: { options: string[] }) {
  return (
    <select>
      {options.map((option) => (
        <option value={option}>{option}</option>
      ))}
    </select>
  );
}
