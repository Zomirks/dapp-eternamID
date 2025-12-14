'use client';

import { CONTRACT_ETERNAMID_ADDRESS, CONTRACT_ETERNAMID_ABI } from "@/utils/constants";
import { useReadContract, useAccount } from 'wagmi';

import ReferralEvents from "./referrals/ReferralEvents";

// Icons
const GiftIcon = ({ className = "" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="20,12 20,22 4,22 4,12" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="2" y="7" width="20" height="5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="12" y1="22" x2="12" y2="7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const CopyIcon = ({ className = "" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const CheckIcon = ({ className = "" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

import { useState } from "react";

const Referral = () => {
    const { address } = useAccount();
    const [copied, setCopied] = useState(false);

    const { data: owner } = useReadContract({
        address: CONTRACT_ETERNAMID_ADDRESS,
        abi: CONTRACT_ETERNAMID_ABI,
        functionName: "owner",
    });

    const isAdmin = address === owner;

    const { data: refCode } = useReadContract({
        address: CONTRACT_ETERNAMID_ADDRESS,
        abi: CONTRACT_ETERNAMID_ABI,
        functionName: "addressToRefCode",
        args: [address]
    }) as { data?: string };

    const handleCopy = async () => {
        if (refCode) {
            await navigator.clipboard.writeText(refCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="space-y-6">
            {isAdmin && (
                <div className="bento-card">
                    <ReferralEvents />
                </div>
            )}

            {refCode && (
                <div className="bento-card">
                    <div className="flex items-center gap-4">
                        <div className="icon-box icon-box-emerald">
                            <GiftIcon className="h-5 w-5 text-eternam-dark" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-eternam-muted">Votre code de parrainage</p>
                            <div className="flex items-center gap-3">
                                <p className="text-xl font-bold text-eternam-light">{refCode}</p>
                                <button
                                    onClick={handleCopy}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-2 text-eternam-muted transition-colors hover:bg-surface-3 hover:text-eternam-light"
                                    title="Copier le code"
                                >
                                    {copied ? (
                                        <CheckIcon className="h-4 w-4 text-eternam-emerald" />
                                    ) : (
                                        <CopyIcon className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="divider" />

                    <p className="text-sm text-eternam-muted">
                        Partagez ce code avec vos clients pour recevoir des commissions sur chaque capsule créée !
                    </p>
                </div>
            )}

            {!refCode && !isAdmin && (
                <div className="bento-card text-center">
                    <div className="icon-box icon-box-subtle mx-auto mb-4 h-14 w-14">
                        <GiftIcon className="h-6 w-6 text-eternam-muted/50" />
                    </div>
                    <p className="text-eternam-muted">Aucun code de parrainage associé à votre compte</p>
                    <p className="mt-1 text-xs text-eternam-muted/50">
                        Les codes de parrainage sont réservés aux agences funéraires
                    </p>
                </div>
            )}
        </div>
    );
};

export default Referral;