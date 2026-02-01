@echo off
echo Starting AI Blog Studio...
echo.

echo Starting frontend development server...
start "AI Blog Studio - Frontend" cmd /k "npm run dev"

timeout /t 2 /nobreak >nul

echo Starting backend server...
start "AI Blog Studio - Backend" cmd /k "npm run server"

echo.
echo Both servers are starting in separate windows.
echo Frontend: http://localhost:5173 (or check the Vite output)
echo Backend: Check the server window for the port
echo.
echo Press any key to exit this window (servers will continue running)...
pause >nul

