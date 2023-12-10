import { useState } from 'react'
import axios from 'axios'
import { api } from './lib/api.ts'
import Button from './components/button.tsx'
import animeGif from './assets/anime-dance.gif'
import { anime } from '../Types.ts'

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
  const [animes, setAnimes] = useState<anime[]>()

  const malApi = axios.create({
    baseURL: 'https://api.jikan.moe/v4/anime'
  })

  async function handleSendData() {
    console.log(answer)

    try {
      const response = await api.post('/', {
        body: answer
      })
      handleGetData(response.data)
    } catch (error) {
      console.error('Erro ao enviar dados:', error)
    }
  }

  async function handleGetData(data: number[]) {
    const lista = []

    try {
      for (let i = 0; i < data.length; i++) {
        const response2 = await malApi.get(`/${data[i]}`)

        const resposta = {
          image_url: response2.data.data.images.jpg.image_url,
          title: response2.data.data.title
        }
        lista.push(resposta)
      }
      setAnimes(lista)
    } catch (error) {
      console.error('Erro ao enviar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  function setAnswerData(type: 0 | 1 | -1) {
    setAnswer(prevAnswer => (prevAnswer ? [...prevAnswer, type] : [type]))

    setQuestion(question + 1)

    if (question === questions.length - 1) {
      setAnswer(prevAnswer => (prevAnswer ? [...prevAnswer, 1] : [1]))
      setDoQuestion(false)
      setLoading(true)
      handleSendData()
    }
  }

  function handleRestart() {
    setQuestion(0)
    setDoQuestion(true)
  }

  return (
    <>
      {doQuestion ? (
        <div className="flex flex-col justify-center items-center h-screen w-full p-24 space-y-24 text-4xl">
          <p className="text-center">{questions[question]}</p>
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
        <>
          <div className='flex flex-col h-screen w-full justify-center items-center space-y-20 text-4xl'>
            <p>Aqui estão algumas sugestões:</p>
            <div className='flex flex-row space-x-8'>
            {animes?.map((anime) => 
              <div className='flex flex-col justify-center items-center space-y-6 text-2xl'>
                <img src={anime.image_url} alt="Imagem do anime."/>
                <p>{anime.title}</p>
              </div>
            )}
            </div>
            <button className='text-2xl text-white bg-black px-8 py-6 rounded-xl' onClick={handleRestart}>Fazer de novo</button>
          </div>
        </>
      )}
    </>
  )
}
