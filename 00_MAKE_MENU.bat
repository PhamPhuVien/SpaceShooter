REM PHAM PHU VIEN

@echo off

mode con:cols=86 lines=30
title Pham Phu Vien: Space Shooter's Menu

setlocal ENABLEDELAYEDEXPANSION

set CYGWIN=nodosfilewarning
set CUR_MPATH=%CD%
set URL_SPACE=http://localhost:5000/

cls

color A

echo.
echo          ================
echo           ==   MENU   ==
echo          ================
echo.
echo   * WORKING ON: %CUR_MPATH%
echo.
echo.        0. SETUP.
echo.
echo.        1. RUN SERVER.
echo.
echo.        2. RUN CLIENT.
echo.
echo.        3. RUN ADMIN.
echo.
echo.        4. N/A.
echo.
echo.        5. N/A.
echo.

set /P DO_JOB=.     Enter your choose: 

cls

if %DO_JOB%==0 (
    echo.
    echo  ************************ 0. SETUP ************************
    echo.
    
    pushd %CUR_MPATH%
		REM Get Window Architecture.
		echo * Your System Architecture: 
		wmic os get osarchitecture
		echo * Please Choose 64/32 Bit For NodeJS or MongoDB And Install.
		echo.
	
		REM Install NodeJS And Modules.
		call node -v
		
		cd %CUR_MPATH%
		
		if NOT !ERRORLEVEL! EQU 0 (
			echo ERROR: Please Install NodeJS To Run.
			call Tools\node-v10.15.3-x64.msi
		) else (
			REM REM Install Modules.
			npm install express
			npm install mongojs
			npm install body-parser
			npm install mongoose
			npm install socket.io
			
			echo.
			echo SETUP Done! Please Goto Next Steps.
			echo.
		)
    popd
    
    pause

    goto END
) else if %DO_JOB%==1 (
    echo.
    echo  ************************ 1. RUN SERVER ************************
    echo.
    
    pushd %CUR_MPATH%
		REM Kill Old Server If Have.
		Taskkill /IM node.exe /F
		
		REM Start New Server.
		start cmd /c "title SERVER's Space Shooter ... & color A & call node server\gameServer.js"
		
		echo.
		echo Server Is Started ... Please Check If No Another Command Line Window Appear.
		echo.
    popd
	
    pause
    goto END
) else if %DO_JOB%==2 (
    echo.
    echo  ************************ 2. RUN CLIENT ************************
    echo.
    
    pushd %CUR_MPATH%
		REM Start Firefox.
		start firefox %URL_SPACE%
		
		if NOT !ERRORLEVEL! EQU 0 (
			REM Start Chrome.
			start chrome %URL_SPACE%
			
			if NOT !ERRORLEVEL! EQU 0 (
				REM Start Explorer.
				start explorer %URL_SPACE%
			)
		)
		
		echo.
		echo Please Check And Play The Game On Your Browser Firefox Or Chrome Or Explorer.
		echo.
    popd
    
    pause
    goto END
) else if %DO_JOB%==3 (
    echo.
    echo  ************************ 3. RUN ADMIN. ************************
    echo.
    
    pushd %CUR_MPATH%
		REM Start Firefox.
		start firefox %URL_SPACE%admin
		
		if NOT !ERRORLEVEL! EQU 0 (
			REM Start Chrome.
			start chrome %URL_SPACE%admin
			
			if NOT !ERRORLEVEL! EQU 0 (
				REM Start Explorer.
				start explorer %URL_SPACE%admin
			)
		)
    popd
    
    goto END
) else if %DO_JOB%==4 (
    echo.
    echo  ************************ 4. N/A. ************************
    echo.
    
    pushd %CUR_MPATH%
    popd
    
    pause
    goto END
) else if %DO_JOB%==5 (
    echo.
    echo  ************************ 5. N/A. ************************
    echo.
    
    pushd %CUR_MPATH%
    popd
    
    goto END
)

:END
echo  ====================== FINISHED =====================

cd %CUR_MPATH%

call 00_MAKE_MENU.bat
doskey /reinstall
    