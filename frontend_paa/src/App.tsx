import { useState } from 'react'
import Button from './components/button.tsx'
import animeGif from './assets/anime-dance.gif'

const questions = [
  'Você é do tipo que gosta de maratonar animes e terminar na mesma semana?',
  'Quando escolhe assistir a um anime, você costuma levar em consideração as avaliações e críticas?',
  'Você gosta de animes nostálgicos?',
  'Você tem preferência por animes que se destacam pelas cenas de ação intensas e empolgantes?',
  'Você se sente inclinado  a assistir a animes que exploram aventuras épicas e jornadas emocionantes?',
  'Você costuma buscar animes que receberam prêmios e reconhecimento por sua qualidade?',
  'Quando se trata de escolher um anime para assistir, você geralmente procura por aqueles que te fazem dar boas risadas?',
  'Você costuma se envolver mais em animes que exploram temas dramáticos e emocionais?',
  'Você costuma se interessar por animes que exploram mundos imaginários e elementos sobrenaturais?',
  'Você gosta de animes que exploram sustos e suspense?',
  'Você gosta de animes com investigações e mistérios?',
  'Você gosta de boas histórias de amor?',
  'Você se interessa por animes que exploram conceitos futuristas e tecnologia avançada?'
]

export default function App() {
  const [question, setQuestion] = useState<number>(0)
  const [doQuestion, setDoQuestion] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [answer, setAnswer] = useState<(0 | 1 | -1)[]>([])

  async function handleSendData() {
    console.log(answer)
  }

  function setAnswerData(type: 0 | 1 | -1) {
    setAnswer((prevAnswer) => (prevAnswer ?  [...prevAnswer, type] : [type]));

    setQuestion(question + 1)

    if (question === 12) {
      setDoQuestion(false)
      setLoading(true)
      handleSendData()
    }
  }

  return (
    <>
      {doQuestion ? (
        <div className="flex flex-col justify-center items-center h-screen w-full p-24 space-y-24 text-4xl">
          <p className='text-center'>{questions[question]}</p>
          <div className="flex flex-row w-1/2 justify-evenly">
            <Button setData={setAnswerData} type="sim" />
            <Button setData={setAnswerData} type="não" />
            <Button setData={setAnswerData} type="talvez" />
          </div>
        </div>
      ) : loading ? (
        <>
          <div className="flex justify-center items-center h-screen w-full">
            <img src={animeGif} alt="Garota de anime dançando" />
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  )
}
