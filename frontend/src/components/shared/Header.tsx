'use client';

import { AppKitButton } from '@reown/appkit/react';
import Link from "next/link";
import { useAccount } from 'wagmi';

import { Button } from "@/components/ui/button";

// Logo Icon
const LogoIcon = ({ className = "" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none">
        <path
            d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const Header = () => {
    const { isConnected } = useAccount();

    return (
        <header className="glass-subtle sticky top-0 z-50 w-full border-b border-border-subtle">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link
                    href="/"
                    className="group flex items-center gap-2.5 transition-opacity hover:opacity-80"
                >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-eternam-cyan to-eternam-cyan-muted shadow-lg shadow-eternam-cyan/20">
                        <LogoIcon className="h-5 w-5 text-eternam-dark" />
                    </div>
                    <span className="text-lg font-semibold tracking-tight text-eternam-light">
                        EternamID
                    </span>
                </Link>

                <div className="flex items-center gap-3">
                    <AppKitButton />

                    {isConnected && (
                        <Button asChild className="btn-secondary hidden sm:flex">
                            <Link href="/profil">Profil</Link>
                        </Button>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;