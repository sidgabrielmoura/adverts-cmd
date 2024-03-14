'use client'
import { ChangeEvent, useEffect, useState } from 'react'
import { CreateAdvertButton } from "@/components/createAdvertButton";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from '@/components/ui/scroll-area';
import { DialogContent } from '@radix-ui/react-dialog';
import { toast } from 'sonner';


export default function Home() {
  interface dataProps {
    id: number,
    title: string,
    description: string,
    price: number
  }
  
  const [ search, setSearch] = useState('')
  
  function handleSearch(event: ChangeEvent<HTMLInputElement>){
    const query = event.target.value
    setSearch(query)
  }

  const [data, setData] = useState<dataProps[]>([])

  const filteredAdverts = search !== '' 
  ? data.filter(advert => advert.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
  : data

  useEffect(() => {
      handleForm()
  }, [])

  const handleForm = async () => {
      try {
          const response = await fetch("https://crud-nodejs-5zst.onrender.com/adverts") 
          const data = await response.json()
          if(data)setData(data)

      } catch (err) {
          console.log(err)
      }
  }

  const [deletedAdverts, setDeletedAdverts] = useState<number[]>([])

  const handleDelete = async (id: number) => {
    try {
        await fetch(`https://crud-nodejs-5zst.onrender.com/adverts/${id}`, {
            method: "DELETE"
        }).then(() => {
          toast(`Product deleted`, {
            description: "your product as deleted with success!"
          })
        })

        setDeletedAdverts([...deletedAdverts, id])

    } catch (err) {
        console.log(err)
    }
  }

  return (
    <>
      <main className="w-[100vw] h-full flex flex-col items-center bg-zinc-900">
        <nav className="w-full h-[100px] border-b-[1.5px] border-zinc-600 px-2 flex justify-between items-center gap-4
        md:px-10
        lg:gap-8">

          <h1 className="text-zinc-200 font-normal text-[18px] w-[200px] hidden
          sm:block">Ads Table</h1>
          
          <input 
              type="text" 
              placeholder="search advert" 
              className="w-full bg-transparent border-b-[1.5px] border-zinc-600 py-2 outline-none text-zinc-200"
              onChange={handleSearch}
          />

          <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-sky-500 hover:bg-sky-600 hover:ring-2 ring-zinc-200">create advert</Button>
                </DialogTrigger>
                <CreateAdvertButton/>
          </Dialog>
        </nav>

        <section className="w-full flex flex-col items-center py-2 px-2
        lg:w-[90vw]">
          <h1 className='w-full mt-1 text-zinc-400 font-bold'>total adverts: ({filteredAdverts.length})</h1>
          <ScrollArea className='w-full h-[80vh] mt-[10px]'>
            <div className='flex gap-3 flex-col'>
              {filteredAdverts.map(({id, title, description, price}) => (   
                  <div key={id}>
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className={`${
                          deletedAdverts.includes(id)
                            ? 'bg-zinc-700 rounded-2xl p-3 text-zinc-50 flex flex-col gap-2 opacity-40' 
                            : 'bg-zinc-700 rounded-2xl p-3 text-zinc-50 flex flex-col gap-2 cursor-pointer hover:bg-zinc-700/70 transition-colors duration-150'
                        }`}
                        >

                          <span className='text-zinc-400'>
                            {id}
                          </span>

                          <h1 className='font-bold capitalize flex gap-2'>
                              {title}
                              <p className='text-zinc-300 text-[15px]'>R$: {price},00</p>
                          </h1>

                          <p className='text-zinc-200 text-[15px]'>
                            {description}
                          </p>

                        </div>
                      </DialogTrigger>

                      <DialogContent className="flex gap-3 mt-3">
                        <Button 
                          className='px-5 py-3 rounded-xl text-zinc-200 hover:translate-x-1 transition-all duration-150 bg-red-500 hover:bg-red-400'
                          onClick={() => {
                            handleDelete(id)
                          }}
                        >
                          Delete advert
                        </Button>
                      </DialogContent>
                    </Dialog>
                  </div>
              ))}
              <div className='h-[40px]'/>
            </div>
          </ScrollArea>
        </section>
      </main>
    </>
  );
}
