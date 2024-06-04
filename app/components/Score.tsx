export default function Score({answers}: {answers: boolean[]}) {
  let total = 0;
  console.log(answers);
  for (let i = 0; i < answers.length; i++) {
    console.log(answers[i]);
    if (answers[i] === true) {
      total++;
    }
  }
  return <div>
    <h2>Score: {total}</h2>
  </div>
}