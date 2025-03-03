"use client"

import { Button } from "@/components/ui/button";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import Link from "next/link";
import { DollarSign } from "lucide-react";
import { useQueryGetSportEvents } from "@/rq/events";

export default function Sports() {
    const { data } = useQueryGetSportEvents();
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Sport events</h1>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Odds</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data?.map((events) => (
                            <TableRow key={events.event_id}>
                                <TableCell>{events.event_name}</TableCell>
                                <TableCell>{events.odds}</TableCell>
                                <TableCell className="text-right">
                                    <Link href={`/sports/place-bet/${events.event_id}`}>
                                        <Button size="sm"><DollarSign /> Place a bet</Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
}