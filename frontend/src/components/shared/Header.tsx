'use client';

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                {/* Logo */}
                <Link
                    href="/"
                    className="group flex items-center gap-2.5 transition-opacity hover:opacity-80"
                >
                    <span className="text-lg font-semibold tracking-tight text-white">
                        EternamID
                    </span>
                </Link>

                {/* Wallet Connect */}
                <div className="flex items-center">
                    <ConnectButton />
                </div>
            </nav>
        </header>
    );
};

export default Header;