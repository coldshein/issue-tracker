'use client';
import React from 'react'
import Link from 'next/link'
import { DiCssdeck } from "react-icons/di";
import { usePathname } from 'next/navigation';
import classNames from 'classnames';

const NavBar = () => {
    const currentPath = usePathname();
    const links = [
        {label: 'Dashboard', href: '/'},
        {label: 'Issues', href: '/issues'}
    ]
  return (
    <nav className='flex space-x-6 p-5 items-center border-b'>
        <Link href="/"><DiCssdeck  /></Link>
        <ul className='flex space-x-6'>
           {links.map((link) => <li><Link href={link.href} className={classNames({
            'text-zinc-900': link.href === currentPath,
            'text-zinc-500': link.href !== currentPath,
            'hover:text-zinc-800 transition-colors': true
           })}>{link.label}</Link></li>)}
        </ul>
    </nav>
  )
}

export default NavBar