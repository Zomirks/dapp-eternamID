'use client';

import { useState, useEffect } from "react";

// ShadCN components Import
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { CONTRACT_USDC_ADDRESS, CONTRACT_USDC_ABI } from "@/utils/constants";

// Wagmi Hooks to interact with the blockchain
import { type BaseError, useWriteContract, useReadContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'

interface FaucetProps {
    onFaucetSuccess?: () => void;
}

const Faucet = ({ onFaucetSuccess }: FaucetProps) => {
    const { data: hash, error: writeError, writeContract, isPending: writeIsPending } = useWriteContract();

    const { address } = useAccount();
    const [inputFaucet, setInputFaucet ] = useState(0);
    const [validationError, setValidationError] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        })

    const handleMintToken = async () => {
        setValidationError('');

        if (!inputFaucet || inputFaucet === 0) {
            setValidationError('Indiquez un nombre valide svp');
            return;
        }

        let tokenToMint = inputFaucet * 10 ** 6;

        writeContract({
            address: CONTRACT_USDC_ADDRESS,
            abi: CONTRACT_USDC_ABI,
            functionName: 'mint',
            args: [address, tokenToMint],
        })
    }

    useEffect(() => {
        if (isConfirmed) {
            setInputFaucet(0);
            if (onFaucetSuccess) {
                onFaucetSuccess();
            }
            setTimeout(() => setIsOpen(false), 1500);
        }
    }, [isConfirmed, onFaucetSuccess]);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>
                    Faucet
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Faucet USDC (Testnet)</DialogTitle>
                    <DialogDescription>
                        Mintez des USDC de test pour utiliser la dApp
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label
                                htmlFor="faucet-input"
                                className={validationError ? "text-destructive" : ""}
                            >
                                Montant d'USDC
                            </Label>
                            {validationError && (
                                <Badge variant="destructive" className="text-xs">
                                    Erreur
                                </Badge>
                            )}
                        </div>

                        <Input
                            id="faucet-input"
                            type="number"
                            min={0}
                            step={1}
                            value={inputFaucet}
                            placeholder="Ex: 120"
                            onChange={(e) => setInputFaucet(Number(e.target.value))}
                            className={validationError ? "border-destructive" : ""}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !writeIsPending && !isConfirming) {
                                    handleMintToken();
                                }
                            }}
                        />

                        {validationError && (
                            <p className="text-destructive text-xs flex items-center gap-1">
                                <svg
                                    className="h-3 w-3"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                {validationError}
                            </p>
                        )}
                    </div>

                    {isConfirmed && (
                        <p className="text-green-600 text-sm text-center">
                            ✓ USDC mintés avec succès !
                        </p>
                    )}

                    <Button
                        onClick={handleMintToken}
                        className="w-full"
                        disabled={writeIsPending || isConfirming}
                    >
                        {writeIsPending || isConfirming ? (
                            <>
                                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                                {writeIsPending ? 'Confirmation...' : 'Transaction en cours...'}
                            </>
                        ) : (
                            'Mint USDC'
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default Faucet