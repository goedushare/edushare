export default function Score({answers}: {answers: boolean[]}) {
  let total = 0;
  for (let i = 0; i < answers.length; i++) {
    if (answers[i] === true) {
      total++;
    }
  }
  return <div>
    <h2>Score: {total}</h2>
  </div>
}