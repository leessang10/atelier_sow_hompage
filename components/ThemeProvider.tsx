'use client';

import { useEffect } from 'react';

export default function ThemeProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        // 시스템 다크모드 감지를 위한 미디어 쿼리
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        // 초기 테마 설정
        const setInitialTheme = () => {
            // 시스템이 다크모드면 다크모드 적용
            if (mediaQuery.matches) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        };

        // 시스템 테마 변경 감지 및 적용
        const handleThemeChange = (e: MediaQueryListEvent) => {
            if (e.matches) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        };

        // 초기 테마 설정
        setInitialTheme();

        // 시스템 테마 변경 이벤트 리스너 등록
        mediaQuery.addEventListener('change', handleThemeChange);

        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
            mediaQuery.removeEventListener('change', handleThemeChange);
        };
    }, []);

    return <>{children}</>;
} 