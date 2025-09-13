"""
------------------------------------------------------------------------
Configuracion de Django para el Proyecto FederaciónAPI

Generado por "Django-admin startproject" utilizando django 5.2.

Para mas informacion sobre este archivo(settings.py) consulte a:
https://docs.djangoproject.com/en/5.2/topics/settings/

Para la lista completa sobre la configuraciones y sus valores consulte a:
https://docs.djangoproject.com/en/5.2/ref/settings/

(⌐■_■) Ajuste principales:


ATT: Django (Traducido por Vientousky)
------------------------------------------------------------------------
"""

# 📦 Importaciones principales

from pathlib import Path
import dj_database_url
from dotenv import load_dotenv
import cloudinary
import os

load_dotenv()

# Crear rutas dentro del proyecto asi: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Configuración de desarrollo de inicio rápido-inadecuado para produccion
# See https://docs.djangoproject.com/en/5.2/howto/deployment/checklist/

# ⚠️ AVERTENCIA DE SEGURIDAD ¡MANTEN la clave secreta utilizada en producción en SECRETO!!!
SECRET_KEY = 'django-insecure-j(qz&i7s0a@o2jf4+*9v+t4macbu8&49h!87&4vxptpc4t*m3#'

#⚠️ AVERTENCIA DE SEGURIDAD ¡NO ejecutar con el modo depuración activado en producción!
DEBUG = True

ALLOWED_HOSTS = ['*']

# Defición de la aplicación

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'cloudinary_storage',
    'cloudinary',
    'corsheaders',
    'boxeador',
    'entrenador',
    'combates',
    'rest_framework',
    'rest_framework_simplejwt',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    "whitenoise.middleware.WhiteNoiseMiddleware",
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'federation.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'federation.wsgi.application'

# Base de Datos
# https://docs.djangoproject.com/en/5.2/ref/settings/#databases

DATABASES = {
    'default': dj_database_url.config(default=os.getenv('DATABASE_URL'))
}

# Validación de contraseñas
# https://docs.djangoproject.com/en/5.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internacionalización
# https://docs.djangoproject.com/en/5.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

# Archivos estaticos (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.2/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

# Tipos de campos predeterminado de Primary Key
# https://docs.djangoproject.com/en/5.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

#Configuracion de los CORS  

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://federation-rho.vercel.app",
]

CORS_ALLOW_CREDENTIALS = True
CSRF_TRUSTED_ORIGINS = ["https://federation-production.up.railway.app"]

# 📁 Configuración del backend de almacenamiento de archivos (media) en Cloudinary

CLOUDINARY_STORAGE = {
    'CLOUD_NAME': os.getenv('CLOUDINARY_CLOUD_NAME'),
    'API_KEY': os.getenv('CLOUDINARY_API_KEY'),
    'API_SECRET': os.getenv('CLOUDINARY_API_SECRET'),
}

cloudinary.config( 
  cloud_name = os.getenv('CLOUDINARY_CLOUD_NAME'), 
  api_key = os.getenv('CLOUDINARY_API_KEY'), 
  api_secret = os.getenv('CLOUDINARY_API_SECRET') 
)

# Configuración de DJANGO REST FREMWORD

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ],

    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 4
}
