'use client'
import {
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form";
import { z } from 'zod'
import { toast } from "sonner"

const advertsCreateSchema = z.object({
    title: z.string().min(2, "Title is required"),
    description: z.string().min(2, "Description is required"),
    price: z.string().min(2, "Price is required"),
})

type advertsCreateSchema = z.infer<typeof advertsCreateSchema>

export function CreateAdvertButton() {

    const handleForm = async (data: any) => {
        try {
            await fetch("https://crud-nodejs-5zst.onrender.com/adverts", {
                method: 'POST',
                body: JSON.stringify(data)
            })

        } catch (err) {
            console.log(err)
        }
    }

    const { register, handleSubmit, formState: { errors } } = useForm<advertsCreateSchema>({
        resolver: zodResolver(advertsCreateSchema)
    })

    async function handleCreateAdvert(data: advertsCreateSchema) {
        await handleForm(data)
        toast(`Produto registrado!`, {
            description: "Seu produto foi registrado com sucesso!"
        })
    }
    
    return (
        <>
            <DialogContent className="sm:max-w-[425px] border-zinc-600 flex flex-col gap-6">
                <DialogHeader>
                    <DialogTitle>Create a new advert</DialogTitle>
                </DialogHeader>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleCreateAdvert)}>
                    <div className="text-zinc-50 font-light flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Input type="text" placeholder="type the advert title" className="border-zinc-600" {...register('title')} />
                            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                        </div>

                        <div>
                            <textarea placeholder="type the advert description" className="border-zinc-600 p-2 text-[14px] rounded-md bg-transparent
                            border resize-none h-[200px] outline-none w-full" {...register('description')} />
                            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                        </div>
                        
                        <div className="flex flex-col gap-2">
                            <Input type="number" placeholder="type the advert price" className="border-zinc-600" {...register('price')} />
                            {errors.price && <p className="text-red-500">{errors.price.message}</p>}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button 
                            className="bg-sky-500 hover:bg-sky-600 hover:ring-2 ring-zinc-200" 
                            type="submit"
                        >
                                create
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </>
    )
}