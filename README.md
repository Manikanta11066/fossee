# LabViz(FOSSEE Project)

A full-stack application for visualizing chemical equipment parameters, built using:

- **Django REST API backend**
- **React + Vite web frontend**
- **PyQt5 desktop application**

## 📁 Folder Structure

```
FOSSEE/
├── backend/         # Django REST API
├── frontend/        # React + Vite web application
└── local-desktop/   # PyQt5 desktop application
```

# 🚀 1. Backend Setup (Django — Windows PowerShell Only)

### Open PowerShell and go to backend
```powershell
cd backend
```

### Create virtual environment
```powershell
python -m venv venv
```

### Activate virtual environment
```powershell
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process -Force
.env\Scripts\Activate.ps1
```

### Install backend dependencies
```powershell
pip install django djangorestframework django-environ django-cors-headers pandas reportlab matplotlib
```

### Apply migrations
```powershell
python manage.py makemigrations
python manage.py migrate
```

### Create superuser (optional)
```powershell
python manage.py createsuperuser
```

### Start backend server
```powershell
python manage.py runserver
```

Backend URLs:
- API Root → http://127.0.0.1:8000/
- Admin Panel → http://127.0.0.1:8000/admin/

# 🖥️ 2. Desktop Client Setup (PyQt5 — Windows)

### Navigate to desktop application
```powershell
cd local-desktop
```

### Create virtual environment
```powershell
python -m venv venv
```

### Activate environment
```powershell
.env\Scripts\Activate.ps1
```

### Install desktop dependencies
```powershell
pip install PyQt5 requests pandas matplotlib
```

### Run desktop application
```powershell
python main.py
```

> ⚠️ The Django backend MUST be running before opening the desktop app.

# 🌐 3. Web Frontend Setup (React + Vite — Windows)

### Navigate to frontend
```powershell
cd frontend
```

### Install npm dependencies
```powershell
npm install
```

### Start development server
```powershell
npm run dev
```

Frontend URL → http://localhost:5173

##NOTE:
```
Login Works for Every user(every password).
```

# 📌 Usage Notes

- Start backend first
- Then run the desktop app or web app
- Both frontends use: http://127.0.0.1:8000/api



# 👤 Author
Maddirala Bala Siva Manikanta

# 🚀 Deployment Link(ONLY FRONTEND(INTERFACE))
https://fossee-deploy.vercel.app/

