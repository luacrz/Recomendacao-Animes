import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { api } from '../../lib/api.ts'
import Button from '../../components/button.tsx'
import animeGif from '../../assets/anime-dance.gif'
import { anime } from '../../../Types.ts'

interface HomeProps {
  questions: string[]
}

export default function Home({questions}: HomeProps) {
  const [question, setQuestion] = useState<number>(0)
  const [doQuestion, setDoQuestion] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [answer, setAnswer] = useState<(0 | 1 | -1)[]>([])
  const [animes, setAnimes] = useState<anime[]>()

  const navigate = useNavigate();

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
          title: response2.data.data.title,
          id: response2.data.data.id
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
    
    if (question == questions.length ) {
      setAnswer(prevAnswer => (prevAnswer ? [...prevAnswer, 1] : [1]))
      setDoQuestion(false)
      setLoading(true)
      handleSendData()
    }
  }

  function refreshPage(){ 
    window.location.reload(); 
  } 

  return (
    <>
      <div className='flex flex-col h-screen w-full p-8'>
        <div className="flex justify-end w-full">
          <button className="text-2xl text-white bg-green-950 px-6 py-4 rounded-xl" onClick={() => {navigate('/tree')}}>
            Tree
          </button>
        </div>
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
            <div className="flex flex-col h-screen w-full justify-center items-center space-y-20 text-4xl">
              <p>Aqui estão algumas sugestões:</p>
              <div className="flex flex-row space-x-8">
                {animes?.map(anime => (
                  <div key={anime.id} className="flex flex-col justify-center items-center space-y-6 text-2xl">
                    <img src={anime.image_url} alt="Imagem do anime." />
                    <p>{anime.title}</p>
                  </div>
                ))}
              </div>
              <button
                className="text-2xl text-white bg-black px-8 py-6 rounded-xl"
                onClick={refreshPage}
              >
                Fazer de novo
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
