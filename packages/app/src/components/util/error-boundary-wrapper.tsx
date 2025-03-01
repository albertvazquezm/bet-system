'use client';

import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "../ui/button";

export default function ErrorBoundaryWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <QueryErrorResetBoundary>
            {({ reset }) => (
                <ErrorBoundary
                    onReset={reset}
                    fallbackRender={({ resetErrorBoundary }) => (
                        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-gray-900 p-4">
                            <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong</h2>
                            <div className="flex gap-4">
                                <Button onClick={() => {
                                    reset(); // Reset React Query errors
                                    resetErrorBoundary(); // Reset Error Boundary errors
                                }}>
                                    Try again
                                </Button>
                                <Button variant="outline" onClick={() => window.location.reload()}>
                                    Reload page
                                </Button>
                            </div>
                        </div>
                    )}
                >
                    {children}
                </ErrorBoundary>
            )}
        </QueryErrorResetBoundary>
    );
}