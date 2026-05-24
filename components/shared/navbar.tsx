'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useTheme, type Theme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Sun,
  Moon,
  Monitor,
  ChevronDown,
  LogIn,
  UserPlus,
  Menu,
  X,
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface NavItem {
  label: string;
  href?: string;
  children?: NavItem[];
}

// ─── Navigation Data ─────────────────────────────────────────────────────────

const navItems: NavItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Blogs',
    href: '/blogs',
  },
  {
    label: 'Interview',
    children: [
      { label: 'Frontend', href: '/resources/frontend' },
      { label: 'backend', href: '/resources/backend' },
      { label: 'Tools', href: '/resources/tools' },
    ],
  },
  {
    label: 'About',
    href: '/about',
  },
];

// ─── Theme Toggle Dropdown ───────────────────────────────────────────────────

function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const options: { value: Theme; label: string; icon: React.ReactNode }[] = [
    { value: 'light', label: 'Light', icon: <Sun className='size-4' /> },
    { value: 'dark', label: 'Dark', icon: <Moon className='size-4' /> },
    { value: 'system', label: 'System', icon: <Monitor className='size-4' /> },
  ];

  const current = options.find((o) => o.value === theme) || options[2];

  return (
    <div className='relative' ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        aria-label='Toggle theme'
        className='inline-flex items-center justify-center rounded-lg p-2 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
      >
        {resolvedTheme === 'dark' ? (
          <Moon className='size-5' />
        ) : (
          <Sun className='size-5' />
        )}
      </button>

      {open && (
        <div className='absolute right-0 top-full z-50 mt-2 w-36 rounded-lg border border-border bg-popover p-1 shadow-lg'>
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                setTheme(opt.value);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                theme === opt.value
                  ? 'bg-accent text-accent-foreground'
                  : 'text-popover-foreground hover:bg-muted'
              }`}
            >
              {opt.icon}
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Nav Dropdown ────────────────────────────────────────────────────────────

function NavDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 200);
  };

  if (!item.children) {
    return (
      <Link
        href={item.href || '#'}
        className='inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-muted hover:text-foreground'
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      className='relative'
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className='inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-muted hover:text-foreground'
        aria-expanded={open}
      >
        {item.label}
        <ChevronDown
          className={`size-3.5 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <div
          className='absolute left-0 top-full z-50 mt-1 min-w-48 rounded-lg border border-border bg-popover p-1 shadow-lg'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {item.children.map((child) => (
            <Link
              key={child.label}
              href={child.href || '#'}
              className='block rounded-md px-3 py-2 text-sm text-popover-foreground transition-colors hover:bg-muted'
              onClick={() => setOpen(false)}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Auth Section ────────────────────────────────────────────────────────────

interface AuthSectionProps {
  isSignedIn: boolean;
}

function AuthSection({ isSignedIn }: AuthSectionProps) {
  if (isSignedIn) {
    return (
      <div className='relative group'>
        <button className='flex items-center gap-2 rounded-full p-0.5 transition-colors hover:bg-muted'>
          <Avatar size='sm'>
            <AvatarImage src='https://github.com/shadcn.png' alt='User' />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </button>
        {/* Simple dropdown on click */}
        <div className='absolute right-0 top-full z-50 mt-2 w-40 rounded-lg border border-border bg-popover p-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-lg'>
          <Link
            href='/profile'
            className='block rounded-md px-3 py-2 text-sm text-popover-foreground hover:bg-muted'
          >
            Profile
          </Link>
          <Link
            href='/settings'
            className='block rounded-md px-3 py-2 text-sm text-popover-foreground hover:bg-muted'
          >
            Settings
          </Link>
          <hr className='my-1 border-border' />
          <button className='block w-full rounded-md px-3 py-2 text-left text-sm text-destructive hover:bg-destructive/10'>
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='flex items-center gap-2'>
      <Button variant='ghost' size='sm' className='hidden sm:inline-flex'>
        <LogIn className='size-4' />
        Sign In/UP
      </Button>
      
    </div>
  );
}

// ─── Mobile Menu ─────────────────────────────────────────────────────────────

function MobileMenu({
  isOpen,
  onClose,
  isSignedIn,
}: {
  isOpen: boolean;
  onClose: () => void;
  isSignedIn: boolean;
}) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden' />
  );
}

// ─── Main Navbar ─────────────────────────────────────────────────────────────

export default function Navbar({
  isSignedIn = false,
}: {
  isSignedIn?: boolean;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className='sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md'>
      <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6'>
        {/* ── Logo ── */}
        <Link
          href='/'
          className='flex items-center gap-2 text-lg font-bold tracking-tight'
        >
          <span className='hidden sm:inline'>Developer Notes</span>
        </Link>

        {/* ── Desktop Nav ── */}
        <div className='hidden items-center gap-1 md:flex'>
          {navItems.map((item) => (
            <NavDropdown key={item.label} item={item} />
          ))}
        </div>

        {/* ── Right Actions ── */}
        <div className='flex items-center gap-1'>
          <ThemeToggle />
          <AuthSection isSignedIn={isSignedIn} />

          {/* ── Mobile Hamburger ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className='ml-1 inline-flex items-center justify-center rounded-lg p-2 text-sm font-medium transition-colors hover:bg-muted md:hidden'
            aria-label='Toggle menu'
          >
            {mobileOpen ? (
              <X className='size-5' />
            ) : (
              <Menu className='size-5' />
            )}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu Panel ── */}
      {mobileOpen && (
        <div className='border-t border-border bg-background px-4 pb-4 md:hidden'>
          <div className='flex flex-col gap-1 pt-3'>
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label} className='flex flex-col gap-1'>
                  <span className='px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                    {item.label}
                  </span>
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href || '#'}
                      className='rounded-md px-3 py-2 text-sm text-foreground/70 hover:bg-muted hover:text-foreground'
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href || '#'}
                  className='rounded-md px-3 py-2 text-sm font-medium text-foreground/70 hover:bg-muted hover:text-foreground'
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ),
            )}

            {/* Mobile Auth */}
            <div className='mt-3 flex flex-col gap-2 border-t border-border pt-3'>
              {isSignedIn ? (
                <>
                  <Link
                    href='/profile'
                    className='rounded-md px-3 py-2 text-sm font-medium text-foreground/70 hover:bg-muted hover:text-foreground'
                    onClick={() => setMobileOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href='/settings'
                    className='rounded-md px-3 py-2 text-sm font-medium text-foreground/70 hover:bg-muted hover:text-foreground'
                    onClick={() => setMobileOpen(false)}
                  >
                    Settings
                  </Link>
                  <button className='rounded-md px-3 py-2 text-left text-sm font-medium text-destructive hover:bg-destructive/10'>
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Button variant='outline' className='w-full justify-start'>
                    <LogIn className='size-4' />
                    Sign UP/In
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
