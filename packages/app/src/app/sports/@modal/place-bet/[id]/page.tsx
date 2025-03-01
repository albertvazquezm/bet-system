"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RoutedDialog } from "@/components/util/routed-dialog";
import { useMutationCreateSportEventBet } from "@/rq/events";
import { CreateSportEventBetDto, CreateSportEventBetSchema } from "@bet-system/dto";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
export default function PlaceBetModal() {
    const { mutate: createSportEventBet, isSuccess } = useMutationCreateSportEventBet();
    const router = useRouter()
    const { id } = useParams()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<Pick<CreateSportEventBetDto, 'bet_amount'>>({
        resolver: zodResolver(CreateSportEventBetSchema.pick({ bet_amount: true }))
    });
    useEffect(() => {
        if (isSuccess) {
            toast.success('Bet placed successfully');
            router.back()
        }
    }, [isSuccess, router])

    return (
        <RoutedDialog title="Place a bet">
            <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                    <Label htmlFor="amount" className="text-sm font-medium leading-none mb-2">
                        Bet Amount
                    </Label>
                    <form onSubmit={handleSubmit((data) => createSportEventBet({ eventId: Number(id), betAmount: data.bet_amount }))}>
                        <Input
                            {...register('bet_amount', { valueAsNumber: true })}
                            onChange={(e) => {
                                setValue('bet_amount', Number(e.target.value))
                            }}
                            id="amount"
                            step={0.01}
                            type="number"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Enter bet amount"
                        />
                        {errors.bet_amount && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.bet_amount.message}
                            </p>
                        )}
                        <Button className="mt-4" type="submit">Place bet</Button>
                    </form>
                </div>
            </div>
        </RoutedDialog>
    )
}