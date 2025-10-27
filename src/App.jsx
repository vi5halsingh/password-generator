import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [password , setPassword] = useState('')
  const passwordRef = useRef(password)
  let pass = ""
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  const passwordGenerator = useCallback(()=>{
    if(includeNumbers) str+="0123456789"
    if(includeSymbols) str+="!@#$%^&*()_+"

    for (let i=1 ; i<= length ; i++){
      const randomChar = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(randomChar);

  }
  setPassword(pass)
},[length , includeNumbers, includeSymbols , setPassword])

const copyToClipboard = useCallback(()=>{
  passwordRef.current.select()
  window.navigator.clipboard.writeText(passwordRef.current.value)
},[password])

useEffect(()=>{
passwordGenerator()
},[length , includeNumbers , includeSymbols , passwordGenerator])

  return (
    <>
    <div className='text-white m-auto border-2 border-white rounded-lg p-4 md:w-4/5 w-11/12 mt-20 bg-gray-900 overflow-hidden'>
   <h1 className='text-center text-white font-medium'>password generator</h1>
    <div className='flex mt-4  gap-2 w-full  p-2'>
      <input 
    
    type="text"
    value={password}
    readOnly
    className='bg-gray-800 text-white p-2 rounded-md w-full'
    onChange={(e)=>setPassword((prev)=> e.target.value)}
    ref={passwordRef}
    />
    <button 
    className='bg-blue-800 hover:bg-gray-800 text-white p-2 rounded-md text-center cursor-pointer w-20'
    onClick={copyToClipboard}

    >copy</button>
   </div>
   <div className='flex flex-wrap mx-auto w-4/5 p-2 md:gap-4 gap-2 mt-4 items-center'>
   <div className='bg-gray-800 p-2 rounded-md flex content-center'>
    <input 
    type="range"
    min={6}
    max={100}
    value={length}
    onChange={(e)=>setLength(e.target.value)}
    />
    <label htmlFor={length} className='ml-2'>Length : {length} </label>
   </div>
   <div className='bg-gray-800 p-2 rounded-md'>
    <input 
    type="checkbox"
    defaultChecked={includeNumbers}
    onChange={(e)=>setIncludeNumbers(prev => !prev)}
   
    />
    <label htmlFor={includeNumbers}  className=' ml-2'>Numbers</label>
   </div>
   <div className='bg-gray-800 p-2 rounded-md'>
    <input 
    type="checkbox"
    defaultChecked={includeSymbols}
    onChange={() =>setIncludeSymbols(prev => !prev)}

    />
    <label htmlFor={includeSymbols} className=' ml-2'> Symbols</label>
   </div>
   </div>
   </div>
    </>
  )
}

export default App
