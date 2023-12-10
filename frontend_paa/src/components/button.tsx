interface buttonProps {
  type: 'sim' | 'não' | 'talvez'
  setData: (answer: 0 | 1 | -1) => void
}

export default function Button({ type, setData }: buttonProps) {
  const getButtonClassName = () => {
    // Adapte as classes conforme necessário
    if (type === 'sim') {
      return 'bg-green-500 text-white py-4 px-8 rounded-md w-fit';
    } else if (type === 'não') {
      return 'bg-red-500 text-white py-4 px-8 rounded-md w-fit';
    } else if (type === 'talvez') {
      return 'bg-yellow-500 text-white py-4 px-8 rounded-md w-fit';
    }
  };

  const handleClick = () => {
    let valueToSet: 0 | 1 | -1 = 0;
    if (type === 'sim') {
      valueToSet = 1;
    } else if (type === 'não') {
      valueToSet = -1;
    } else if (type === 'talvez') {
      valueToSet = 0;
    }

    setData(valueToSet);
  };


  return <><button onClick={handleClick} className={getButtonClassName()}>{type}</button></>
}
