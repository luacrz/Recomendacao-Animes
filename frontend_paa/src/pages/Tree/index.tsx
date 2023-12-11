import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

interface TreeProps {
  questions: string[]
  changeQuestions: (questions: string[]) => void
}

export default function Tree({ questions, changeQuestions }: TreeProps) {
  const [editedList, setEditedList] = useState([...questions])

  const navigate = useNavigate();

  const handleEdit = (index: number, newValue: string) => {
    const newList = [...editedList]
    newList[index] = newValue
    setEditedList(newList)
  }

  const handleSave = () => {
    changeQuestions(editedList)
    navigate('/')
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-auto space-y-16 p-16">
      <h1 className="text-4xl">Lista de Perguntas</h1>
      <ul className="flex flex-col w-full space-y-8">
        {editedList.map((str, index) => (
          <li key={index}>
            <input
              type="text"
              value={str}
              onChange={e => handleEdit(index, e.target.value)}
              className="w-full text-2xl p-4 border-solid border-black border-[1px] rounded-2xl"
            />
          </li>
        ))}
      </ul>
      <button
        onClick={handleSave}
        className="text-xl bg-blue-500 text-white px-6 py-3 rounded-md"
      >
        Salvar
      </button>
    </div>
  )
}
