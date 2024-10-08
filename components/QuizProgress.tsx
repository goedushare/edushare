import { Badge } from "@nextui-org/react"

export default function QuizProgress({answers}: {answers: number[]}) {
  return <div className="flex flex-row justify-between gap-x-2">
    {answers.map((correct, i) => {
      let bg;
      if (correct === -1) {
        bg = "";
      } else if (correct === 0) {
        bg = "bg-gray-400";
      } else if (correct === 1) {
        bg = "bg-green-500";
      }
      return <div key={i} className={"w-3 h-3 rounded-full border border-gray-300 " + bg}></div>
      
      
      // <Badge key={i} className={"border border-gray-500 mx-4" + bg}><span className="h-12 w-12"></span></Badge>
    })}
  </div>
}