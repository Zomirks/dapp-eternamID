'use client';

import { useEffect, useState } from "react";
import { publicClient } from "@/lib/client";
import { parseAbiItem } from "viem";
import { CONTRACT_ETERNAMID_ADDRESS } from "@/utils/constants";

import AddReferral from "./AddReferral";
import RemoveReferral from "./RemoveReferral";

interface ReferralEvent {
    code: string;
    address: string;
    event: string;
}

// --- ICONS ---
const UsersIcon = ({ className = "" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const UserPlusIcon = ({ className = "" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="8.5" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="20" y1="8" x2="20" y2="14" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="23" y1="11" x2="17" y2="11" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const UserMinusIcon = ({ className = "" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="8.5" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="23" y1="11" x2="17" y2="11" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const RefreshIcon = ({ className = "" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M23 4v6h-6M1 20v-6h6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ReferralEvents = () => {
    const [events, setEvents] = useState<ReferralEvent[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const getReferralEvents = async () => {
        setIsLoading(true);
        try {
            const referralLogs = await publicClient.getLogs({
                address: CONTRACT_ETERNAMID_ADDRESS,
                events: [
                    parseAbiItem('event ReferralRegistered(string referralCode, address indexed referralAddress)'),
                    parseAbiItem('event ReferralRemoved(string referralCode, address indexed referralAddress)')
                ],
                fromBlock: 0n,
                toBlock: 'latest'
            });

            setEvents(referralLogs.map((event) => ({
                code: event.args.referralCode?.toString() || '',
                address: event.args.referralAddress?.toString() || '',
                event: event.eventName || '',
            })));
        } catch (error) {
            console.error("Error fetching referral events:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const shortenAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    useEffect(() => {
        getReferralEvents();
    }, []);

    const registeredCount = events.filter(e => e.event === 'ReferralRegistered').length;
    const removedCount = events.filter(e => e.event === 'ReferralRemoved').length;
    const activeCount = registeredCount - removedCount;

    return (
        <div className="mb-16">
            {/* Header Section */}
            <div className="mb-6 sm:mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 shrink-0">
                        <UsersIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-white">Gestion des Parrainages</h1>
                        <p className="text-white/50 text-xs sm:text-sm">Gérez les codes de parrainage du contrat EternamID</p>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
                <div className="rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-white/[0.02] transition-all duration-300 hover:border-white/[0.12]">
                    <p className="text-[10px] sm:text-xs text-white/40 uppercase tracking-wider mb-1">Total</p>
                    <p className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                        {events.length}
                    </p>
                </div>
                <div className="rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 transition-all duration-300 hover:border-cyan-500/30">
                    <p className="text-[10px] sm:text-xs text-cyan-400/70 uppercase tracking-wider mb-1">Actifs</p>
                    <p className="text-xl sm:text-3xl font-bold text-cyan-400">{activeCount}</p>
                </div>
                <div className="rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-rose-500/20 bg-gradient-to-br from-rose-500/10 to-rose-500/5 transition-all duration-300 hover:border-rose-500/30">
                    <p className="text-[10px] sm:text-xs text-rose-400/70 uppercase tracking-wider mb-1">Supprimés</p>
                    <p className="text-xl sm:text-3xl font-bold text-rose-400">{removedCount}</p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 sm:mb-6">
                <AddReferral />
                <RemoveReferral />
            </div>

            {/* Events List */}
            <div className="rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-white/[0.02] overflow-hidden transition-all duration-300 hover:border-white/[0.12]">
                {/* List Header */}
                <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-white/[0.08] flex items-center justify-between">
                    <h3 className="text-base sm:text-lg font-semibold text-white">Historique</h3>
                    <button
                        onClick={getReferralEvents}
                        className="text-xs text-white/40 hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                    >
                        <RefreshIcon className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Rafraîchir</span>
                    </button>
                </div>

                {/* Events */}
                <div className="divide-y divide-white/[0.05]">
                    {isLoading ? (
                        <div className="px-4 sm:px-6 py-10 sm:py-12 text-center">
                            <div className="inline-flex items-center gap-2 text-white/40">
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-cyan-400" />
                                <span className="text-sm">Chargement...</span>
                            </div>
                        </div>
                    ) : events.length === 0 ? (
                        <div className="px-4 sm:px-6 py-10 sm:py-12 text-center">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                                <UsersIcon className="h-7 w-7 sm:h-8 sm:w-8 text-white/20" />
                            </div>
                            <p className="text-white/40 text-sm">Aucun événement de parrainage</p>
                            <p className="text-white/20 text-xs mt-1">Les événements apparaîtront ici</p>
                        </div>
                    ) : (
                        events.slice().reverse().map((event, index) => (
                            <div
                                key={index}
                                className="px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors gap-3"
                            >
                                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                                    {/* Icon */}
                                    <div className={`
                                        w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0
                                        ${event.event === 'ReferralRemoved'
                                            ? 'bg-rose-500/10 text-rose-400'
                                            : 'bg-cyan-500/10 text-cyan-400'
                                        }
                                    `}>
                                        {event.event === 'ReferralRemoved'
                                            ? <UserMinusIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                                            : <UserPlusIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                                        }
                                    </div>

                                    {/* Event Info */}
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
                                            <span className={`
                                                px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-medium rounded-full uppercase tracking-wider
                                                ${event.event === 'ReferralRemoved'
                                                    ? 'bg-rose-500/20 text-rose-400'
                                                    : 'bg-cyan-500/20 text-cyan-400'
                                                }
                                            `}>
                                                {event.event === 'ReferralRemoved' ? 'Supprimé' : 'Ajouté'}
                                            </span>
                                        </div>
                                        <span className="font-mono text-xs sm:text-sm text-white/60 truncate block">
                                            {shortenAddress(event.address)}
                                        </span>
                                    </div>
                                </div>

                                {/* Code */}
                                <div className="text-right shrink-0">
                                    <p className="text-[10px] sm:text-xs text-white/40 mb-0.5">Code</p>
                                    <p className={`
                                        text-xs sm:text-sm font-semibold font-mono
                                        ${event.event === 'ReferralRemoved' ? 'text-rose-400' : 'text-cyan-400'}
                                    `}>
                                        {event.code}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReferralEvents;