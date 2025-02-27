"use client"

import { ItemEventForm } from "@/components/features/items/item-event-form";
import { RoutedDialog } from "@/components/util/routed-dialog";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AddEventModal() {
    //const { mutate: createItemEvent, isSuccess } = useMutationCreateItemEvent();
    const router = useRouter()
    const { id } = useParams()

    /*useEffect(() => {
        if (isSuccess) {
            router.back()
        }
    }, [isSuccess, router])*/

    return (
        <RoutedDialog title="Place a bet">
            <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                    <label htmlFor="amount" className="text-sm font-medium leading-none">
                        Bet Amount
                    </label>
                    <input
                        id="amount"
                        type="number"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Enter bet amount"
                    />
                </div>
            </div>
        </RoutedDialog>
    )
}